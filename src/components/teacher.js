import React, { useState, useEffect } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import axios from "axios"; // assure-toi que axios est installé
import { MdPrint } from "react-icons/md";
import { FaFileExcel } from "react-icons/fa";

const Teacher = () => {
  const [enseignant, setEnseignant] = useState([
    {
      nom: "Rajaonarivelo",
      prenom: "Jean",
      email: "jeanrajaonarivelo@gmail.com",
      telephone: "+261 34 12 34 56",
      grade: "Professeur",
    },
    {
      nom: "Rasolo",
      prenom: "Marie",
      email: "",
      telephone: "+261 32 12 34 56",
      grade: "Maître de Conférences",
    },
    {
      nom: "Rakotovao",
      prenom: "Paul",
      email: "",
      telephone: "+261 33 12 34 56",
      grade: "Chargé de Cours",
    },
    {
      nom: "Rabe",
      prenom: "Alice",
      email: "",
      telephone: "+261 31 12 34 56",
      grade: "Assistant",
    },
  ]);

  // Exemple : récupérer les Teacher depuis l'API Flask
  //   useEffect(() => {
  //     axios.get("http://localhost:5000/api/enseignant")
  //       .then((res) => setEnseignant(res.data))
  //       .catch((err) => console.error("Erreur de chargement:", err));
  //   }, []);

  const [showModal, setShowModal] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour ajouter un nouvel enseignant
    setShowModal(false);
  };

  return (
    <div className="teacher-container h-screen">
      {/* Titre + bouton */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Gestion des enseignants
        </h2>

        {/* <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-80"> */}

        <div className="w-full max-w-md">
          <label
            for="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FiSearch className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
            <button
              type="button"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Aller
            </button>
          </div>
        </div>
        {/* </div> */}
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
        >
          <FiPlus className="w-5 h-5 text-white" />
          <span>Nouveau</span>
        </button>

        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center space-x-2">
          <MdPrint className="w-5 h-5" />
          <span>Exporter PDF</span>
        </button>

        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center space-x-2">
          <FaFileExcel className="w-5 h-5" />
          <span>Exporter Excel</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Ajouter un nouvel élément
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Nom</label>
                <input
                  type="text"
                  name="nom"
                  className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Prenom</label>
                <input
                  type="text"
                  name="prenom"
                  className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Sexe</label>
                <select
                  name="sexe"
                  // value={formData.professeur}
                  // onChange={handleChange}
                  // className="w-full border p-2 rounded"
                  className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  required
                >
                  <option value="" disabled selected>
                    Choisir
                  </option>
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Adresse</label>
                <input
                  type="text"
                  name="adresse"
                  className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Contact</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Grade</label>
                <select
                  name="grade"
                  // value={formData.professeur}
                  // onChange={handleChange}
                  // className="w-full border p-2 rounded"
                  className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  required
                >
                  <option value="" disabled selected>
                    Choisir une grade
                  </option>
                  <option value="John Doe">Doctorant en informatique</option>
                  <option value="Dr Brice">Professeur</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto shadow rounded-lg mt-6">
        <table className="min-w-full bg-white text-gray-700">
          <thead>
            <tr className="bg-indigo-100 text-left text-sm font-semibold">
              <th className="px-6 py-3">Nom</th>
              <th className="px-6 py-3">Prénom</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Téléphone</th>
              <th className="px-6 py-3">Grade</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enseignant.length > 0 ? (
              enseignant.map((ens, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{ens.nom}</td>
                  <td className="px-6 py-3">{ens.prenom}</td>
                  <td className="px-6 py-3">{ens.email}</td>
                  <td className="px-6 py-3">{ens.telephone}</td>
                  <td className="px-6 py-3">{ens.grade}</td>
                  <td className="px-6 py-3">
                    <button className="text-blue-600 hover:underline text-sm">
                      Modifier
                    </button>
                    <button className="text-red-600 hover:underline text-sm ml-4">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-6 py-4 text-gray-500">
                  Aucun enseignant trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teacher;
