// Add this to a file called EmailContent.jsx
import { ArrowUp, Send, Trash2 } from "lucide-react";
import React from "react";
import EmailComposer from "./EmailComposer";
import { useEffect } from "react";
import { useDetails } from "../context/userContext";
function EmailContent({ email }) {
  const [showEmailComposer, setShowEmailComposer] = React.useState(false);
  const { darkMode } = useDetails();
  useEffect(() => {
    const handler = (e) => {
      // ignore if user is typing in an editable field
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable
      )
        return;

      if (e.key === "r" || e.key === "R") {
        e.preventDefault(); // keep browser from doing its own thing
        setShowEmailComposer(true); // open the composer
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler); // cleanup
  }, [setShowEmailComposer]);
  if (!email) {
    return (
      <div className="flex items-center justify-center h-full w-[80rem] text-gray-400">
        Select an email to view
      </div>
    );
  }

  return (
    <div
      className={`p-6 ${
        darkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="text-xs bg-gray-800 rounded px-2 py-1 inline-block mb-4">
        Today
      </div>
      <div
        className={`mb-6${
          darkMode ? "bg-gray-600 text-white" : "bg-pink-200 text-black"
        }`}
      >
        <button className="p-1 rounded hover:bg-gray-700">
          <Trash2 size={16} />
        </button>
        <h2 className="text-xl font-semibold mb-2">{email.subject}</h2>
        <div className="text-sm  mb-1">from: {email.from}</div>
        <div className="text-sm  mb-4">to: {email.to}</div>
        <div className={`rounded-lg p-6 `}>
          <div className="mb-4">{email.greeting}</div>
          <div className="mb-4">{email.body}</div>
        </div>

        <div className="flex justify-center mt-4">
          <button className="bg-gray-800 text-gray-400 px-4 py-2 rounded text-sm flex items-center">
            <ArrowUp size={14} className="mr-2" />
            View all 1 replies
          </button>
        </div>
      </div>
      {showEmailComposer ? (
        <EmailComposer setShowEmailComposer={setShowEmailComposer} />
      ) : (
        <div className="mt-8">
          <button
            className="bg-blue-600 text-white px-8 py-3 rounded flex items-center"
            onClick={() => setShowEmailComposer(true)}
          >
            <Send size={16} className="mr-2" />
            Reply
          </button>
        </div>
      )}
    </div>
  );
}

export default EmailContent;
