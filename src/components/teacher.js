import React, { useState, useEffect } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import axios from "axios";
import { MdPrint } from "react-icons/md";
import { FaEdit, FaFileExcel, FaTrash, FaTrashAlt } from "react-icons/fa";
import TeacherForm from "./forms/teacher-form";

const Teacher = () => {
  const [enseignant, setEnseignant] = useState([]);
  const [fileterd, setFiltered] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    nom: "",
    prenom: "",
    adresse: "",
    phone: "",
    genre: "",
    grade: "",
  });

  const loadData = () => {
    axios
      .get("http://localhost:5142/api/utilisateur/teacher")
      .then((res) => {
        setEnseignant(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error("Erreur de chargement:", err.message));
  };

  useEffect(() => {
    loadData();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [searchfield, setSearchfiled] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModalEdit = (ens) => {
    setFormData({
      id: ens.id,
      nom: ens.nom,
      prenom: ens.prenom,
      adresse: ens.adresse,
      phone: ens.phone,
      genre: ens.genre,
      grade: ens.grade,
    });
    setShowModalEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5142/api/utilisateur/add/teacher", formData)
      .then((res) => {
        loadData();
        setFormData({
          id: "",
          nom: "",
          prenom: "",
          adresse: "",
          phone: "",
          genre: "",
          grade: "",
        });
      })
      .catch((err) => console.error("Erreur d'envoi:", err.message));
    setShowModal(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!formData.id) {
      console.error("ID de l'enseignant manquant pour la mise à jour");
      return;
    }
    axios
      .put(
        `http://localhost:5142/api/utilisateur/teacher/${formData.id}`,
        formData
      )
      .then((res) => {
        loadData();
        setFormData({
          id: "",
          nom: "",
          prenom: "",
          adresse: "",
          phone: "",
          genre: "",
          grade: "",
        });
      })
      .catch((err) => console.error("Erreur d'envoi:", err.message));
    setShowModalEdit(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5142/api/utilisateur/teacher/${id}`)
      .then(() => {
        loadData();
        alert("Donnee supprime");
      })
      .catch((err) => {
        console.error("Erreur: ", err.message);
      });
  };

  const filter = enseignant.filter((ens) =>
    (
      ens.nom +
      " " +
      ens.prenom +
      " " +
      ens.adresse +
      " " +
      ens.grade +
      " " +
      ens.phone +
      " " +
      ens.genre
    )
      .toLowerCase()
      .includes(searchfield.toLowerCase())
  );

  return (
    <div className="teacher-container h-screen">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Gestion des enseignants
        </h2>

        <div className="w-full max-w-md">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Recherche
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FiSearch className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="search"
              id="search"
              value={searchfield}
              onChange={(e) => setSearchfiled(e.target.value)}
              className="w-full border border-gray-300 p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              // className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Recherche"
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

      {showModal && (
        <TeacherForm
          data={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEdit={false}
        />
      )}

      {showModalEdit && (
        <TeacherForm
          data={formData}
          handleChange={handleChange}
          handleSubmit={handleUpdate}
          isEdit={true}
        />
      )}

      <div className="shadow rounded-lg mt-6">
        <div className="overflow-x-auto">
          <div className="max-h-[800px] overflow-y-auto">
            <table className="min-w-full bg-white text-gray-700 table-fixed">
              <thead className="bg-indigo-100 text-left font-semibold sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 sticky top-0 bg-indigo-100">#</th>
                  <th className="px-4 py-3 sticky top-0 bg-indigo-100">NOM</th>
                  <th className="px-4 py-3 sticky top-0 bg-indigo-100">
                    PRENOM
                  </th>
                  <th className="px-4 py-3 sticky top-0 bg-indigo-100">
                    GENRE
                  </th>
                  <th className="px-4 py-3 sticky top-0 bg-indigo-100">
                    ADRESSE
                  </th>
                  <th className="px-4 py-3 sticky top-0 bg-indigo-100">
                    COURRIEL
                  </th>
                  <th className="px-4 py-3 sticky top-0 bg-indigo-100">
                    TELEPHONE
                  </th>
                  <th className="px-4 py-3 sticky top-0 bg-indigo-100">
                    GRADE
                  </th>
                  <th className="px-4 py-3 sticky top-0 bg-indigo-100">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {filter.length > 0 ? (
                  filter.map((ens, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{ens.nom}</td>
                      <td className="px-4 py-3">{ens.prenom}</td>
                      <td className="px-4 py-3">{ens.genre}</td>
                      <td className="px-4 py-3">{ens.adresse}</td>
                      <td className="px-4 py-3">{ens.enail}</td>
                      <td className="px-4 py-3">{ens.phone}</td>
                      <td className="px-4 py-3">{ens.grade}</td>
                      <td className="px-4 py-3">
                        <button
                          className="text-blue-600 text-sm"
                          onClick={() => openModalEdit(ens)}
                        >
                          <FaEdit className="inline-block w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(ens.id)}
                          className="text-red-600 text-sm ml-4"
                        >
                          <FaTrashAlt className="inline-block w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center px-6 py-4 text-gray-500"
                    >
                      Aucun enseignant trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
