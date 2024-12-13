"use client";

import CustomSidebarTrigger from "@/components/custom/CustomSidebarTrigger";
import { DashboardNav } from "@/components/custom/DashboardNav";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/UserServices";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { LogOutIcon, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);
    router.push("/login");
  };

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen overflow-hidden">
        <Sidebar className="w-64 bg-gray-100 border-r border-gray-200">
          <SidebarHeader className="p-4 border-b border-gray-200">
            <Link href="/lessons" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">🎌 JP Admin</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <VisuallyHidden.VisuallyHidden>
              <Dialog>
                {/* <DialogContent> */}
                <DialogTitle>Navigation Menu</DialogTitle>
                {/* </DialogContent> */}
              </Dialog>
            </VisuallyHidden.VisuallyHidden>
            <DashboardNav />
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-gray-200">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full hover:bg-red-500 hover:text-white"
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              Log Out
            </Button>
            <CustomSidebarTrigger />
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <SidebarTrigger>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </SidebarTrigger>
            <div className="ml-auto" />
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
