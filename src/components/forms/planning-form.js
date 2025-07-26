const PlanningForm = ({
  enseignants,
  mentions,
  niveaux,
  salles,
  matieres,
  selectedDate,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] shadow-xl relative">
        <h2 className="text-lg font-semibold mb-4">
          Ajouter un événement le {selectedDate.toLocaleDateString()}
        </h2>

        <form>
          <div className="text-start">
            <label>Professeur</label>
            <select
              name="professeur"
              // value={formData.professeur}
              // onChange={handleChange}
              // className="w-full border p-2 rounded"
              className="border p-2 w-full mb-4"
              required
            >
              <option value="" disabled defaultValue={true}>
                Choisir un professeur
              </option>
              {enseignants.map((enseignant) => (
                <option key={enseignant.id} value={enseignant.id}>
                  {enseignant.nom} {enseignant.prenom}
                </option>
              ))}
            </select>
          </div>

          <div className="text-start">
            <label>Matière</label>
            <select
              name="matiere"
              // value={formData.matiere}
              // onChange={handleChange}
              // className="w-full border p-2 rounded"
              className="border p-2 w-full mb-4"
              required
            >
              <option value="" disabled defaultValue={true}>
                Choisir une matière
              </option>
              {matieres.map((matiere) => (
                <option key={matiere.id} value={matiere.id}>
                  {matiere.nomMat}
                </option>
              ))}
            </select>
          </div>

          <div className="text-start">
            <label>Mention</label>
            <select
              name="matiere"
              // value={formData.matiere}
              // onChange={handleChange}
              // className="w-full border p-2 rounded"
              className="border p-2 w-full mb-4"
              required
            >
              <option value="" disabled defaultValue={true}>
                Choisir une mention
              </option>
              {mentions.map((mention, index) => (
                <option key={index} value={mention.idMent}>
                  {mention.nomMention}
                </option>
              ))}
            </select>
          </div>

          <div className="text-start">
            <label>Niveau</label>
            <select
              name="salle"
              // value={formData.salle}
              // onChange={handleChange}
              className="border p-2 w-full mb-4"
              // className="w-full border p-2 rounded"
              required
            >
              <option value="" disabled defaultValue={true}>
                Choisir une niveau
              </option>
              {niveaux.map((niveau, index) => (
                <option key={index} value={niveau.idNiv}>
                  {niveau.intitule}
                </option>
              ))}
            </select>
          </div>

          <div className="text-start">
            <label>Salle</label>
            <select
              name="salle"
              className="border p-2 w-full mb-4"
              // value={formData.salle}
              // onChange={handleChange}
              // className="w-full border p-2 rounded"
              required
            >
              <option value="" disabled defaultValue={true}>
                Choisir une salle
              </option>
              {salles.map((salle, index) => (
                <option key={index} value={salle.idsalle}>
                  {salle.nomsalle}
                </option>
              ))}
            </select>
          </div>

          <div className="text-start">
            <label htmlFor="">Heure debut</label>
            <input
              type="time"
              min="6:00"
              max="18:00"
              placeholder="Heure début"
              className="border p-2 w-full mb-4"
            />
          </div>

          <div className="text-start">
            <label htmlFor="">Heure fin</label>
            <input
              type="time"
              min="6:00"
              max="18:00"
              placeholder="Heure fin"
              className="border p-2 w-full mb-4"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              //   onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Annuler
            </button>
            <button
              type="button"
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanningForm;
