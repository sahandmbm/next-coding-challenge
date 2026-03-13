'use client';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import styles from './page.module.css';
import { useLocalisedCurrency } from '@/hooks/useLocalisedCurrency';

const PRODUCTS = [
  { id: '1', price: 9.99 },
  { id: '2', price: 14.99 },
  { id: '3', price: 19.99 },
  { id: '4', price: 24.99 },
];

function ItemCount({ count, name }: { count: number; name: string }) {
  const intl = useIntl();
  return <div key={name}>{intl.formatMessage({ id: 'item.count' }, { name, count })}</div>;
}

export default function Home() {
  const intl = useIntl();
  const { formatCurrency } = useLocalisedCurrency();
  const [items, setItems] = useState<{ name: string; quantity: number }[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);

  const addToCart = (product: string) => {
    const alreadyInCart = items.find((item) => item.name === product);
    if (alreadyInCart) {
      // @TODO need to find out how to update cart items
    } else {
      setItems([...items, { name: product, quantity: 1 }]);
    }
    setItemCount(itemCount + 1);
  };

  return (
    <div className={styles.main}>
      <div className={styles.description}>
        <div>
          <button className={styles.basket}>
            {intl.formatMessage({ id: 'basket.button' }, { count: itemCount })}
          </button>
          {PRODUCTS.map((p) => (
            <ItemCount
              key={p.id}
              name={intl.formatMessage({ id: `item.${p.id}.name` })}
              count={
                items.find(
                  (item) => item.name === intl.formatMessage({ id: `item.${p.id}.name` })
                )?.quantity || 0
              }
            />
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            className={styles.card}
            onClick={() => addToCart(intl.formatMessage({ id: `item.${p.id}.name` }))}
            aria-label={intl.formatMessage({ id: 'item.add.label' })}
          >
            <h2>
              {intl.formatMessage({ id: `item.${p.id}.name` })} <span>-&gt;</span>
            </h2>
            <p>{intl.formatMessage({ id: `item.${p.id}.description` })}</p>
            <p>{formatCurrency(p.price)}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
