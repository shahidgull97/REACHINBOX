import { useState, useRef } from "react";
import React from "react";
import {
  X,
  ChevronDown,
  Wand2,
  Eye,
  Paperclip,
  Smile,
  MoreHorizontal,
  Code,
  X as XIcon,
} from "lucide-react";

export default function EmailComposer({
  setShowEmailComposer,
  isReply = false,
  initialTo = "",
  initialSubject = "",
}) {
  const [to, setTo] = useState(initialTo || "");
  const [from, setFrom] = useState("peter@achinlabs.com");
  const [subject, setSubject] = useState(initialSubject || "");
  const [body, setBody] = useState("");
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileAttachment = (e) => {
    const files = Array.from(e.target.files);

    const newAttachments = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    }));

    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(attachments.filter((attachment) => attachment.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="w-full max-w-2xl bg-gray-900 text-gray-200 rounded-md shadow-lg flex flex-col absolute">
      {/* Header */}
      <div className="flex justify-between items-center p-2 border-b border-gray-800">
        <div className="text-sm font-medium">
          {isReply ? "Reply" : "New Message"}
        </div>
        <button
          onClick={() => setShowEmailComposer(false)}
          className="p-1 hover:bg-gray-800 rounded-md"
        >
          <X size={16} />
        </button>
      </div>

      {/* Email Form */}
      <div className="flex flex-col flex-grow">
        {/* To Field */}
        <div className="flex items-center px-4 py-2 border-b border-gray-800">
          <div className="w-12 text-sm text-gray-400">To:</div>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-grow bg-transparent outline-none text-sm"
            placeholder="recipient@email.com"
          />
        </div>

        {/* From Field */}
        <div className="flex items-center px-4 py-2 border-b border-gray-800">
          <div className="w-12 text-sm text-gray-400">From:</div>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-grow bg-transparent outline-none text-sm"
            disabled
          />
        </div>

        {/* Subject Field */}
        <div className="flex items-center px-4 py-2 border-b border-gray-800">
          <div className="w-12 text-sm text-gray-400">Subject:</div>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-grow bg-transparent outline-none text-sm"
            placeholder="Email subject"
          />
        </div>

        {/* Email Body */}
        <div className="flex-grow p-4">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full h-full min-h-48 bg-transparent outline-none resize-none text-sm"
            placeholder="Write your message here..."
          />
        </div>

        {/* Attachments Display */}
        {attachments.length > 0 && (
          <div className="px-4 pb-4">
            <div className="text-xs text-gray-400 mb-2">
              Attachments ({attachments.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center bg-gray-800 rounded-md px-2 py-1 text-xs"
                >
                  <span className="truncate max-w-32">{attachment.name}</span>
                  <span className="text-gray-400 mx-1">
                    ({formatFileSize(attachment.size)})
                  </span>
                  <button
                    onClick={() => removeAttachment(attachment.id)}
                    className="text-gray-400 hover:text-gray-200 ml-1"
                  >
                    <XIcon size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center px-2 py-3 border-t border-gray-800 bg-gray-900">
        <div className="flex items-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm font-medium">
            Send
          </button>
          <button className="text-white hover:bg-gray-800 px-1 ml-1 rounded-md">
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Toolbar Icons */}
        <div className="flex items-center ml-4 space-x-3 text-gray-400">
          <button className="hover:text-gray-200">
            <Wand2 size={18} />
          </button>
          <button className="hover:text-gray-200">
            <Eye size={18} />
          </button>
          <button
            className="hover:text-gray-200"
            onClick={() => fileInputRef.current.click()}
          >
            <Paperclip size={18} />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileAttachment}
              className="hidden"
              multiple
            />
          </button>
          <button className="hover:text-gray-200">
            <Smile size={18} />
          </button>
          <button className="hover:text-gray-200">
            <MoreHorizontal size={18} />
          </button>
          <button className="hover:text-gray-200">
            <Code size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
