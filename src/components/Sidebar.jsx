// Add this to a file called Sidebar.jsx
import React from "react";
import {
  Mail,
  Inbox,
  Users,
  File,
  MessageSquare,
  PieChart,
  Settings,
} from "lucide-react";

function Sidebar() {
  return (
    <div className="w-20 flex flex-col items-center py-4 space-y-6 border-2 ">
      <div className="p-2  rounded">
        <Mail size={20} />
      </div>
      <div className="flex flex-col items-center space-y-6 mt-6">
        <button className="p-2   rounded">
          <Inbox size={20} />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded">
          <Users size={20} />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded">
          <File size={20} />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded">
          <MessageSquare size={20} />
        </button>
        <button className="p-2 relative hover:bg-gray-800 rounded">
          <div className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
            2
          </div>
          <Settings size={20} />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded">
          <PieChart size={20} />
        </button>
      </div>
      <div className="mt-auto p-2 bg-green-600 rounded-full">
        <div className="text-white">PS</div>
      </div>
    </div>
  );
}

export default Sidebar;
