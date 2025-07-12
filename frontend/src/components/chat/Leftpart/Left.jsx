import React from "react";
import Search from "./Search";
import Users from "./Users";

function Left() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Fixed-height Search Section */}
      <div className="p-4 border-b border-base-300">
        <Search />
      </div>
      
      {/* Scrollable Users List */}
      <div className="flex-1">
        <Users />
      </div>
    </div>
  );
}

export default Left;