import React, { useState } from "react";
import {
  FaChalkboardTeacher,
  FaDoorOpen,
  FaCalendarAlt,
  FaChartBar,
  FaVenusMars,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { PieChart, Pie, Cell } from "recharts";
import PieChartComponent from "./chart/pie";
import PieCard from "./chart/pie";
import Select from "react-select";

const genderData = [
  { name: "Masculin", value: 60 },
  { name: "Féminin", value: 40 },
];

const COLORS = ["#4F46E5", "#EC4899"];

const Dashboard = () => {
  const mentionOptions = [
    { value: "DROIT", label: "DROIT" },
    { value: "GM", label: "GM" },
    { value: "INFO", label: "INFO" },
    { value: "BTP", label: "BTP" },
    { value: "ICJ", label: "ICJ" },
  ];

  const niveauOptions = [
    { value: "L1", label: "L1" },
    { value: "L2", label: "L2" },
    { value: "L3", label: "L3" },
    { value: "M1", label: "M1" },
    { value: "M2", label: "M2" },
  ];

  const [selectedMention, setSelectedMention] = useState(null);
  const [selectedNiveau, setSelectedNiveau] = useState(null);

  const handleMentionChange = (selectedOption) => {
    setSelectedMention(selectedOption);
  };

  const handleNiveauChange = (selectedOption) => {
    setSelectedNiveau(selectedOption);
  };

  return (
    <div className="dash-container">
      <h2 className="text-2xl text-gray-700">
        Bienvenue sur{" "}
        <span className="font-bold">
          Sched.<span className="text-blue-700">Connect</span>
        </span>
      </h2>
      <div className=" h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Carte 1 - Enseignants */}
        <div className="bg-white shadow rounded-lg p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Enseignants
              </h3>
              <p className="text-3xl font-bold mt-2">42</p>
              <p className="text-sm text-gray-500">Performance moyenne : 87%</p>
            </div>
            <FaChalkboardTeacher className="text-indigo-600 text-4xl" />
          </div>
          <div className="mt-1">
            <div className="h-2 w-full bg-gray-200 rounded">
              <div className="h-2 bg-indigo-500 rounded w-[87%]"></div>
            </div>
          </div>
        </div>

        {/* Carte 2 - Salles disponibles */}
        <div className="bg-white shadow rounded-lg p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Salles Disponibles
              </h3>
              <p className="text-3xl font-bold mt-2">12</p>
              <p className="text-sm text-gray-500">Utilisation : 75%</p>
            </div>
            <FaDoorOpen className="text-green-500 text-4xl" />
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>Laboratoires : 4</span>
            <span>Amphis : 3</span>
            <span>classNamees : 5</span>
          </div>
        </div>

        {/* Carte 3 - Planning en cours */}
        <div className="bg-white shadow rounded-lg p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Plannings en cours
              </h3>
              <p className="text-3xl font-bold mt-2">6</p>
              <p className="text-sm text-gray-500">Mis à jour aujourd'hui</p>
            </div>
            <FaCalendarAlt className="text-pink-500 text-4xl" />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p>
                Semaines actives : <strong>3</strong>
              </p>
              <p>
                À venir : <strong>2</strong>
              </p>
            </div>
            <div className="w-20 h-20">
              <PieChart width={80} height={80}>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={30}
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm mt-2">
            <div className="flex items-center gap-1">
              <FaVenusMars className="text-blue-500" />
              <span className="text-gray-500">Masculin: 60%</span>
            </div>
            <span className="text-gray-500">Féminin: 40%</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-3 mt-6">
        <div className="xl:col-span-2 bg-white shadow rounded-lg p-5 w-full flex flex-col h-[350px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Plannings aujourd'hui
            </h2>

            <div className="search-group flex items-center justify-between gap-4">
              <div className="flex items-center ml-auto justify-end gap-2">
                <Select
                  options={mentionOptions}
                  placeholder="Selectionne une mention"
                  value={selectedMention}
                  onChange={handleMentionChange}
                  isClearable
                />
                <Select
                  options={niveauOptions}
                  placeholder="Selectionne un niveau"
                  value={selectedNiveau}
                  onChange={handleNiveauChange}
                  isClearable
                />
              </div>
            </div>
          </div>

          <table className="min-w-full bg-white text-gray-700 table-fixed">
            <thead className="bg-indigo-100 text-left font-semibold sticky top-0 ">
              <tr>
                <th className="px-4 py-2">Horaire</th>
                <th className="px-4 py-2">Matière</th>
                <th className="px-4 py-2">Enseignant</th>
                <th className="px-4 py-2">Salle</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">08:00 - 11:00</td>
                <td className="px-4 py-2">Examen C#</td>
                <td className="px-4 py-2">Dr TAREHY Brice Evrard</td>
                <td className="px-4 py-2">A7</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <h3 className="font-semibold text-gray-700 mb-12">
            Diveristé de genre
          </h3>

          <div className="h-40 flex flex-col items-center justify-center text-gray-700">
            <div className="flex items-center justify-between w-full border border-gray-400 rounded-lg p-4 mb-10">
              <span>Homme</span>
              <span>60%</span>
            </div>
            <div className=" flex items-center justify-between w-full  border border-gray-400 rounded-lg p-4">
              <span>Femme</span>
              <span>60%</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Répartition des planning
          </h2>
          <div className="h-auto text-gray-400">
            <PieCard />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-5 xl:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Enseignants
            </h2>
          </div>

          <div className="max-h-[350px] overflow-y-auto">
            <table className="min-w-full bg-white text-gray-700 table-fixed">
              <thead className="bg-indigo-100 text-left font-semibold sticky top-0 ">
                <tr>
                  <th className="px-4 py-2">Nom & Prenom</th>
                  <th className="px-4 py-2">Sexe</th>
                  <th className="px-4 py-2">Grade</th>
                  <th className="px-4 py-2">Performance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2">RANDRIAMANAJAFY Celestin </td>
                  <td className="px-4 py-2">Homme</td>
                  <td className="px-4 py-2">Doctorant</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-row items-center justify-between w-full h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-green-500 rounded w-[15%]"></div>
                      <span>15%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">RANDRIAMANAJAFY Celestin </td>
                  <td className="px-4 py-2">Homme</td>
                  <td className="px-4 py-2">Doctorant</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-row items-center justify-between w-full h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-green-500 rounded w-[40%]"></div>
                      <span>40%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">RANDRIAMANAJAFY Celestin </td>
                  <td className="px-4 py-2">Homme</td>
                  <td className="px-4 py-2">Doctorant</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-row items-center justify-between w-full h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-green-500 rounded w-[66%]"></div>
                      <span>66%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">RANDRIAMANAJAFY Celestin </td>
                  <td className="px-4 py-2">Homme</td>
                  <td className="px-4 py-2">Doctorant</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-row items-center justify-between w-full h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-green-500 rounded w-[40%]"></div>
                      <span>40%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">RANDRIAMANAJAFY Celestin </td>
                  <td className="px-4 py-2">Homme</td>
                  <td className="px-4 py-2">Doctorant</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-row items-center justify-between w-full h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-green-500 rounded w-[66%]"></div>
                      <span>66%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">RANDRIAMANAJAFY Celestin </td>
                  <td className="px-4 py-2">Homme</td>
                  <td className="px-4 py-2">Doctorant</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-row items-center justify-between w-full h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-green-500 rounded w-[40%]"></div>
                      <span>40%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">RANDRIAMANAJAFY Celestin </td>
                  <td className="px-4 py-2">Homme</td>
                  <td className="px-4 py-2">Doctorant</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-row items-center justify-between w-full h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-green-500 rounded w-[66%]"></div>
                      <span>66%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">RANDRIAMANAJAFY Celestin </td>
                  <td className="px-4 py-2">Homme</td>
                  <td className="px-4 py-2">Doctorant</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-row items-center justify-between w-full h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-green-500 rounded w-[40%]"></div>
                      <span>40%</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">RANDRIAMANAJAFY Celestin </td>
                  <td className="px-4 py-2">Homme</td>
                  <td className="px-4 py-2">Doctorant</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-row items-center justify-between w-full h-2 bg-gray-200 rounded">
                      <div className="h-2 bg-green-500 rounded w-[66%]"></div>
                      <span>66%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
