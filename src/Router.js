import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Product from './pages/ProductList/Product/Product';
import ProductList from './pages/ProductList/ProductList';
import SignUpComplete from './pages/SignUpComplete/SignUpComplete';
import ProductDetail from './pages/ProductDetail/ProductDetail';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/signup-complete" element={<SignUpComplete />} />
        <Route path="/productdetail" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
