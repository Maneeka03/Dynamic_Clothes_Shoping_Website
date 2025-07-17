import React, { useEffect } from 'react';

const Snackbar = ({ message, isOpen, onClose, duration = 2000 }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, duration]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-snackbar">
      {message}
    </div>
  );
};

export default Snackbar;
