// Add this to a file called EmailList.jsx
import { useState } from "react";
import { Search, ChevronDown, Trash2 } from "lucide-react";
import React from "react";
function EmailList({ emails, selectedEmail, onSelectEmail }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("Newest");

  // Filter emails based on search term
  const filteredEmails = emails.filter(
    (email) =>
      email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col border-r border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="font-semibold">Onebox</h1>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <h2 className="font-semibold">All Inbox(s)</h2>
            <ChevronDown size={16} />
          </div>
          <button className="p-1 rounded hover:bg-gray-700">
            <Trash2 size={16} />
          </button>
        </div>
        <div className="text-xs text-gray-400">25/25 inboxes selected</div>
      </div>

      <div className="p-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={14} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-700 w-full pl-10 pr-4 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="p-2 border-b border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
              26
            </div>
            <span className="text-sm font-medium">New Replies</span>
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <span>{selectedTab}</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {filteredEmails.map((email) => (
          <div
            key={email.id}
            className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 ${
              selectedEmail?.id === email.id ? "bg-gray-700" : ""
            }`}
            onClick={() => onSelectEmail(email)}
          >
            <div className="flex items-center mb-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <div className="font-medium flex-1 truncate">{email.from}</div>
              <div className="text-xs text-gray-400">{email.date}</div>
            </div>
            <div className="text-sm text-gray-400 truncate">
              {email.subject}
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <span
                className={`text-xs px-2 py-1 rounded ${
                  email.status === "Interested"
                    ? "bg-blue-900 text-blue-300"
                    : email.status === "Closed"
                    ? "bg-gray-700 text-gray-300"
                    : email.status === "Meeting Booked"
                    ? "bg-purple-900 text-purple-300"
                    : "bg-green-900 text-green-300"
                }`}
              >
                {email.status}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-gray-700">
                {email.campaign}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmailList;
