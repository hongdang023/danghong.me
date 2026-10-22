import React from "react";
import MastersClientPage from "./ClientPage";
import { getMasters, getMentors } from "@/lib/content";

export default async function MastersPage() {
  const [masterOrganizations, lifeMentors] = await Promise.all([getMasters(), getMentors()]);
  return <MastersClientPage masterOrganizations={masterOrganizations} lifeMentors={lifeMentors} />;
}
