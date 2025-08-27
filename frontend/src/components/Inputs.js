import { useRef, useState } from "react";
import Image from "next/image";
import { send, upload } from "@/assets";

const Inputs = ({ user, socket, setChat }) => {
  const [input, setInput] = useState("");
  const uploadInput = useRef(null);

  const sendMessage = () => {
    if (input) {
      const msg = { content: input, type: "text", user };
      socket.emit("send_message", msg);
      socket.emit("user_typing", { user: user.name, typing: false });
      setChat((prev) => [...prev, msg]);
      setInput("");
    } else {
      uploadInput.current.click();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const img = URL.createObjectURL(file);
      const msg = { content: img, type: "image", user };
      setChat((prev) => [...prev, msg]);
      socket.emit("send_message", msg);
    }
  };

  const userTyping = (e) => {
    setInput(e.target.value);
    socket.emit("user_typing", {
      user: user.name,
      typing: e.target.value ? true : false,
    });
  };

  return (
    <div className="w-full flex items-center bg-white border-t px-4 py-3 shadow-md">
      {/* Text Input */}
      <input
        className="flex-1 rounded-full px-4 py-2 text-base text-gray-800 bg-gray-100 placeholder-gray-400 
        focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => userTyping(e)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      {/* Hidden Upload */}
      <input
        className="hidden"
        type="file"
        ref={uploadInput}
        onChange={handleImageUpload}
      />

      {/* Send Button */}
      <button
        className={`ml-3 flex items-center justify-center rounded-full p-3 transition-all ${
          input
            ? "bg-sky-500 hover:bg-sky-600 shadow-md"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
        onClick={sendMessage}
      >
        <Image
          src={input ? send : upload}
          alt="send"
          height={24}
          width={24}
          className="w-6 h-6"
        />
      </button>
    </div>
  );
};

export default Inputs;
