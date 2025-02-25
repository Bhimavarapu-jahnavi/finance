"use client";

import { useState } from "react";
import { Menu, Home, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <nav className="mt-4 space-y-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full flex items-center gap-2">
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="w-full flex items-center gap-2">
                <Home className="w-5 h-5" /> Home
              </Button>
            </Link>
            <Button variant="ghost" className="w-full flex items-center gap-2">
              <LogOut className="w-5 h-5" /> Logout
            </Button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
