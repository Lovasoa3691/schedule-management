import React, { useState, useEffect } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import axios from "axios"; // assure-toi que axios est installé
import { MdPrint } from "react-icons/md";
import { FaFileExcel } from "react-icons/fa";

const Subject = () => {
  const [matieres, setMatieres] = useState([
    {
      id: 1,
      nom: "1A",
      capacite: 30,
      type: "Salle de classe",
      localisation: "!er etage",
    },
    {
      id: 2,
      nom: "2A",
      capacite: 30,
      type: "Salle de classe",
      localisation: "1er etage",
    },
    {
      id: 3,
      nom: "3A",
      capacite: 30,
      type: "Amphithéâtre",
      localisation: "2eme etage",
    },
    {
      id: 4,
      nom: "4A",
      capacite: 30,
      type: "Laboratoire",
      localisation: "3eme etage",
    },
  ]);

  // Exemple : récupérer les Subject depuis l'API Flask
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
    <div className="subject-container h-screen">
      {/* Titre + bouton */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Gestion des matieres
        </h2>

        {/* <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-80"> */}

        <div className="w-full max-w-md">
          <label
            for="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Recherche
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FiSearch className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Recheche..."
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

        {/* <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center space-x-2">
          <MdPrint className="w-5 h-5" />
          <span>Exporter PDF</span>
        </button>

        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center space-x-2">
          <FaFileExcel className="w-5 h-5" />
          <span>Exporter Excel</span>
        </button> */}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex h-screen items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Ajouter une nouvelle matiere
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Nom de la salle
                </label>
                <input
                  type="text"
                  name="nom"
                  className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Type de salle
                </label>
                <select
                  name="type"
                  // value={formData.professeur}
                  // onChange={handleChange}
                  // className="w-full border p-2 rounded"
                  className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  required
                >
                  <option value="" disabled selected>
                    Choisir
                  </option>
                  <option value="Homme">Salle de classe</option>
                  <option value="Femme">Amphitheatre</option>
                  <option value="Femme">Laboratoire</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Capacite</label>
                <input
                  type="text"
                  name="capacite"
                  className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Localisation
                </label>
                <select
                  name="localisation"
                  // value={formData.professeur}
                  // onChange={handleChange}
                  // className="w-full border p-2 rounded"
                  className="w-full mt-1 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  required
                >
                  <option value="" disabled selected>
                    Choisir...
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
              <th className="px-6 py-3">Identifiant</th>
              <th className="px-6 py-3">Nom</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Capacite</th>
              <th className="px-6 py-3">Localisation</th>

              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matieres.length > 0 ? (
              matieres.map((mat, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{mat.id}</td>
                  <td className="px-6 py-3">{mat.nom}</td>
                  <td className="px-6 py-3">{mat.type}</td>
                  <td className="px-6 py-3">{mat.capacite}</td>
                  <td className="px-6 py-3">{mat.localisation}</td>
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
                  Aucune matiere trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subject;
