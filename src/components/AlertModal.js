import { useEffect, useState } from 'react';

const AlertModal = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-16 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg z-50">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-sm underline">
        Dismiss
      </button>
    </div>
  );
};

export default AlertModal;
