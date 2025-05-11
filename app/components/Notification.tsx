import { Bell } from "lucide-react";

export default function Notification() {
  return (
    <div className="relative cursor-pointer">
      <Bell className="w-5 h-5 text-[#7C8DB5]" />
      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
    </div>
  );
}
