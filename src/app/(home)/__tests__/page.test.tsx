import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import Home from '@/app/(home)/page';
import enGB from '@/lib/i18n/messages/en-GB';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <IntlProvider locale="en-GB" messages={enGB}>
    {children}
  </IntlProvider>
);

describe('Home', () => {
  it('renders an empty basket', () => {
    render(<Home />, { wrapper });

    const basketButton = screen.getByRole('button', {
      name: /Basket:/i,
    });

    expect(basketButton).toHaveTextContent('Basket: 0 items');
  });

  it('renders a basket with 1 item', async () => {
    render(<Home />, { wrapper });

    const buttons = screen.getAllByRole('button', {
      name: /Add to basket/i,
    });

    await buttons[0].click();

    const basketButton = screen.getByRole('button', {
      name: /Basket:/i,
    });

    expect(basketButton).toHaveTextContent(/Basket: 1 item$/);
  });

  it('renders a basket with 1 of item 1 and 2 of item 2', async () => {
    render(<Home />, { wrapper });

    const buttons = screen.getAllByRole('button', {
      name: /Add to basket/i,
    });

    await buttons[0].click();
    await buttons[1].click();
    await buttons[1].click();

    const basketButton = screen.getByRole('button', {
      name: /Basket:/i,
    });

    expect(basketButton).toHaveTextContent(/Basket: 2 items$/);
  });
});
