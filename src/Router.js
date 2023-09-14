import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Product from './pages/ProductList/Product/Product';
import ProductEdit from './pages/ProductList/ProductEdit/ProductEdit';
import ProductList from './pages/ProductList/ProductList';
import SignUpComplete from './pages/SignUpComplete/SignUpComplete';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ProductEdit from './pages/ProductList/ProductEdit/ProductEdit';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<Product />} />
        <Route path="/productEdit" element={<ProductEdit />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/signup-complete" element={<SignUpComplete />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/productedit" element={<ProductEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
