import React from "react";
import FamilyMemberClientPage from "./ClientPage";
import { getFamily } from "@/lib/content";

export async function generateStaticParams() {
  return (await getFamily()).map((member) => ({
    id: member.id,
  }));
}

export default async function FamilyMemberDetailPage() {
  return <FamilyMemberClientPage familyMembers={await getFamily()} />;
}
