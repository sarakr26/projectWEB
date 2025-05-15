"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, ListChecks } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function AdminDashboard() {
  // Données fictives pour la démonstration
  const stats = {
    clients: 1250,
    partners: 85,
    listings: 3200
  };

  // Données pour le graphique de croissance des clients
  const clientGrowthData = [
    { month: "Jan", clients: 400 },
    { month: "Feb", clients: 600 },
    { month: "Mar", clients: 800 },
    { month: "Apr", clients: 1000 },
    { month: "May", clients: 1200 },
    { month: "Jun", clients: 1250 },
  ];

  // Données pour la gestion des clients
  const clientManagementData = [
    { name: "Active Clients", value: 850, color: "rgb(10, 197, 178)" },
    { name: "Archived Clients", value: 400, color: "#9E9E9E" }
  ];

  const COLORS = clientManagementData.map(item => item.color);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.clients}</div>
              <p className="text-xs text-muted-foreground">
                Active users this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.partners}</div>
              <p className="text-xs text-muted-foreground">
                Verified partners
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
              <ListChecks className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.listings}</div>
              <p className="text-xs text-muted-foreground">
                Active listings
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Client Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={clientGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="clients"
                      stroke="rgb(10, 197, 178)"
                      fill="rgb(10, 197, 178)"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Client Management Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={clientManagementData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value, percent }) => 
                        `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                      }
                    >
                      {clientManagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} clients`, name]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}