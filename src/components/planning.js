import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import fr from "date-fns/locale/fr";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { FiSearch } from "react-icons/fi";

const locales = {
  fr: fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const eventsExemple = [
  {
    title: "C#",
    start: new Date(2025, 6, 17, 8, 0),
    end: new Date(2025, 6, 17, 10, 0),
    hDeb: "08:00",
    hFin: "10:00",
    mention: "INFO",
    niveau: "M1",
    Prof: "Dr Brice",
    status: "En cours",
  },
  {
    title: "JAVA Web",
    start: new Date(2025, 6, 17, 10, 0),
    end: new Date(2025, 6, 17, 12, 0),
    hDeb: "10:00",
    hFin: "12:00",
    mention: "INFO",
    niveau: "M1",
    Prof: "Dr Hajarisena",
    status: "Termine",
  },
  {
    title: "Python",
    start: new Date(2025, 6, 18, 9, 0),
    end: new Date(2025, 6, 18, 11, 0),
    hDeb: "09:00",
    hFin: "11:00",
    mention: "INFO",
    niveau: "L2",
    Prof: "Mme Rasoanaivo",
    status: "Termine",
  },
];

const CustomEvent = ({ event }) => (
  <div className="text-sm leading-tight flex justify-between items-start">
    <div>
      <div className="font-bold">
        {event.title} | {event.Prof}
      </div>

      <div
        className={
          event.status === "En cours" ? "text-green-400" : "text-red-600"
        }
      >
        {event.status}
      </div>
    </div>

    <button
      // onClick={() => onDelete(event)}
      className="text-red-500 hover:text-red-700 mt-1"
      title="Supprimer"
    >
      <Trash2 size={18} />
    </button>
  </div>
);

const Planning = () => {
  const [events, setEvents] = useState(eventsExemple);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("week");

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setShowForm(true);
  };

  //   const handleAddClick = () => {
  //     setSelectedDate(new Date());
  //     setShowForm(true);
  //   };

  const closeModal = () => {
    setShowForm(false);
    setSelectedDate(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Agenda - Emploi du temps</h1>

      <Calendar
        localizer={localizer}
        culture="fr"
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        onSelectSlot={handleSelectSlot}
        defaultView="day"
        views={["month", "week", "day"]}
        view={currentView}
        onView={(view) => setCurrentView(view)}
        components={{
          event: CustomEvent,
        }}
        style={{ height: 780, backgroundColor: "#f9fafb" }}
        messages={{
          today: "Aujourd'hui",
          previous: "Précédent",
          next: "Suivant",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
          agenda: "Agenda",
          date: "Date",
          time: "Heure",
          event: "Événement",
          noEventsInRange: "Aucun événement dans cette période.",
          showMore: (total) => `+ ${total} de plus`,
        }}
      />

      {showForm && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] shadow-xl relative">
            <h2 className="text-lg font-semibold mb-4">
              Ajouter un événement le {selectedDate.toLocaleDateString()}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const title = e.target.title.value;
                const newEvent = {
                  title,
                  start: selectedDate,
                  end: new Date(selectedDate.getTime() + 60 * 60 * 1000),
                };
                setEvents([...events, newEvent]);
                closeModal();
              }}
            >
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
                  <option value="" disabled selected>
                    Choisir un professeur
                  </option>
                  <option value="John Doe">John Doe</option>
                  <option value="Dr Brice">Dr Brice</option>
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
                  <option value="" disabled selected>
                    Choisir une matière
                  </option>
                  <option value="C++ Avancé">C++ Avancé</option>
                  <option value="Python">Python</option>
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
                  <option value="" disabled selected>
                    Choisir une mention
                  </option>
                  <option value="C++ Avancé">DROIT</option>
                  <option value="Python">GM</option>
                  <option value="C++ Avancé">INFO</option>
                  <option value="Python">BTP</option>
                  <option value="C++ Avancé">ICJ</option>
                  {/* <option value="Python">GM</option> */}
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
                  <option value="" disabled selected>
                    Choisir une niveau
                  </option>
                  <option value="Salle 1">L1</option>
                  <option value="Salle 2">L2</option>
                  <option value="Salle 2">L3</option>
                  <option value="Salle 2">M1</option>
                  <option value="Salle 2">M2</option>
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
                  <option value="" disabled selected>
                    Choisir une salle
                  </option>
                  <option value="Salle 1">1A</option>
                  <option value="Salle 2">2A</option>
                  <option value="Salle 1">3A</option>
                  <option value="Salle 2">4A</option>
                  <option value="Salle 1">5A</option>
                  <option value="Salle 2">6A</option>
                  <option value="Salle 1">7A</option>
                  <option value="Salle 2">8A</option>
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
                  onClick={closeModal}
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
      )}
    </div>
  );
};

export default Planning;
