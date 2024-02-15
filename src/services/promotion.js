import friendlyCron from "friendly-cron";
import cron from "node-cron";

class PromotionService {
  constructor(repository, bot) {
    this.repository = repository;
    this.bot = bot;
    this.cronJobs = {};
  }

  async createPromotion(promotionData) {
    const data = await this.repository.create(promotionData);
    if (!data) {
      throw new Error("failed to create promotion");
    }
    return data;
  }

  async getAllPromotion() {
    const data = await this.repository.getAll();
    if (!data) {
      throw new Error("failed to get all promotions");
    }
    return data;
  }

  async getPromotionById(promotionId) {
    const data = await this.repository.getById(promotionId);
    if (!data) {
      throw new Error(`promotion with id ${promotionId} not found`);
    }
    return data;
  }

  async updatePromotion(updateData) {
    const [action, id, ...value] = updateData;
    switch (action) {
      case "name":
      case "message":
        const updatedData = await this.repository.update(
          { [action]: value.join(" ") },
          id
        );
        if (!updatedData) {
          throw new Error(`failed to update promotion with id ${id}`);
        }
        return updatedData;
      case "delay":
      case "interval":
        const numericValue = parseInt(value[0]);
        if (isNaN(numericValue) || numericValue <= 0) {
          throw new Error(
            `${action} must be a positive number starting from 1`
          );
        }
        const updatedNumericData = await this.repository.update(
          { [action]: value.join(" ") },
          id
        );
        if (!updatedNumericData) {
          throw new Error(`failed to update promotion with id ${id}`);
        }
        return updatedNumericData;
      case "channel_id":
        const updatedChannelData = await this.repository.update(
          { [action]: value },
          id
        );
        if (!updatedChannelData) {
          throw new Error(`failed to update promotion with id ${id}`);
        }
        return updatedChannelData;
      default:
        throw new Error(
          "invalid action provided\nusage: [name, message, delay, interval, channel_id]"
        );
    }
  }

  async deletePromotion(promotionId) {
    const deletedData = await this.repository.delete(promotionId);
    if (!deletedData) {
      throw new Error(`failed to delete promotion with id ${promotionId}`);
    }
    return deletedData;
  }

  async startPromotion(promotionData) {
    try {
      const cronPattern = friendlyCron(
        this.calculateCronPattern(promotionData.delay)
      );
      const cronJob = cron.schedule(cronPattern, async () => {
        await this.processPromotion(promotionData);
      });

      this.cronJobs[promotionData.id] = cronJob;
    } catch (error) {
      throw new Error(`error starting promotions scheduler: ${error}`);
    }
  }

  async stopPromotion(promotionId) {
    const cronJob = this.cronJobs[promotionId];
    if (!cronJob) {
      throw new Error(`no cron job found for promotion with id ${promotionId}`);
    }

    try {
      cronJob.stop();
      delete this.cronJobs[promotionId];
    } catch (error) {
      throw new Error(`error stopping promotion cron: ${error}`);
    }
  }

  async processPromotion(promotion) {
    try {
      promotion.channel_id.forEach(async (channelId, i) => {
        const channel = this.bot.client.channels.cache.get(channelId);
        if (!channel) {
          throw new Error(`channel with id ${channelId} not found`);
        }

        setTimeout(async () => {
          await channel.send(promotion.message);
        }, i * (promotion.interval * 1000));
      });
    } catch (error) {
      throw new Error(`error processing promotion: ${error}`);
    }
  }

  calculateCronPattern(delay) {
    if (delay >= 86400) {
      const days = Math.floor(delay / 86400);
      return `every ${days} day`;
    } else if (delay >= 3600) {
      const hours = Math.floor(delay / 3600);
      return `every ${hours} hour`;
    } else if (delay >= 60) {
      const minutes = Math.floor(delay / 60);
      return `every ${minutes} minute`;
    } else {
      return `every ${delay} second`;
    }
  }
}

export default PromotionService;
