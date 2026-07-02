import React from "react";
import LifeMentorClientPage from "./ClientPage";
import { lifeMentors } from "@/data/lifeMentorsData";

export async function generateStaticParams() {
  return lifeMentors.map((mentor) => ({
    id: mentor.id,
  }));
}

export default function LifeMentorDetailPage() {
  return <LifeMentorClientPage />;
}
