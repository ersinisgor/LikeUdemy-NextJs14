import React from "react";
import Header from "./_components/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div>
      <Header />
      <main className="container px-8 py-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
