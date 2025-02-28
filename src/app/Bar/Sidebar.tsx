"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GlobeLock,
  FileText,
  Home,
  Menu,
  Settings,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  PieChart,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Navigation items array with icons, labels, and links
const navigationItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: ShieldCheck,
    label: "Fraud Detection",
    href: "/dashboard/fraud-detection",
  },
  {
    icon: FileText,
    label: "Automated Reports",
    href: "/dashboard/reports",
  },
  {
    icon: TrendingUp,
    label: "Stock Market",
    href: "/dashboard/stock-market",
  },
  {
    icon: CreditCard,
    label: "Credit Risk Assessment",
    href: "/dashboard/credit-risk",
  },
  {
    icon: GlobeLock,
    label: "Crypto Currency",
    href: "/dashboard/crypto",
  },
  {
    icon: PieChart,
    label: "Investment Portfolio",
    href: "/dashboard/investment",
  },
  {
    icon: MessageSquare,
    label: "Financial Chatbot",
    href: "/dashboard/chatbot",
  },
  {
    icon: FileText,
    label: "Legal Summarization",
    href: "/dashboard/legal-summarization",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile sidebar trigger */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-4 z-40"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <div className="flex items-center gap-2 font-semibold">
                <div className="h-6 w-6 rounded-full bg-primary" />
                <span>Company Name</span>
              </div>
            </div>
            <nav className="flex-1 overflow-auto py-4">
              <ul className="grid gap-1 px-2">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden border-r bg-background lg:block">
        <div className="flex h-full w-64 flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <div className="flex justify-center items-center gap-2 font-semibold">
              <Link href="/dashboard">
                <span className="text-xl ml-14">FinHub</span>
              </Link>
            </div>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <ul className="grid gap-1 px-2">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
