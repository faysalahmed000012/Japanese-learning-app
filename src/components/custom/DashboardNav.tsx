"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { BarChart, Bookmark, BookOpen, Users, Video } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart,
  },
  {
    title: "Lessons",
    href: "/dashboard/lessons",
    icon: BookOpen,
    subItems: [
      {
        title: "Add Lesson",
        href: "/dashboard/lessons/add",
      },
    ],
  },
  {
    title: "Vocabularies",
    href: "/dashboard/vocabularies",
    icon: Bookmark,
    subItems: [
      {
        title: "Add Vocabulary",
        href: "/dashboard/vocabularies/add",
      },
    ],
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Tutorials",
    href: "/dashboard/tutorials",
    icon: Video,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      <VisuallyHidden.VisuallyHidden>
        <Dialog>
          {/* <DialogContent> */}
          <DialogTitle>Navigation Menu</DialogTitle>
          {/* </DialogContent> */}
        </Dialog>
      </VisuallyHidden.VisuallyHidden>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton asChild isActive={pathname === item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center space-x-3 text-base",
                pathname === item.href
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
          {item.subItems && (
            <SidebarMenuSub>
              {item.subItems.map((subItem) => (
                <SidebarMenuSubItem key={subItem.href}>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname === subItem.href}
                  >
                    <Link
                      href={subItem.href}
                      className={cn(
                        "text-sm",
                        pathname === subItem.href
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      {subItem.title}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
