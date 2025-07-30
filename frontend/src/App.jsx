import { Routes, Route } from "react-router-dom";
import "./App.css";
// import { ToastContainer } from "react-toastify";
// Pages
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import ProtectedAdmin from "./Admin/ProtectedAdmin";
import AdminSidebar from "./Admin/AdminSidebar";
import AddProduct from "./Admin/AddProduct";
import Userlist from "./Admin/Userlist";
import ProductList from "./Admin/Productlist";
import Home from "./components/Home";
import Userlogin from "./Users/Userlogin";
import Register from "./Users/Register";
import Cart from "./Carts/Cart";
import Profile from "./Users/Profile";
import ForgetPassword from "./Pages/ForgetPassword";
import VerifyOtp from "./Pages/VerifyOtp";
import NewPassword from "./Pages/NewPassword";
import SearchProduct from "./components/SearchProduct";
import Product from "./components/Product";
// import Categoryfilter from "./components/Categoryfilter";
// import Category from "./components/Category";

function App() {
  return (
    <>
      <Routes>
        {/* Admin Login */}
        <Route path="/loginadmin" element={<AdminLogin />} />
        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminSidebar />
            </ProtectedAdmin>
          }
        >
          <Route path="adminDashboard" element={<AdminDashboard />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="userlist" element={<Userlist />} />
          <Route path="productlist" element={<ProductList />} />
          {/* Add more admin routes here */}
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Userlogin />} />
        <Route path="/login" element={<Userlogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/foret-password" element={<ForgetPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/search" element={<SearchProduct />} />
      </Routes>
    </>
  );
}

export default App;
