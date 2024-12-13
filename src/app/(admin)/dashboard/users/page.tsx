"use client";

import { useState } from "react";

import DashboardHeader from "@/components/custom/DashboardHeader";
import { DashboardShell } from "@/components/custom/DashboardShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/context/user.provider";
import { useGetAllUsers, useManageAdmin } from "@/hooks/custom/auth.hook";
import IUser from "@/types/user.types";
import { useQueryClient } from "@tanstack/react-query";

export default function ManageUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user: currentUser } = useUser();
  const { data } = useGetAllUsers();
  const users = data?.data;
  const { mutate: manage } = useManageAdmin();
  const queryClient = useQueryClient();

  const filteredUsers = users?.filter(
    (user: IUser) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = (email: string, newRole: "user" | "admin") => {
    manage({ email, newRole });
    queryClient.invalidateQueries({ queryKey: ["ALL_USERS"] });
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Manage Users"
        text="View and manage user accounts."
      />
      <div className="mt-4 space-y-4">
        <Input
          className="max-w-sm"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers?.map((user: IUser) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user._id !== currentUser?._id && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleRoleChange(
                          user.email as string,
                          user.role === "user" ? "admin" : "user"
                        )
                      }
                      className={
                        user.role === "admin"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-500 hover:bg-green-600"
                      }
                    >
                      {user.role === "admin"
                        ? "Demote to User"
                        : "Promote to Admin"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardShell>
  );
}
