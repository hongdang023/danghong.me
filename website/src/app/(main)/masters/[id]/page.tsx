import React from "react";
import MasterDetailPageClient from "./ClientPage";
import { getMasters } from "@/lib/content";

export async function generateStaticParams() {
  return (await getMasters()).map((org) => ({
    id: org.id,
  }));
}

export default async function MasterDetailPage() {
  return <MasterDetailPageClient masterOrganizations={await getMasters()} />;
}
