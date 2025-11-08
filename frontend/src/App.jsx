import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import CartPage from './Pages/CartPage'
import ProductsPage from './Pages/ProductPage'
import Navbar from "./Components/Navbar";
import CheckoutPage from "./Pages/CheckoutPage";
import { Toaster } from "react-hot-toast";

function App() {


  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </div>
      </div>
      <Toaster
        position="center" toastOptions={{ duration: 3000 }} />
    </Router>
  )
}

export default App
