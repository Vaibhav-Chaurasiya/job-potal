"use client";

import { useState } from "react";
import {
  FaSearch,
  FaPaperPlane,
  FaEllipsisV,
  FaCircle,
} from "react-icons/fa";

const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "HR Manager",
    company: "Tech Corp",
    lastMessage: "Great! We'd like to schedule an interview with you.",
    time: "2:30 PM",
    unread: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Technical Recruiter",
    company: "Design Studio",
    lastMessage: "Your application has been reviewed.",
    time: "11:45 AM",
    unread: false,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Hiring Manager",
    company: "StartupX",
    lastMessage: "Thank you for your interest in the position.",
    time: "Yesterday",
    unread: false,
  },
];

const messages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    content: "Hi John, thanks for applying to the Senior Frontend Developer position.",
    time: "2:25 PM",
    isMe: false,
  },
  {
    id: 2,
    sender: "Me",
    content: "Thank you! I'm excited about the opportunity.",
    time: "2:26 PM",
    isMe: true,
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    content: "Great! We'd like to schedule an interview with you.",
    time: "2:30 PM",
    isMe: false,
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Add your message sending logic here
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search conversations..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="overflow-y-auto h-full">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                selectedConversation === conversation.id
                  ? "bg-cyan-50 border-l-4 border-cyan-500"
                  : ""
              }`}
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                      <span className="text-white font-bold">
                        {conversation.name[0]}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {conversation.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {conversation.role} at {conversation.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {conversation.time}
                  </span>
                  {conversation.unread && (
                    <FaCircle className="h-2 w-2 text-cyan-500" />
                  )}
                  <button className="text-gray-400 hover:text-gray-500">
                    <FaEllipsisV className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500 truncate">
                {conversation.lastMessage}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {conversations.find((c) => c.id === selectedConversation)
                      ?.name[0]}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {
                    conversations.find((c) => c.id === selectedConversation)
                      ?.name
                  }
                </p>
                <p className="text-sm text-gray-500">
                  {
                    conversations.find((c) => c.id === selectedConversation)
                      ?.role
                  }{" "}
                  at{" "}
                  {
                    conversations.find((c) => c.id === selectedConversation)
                      ?.company
                  }
                </p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-500">
              <FaEllipsisV className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isMe ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.isMe
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.isMe ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <FaPaperPlane className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 