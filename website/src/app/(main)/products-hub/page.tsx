import React from "react";
import ProductsHubClient from "./ClientPage";
import { PRODUCTS } from "@/data/productData";

export default function ProductsHub() {
  // Map static products to the format expected by the client page (slug -> id)
  const mappedItems = PRODUCTS.map(p => ({
    id: p.slug,
    category: p.category,
    title: p.title,
    description: p.description,
    longDescription: p.longDescription || "",
    jtbd: {
      functional: p.jtbd.functional,
      emotional: p.jtbd.emotional,
      social: p.jtbd.social
    },
    dreamState: p.dreamState,
    humanStory: p.humanStory,
    image: p.image,
    link: p.link,
    outcome: p.outcome,
    tags: p.tags,
    testCode: p.testCode
  }));

  return <ProductsHubClient initialItems={mappedItems} />;
}

