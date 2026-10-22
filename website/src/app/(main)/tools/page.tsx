import ToolsClientPage from "./ClientPage";
import { getSettings, getTools } from "@/lib/content";

export default async function ToolsPage() {
  const [categories, settings] = await Promise.all([getTools(), getSettings()]);
  return <ToolsClientPage toolsCategoriesData={categories} toolsPhilosophy={settings.toolsPhilosophy} />;
}
