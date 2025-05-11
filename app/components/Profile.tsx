'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
        <div className="bg-[#FBEAD9] text-xs font-semibold text-[#3E3E3E] rounded-full w-8 h-8 flex items-center justify-center">
          {user?.firstName?.[0] ?? 'U'}
        </div>
        <p className="text-sm text-[#3E3E3E]">{user?.fullName ?? 'User'}</p>
        <ChevronDown className="w-4 h-4 text-[#A0A0A0]" />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-[#E0E0E0] rounded-md shadow-md z-10">
          <SignOutButton>
            <button className="w-full text-left px-4 py-2 text-sm text-[#3E3E3E] hover:bg-gray-100">
              Log out
            </button>
          </SignOutButton>
        </div>
      )}
    </div>
  );
}
