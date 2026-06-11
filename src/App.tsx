import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { MenuPage } from './pages/MenuPage';
import { CartPage } from './pages/CartPage';
import { AdminPage } from './pages/AdminPage';
import { ReservationPage } from './pages/ReservationPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { MenuProvider } from './context/MenuContext';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  return (
    <MenuProvider>
      <OrderProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/reservation" element={<ReservationPage />} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </OrderProvider>
    </MenuProvider>
  );
}
