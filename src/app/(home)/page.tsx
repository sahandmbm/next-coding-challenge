import { fetchInitialProducts } from '@/lib/products';
import { ProductsProvider } from '@/components/utilities/ProductsContext';
import { ProductList } from '@/components/product/ProductList';
import { ImageBanner } from '@/components/ui/ImageBanner';
import styles from './page.module.css';

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
