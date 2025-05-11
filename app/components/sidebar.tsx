import { Poppins } from "next/font/google";
import Link from "next/link";
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Gem,
  User,
  HelpCircle,
} from "lucide-react";

const PoppinsFontBold = Poppins({ weight: "700", subsets: ["latin"] });
const PoppinsFontMedium = Poppins({ weight: "400", subsets: ["latin"] });

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface SidebarProps {
  active: string;
  menuItems: SidebarItem[];
}

export default function Sidebar({ active, menuItems }: SidebarProps) {
  return (
    <div className="w-[300px] bg-[#F1F2F7] min-h-screen px-4 py-6">
      {/* Logo */}
      <div className="flex items-center justify-center space-x-2 mb-10 px-2">
        <div
          className={`bg-[#5A67BA] w-9 h-9 rounded-4xl text-white text-center p-1.5 font-bold ${PoppinsFontBold.className}`}
        >
          I
        </div>
        <div
          className={`text-[#5A67BA] font-bold text-lg ${PoppinsFontBold.className}`}
        >
          INFORMIFIER
        </div>
      </div>

      {/* Sections */}
      <div className="mt-20">
        <div className="text-xs text-[#8F9BB3] uppercase mb-3 tracking-widest">
          Menu
        </div>

        <div className="flex flex-col space-y-1">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <div
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm ${
                  active === item.label
                    ? "bg-[#E9EBFB] text-[#5A67BA]"
                    : "text-[#8F9BB3] hover:bg-[#E9EBFB] hover:text-[#5A67BA]"
                } ${PoppinsFontMedium.className}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-xs text-[#8F9BB3] uppercase mt-8 mb-3 tracking-widest">
          Others
        </div>

        <div className="flex flex-col space-y-1">
          <Link href="/premium">
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-[#8F9BB3] hover:bg-[#E9EBFB] hover:text-[#5A67BA]">
              <Gem className="w-4 h-4" />
              <span>Premium</span>
            </div>
          </Link>
          <Link href="/account">
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-[#8F9BB3] hover:bg-[#E9EBFB] hover:text-[#5A67BA]">
              <User className="w-4 h-4" />
              <span>Account</span>
            </div>
          </Link>
          <Link href="/help">
            <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-[#8F9BB3] hover:bg-[#E9EBFB] hover:text-[#5A67BA]">
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
