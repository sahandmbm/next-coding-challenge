import type { ApiProduct } from "@/types/product";

const API_BASE = "https://v0-api-endpoint-request.vercel.app/api";

export async function fetchInitialProducts(): Promise<ApiProduct[]> {
  const res = await fetch(`${API_BASE}/products`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return data.products ?? [];
}

export async function fetchMoreProducts(): Promise<ApiProduct[]> {
  const res = await fetch(`${API_BASE}/more-products`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.products ?? [];
}
