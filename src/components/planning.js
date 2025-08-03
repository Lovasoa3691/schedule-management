import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import fr from "date-fns/locale/fr";
import React, { use, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import Select from "react-select";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import PlanningForm from "./forms/planning-form";
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
    numEd: "",
    title: "",
    start: new Date(),
    end: new Date(),
    jour: "",
    hDeb: "",
    hFin: "",
    mention: "",
    niveau: "",
    type: "",
    salle: "",
    nomEns: "",
    prenomEns: "",
    status: "",
  },
];

const CustomEvent = ({ event }) => (
  <div className="p-2 text-sm leading-tight flex justify-between items-center">
    <div>
      <div className="font-bold">{event.title}</div>
      <div>{event.prenomEns}</div>
      <div className="text-white text-opacity-70">
        {event.salle} | {event.type}
      </div>

      <div
        className={
          event.status === "En cours"
            ? "rounded-full bg-green-400 text-white px-1 py-1 text-xs"
            : "rounded-full bg-red-600 text-white px-1 py-1 text-xs"
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
      <FaTimes size={18} />
    </button>
  </div>
);

const Planning = () => {
  const [events, setEvents] = useState(eventsExemple);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("month");
  const [ensignants, setEnsignants] = useState([]);
  const [mentions, setMentions] = useState([]);
  const [niveaux, setNiveaux] = useState([]);
  const [salles, setSalles] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [formData, setFormData] = useState({
    numEd: "",
    jour: "",
    hDeb: "",
    hFin: "",
    dispo: "En cours",
    type: "",
    responsableId: "5d78f5b7-69b1-4ca1-a2ed-e8961f8b04ab",
    enseignantId: "",
    mentionId: "",
    niveauId: "",
    idSalle: "",
    matiereId: "",
    anneeId: "1",
  });

  const loadAll = () => {
    axios
      .get("http://localhost:5142/api/utilisateur/teacher")
      .then((res) => {
        setEnsignants(res.data);
      })
      .catch((err) => console.error("Erreur de chargement:", err));

    axios
      .get("http://localhost:5142/api/mention")
      .then((res) => {
        setMentions(res.data);
      })
      .catch((err) => console.error("Erreur de chargement:", err));

    axios
      .get("http://localhost:5142/api/niveau")
      .then((res) => {
        setNiveaux(res.data);
      })
      .catch((err) => console.error("Erreur de chargement:", err));

    axios
      .get("http://localhost:5142/api/salle")
      .then((res) => {
        setSalles(res.data);
      })
      .catch((err) => console.error("Erreur de chargement:", err));

    axios
      .get("http://localhost:5142/api/matiere")
      .then((res) => {
        setMatieres(res.data);
      })
      .catch((err) => console.error("Erreur de chargement:", err));
  };

  const loadSchedule = () => {
    axios
      .get("http://localhost:5142/api/edt")
      .then((res) => {
        setEvents(
          res.data.map((event) => ({
            numEd: event.numEd,
            title: event.nomMatiere,
            start: new Date(event.jour + "T" + event.hDeb),
            end: new Date(event.jour + "T" + event.hFin),
            hDeb: event.hDeb,
            hFin: event.hFin,
            mention: event.mention,
            niveau: event.niveau,
            nomEns: event.nomEns,
            prenomEns: event.prenomEns,
            type: event.type,
            salle: event.nomSalle,
            status: event.dispo,
          }))
        );
      })
      .catch((err) => console.error("Erreur de chargement:", err));
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    loadSchedule();
  }, []);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setShowForm(true);
  };

  useEffect(() => {
    if (selectedDate !== null) {
      const date = new Date(selectedDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      setFormData({
        ...formData,
        jour: `${year}-${month}-${day}`,
      });
    }
  }, [selectedDate]);

  const mentionOptions = mentions.map((mnt) => ({
    value: mnt.nomMention,
    label: mnt.nomMention,
  }));

  const niveauOptions = niveaux.map((nv) => ({
    value: nv.intitule,
    label: nv.intitule,
  }));

  const [selectedMention, setSelectedMention] = useState(null);
  const [selectedNiveau, setSelectedNiveau] = useState(null);

  const filtrerData = (mention, niveau) => {
    const filtered = events.filter(
      (item) =>
        (!mention || item.mention === mention.value) &&
        (!niveau || item.niveau === niveau.value)
    );
    setEvents(filtered);
  };

  const handleMentionChange = (selectedMention) => {
    setSelectedMention(selectedMention);
    filtrerData(selectedMention, selectedNiveau);
  };

  const handleNiveauChange = (selectedNiveau) => {
    setSelectedNiveau(selectedNiveau);
    filtrerData(selectedMention, selectedNiveau);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      mentionId: parseInt(formData.mentionId),
      niveauId: parseInt(formData.niveauId),
      idSalle: parseInt(formData.idSalle),
      anneeId: parseInt(formData.anneeId),
      jour: formData.jour,
      hDeb: formData.hDeb,
      hFin: formData.hFin,
    };

    console.log(data);

    axios
      .post("http://localhost:5142/api/edt", data)
      .then((rep) => {
        alert("Donnée envoyée !");
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "hDeb" || name === "hFin") {
      const [hour, minute] = value.split(":");
      newValue = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:00`;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Agenda - Planning des cours
          </h2>
          <p className="text-sm text-gray-500">
            Selectionner une date pour ajouter un programme
          </p>
        </div>
        <div className="flex items-center ml-auto justify-end gap-2">
          <Select
            className="w-48"
            options={mentionOptions}
            placeholder="Mention"
            value={selectedMention}
            onChange={handleMentionChange}
            isClearable
          />
          <Select
            className="w-48"
            options={niveauOptions}
            placeholder="Niveau"
            value={selectedNiveau}
            onChange={handleNiveauChange}
            isClearable
          />
        </div>
      </div>

      <Calendar
        className="bg-white shadow-lg rounded-lg p-6"
        localizer={localizer}
        culture="fr"
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        onSelectSlot={handleSelectSlot}
        defaultView="month"
        views={["month", "week", "day"]}
        view={currentView}
        onView={(view) => setCurrentView(view)}
        components={{
          event: CustomEvent,
        }}
        style={{ height: 780 }}
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
        <PlanningForm
          enseignants={ensignants}
          mentions={mentions}
          niveaux={niveaux}
          salles={salles}
          matieres={matieres}
          selectedDate={selectedDate}
          data={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Planning;
