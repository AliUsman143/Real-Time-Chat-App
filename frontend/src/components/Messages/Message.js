const Message = ({ content, type, own, user }) => {
  return (
    <div
      className={`flex items-end px-1 py-0.5 ${
        own ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar (only for others) */}
      {!own && (
        <span
          className={`flex items-center justify-center text-[10px] md:text-xs font-bold 
            bg-blue-600 text-white rounded-full w-6 h-6 mr-1`}
        >
          {user.name.charAt(0).toUpperCase()}
        </span>
      )}

      {/* Bubble */}
      <span
        className={`max-w-[65%] md:max-w-[55%] text-xs md:text-sm leading-tight break-words 
        px-2.5 py-1.5 rounded-xl
        ${own ? "bg-sky-500 text-white" : "bg-gray-200 text-black"}`}
      >
        {type === "text" ? (
          content
        ) : (
          <img
            src={content}
            className="rounded-md max-w-[90px] md:max-w-[150px] object-cover"
            alt="image"
          />
        )}
      </span>
    </div>
  );
};

export default Message;
