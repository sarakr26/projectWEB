"use client";

import { useState, useEffect } from "react";
// Update the import path if the file exists elsewhere, for example:
import { adminService } from "../../services/adminService";
// Or create the file at core/frontend/app/services/adminService.ts with the necessary exports.
import { AdminSidebar } from "../components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, MoreVertical, Archive } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
// import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Loader2 } from "lucide-react";

interface Partner {
  id: number;
  name: string;
  partner_type: string;
  email: string;
  status: "active" | "archived";
  created_at: string;
  listings_count: number;
}

interface PartnerResponse {
  status: string;
  data: {
    data: Partner[];
    current_page: number;
    last_page: number;
    total: number;
  };
}

export default function PartnerManagement() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await adminService.getPartners({
        search: searchQuery,
        page: currentPage,
        per_page: 10,
      });

      if (response?.data?.data) {
        setPartners(response.data.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch partners",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchPartners();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, currentPage]);

  const handleArchive = async (partnerId: number) => {
    try {
      await adminService.updatePartnerStatus(partnerId);
      await fetchPartners();
      toast({
        title: "Success",
        description: "Partner status updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update partner status",
        variant: "destructive",
      });
    }
  };

  const getStatusStyle = (status: string) => {
    return status === "active"
      ? "bg-[rgb(10,197,178)]/10 text-[rgb(10,197,178)]"
      : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Partner Management</h1>
          <Button className="bg-[rgb(10,197,178)] hover:bg-[rgb(10,197,178)]/90">
            <Plus className="mr-2 h-4 w-4" />
            Add New Partner
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Partner List</CardTitle>
              <div className="relative w-[300px]">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search partners..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="animate-spin h-8 w-8 text-gray-400" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No partners found
                      </TableCell>
                    </TableRow>
                  ) : (
                    partners.map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell className="font-medium">
                          {partner.name}
                        </TableCell>
                        <TableCell>{partner.partner_type}</TableCell>
                        <TableCell>{partner.email}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(
                              partner.status
                            )}`}
                          >
                            {partner.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(partner.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleArchive(partner.id)}
                              >
                                <Archive className="h-4 w-4 mr-2" />
                                {partner.status === "active"
                                  ? "Archive"
                                  : "Unarchive"}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}