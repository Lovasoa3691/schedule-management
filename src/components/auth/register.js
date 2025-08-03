import React, { useState } from "react";
import Logo from "../../assets/calendar.png";
import { FaLock, FaUser, FaEnvelope } from "react-icons/fa";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    mdp: "",
    genre: "",
    adresse: "",
    phone: "",
    fonction: "",
    confirmPassword: "",
    accepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.mdp !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!formData.accepted) {
      alert("Vous devez accepter les conditions.");
      return;
    }

    // console.log("Form data submitted:", formData);

    axios
      .post(
        "http://localhost:5142/api/utilisateur/responsable/register",
        formData
      )
      .then((rep) => {
        alert("Responsable cree avec succes!");
      })
      .catch((err) => {
        if (err.response) {
          console.error("Status:", err.response.status);
          console.error("Erreur serveur:", err.response.data);
        } else {
          console.error("Erreur:", err.message);
        }
      });
  };

  return (
    <div className="login-container h-screen flex flex-col items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center justify-center">
        <div className="logo mb-6">
          <div className="p-4 text-center text-white flex flex-col items-center justify-center w-full h-20 mb-8 text-3xl">
            <img src={Logo} className="w-24 h-24 mb-2" alt="Logo" />
            <span className="text-gray-900 font-bold">
              Sched.<span className="text-blue-600">Connect</span>
            </span>
          </div>
        </div>

        <span className="text-xl font-bold mb-8">Créer un compte</span>
      </div>

      <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Nom
            </label>
            <div className="relative">
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Votre nom"
                required
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Prénom
            </label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Votre prénom"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemple@email.com"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Mot de passe
            </label>
            <input
              type="password"
              name="mdp"
              value={formData.mdp}
              onChange={handleChange}
              placeholder="********"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-900">
              Confirmez le mot de passe
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="flex items-center mb-6">
            <input
              id="accept"
              name="accepted"
              type="checkbox"
              checked={formData.accepted}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
            />
            <label htmlFor="accept" className="ml-2 text-sm text-gray-900">
              J'accepte les{" "}
              <a href="#" className="text-blue-600 underline">
                conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
