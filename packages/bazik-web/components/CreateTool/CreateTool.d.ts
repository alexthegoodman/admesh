import React from "react";

export interface CreateToolProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  open: boolean;
  handleToolNav: (value: string) => void;
  sidebarContent1: React.ReactNode;
  sidebarContent2: React.ReactNode;
}
