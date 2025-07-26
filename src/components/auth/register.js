const Register = () => {
  return (
    <div className="register-container">
      <h2 className="text-2xl text-gray-700">Inscription</h2>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Nom d'utilisateur
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Nom d'utilisateur"
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
