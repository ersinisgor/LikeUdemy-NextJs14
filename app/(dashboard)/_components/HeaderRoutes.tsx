"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderRoutes = () => {
  const pathName = usePathname();
  const isInstructorsPage = pathName?.startsWith("/instructor");
  const isClientPage = pathName?.startsWith("/chapter");
  return (
    <div className="flex gap-x-2 ml-auto">
      {isInstructorsPage || isClientPage ? (
        <Link href="/search">
          <Button size="sm" variant="ghost">
            <LogOut className="w-4 h-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/instructor">
          <Button size="sm" variant="ghost">
            <LogOut className="w-4 h-4 mr-2" />
            Instructor
          </Button>
        </Link>
      )}

      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default HeaderRoutes;
