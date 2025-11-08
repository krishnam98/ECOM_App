import { useState } from "react";
import { api } from "../API/Axios";

const CheckoutModal = ({ receipt, form }) => {

    return (
        <>
            <div className="bg-white rounded-lg p-4 mt-4 text-center shadow">
                <h3 className="font-semibold text-green-700 mb-2">✅ Checkout Successful</h3>
                <p>Name: {form.name}</p>
                <p>Email: {form.email}</p>
                <p>Total: ₹{receipt.total}</p>
                <p className="text-gray-500">
                    {new Date(receipt.timestamp).toLocaleString()}
                </p>
            </div>
        </>
    );
}

export default CheckoutModal;
