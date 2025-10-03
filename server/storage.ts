import { type ContactInquiry, type InsertContactInquiry, contactInquiries } from "@shared/schema";
import { db } from "../db/index";

export interface IStorage {
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getAllContactInquiries(): Promise<ContactInquiry[]>;
}

export class DbStorage implements IStorage {
  async createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [created] = await db.insert(contactInquiries).values(inquiry).returning();
    return created;
  }

  async getAllContactInquiries(): Promise<ContactInquiry[]> {
    return await db.select().from(contactInquiries).orderBy(contactInquiries.createdAt);
  }
}

export const storage = new DbStorage();
