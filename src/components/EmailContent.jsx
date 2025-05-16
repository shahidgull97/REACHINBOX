// Add this to a file called EmailContent.jsx
import { ArrowUp, Send } from "lucide-react";
import React from "react";
function EmailContent({ email }) {
  if (!email) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select an email to view
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="text-xs bg-gray-800 rounded px-2 py-1 inline-block mb-4">
          Today
        </div>
        <h2 className="text-xl font-semibold mb-2">{email.subject}</h2>
        <div className="text-sm text-gray-400 mb-1">from: {email.from}</div>
        <div className="text-sm text-gray-400 mb-4">to: {email.to}</div>
        <div className="bg-gray-800 rounded-lg p-6">
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

      <div className="mt-8">
        <button className="bg-blue-600 text-white px-8 py-3 rounded flex items-center">
          <Send size={16} className="mr-2" />
          Reply
        </button>
      </div>
    </div>
  );
}

export default EmailContent;
