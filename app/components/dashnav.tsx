import { Poppins } from "next/font/google";
import Profile from "./Profile";
import Notification from "./Notification";

const PoppinsFontBold = Poppins({ weight: "700", subsets: ["latin"] });

interface DashNavProps {
  title: string;
}

export default function DashNav({ title }: DashNavProps) {
  return (
    <div className="w-full flex items-center justify-between border-b-[0.5px] border-[#C8CBD9] h-21">
      <h2 className={`text-[#5A67BA] text-sm font-bold ml-[330px] ${PoppinsFontBold.className}`}>
        {title}
      </h2>
      <div className="flex items-center space-x-6 mr-12">
        <Profile />
        <Notification />
      </div>
    </div>
  );
}
