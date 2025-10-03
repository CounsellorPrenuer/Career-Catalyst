import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactInquirySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      res.json({ success: true, inquiry });
    } catch (error) {
      console.error("Error creating contact inquiry:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to submit inquiry" 
      });
    }
  });

  // Get all contact inquiries
  app.get("/api/contact", async (req, res) => {
    try {
      const inquiries = await storage.getAllContactInquiries();
      res.json({ success: true, inquiries });
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch inquiries" 
      });
    }
  });

  // Update contact inquiry status
  app.patch("/api/contact/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const inquiry = await storage.updateContactInquiryStatus(id, status);
      res.json({ success: true, inquiry });
    } catch (error) {
      console.error("Error updating inquiry status:", error);
      res.status(400).json({ 
        success: false, 
        error: "Failed to update inquiry status" 
      });
    }
  });

  // Create payment
  app.post("/api/payments", async (req, res) => {
    try {
      const payment = await storage.createPayment(req.body);
      res.json({ success: true, payment });
    } catch (error) {
      console.error("Error creating payment:", error);
      res.status(400).json({ 
        success: false, 
        error: "Failed to create payment" 
      });
    }
  });

  // Get all payments
  app.get("/api/payments", async (req, res) => {
    try {
      const payments = await storage.getAllPayments();
      res.json({ success: true, payments });
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch payments" 
      });
    }
  });

  // Update payment
  app.patch("/api/payments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await storage.updatePayment(id, req.body);
      res.json({ success: true, payment });
    } catch (error) {
      console.error("Error updating payment:", error);
      res.status(400).json({ 
        success: false, 
        error: "Failed to update payment" 
      });
    }
  });

  // Get admin stats
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json({ success: true, stats });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch stats" 
      });
    }
  });

  // Export all leads as CSV
  app.get("/api/admin/export/all", async (req, res) => {
    try {
      const [contacts, payments] = await Promise.all([
        storage.getAllContactInquiries(),
        storage.getAllPayments()
      ]);

      const allLeads = [
        ...contacts.map(c => ({
          type: 'Contact Form',
          id: c.id,
          name: c.name,
          email: c.email,
          phone: c.phone,
          service: c.service,
          message: c.message,
          status: c.status,
          amount: '',
          planName: '',
          category: '',
          createdAt: c.createdAt
        })),
        ...payments.map(p => ({
          type: 'Payment',
          id: p.id,
          name: p.name || '',
          email: p.email || '',
          phone: p.phone || '',
          service: p.category,
          message: '',
          status: p.status,
          amount: `₹${p.amount}`,
          planName: p.planName,
          category: p.category,
          createdAt: p.createdAt
        }))
      ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      const csv = [
        'Type,ID,Name,Email,Phone,Service/Category,Plan Name,Amount,Status,Message,Created At',
        ...allLeads.map(lead => 
          `"${lead.type}","${lead.id}","${lead.name}","${lead.email}","${lead.phone}","${lead.service}","${lead.planName}","${lead.amount}","${lead.status}","${lead.message}","${new Date(lead.createdAt).toLocaleString()}"`
        )
      ].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=all-leads.csv');
      res.send(csv);
    } catch (error) {
      console.error("Error exporting data:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to export data" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
