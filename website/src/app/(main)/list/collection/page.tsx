import React from "react";
import CollectionClientPage from "./ClientPage";
import { getCourses, getSettings } from "@/lib/content";

export default async function CollectionPage() {
  const [courses, settings] = await Promise.all([getCourses(), getSettings()]);
  return <CollectionClientPage initialCourses={courses} categoryMapping={settings.courseCategories} />;
}
