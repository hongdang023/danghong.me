import React from "react";
import MasterDetailPageClient from "./ClientPage";
import { masterOrganizations } from "@/data/mastersData";

export async function generateStaticParams() {
  return masterOrganizations.map((org) => ({
    id: org.id,
  }));
}

export default function MasterDetailPage() {
  return <MasterDetailPageClient />;
}
