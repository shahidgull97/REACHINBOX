// Add this to a file called LeadDetails.jsx
import { Mail, Send, Clock } from "lucide-react";
import React from "react";
function LeadDetails({ email, leadDetails }) {
  if (!email) {
    return null;
  }

  return (
    <div className="w-64 bg-gray-900 text-white border-l border-gray-700 overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <h2 className="font-semibold">Lead Details</h2>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-400 text-sm mb-1">Name</div>
          <div>{email.name || "Orlando"}</div>
        </div>

        <div className="mb-6">
          <div className="text-gray-400 text-sm mb-1">Contact No</div>
          <div>{leadDetails?.phone || "+54-9062827869"}</div>
        </div>

        <div className="mb-6">
          <div className="text-gray-400 text-sm mb-1">Email ID</div>
          <div>{email.from}</div>
        </div>

        <div className="mb-6">
          <div className="text-gray-400 text-sm mb-1">LinkedIn</div>
          <div className="text-sm">linkedin.com/in/timvadder/</div>
        </div>

        <div className="mb-6">
          <div className="text-gray-400 text-sm mb-1">Company Name</div>
          <div>ReachInbox</div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-700">
        <h3 className="font-semibold mb-4">Activities</h3>

        <div className="mb-2">
          <div className="font-medium">Campaign Name</div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm">
            <span>3 Steps</span>
            <span>5 Days in Sequence</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mb-1">
                <Mail size={16} />
              </div>
              <div className="w-0.5 h-full bg-gray-700"></div>
            </div>
            <div>
              <div className="text-sm font-medium">Step 1: Email</div>
              <div className="text-xs flex items-center text-gray-400">
                <Send size={12} className="mr-1" />
                Sent 2nd Feb
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mb-1">
                <Mail size={16} />
              </div>
              <div className="w-0.5 h-full bg-gray-700"></div>
            </div>
            <div>
              <div className="text-sm font-medium">Step 2: Email</div>
              <div className="text-xs flex items-center text-gray-400">
                <Clock size={12} className="mr-1" />
                Opened 5th Feb
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mb-1">
                <Mail size={16} />
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Step 3: Email</div>
              <div className="text-xs flex items-center text-gray-400">
                <Clock size={12} className="mr-1" />
                Opened 9th Feb
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadDetails;
