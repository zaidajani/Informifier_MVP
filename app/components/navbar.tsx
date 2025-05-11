import Link from "next/link";
import { Poppins } from "next/font/google";

const PoppinsFontBold = Poppins({
  weight: "700",
  subsets: ["latin"],
});

const PoppinsFontMedium = Poppins({
  weight: "400",
  subsets: ["latin"],
});

interface NavbarProps {
  buttonText?: string;
  link?: string;
}

const Navbar = ({ buttonText, link = "#" }: NavbarProps) => {
  return (
    <div className="h-18 border-b-[0.5px] border-[#C8CBD9] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-7xl">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <div
            className={`bg-[#5A67BA] w-9 h-9 rounded-4xl text-white text-center p-1.5 font-bold ${PoppinsFontBold.className}`}
          >
            I
          </div>
          <div className={`text-[#5A67BA] font-bold ${PoppinsFontBold.className}`}>
            INFORMIFIER
          </div>
        </div>

        {/* Navigation */}
        <nav className={`hidden md:flex space-x-6 text-sm text-[#273240] ${PoppinsFontMedium.className}`}>
          <Link href="#home">Home</Link>
          <Link href="#about">About</Link>
          <Link href="#waitlist">Pricing</Link>
          <Link href="#waitlist">Contact</Link>
        </nav>

        {/* CTA Button (conditionally rendered) */}
        {buttonText && (
          <Link href={link}>
            <div
              className={`bg-[#F1F2FC] w-40 h-12 rounded-md flex items-center justify-center ${PoppinsFontMedium.className} text-sm text-[#5A6ACF] hover:bg-[#E5E9FF] cursor-pointer`}
            >
              {buttonText}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
