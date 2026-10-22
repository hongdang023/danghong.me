import { getProducts, getSettings } from "@/lib/content";

export const dynamic = "force-static";

// Public shape documented at /api-docs: products grouped by category, generated from /products-hub data.
export async function GET() {
  const [products, settings] = await Promise.all([getProducts(), getSettings()]);
  const order = Object.keys(settings.showcaseCategories);
  const categories = [...new Set(products.map((p) => p.category))].sort((a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99));
  return Response.json(
    categories.map((category) => ({
      category: settings.showcaseCategories[category] ?? category,
      items: products
        .filter((p) => p.category === category)
        .map((p) => ({
          name: p.title,
          description: p.description,
          link: p.link,
          ...(p.testCode && { access: `Mã cho khách test: ${p.testCode}` }),
          outcome: p.outcome,
          tech_stack: p.tags,
        })),
    })),
  );
}
