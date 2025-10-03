import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Eye,
  Calendar,
  FileText,
  CreditCard,
  Download,
  LogOut,
  ArrowDownToLine,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  Phone,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Stats {
  totalBookings: number;
  pending: number;
  contacted: number;
  completed: number;
  contactForms: number;
  totalPayments: number;
  revenue: number;
}

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Payment {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  planName: string;
  category: string;
  amount: number;
  razorpayPaymentId: string | null;
  razorpayOrderId: string | null;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const { data: statsData } = useQuery<{ success: boolean; stats: Stats }>({
    queryKey: ['/api/admin/stats'],
  });

  const { data: contactsData } = useQuery<{ success: boolean; inquiries: ContactInquiry[] }>({
    queryKey: ['/api/contact'],
  });

  const { data: paymentsData } = useQuery<{ success: boolean; payments: Payment[] }>({
    queryKey: ['/api/payments'],
  });

  const stats: Stats = statsData?.stats || {
    totalBookings: 0,
    pending: 0,
    contacted: 0,
    completed: 0,
    contactForms: 0,
    totalPayments: 0,
    revenue: 0,
  };

  const contacts: ContactInquiry[] = contactsData?.inquiries || [];
  const payments: Payment[] = paymentsData?.payments || [];

  const handleExportAll = () => {
    window.location.href = '/api/admin/export/all';
  };

  const exportToCSV = (data: any[], filename: string, headers: string[]) => {
    const csv = [
      headers.join(','),
      ...data.map(row => headers.map(h => {
        const key = h.toLowerCase().replace(/\s+/g, '');
        const value = row[key] || '';
        return `"${value}"`;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  const handleExportContacts = () => {
    const data = contacts.map(c => ({
      name: c.name,
      email: c.email,
      phone: c.phone,
      service: c.service,
      message: c.message,
      status: c.status,
      createdat: new Date(c.createdAt).toLocaleString(),
    }));
    exportToCSV(data, 'contact-forms.csv', ['Name', 'Email', 'Phone', 'Service', 'Message', 'Status', 'Created At']);
  };

  const handleExportPayments = () => {
    const data = payments.map(p => ({
      name: p.name || '',
      email: p.email || '',
      phone: p.phone || '',
      planname: p.planName,
      category: p.category,
      amount: `₹${p.amount}`,
      status: p.status,
      createdat: new Date(p.createdAt).toLocaleString(),
    }));
    exportToCSV(data, 'payments.csv', ['Name', 'Email', 'Phone', 'Plan Name', 'Category', 'Amount', 'Status', 'Created At']);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'outline',
      contacted: 'secondary',
      completed: 'default',
      initiated: 'outline',
      cancelled: 'destructive',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage all customer data, bookings, and submissions
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleExportAll}
                className="bg-gradient-to-r from-primary to-primary/90"
                data-testid="button-export-all"
              >
                <Download className="w-4 h-4 mr-2" />
                Export All Data
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="overview" data-testid="tab-overview">
              <Eye className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="bookings" data-testid="tab-bookings">
              <Calendar className="w-4 h-4 mr-2" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="contact" data-testid="tab-contact">
              <FileText className="w-4 h-4 mr-2" />
              Contact Forms
            </TabsTrigger>
            <TabsTrigger value="payments" data-testid="tab-payments">
              <CreditCard className="w-4 h-4 mr-2" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="downloads" data-testid="tab-downloads">
              <ArrowDownToLine className="w-4 h-4 mr-2" />
              Lead Downloads
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stats.totalBookings}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Contacted
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{stats.contacted}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Contact Forms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">{stats.contactForms}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Lead Downloads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">0</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Payments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{stats.totalPayments}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">₹{stats.revenue}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Bookings</CardTitle>
                  <Button variant="ghost" size="sm" onClick={handleExportPayments}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  {payments.slice(0, 5).length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No bookings yet</p>
                  ) : (
                    <div className="space-y-3">
                      {payments.slice(0, 5).map((payment) => (
                        <div key={payment.id} className="flex justify-between items-start border-b pb-3">
                          <div>
                            <p className="font-semibold text-sm">{payment.planName}</p>
                            <p className="text-xs text-muted-foreground">{payment.category}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-sm">₹{payment.amount}</p>
                            {getStatusBadge(payment.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Contact Forms</CardTitle>
                  <Button variant="ghost" size="sm" onClick={handleExportContacts}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  {contacts.slice(0, 5).length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No contact forms yet</p>
                  ) : (
                    <div className="space-y-3">
                      {contacts.slice(0, 5).map((contact) => (
                        <div key={contact.id} className="border-b pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-sm">{contact.name}</p>
                              <p className="text-xs text-muted-foreground">{contact.email}</p>
                            </div>
                            {getStatusBadge(contact.status)}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{contact.service}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Payments</CardTitle>
                  <Button variant="ghost" size="sm" onClick={handleExportPayments}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  {payments.filter(p => p.status === 'completed').slice(0, 5).length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">No payments yet</p>
                  ) : (
                    <div className="space-y-3">
                      {payments.filter(p => p.status === 'completed').slice(0, 5).map((payment) => (
                        <div key={payment.id} className="flex justify-between items-center border-b pb-3">
                          <div>
                            <p className="font-semibold text-sm">{payment.planName}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(payment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="font-semibold text-green-600">₹{payment.amount}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Lead Downloads</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12">
                    <ArrowDownToLine className="w-12 h-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground text-sm">No downloads yet</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>All Bookings</CardTitle>
                <Button onClick={handleExportPayments}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No bookings found
                        </TableCell>
                      </TableRow>
                    ) : (
                      payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-semibold">{payment.planName}</TableCell>
                          <TableCell>{payment.category}</TableCell>
                          <TableCell className="font-semibold">₹{payment.amount}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {payment.name && <div>{payment.name}</div>}
                              {payment.email && <div className="text-muted-foreground">{payment.email}</div>}
                              {payment.phone && <div className="text-muted-foreground">{payment.phone}</div>}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Forms Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>All Contact Forms</CardTitle>
                <Button onClick={handleExportContacts}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No contact forms found
                        </TableCell>
                      </TableRow>
                    ) : (
                      contacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell className="font-semibold">{contact.name}</TableCell>
                          <TableCell>{contact.email}</TableCell>
                          <TableCell>{contact.phone}</TableCell>
                          <TableCell>{contact.service}</TableCell>
                          <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                          <TableCell>{getStatusBadge(contact.status)}</TableCell>
                          <TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>All Payments</CardTitle>
                <Button onClick={handleExportPayments}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Contact Info</TableHead>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.filter(p => p.status === 'completed').length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No completed payments found
                        </TableCell>
                      </TableRow>
                    ) : (
                      payments.filter(p => p.status === 'completed').map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-semibold">{payment.planName}</TableCell>
                          <TableCell>{payment.category}</TableCell>
                          <TableCell className="font-semibold text-green-600">₹{payment.amount}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {payment.name && <div>{payment.name}</div>}
                              {payment.email && <div className="text-muted-foreground">{payment.email}</div>}
                            </div>
                          </TableCell>
                          <TableCell className="text-xs">{payment.razorpayPaymentId || '-'}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lead Downloads Tab */}
          <TabsContent value="downloads">
            <Card>
              <CardHeader>
                <CardTitle>Lead Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-20">
                  <ArrowDownToLine className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-lg">No downloads yet</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
