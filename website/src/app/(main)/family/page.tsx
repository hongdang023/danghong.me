import FamilyClientPage from "./ClientPage";
import { getFamily, getSettings } from "@/lib/content";

export default async function FamilyPage() {
  const [members, settings] = await Promise.all([getFamily(), getSettings()]);
  return <FamilyClientPage familyMembers={members} familyStories={settings.familyStories} />;
}
