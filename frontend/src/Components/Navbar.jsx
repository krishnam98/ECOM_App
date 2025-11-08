import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { getCartDetails } from "../Store/CartSlice";

const Navbar = () => {
    const { cart } = useSelector((state) => state.cart);
    console.log(cart);

    const getCount = () => {
        let count = 0;
        cart?.items?.forEach((item) => {
            count += item.quantity;
        });
        return count;
    }

    const itemCount = getCount();

    return (
        <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <Link
                        to="/"
                        className="flex items-center space-x-2 group hover:opacity-90 transition-all"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg">
                                <ShoppingCart className="w-5 h-5 text-white" strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-xl font-bold text-white hidden xs:inline">
                                Vibe Cart
                            </span>
                            <span className="text-lg font-bold text-white xs:hidden">
                                Vibe Cart
                            </span>
                            <span className="text-xs text-blue-400 font-medium hidden sm:inline">
                                Shop with style
                            </span>
                        </div>
                    </Link>

                    {/* Cart Button */}
                    <Link
                        to="/cart"
                        className="relative flex items-center space-x-2 bg-white text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-slate-100 transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span className="hidden xs:inline">Cart</span>
                        {itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                                {itemCount > 99 ? '99+' : itemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;