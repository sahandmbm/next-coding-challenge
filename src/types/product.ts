export interface ApiProduct {
  id: number;
  name: { us: string; uk: string };
  price: { usd: number; gbp: number };
  stock: number;
}
