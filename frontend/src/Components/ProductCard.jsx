const ProductCard = ({ product, onAdd }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
            {/* Content Section */}
            <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
                <div>
                    {/* Product Name */}
                    <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-3">
                        {product.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-4">
                        <p className="text-2xl font-bold text-gray-900">
                            ₹{product.price}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Inclusive of all taxes
                        </p>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={() => onAdd(product._id)}
                    className="w-full bg-gray-900 hover:bg-gray-800 active:bg-gray-950 text-white font-medium px-4 py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                    <span>Add to Cart</span>
                    <span className="text-lg">🛒</span>
                </button>
            </div>
        </div>
    );
}

export default ProductCard;