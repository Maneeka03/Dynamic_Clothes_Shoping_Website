import React, { useState } from 'react';

export function CancelOrderForm({ onSubmit }) {
  const [orderNumber, setOrderNumber] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ orderNumber, reason });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
          Order Number
        </label>
        <input
          type="text"
          id="orderNumber"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8A00] focus:ring-[#FF8A00]"
          required
        />
      </div>
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          Reason for Cancellation
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8A00] focus:ring-[#FF8A00]"
          rows="4"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-[#FF8A00] hover:bg-[#FF8A00]/90 text-white py-2 px-4 rounded-md transition-colors duration-200"
      >
        Cancel Order
      </button>
    </form>
  );
}