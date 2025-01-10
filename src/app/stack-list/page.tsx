"use client";

import React from "react";
import { FaStar } from "react-icons/fa";

const mockData = [
  {
    user: "Alice",
    plugins: [
      { name: "AudioPlugin1" },
      { name: "AudioPlugin1" },
      { name: "AudioPlugin1" },
      { name: "AudioPlugin1" },
      { name: "AudioPlugin1" },
      { name: "AudioPlugin1" },
      { name: "TremoloEffect" },
    ],
  },
  { user: "Tom", plugins: [{ name: "ReverbKit" }, { name: "Compressor" }] },
  { user: "Kate", plugins: [{ name: "PitchShifter" }] },
];

// Plugin Item Component
const PluginItem = ({ plugin }: { plugin: { name: string } }) => {
  return (
    <div className="relative group">
      {/* Display first letter or an image */}
      <div className="w-12 h-12 bg-gray-700 text-white flex items-center justify-center rounded-lg">
        {plugin.name.charAt(0)}
      </div>

      {/* Full name on hover */}
      <span className="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-32 text-center opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white p-1 rounded">
        {plugin.name}
      </span>
    </div>
  );
};

// Stack Container Component (Holds multiple plugins in a row)
const StackContainer = ({ plugins }: { plugins: { name: string }[] }) => {
  return (
    <div className="flex items-center space-x-2 border p-4 rounded-lg">
      {plugins.map((plugin, index) => (
        <div key={index} className="relative">
          <PluginItem plugin={plugin} />
        </div>
      ))}
    </div>
  );
};

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="relative flex flex-col items-center">
      <FaStar className="text-yellow-500 text-2xl" />
      {/* Persistent Rating with Upward Slope */}
      <span className="mt-1 transform -rotate-6 text-sm text-white">
        {rating}/5
      </span>
    </div>
  );
};

// User Stack Component (Includes User Initial, Star Rating, and Plugin Stack)
const UserStack = ({
  user,
  plugins,
}: {
  user: string;
  plugins: { name: string }[];
}) => {
  return (
    <div className="flex items-center space-x-4 border p-4 rounded-lg">
      {/* User Initials */}
      <div className="relative group">
        <div className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center rounded-full">
          {user.charAt(0)}
        </div>

        {/* User Full Name on Hover */}
        <span className="absolute top-[-24px] left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white p-1 rounded">
          {user}
        </span>
      </div>

      {/* Stack Container */}
      <div className="flex items-center space-x-4">
        <StarRating rating={4.23} />
        <StackContainer plugins={plugins} />
      </div>
    </div>
  );
};

// Main StackList Component (Renders a list of User Stacks)
const StackList = () => {
  return (
    <div className="space-y-4">
      {mockData.map((stack, index) => (
        <UserStack key={index} user={stack.user} plugins={stack.plugins} />
      ))}
    </div>
  );
};

export default StackList;
