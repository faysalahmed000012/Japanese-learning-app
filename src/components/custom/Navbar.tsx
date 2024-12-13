"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/user.provider";
import { logout } from "@/services/UserServices";
import { Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { user, setIsLoading: userLoading } = useUser();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    userLoading(true);
    router.push("/login");
  };

  return (
    <nav className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <span className="mr-2">🎌</span>
          <span className="hidden sm:inline">~日本~Learn</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/lessons">
            <Button
              variant="ghost"
              className="text-primary-foreground hover:text-primary hover:bg-primary-foreground"
            >
              Lessons
            </Button>
          </Link>
          <Link href="/tutorials">
            <Button
              variant="ghost"
              className="text-primary-foreground hover:text-primary hover:bg-primary-foreground"
            >
              Tutorials
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-white"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user && user.role === "admin" && (
                <DropdownMenuItem onSelect={() => router.push("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
              )}

              <DropdownMenuItem onSelect={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link href="/lessons">
            <Button
              variant="ghost"
              className="w-full text-left text-primary-foreground hover:text-primary hover:bg-primary-foreground"
            >
              Lessons
            </Button>
          </Link>
          <Link href="/tutorials">
            <Button
              variant="ghost"
              className="w-full text-left text-primary-foreground hover:text-primary hover:bg-primary-foreground"
            >
              Tutorials
            </Button>
          </Link>
          {user && user.role === "admin" && (
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="w-full text-left text-primary-foreground hover:text-primary hover:bg-primary-foreground"
              >
                Dashboard
              </Button>
            </Link>
          )}

          <Button
            variant="ghost"
            className="w-full text-left text-primary-foreground hover:text-primary hover:bg-primary-foreground"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}
