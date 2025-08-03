import axios from "axios";
import { useEffect, useState } from "react";
import { MdSave, MdSend } from "react-icons/md";

const Profil = () => {
  const [user, setUser] = useState([]);

  const getUser = () => {
    axios
      .get("http://localhost:5142/api/utilisateur")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error("Erreur de recuperation: ", err));
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user && user.length === 0) {
    return <div className="text-center">Chargement...</div>;
  }

  return (
    <main className="flex flex flex-col h-screen">
      <header className="p-4 bg-slate-100 border-b flex items-center">
        <div className="w-10 h-10  text-white flex items-center justify-center text-lg font-bold">
          {/* {selectedTeacher?.nom?.charAt(0)} */}
        </div>
      </header>

      {user && user.length > 0 && (
        <div className="h-[600px] p-14  bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 mr-4 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user[0].nom.charAt(0)}
                {user[0].prenom.charAt(0)}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-lg font-bold text-gray-700">
                  {user[0].nom} {user[0].prenom}
                </span>
                <span className="text-gray-600">{user[0].email}</span>
              </div>
            </div>
            <div>
              <button className="text-white bg-blue-600 p-2 w-20 rounded-lg hover:bg-blue-700 transition-colors">
                Editer
              </button>
            </div>
          </div>

          <form className="mt-8">
            <div className="grid gap-8 mb-8 md:grid-cols-2">
              <div>
                <label
                  for="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="first_name"
                  value={user[0].nom}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label
                  for="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Prénom
                </label>
                <input
                  type="text"
                  id="last_name"
                  value={user[0].prenom}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doe"
                  required
                />
              </div>
              <div>
                <label
                  for="company"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Genre
                </label>

                <select
                  value={user[0]?.genre ?? "Inconnu"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name=""
                  id=""
                >
                  <option value="Masculin">Masculin</option>
                  <option value="Feminin">Feminin</option>
                </select>
              </div>
              <div>
                <label
                  for="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Adresse
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={user[0]?.adresse ?? "Inconnu"}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123-45-678"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
              </div>
              <div>
                <label
                  for="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={user[0].phone}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123-45-678"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
              </div>
              <div>
                <label
                  for="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Rôle
                </label>
                <input
                  disabled
                  type="tel"
                  id="phone"
                  value={user[0].fonction}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="123-45-678"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  required
                />
              </div>
            </div>
            <div className="">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Adresse mail
              </label>
              <input
                type="email"
                id="email"
                value={user[0].email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
                required
              />
            </div>

            <div className="mt-3">
              <span className="text-gray-600">Votre</span>
            </div>
          </form>
        </div>
      )}

      <footer className="p-6 px-14 border-t bg-white flex gap-2">
        <button
          //   onClick={sendMessage}
          className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          <MdSave className="inline-block mr-2" />
          Enregister les modifications
        </button>
      </footer>
    </main>
  );
};

export default Profil;
