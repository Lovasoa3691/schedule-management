import { useState } from "react";
import Select from "react-select";
import SimpleBarChart from "../chart/bar";

const TeacherHour = () => {
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
    <div className="teacher-hour-container h-screen">
      <div className="flex items-center justify-between mb-6 mt-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Statistiques des heures enseignées
          </h2>
          <p className="text-sm text-gray-500">
            Suivi des heures effectuées par matière et évaluation de
            l'accomplissement des crédits.
          </p>
        </div>

        <div className="search-group flex items-center justify-between gap-4">
          <Select
            className="w-72"
            options={mentionOptions}
            placeholder="Selectionner un enseignant"
            value={selectedMention}
            onChange={handleMentionChange}
            isClearable
          />
        </div>
      </div>

      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold">
            JD
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">John Doe</h3>
            <p className="text-sm text-gray-500">Professeur de Mathématiques</p>
            <p className="text-sm text-gray-400">j.doe@example.com</p>
          </div>
        </div>
        <SimpleBarChart />
      </div>
    </div>
  );
};

export default TeacherHour;
