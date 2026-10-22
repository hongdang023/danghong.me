import CommunityClientPage from "./ClientPage";
import { getCommunities } from "@/lib/content";

export default async function CommunityPage() {
  return <CommunityClientPage communitiesData={await getCommunities()} />;
}
