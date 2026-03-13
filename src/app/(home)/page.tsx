import { fetchInitialProducts } from "@/lib/api/products";
import { ProductsProvider } from "@/utilities/ProductsContext";
import { ProductList } from "@/components/products/product-list/ProductList";
import { ImageBanner } from "@/components/image-banner/ImageBanner";
import styles from "./page.module.css";

export default async function Home() {
  const initialProducts = await fetchInitialProducts();

  return (
    <div className={styles.main}>
      <ImageBanner />
      <ProductsProvider initialProducts={initialProducts}>
        <ProductList />
      </ProductsProvider>
    </div>
  );
}
