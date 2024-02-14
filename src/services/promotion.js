import friendlyCron from "friendly-cron";
import cron from "node-cron";

class PromotionService {
  constructor(repository, bot) {
    this.repository = repository;
    this.bot = bot;
    this.cronJobs = {};
  }

  async createPromotion(args) {
    try {
      return await this.repository.create(args);
    } catch (error) {
      throw new Error(`failed to create promotion: ${error}`);
    }
  }

  async getAllPromotion() {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new Error(`failed to get promotions: ${error}`);
    }
  }

  async getPromotionById(args) {
    try {
      return await this.repository.getById(args);
    } catch (error) {
      throw new Error(`failed to get promotion by id: ${error}`);
    }
  }

  async updatePromotion(args) {
    const [action, id, ...value] = args;

    switch (action) {
      case "name":
      case "message":
      case "delay":
      case "interval":
        try {
          return await this.repository.update(
            { [action]: value.join(" ") },
            id
          );
        } catch (error) {
          throw new Error(`failed to update promotion: ${error}`);
        }
      case "channel_id":
        try {
          return await this.repository.update({ [action]: value }, id);
        } catch (error) {
          throw new Error(`failed to update promotion: ${error}`);
        }
      default:
        throw new Error("invalid action provided");
    }
  }

  async deletePromotion(args) {
    try {
      return await this.repository.delete(args);
    } catch (error) {
      throw new Error(`failed to delete promotion: ${error}`);
    }
  }

  async startPromotion(args) {
    try {
      const cronPattern = friendlyCron(this.calculateCronPattern(args.delay));
      const cronJob = cron.schedule(cronPattern, async () => {
        await this.processPromotion(args);
      });

      this.cronJobs[args.id] = cronJob;
    } catch (error) {
      throw new Error("error starting promotions scheduler:", error);
    }
  }

  async stopPromotion(args) {
    try {
      const cronJob = this.cronJobs[args.id];
      console.log(this.cronJobs);
      if (cronJob === undefined) {
        throw new Error(`no cron job found for promotion with id ${id}`);
      }

      cronJob.stop();
      delete this.cronJobs[args.id];
    } catch (error) {
      throw new Error("error stopping promotion cron:", error);
    }
  }

  async processPromotion(promotion) {
    try {
      promotion.channel_id.forEach(async (channelId, i) => {
        const channel = this.bot.client.channels.cache.get(channelId);
        if (!channel) {
          throw new Error(`Channel with id ${channelId} not found`);
        }

        setTimeout(async () => {
          await channel.send(promotion.message);
          console.log(`processing promotion with id ${promotion.id}`);
        }, i * (promotion.interval * 1000));
      });
    } catch (error) {
      console.error("error processing promotion:", error);
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
