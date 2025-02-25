"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = () => {

    

    setIsLoggedOut(true);
    router.push("/Login"); 
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-xl font-bold">MyApp</h1>
        </Link>

        {/* Navigation */}
        <div className="flex space-x-6 items-center">
          <Link href="/" className="text-gray-700 hover:text-black">Home</Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-black">Dashboard</Link>
          <Link href="/about" className="text-gray-700 hover:text-black">About</Link>

          {/* Profile Picture */}
          <Avatar>
            <AvatarImage src="/profile.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          {/* Logout Button */}
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
