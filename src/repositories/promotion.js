import supabase from "@supabase/supabase-js";

const { SupabaseClient } = supabase;

class PromotionRepository {
  db = { SupabaseClient };

  constructor(db) {
    this.db = db;
  }

  async create(entity) {
    const { data, error } = await this.db
      .from("promotion")
      .insert(entity)
      .select()
      .single();
    if (error) {
      throw error.message;
    }
    return data;
  }

  async getAll() {
    const { data, error } = await this.db.from("promotion").select();
    if (error) {
      throw error.message;
    }
    return data;
  }

  async getById(id) {
    const { data, error } = await this.db
      .from("promotion")
      .select()
      .eq("id", id)
      .single();
    if (error) {
      throw error.message;
    }
    return data;
  }

  async update(entity, id) {
    const { data, error } = await this.db
      .from("promotion")
      .update(entity)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      throw error.message;
    }
    return data;
  }

  async delete(id) {
    const { error } = await this.db.from("promotion").delete().eq("id", id);
    if (error) {
      throw error.message;
    }
  }
}

export default PromotionRepository;
