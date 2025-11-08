import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Store/ProductSlice";
import { addToCart } from "../Store/CartSlice";

const ProductsPage = () => {
    const [productsArr, setProductsArr] = useState([]);
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);

    const fetchProducts = async () => {
        await dispatch(getProducts());
    }

    useEffect(() => {
        fetchProducts();
    }, [dispatch]);

    const handleAdd = async (productId) => {
        await dispatch(addToCart({ productId: productId }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                        Our Products
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Discover Vibe Cart's collection
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && products && products.length > 0 && (
                    <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {products.map((p) => (
                            <ProductCard key={p._id} product={p} onAdd={handleAdd} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && (!products || products.length === 0) && (
                    <div className="text-center py-20">
                        <div className="text-gray-400 text-5xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No Products Found
                        </h3>
                        <p className="text-gray-500">
                            Check back later for new arrivals
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductsPage;