import type { LucideIcon } from "lucide-react";

export type Stat = {
  label: string;
  value: string;
  hint: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export type EquipmentItem = {
  id: string;
  category: string;
  brand: string;
  model: string;
  city: string;
  status: string;
  dailyPrice: number;
  supplier: string;
  icon?: LucideIcon;
};

export type WorkflowItem = {
  title: string;
  body: string;
};

export type DashboardRow = {
  id: string;
  title: string;
  status: string;
  amount?: string;
  meta: string;
};
