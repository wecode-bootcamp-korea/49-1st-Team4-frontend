import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './pages/ProductList/Product/Product';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
