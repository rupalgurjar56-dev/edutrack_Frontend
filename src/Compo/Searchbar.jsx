import React, { useState } from "react";
import { Search } from "lucide-react"; 

const Searchbar = () => {

  return (
    <div className="w-full flex justify-between items-center mb-4">
      {/* Search Box */}
      <div className="relative w-72">
        <input
          type="text"
          
          placeholder="Search student..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>
    </div>
  );
};

export default Searchbar;