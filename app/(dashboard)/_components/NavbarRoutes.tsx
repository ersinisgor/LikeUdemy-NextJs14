"use client";
import { usePathname } from "next/navigation";
import React from "react";
import NavbarItem from "./NavbarItem";

const guestRoutes = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Browse",
    href: "/search",
  },
];

const instructorRoutes = [
  {
    label: "Courses",
    href: "/instructor/courses",
  },
  {
    label: "Analytics",
    href: "/instructor/analytics",
  },
];

const NavbarRoutes = () => {
  const pathName = usePathname();
  const isInstructorPage = pathName?.includes("/instructor");
  const routes = isInstructorPage ? instructorRoutes : guestRoutes;
  return (
    <div className="flex items-center space-x-8 z-50">
      {routes.map(route => (
        <NavbarItem href={route.href} label={route.label} key={route.href} />
      ))}
    </div>
  );
};

export default NavbarRoutes;
