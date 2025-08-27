const SignUp = ({ user, socket, input, setInput }) => {
  const addUser = () => {
    user.current = { name: input, id: socket.id };
    socket.emit("new_user", { user: input });
    setInput("");
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-80 flex flex-col items-center animate-fadeIn">
        {/* Logo / Icon */}
        <div className="bg-sky-500 p-4 rounded-full shadow-md mb-4">
          💬
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800">Welcome to Chat</h1>
        <p className="text-gray-500 text-sm mb-6">Enter your name to join</p>

        {/* Input */}
        <input
          type="text"
          className="w-full text-base rounded-lg p-3 mb-4 border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-400 outline-none transition-all"
          placeholder="Your name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addUser()}
        />

        {/* Button */}
        <button
          className={`w-full text-lg text-white font-semibold py-2 px-3 rounded-lg transition-all ${
            input
              ? "bg-sky-500 hover:bg-sky-600 shadow-md"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!input}
          onClick={addUser}
        >
          Join Chat
        </button>
      </div>
    </div>
  );
};

export default SignUp;
