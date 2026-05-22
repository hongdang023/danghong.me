import React from "react";
import CollectionClientPage from "./ClientPage";
import { COURSES } from "@/data/courseData";

export default function CollectionPage() {
  return <CollectionClientPage initialCourses={COURSES} />;
}

