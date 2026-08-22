"use client";

import { useEffect, useState } from "react";
import { products, type Product } from "@/data/products";
import {
  applyAvailabilityMap,
  type AvailabilityMap,
} from "@/lib/productAvailability";

type AvailabilityResponse = { products?: AvailabilityMap };

export function useAvailableProducts(initialProducts: Product[] = products): Product[] {
  const [catalog, setCatalog] = useState(initialProducts);

  useEffect(() => {
    const controller = new AbortController();

    async function refreshAvailability() {
      try {
        const response = await fetch("/api/products/availability", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) return;
        const data = (await response.json()) as AvailabilityResponse;
        if (!data.products) return;
        setCatalog(initialProducts.map((product) => applyAvailabilityMap(product, data.products!)));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    void refreshAvailability();
    return () => controller.abort();
  }, [initialProducts]);

  return catalog;
}
