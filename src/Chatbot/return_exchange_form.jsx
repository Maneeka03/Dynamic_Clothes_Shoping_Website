import React, { useState } from 'react';

export function ReturnExchangeForm({ onSubmit }) {
  const [orderNumber, setOrderNumber] = useState("");
  const [productName, setProductName] = useState("");
  const [reason, setReason] = useState("");
  const [returnType, setReturnType] = useState("return");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ orderNumber, productName, reason, returnType });
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
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8A00] focus:ring-[#FF8A00]"
          required
        />
      </div>
      <div>
        <label htmlFor="returnType" className="block text-sm font-medium text-gray-700">
          Request Type
        </label>
        <select
          id="returnType"
          value={returnType}
          onChange={(e) => setReturnType(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF8A00] focus:ring-[#FF8A00]"
        >
          <option value="return">Return</option>
          <option value="exchange">Exchange</option>
        </select>
      </div>
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
          Reason for {returnType === 'return' ? 'Return' : 'Exchange'}
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
        Submit {returnType === 'return' ? 'Return' : 'Exchange'} Request
      </button>
    </form>
  );
}