import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { ProtectedAdmin } from "./Admin/ProtectedAdmin";
import Home from "./components/Home";
import Userlogin from "./Users/Userlogin";
import Register from "./Users/Register";
import Cart from "./Carts/Cart";
import Profile from "./Users/Profile";
import ForgetPassword from "./Pages/ForgetPassword";
import VerifyOtp from "./Pages/VerifyOtp";
import NewPassword from "./Pages/NewPassword";
import SearchProduct from "./components/SearchProduct";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import Userlist from "./Users/Userlist";
import Productlist from "./components/Productlist";
import Stats from "./components/Stats";

// admin
import AdminDashboard from "./Admin/AdminDashboard";
import AdminLogin from "./Admin/AdminLogin";
import AdminSidebar from "./Admin/AdminSidebar";

import Categoryfilter from "./components/Categoryfilter";
import Category from "./components/Category";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Userlogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/foret-password" element={<ForgetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/loginadmin" exact element={<AdminLogin />} />
          <Route
            path="/admin"
            exact
            element={
              <ProtectedAdmin>
                <AdminSidebar />
                </ProtectedAdmin>
            }
          >
            <Route path="/adminDashboard" exact element={<AdminDashboard />} />
            <Route path="/userlist" exact element={<Userlist />} />
            <Route path="/productlist" exact element={<Productlist />} />
            <Route path="/stats" exact element={<Stats />} />
            <Route path="/addproduct" exact element={<AddProduct />} />
          </Route>
          <Route path="/product/:id" exact element={<Product />} />
          <Route path="/category" exact element={<Category />} />
          <Route path="/filter/:category" exact element={<Categoryfilter />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
}

export default App;
