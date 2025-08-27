"use client";
import { useEffect, useState, useRef } from "react";
import { Chat, Inputs, SignUp } from "@/components";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Home() {
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const user = useRef(null);

  useEffect(() => {
    socket.on("recieve_message", (msg) => {
      if (!user.current) return;
      setChat((prev) => [...prev, msg]);
    });

    socket.on("user_typing", (data) => {
      if (!user.current) return;
      setTyping((prev) => {
        if (typing.includes(data.user) && data.typing === true) return prev;
        if (data.typing === false) {
          return prev.filter((u) => u !== data.user);
        } else {
          return [...prev, data.user];
        }
      });
    });

    socket.on("new_user", (newUser) => {
      if (!user.current) return;
      setChat((prev) => [
        ...prev,
        { content: `${newUser} joined`, type: "server" },
      ]);
    });

    return () => {
      socket.off("recieve_message");
      socket.off("user_typing");
      socket.off("new_user");
    };
  });

  return (
    <main className="h-screen bg-cover bg-white bg-center w-screen"  style={{
    backgroundImage: "url('/bg-image.jpg')",
  }}>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 bg-sky-500 hover:bg-sky-600 text-white p-4 rounded-full shadow-xl"
        >
          💬
        </button>
      )}

      {/* Chat Widget */}
      {open && (
        <div className="fixed bottom-5 right-5 w-80 h-96 md:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border">
          {/* Header */}
          <div className="bg-sky-500 text-white flex justify-between items-center p-3">
            <span className="font-semibold">💬 Chat with us</span>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto">
            {user.current ? (
              <Chat user={user.current} chat={chat} typing={typing} />
            ) : (
              <SignUp
                user={user}
                socket={socket}
                input={input}
                setInput={setInput}
              />
            )}
          </div>

          {/* Input Box */}
          {user.current && (
            <Inputs setChat={setChat} user={user.current} socket={socket} />
          )}
        </div>
      )}
    </main>
  );
}
