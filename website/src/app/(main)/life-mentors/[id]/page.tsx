import React from "react";
import LifeMentorClientPage from "./ClientPage";
import { getMentors } from "@/lib/content";

export async function generateStaticParams() {
  return (await getMentors()).map((mentor) => ({
    id: mentor.id,
  }));
}

export default async function LifeMentorDetailPage() {
  return <LifeMentorClientPage lifeMentors={await getMentors()} />;
}
