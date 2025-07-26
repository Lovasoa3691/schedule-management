import axios from "axios";
import { use, useEffect, useState } from "react";
import { MdBarChart, MdExpandMore } from "react-icons/md";
import { Link } from "react-router-dom";

const Disponibility = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [disponibilites, setDisponibilites] = useState([]);

  const loadDisponibilites = () => {
    axios
      .get("http://localhost:5142/api/disponibilite")
      .then((res) => setDisponibilites(res.data))
      .catch((err) => console.error("Erreur de chargement:", err));
  };

  useEffect(() => {
    loadDisponibilites();
  }, []);

  return (
    <div className="dispo-container h-screen">
      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Disposition des enseignants
        </h2>
        <p className="text-sm text-gray-500">
          Analyse hebdomadaire de la répartition des cours sur le mois
          sélectionné
        </p>
      </div>

      <div className="max-h-[700px] overflow-y-auto mt-12 bg-white rounded-lg shadow-md p-8">
        {disponibilites.map((dispo, index) => (
          <li className="mb-4 list-none" key={index}>
            <button
              onClick={() => setOpenIndex(index === openIndex ? null : index)}
              className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 hover:bg-slate-100 rounded-lg font-semibold text-left"
            >
              <div className="flex items-center">
                <div className="w-16 h-16 mr-4 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {dispo.nomEns.charAt(0).toUpperCase()}
                  {dispo.prenomEns.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-bold text-gray-700">
                    {dispo.nomEns.toUpperCase()} {dispo.prenomEns}
                  </span>
                  <span className="text-gray-500">{dispo.grade}</span>
                </div>
              </div>
              <MdExpandMore
                className={`transform transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {dispo.idDispo === null && openIndex === index ? (
              <div className="ml-16 mt-3 text-sm text-gray-700">
                <div className="grid grid-cols-3 gap-4 font-semibold border-b pb-1">
                  <div>Date dispo</div>
                  <div>Heure début</div>
                  <div>Heure fin</div>
                </div>

                <div className="mt-2 space-y-2">
                  {[
                    { date: "2025-07-01", debut: "08:00", fin: "11:00" },
                    { date: "2025-07-03", debut: "10:00", fin: "12:00" },
                    { date: "2025-07-07", debut: "14:00", fin: "17:00" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-4 border rounded-lg px-3 py-2 hover:bg-slate-50 transition"
                    >
                      <div>{item.date}</div>
                      <div>{item.debut}</div>
                      <div>{item.fin}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </div>
    </div>
  );
};

export default Disponibility;
