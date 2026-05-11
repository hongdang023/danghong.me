import React from "react";
import CollectionClientPage from "./ClientPage";
import { createClient } from "@/utils/supabase/server";
export const runtime = 'edge';

export const revalidate = 60; // revalidate every minute

export default async function CollectionPage() {
  const supabase = await createClient();
  const { data: courses, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching courses:", error);
  }

  // Map database format to frontend expected format
  const mappedCourses = (courses || []).map(c => ({
    id: c.slug,
    name: c.title,
    provider: c.instructor,
    tags: c.tags,
    reviewUrl: c.review_url,
    courseUrl: c.course_url,
  }));

  return <CollectionClientPage initialCourses={mappedCourses} />;
}
