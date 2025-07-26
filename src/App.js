import logo from "./logo.svg";
// import "./App.css";

import Planning from "./components/planning";
import Navbar from "./components/navbar";
import TopBar from "./components/topbar";
import Teacher from "./components/teacher";
import ClassRoom from "./components/class";
import Subject from "./components/subject";
import Messagerie from "./components/message";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/auth/login";
import Dashboard from "./components/dashboard";
import Register from "./components/auth/register";
import Disponibility from "./components/statistics/disponibility";
import TeacherHour from "./components/statistics/hour";
import Week from "./components/statistics/week";
import Profil from "./components/settings/profil";
import Sector from "./components/settings/sector";
import AssistantFloatingForm from "./components/forms/assistant";

function App() {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <div className="App">
      <Router>
        {isAuthenticated ? (
          <>
            <Navbar setLoading={setLoading} />
            <div className="sm:ml-64 bg-slate-50">
              <TopBar />
              <div className="p-20 mt-5">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/enseignant" element={<Teacher />} />
                  <Route path="/planning" element={<Planning />} />
                  <Route path="/salle" element={<ClassRoom />} />
                  <Route path="/matiere" element={<Subject />} />
                  <Route path="/messagerie" element={<Messagerie />} />
                  <Route
                    path="/statistique/disponibilite"
                    element={<Disponibility />}
                  />
                  <Route
                    path="/statistique/heures-enseignants"
                    element={<TeacherHour />}
                  />
                  <Route path="/statistique/semaine" element={<Week />} />
                  <Route path="/parametre/profile" element={<Profil />} />
                  <Route path="/parametre/curcus" element={<Sector />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </Router>

      <AssistantFloatingForm />
    </div>
  );
}

export default App;
