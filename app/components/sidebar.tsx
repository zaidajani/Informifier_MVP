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

// Font Imports
const PoppinsFontBold = Poppins({ weight: "700", subsets: ["latin"] });
const PoppinsFontMedium = Poppins({ weight: "400", subsets: ["latin"] });

// SidebarItem Interface
interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

// SidebarProps Interface
interface SidebarProps {
  active: string;
  menuItems: SidebarItem[];
  otherItems: SidebarItem[];
}

// Sidebar Component
export default function Sidebar({ active, menuItems, otherItems }: SidebarProps) {
  return (
    <div className="w-[250px] bg-[#F1F2F7] min-h-screen px-4 py-6">
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

      {/* Menu Section */}
      {menuItems.length > 0 && (
        <>
          <div className="text-xs text-[#8F9BB3] uppercase mt-20 mb-3 tracking-widest">
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
        </>
      )}

      {/* Others Section */}
      {otherItems.length > 0 && (
        <>
          <div className="text-xs text-[#8F9BB3] uppercase mt-8 mb-3 tracking-widest">
            Others
          </div>

          <div className="flex flex-col space-y-1">
            {otherItems.map((item) => (
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
        </>
      )}
    </div>
  );
}
