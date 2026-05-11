import React from "react";
import ProductsHubClient from "./ClientPage";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 60; // revalidate every minute

export default async function ProductsHub() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
  }

  // Map database format to frontend expected format
  const mappedItems = (products || []).map(p => ({
    id: p.slug,
    category: p.category,
    title: p.title,
    description: p.description,
    longDescription: p.long_description || "",
    jtbd: {
      functional: p.jtbd_functional,
      emotional: p.jtbd_emotional,
      social: p.jtbd_social
    },
    dreamState: p.dream_state,
    humanStory: p.human_story,
    image: p.image_url,
    link: p.demo_link,
    outcome: p.outcome,
    tags: p.tags,
    testCode: p.test_code
  }));

  return <ProductsHubClient initialItems={mappedItems} />;
}
