import logo from "./logo.svg";
// import "./App.css";

import Planning from "./components/planning";
import Navbar from "./components/navbar";
import TopBar from "./components/topbar";
import Teacher from "./components/teacher";
import ClassRoom from "./components/class";
import Subject from "./components/subject";
import MessageBox from "./components/messageBox";
import Messagerie from "./components/message";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const locales = { fr };
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
//   getDay,
//   locales,
// });

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <div className="sm:ml-64 bg-slate-50">
          <TopBar />
          <div className="p-20 mt-5">
            <Routes>
              <Route path="/" element={<Teacher />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/salle" element={<ClassRoom />} />
              <Route path="/matiere" element={<Subject />} />
              <Route path="/messagerie" element={<Messagerie />} />
              {/* <Route path="/messagebox" element={<MessageBox senderId={1} receiverId={2} />} /> */}
            </Routes>

            {/* <ClassRoom /> */}
            {/* <Teacher /> */}
            {/* <Subject /> */}
            {/* <Messagerie /> */}
            {/* <Planning /> */}
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
