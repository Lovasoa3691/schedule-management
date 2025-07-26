import { FaCalendar, FaLockOpen } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { MdPassword } from "react-icons/md";

const Login = () => {
  return (
    <div className="login-container h-screen flex flex-col items-center justify-center bg-slate-100">
      <div className="flex flex-col items-center justify-center">
        <div className="logo mb-4">
          {/* <div className="w-16 h-16  bg-blue-600 text-white flex items-center justify-center rounded-full text-3xl font-bold"> */}

          <div className="p-4 text-center text-white flex flex-col items-center justify-center w-full h-20 bg-blue-600 rounded-lg mb-4 text-3xl">
            <FaCalendar className="w-48 h-48 mb-2 text-white" />
            <span>SchedConnect</span>
          </div>
          {/* </div> */}
        </div>

        <span className="text-xl font-bold mb-8">
          Connectez-vous à votre compte
        </span>
      </div>

      <div className="bg-white rounded-lg p-8 w-full max-w-md rounded:bg-gray-100 shadow-md">
        <form>
          <div className="mb-6">
            <label
              for="email-address-icon"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="text"
                id="email-address-icon"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              for="website-admin"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mot de passe
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                <FaLockOpen />
              </span>
              <input
                type="password"
                id="website-admin"
                className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <span>
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="remember"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Se souvenir de moi
              </label>
            </span>
            <a
              href="#"
              className="text-sm text-blue-600 hover:underline dark:text-blue-500"
            >
              Mot de passe oublié ?
            </a>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
