import {
  FiMessageSquare,
  FiBell,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { Toast } from "./notification/toast";

const TopBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [toasts, setToasts] = useState([]);

  const userEmail = "admin@example.com";

  const handleLogout = () => {
    console.log("Déconnexion...");
  };

  const handleMessagesClick = () => {
    const messages = [
      "Nouveau message de Jean.",
      "Rappel : réunion demain à 10h.",
      "Document partagé par Alice.",
      "Message de l’administration.",
    ];
    setToasts((prev) => [
      ...prev,
      ...messages.map((msg) => ({ id: Date.now() + Math.random(), text: msg })),
    ]);
  };

  const handleNotificationsClick = () => {
    const notifs = [
      "Nouvelle note ajoutée.",
      "Planning modifié.",
      "Mise à jour disponible.",
    ];
    setToasts((prev) => [
      ...prev,
      ...notifs.map((n) => ({ id: Date.now() + Math.random(), text: n })),
    ]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <header className="bg-white shadow top-0 left-0 right-0 z-10 fixed">
      <div className="px-4 py-4 z-100 flex items-center justify-between">
        <div className="flex items-center space-x-2 px-3 py-1">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            SC
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Sched.<span className="text-blue-700">Connect</span>{" "}
          </h1>
        </div>

        <div className="flex items-center space-x-6 relative">
          <div
            className="relative cursor-pointer"
            onClick={handleMessagesClick}
          >
            <FiMessageSquare className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
              4
            </span>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={handleNotificationsClick}
          >
            <FiBell className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5">
              3
            </span>
          </div>

          {/* Toast */}
          <div className="fixed top-20 right-5 z-50 w-72">
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                message={toast.text}
                onClose={() => removeToast(toast.id)}
              />
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-1 text-gray-800 font-medium focus:outline-none"
            >
              <span>{userEmail}</span>
              <FiChevronDown className="w-4 h-4" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-20">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
