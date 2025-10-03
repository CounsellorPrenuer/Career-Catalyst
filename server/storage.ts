import { type ContactInquiry, type InsertContactInquiry, contactInquiries, type Payment, type InsertPayment, payments } from "@shared/schema";
import { db } from "../db/index";
import { desc, eq } from "drizzle-orm";

export interface IStorage {
  createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry>;
  getAllContactInquiries(): Promise<ContactInquiry[]>;
  updateContactInquiryStatus(id: string, status: string): Promise<ContactInquiry | undefined>;
  
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: string, data: Partial<InsertPayment>): Promise<Payment | undefined>;
  getAllPayments(): Promise<Payment[]>;
  
  getStats(): Promise<{
    totalBookings: number;
    pending: number;
    contacted: number;
    completed: number;
    contactForms: number;
    totalPayments: number;
    revenue: number;
  }>;
}

export class DbStorage implements IStorage {
  async createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry> {
    const [created] = await db.insert(contactInquiries).values(inquiry).returning();
    return created;
  }

  async getAllContactInquiries(): Promise<ContactInquiry[]> {
    return await db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt));
  }

  async updateContactInquiryStatus(id: string, status: string): Promise<ContactInquiry | undefined> {
    const [updated] = await db
      .update(contactInquiries)
      .set({ status })
      .where(eq(contactInquiries.id, id))
      .returning();
    return updated;
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [created] = await db.insert(payments).values(payment).returning();
    return created;
  }

  async updatePayment(id: string, data: Partial<InsertPayment>): Promise<Payment | undefined> {
    const [updated] = await db
      .update(payments)
      .set(data)
      .where(eq(payments.id, id))
      .returning();
    return updated;
  }

  async getAllPayments(): Promise<Payment[]> {
    return await db.select().from(payments).orderBy(desc(payments.createdAt));
  }

  async getStats() {
    const allPayments = await this.getAllPayments();
    const allContacts = await this.getAllContactInquiries();
    
    const completedPayments = allPayments.filter(p => p.status === 'completed');
    const pendingPayments = allPayments.filter(p => p.status === 'pending' || p.status === 'initiated');
    const contactedLeads = allContacts.filter(c => c.status === 'contacted');
    const completedLeads = allContacts.filter(c => c.status === 'completed');
    
    const revenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
    
    return {
      totalBookings: allPayments.length,
      pending: pendingPayments.length,
      contacted: contactedLeads.length,
      completed: completedLeads.length,
      contactForms: allContacts.length,
      totalPayments: completedPayments.length,
      revenue: revenue,
    };
  }
}

export const storage = new DbStorage();
