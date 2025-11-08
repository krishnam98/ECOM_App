import { useEffect, useState } from "react";
import { api } from "../API/Axios";
import CheckoutModal from "../Components/CheckoutModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, getCartDetails } from "../Store/CartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart, loading } = useSelector((state) => state.cart);
    const [cartCount, setCartCount] = useState(0);

    const fetchCart = async () => {
        const res = await dispatch(getCartDetails());
    };

    const getCount = () => {
        let count = 0;
        cart?.items?.forEach((item) => {
            count += item.quantity;
        });
        return count;
    };

    useEffect(() => {
        fetchCart();

    }, [dispatch]);

    const handleRemove = async (id) => {
        await dispatch(deleteFromCart(id));

    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                        Shopping Cart
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        {cart?.items?.length > 0
                            ? `${getCount()} item${cart.items.length > 1 ? 's' : ''} in your cart`
                            : 'Your cart is waiting to be filled'
                        }
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                )}

                {/* Empty Cart State */}
                {!loading && cart?.items?.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center">
                        <div className="text-gray-300 text-7xl mb-4">🛒</div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                            Your cart is empty!
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Add some products to get started
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 inline-flex items-center gap-2"
                        >
                            <span>Continue Shopping</span>
                            <span>→</span>
                        </button>
                    </div>
                )}

                {/* Cart Items */}
                {!loading && cart?.items?.length > 0 && (
                    <div className="space-y-6">
                        {/* Items List */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="divide-y divide-gray-100">
                                {cart.items.map((item) => (
                                    <div
                                        key={item._id}
                                        className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            {/* Product Info */}
                                            <div className="flex-grow min-w-0">
                                                <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-1 truncate">
                                                    {item.product.name}
                                                </h3>
                                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                                    <span className="font-medium">₹{item.product.price}</span>
                                                    <span className="text-gray-400">×</span>
                                                    <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
                                                        Qty: {item.quantity}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Price and Remove Button */}
                                            <div className="flex items-center justify-between sm:justify-end gap-4">
                                                <div className="text-right">
                                                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                                                        ₹{item.product.price * item.quantity}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemove(item._id)}
                                                    className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 text-sm whitespace-nowrap flex items-center gap-2"
                                                >
                                                    <span>Remove</span>
                                                    <span>🗑️</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Order Summary
                            </h3>

                            <div className="space-y-3 mb-6">

                                <div className="border-t border-gray-200 pt-3 mt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-gray-900">₹{cart.total}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 text-right">
                                        Inclusive of all taxes
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate("/checkout")}
                                className="w-full bg-gray-900 hover:bg-gray-800 active:bg-gray-950 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-lg"
                            >
                                <span>Proceed to Checkout</span>
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;