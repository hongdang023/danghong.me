import React from "react";
import FamilyMemberClientPage from "./ClientPage";
import { familyMembers } from "@/data/familyData";

export async function generateStaticParams() {
  return familyMembers.map((member) => ({
    id: member.id,
  }));
}

export default function FamilyMemberDetailPage() {
  return <FamilyMemberClientPage />;
}
