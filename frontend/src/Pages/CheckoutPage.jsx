import { useEffect, useState } from "react";
import { api } from "../API/Axios";
import CheckoutModal from "../Components/CheckoutModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCartDetails } from "../Store/CartSlice";
import toast from "react-hot-toast";

const CheckoutPage = () => {
    const [form, setForm] = useState({ name: "", email: "" });
    const [loading, setLoading] = useState(false);
    const [receipt, setReceipt] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isCartEmpty) {
            dispatch(getCartDetails());
        }
    }, [dispatch])

    const isCartEmpty = !cart?.items || cart.items.length === 0;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // not using redux as we want to update this component on checkout directly
            setLoading(true);
            const res = await api.post("/checkout");
            setLoading(false);
            dispatch(clearCart());
            setReceipt(res.data.receipt);
            setShowModal(true);

        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message);
            console.log(error);
        }


    };
    if (showModal) {
        return <CheckoutModal receipt={receipt} form={form} />
    }




    return (
        <div className="max-w-md mx-auto mt-4">
            {showModal ? (
                <CheckoutModal receipt={receipt} form={form} />
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 bg-white p-4 rounded-lg shadow"
                >
                    <input
                        type="text"
                        placeholder="Your Name"
                        required
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="border p-2 rounded-md"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="border p-2 rounded-md"
                    />

                    <button
                        type="submit"
                        disabled={isCartEmpty}
                        className={`py-2 rounded-md text-white ${isCartEmpty
                            ? "opacity-50 cursor-not-allowed bg-green-600"
                            : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        Pay Now
                    </button>

                    <button
                        type="button"
                        className="bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
                        onClick={() => navigate("/")}
                    >
                        Go to Home
                    </button>
                </form>
            )}
        </div>

    );

}

export default CheckoutPage;