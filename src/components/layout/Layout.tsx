import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CustomCursor } from "../ui/custom-cursor";
import ScrollToTop from "./ScrollToTop";

export function Layout() {
  return (
    <div className="relative bg-background min-h-screen flex flex-col text-foreground overflow-x-hidden">
      <ScrollToTop />
      <CustomCursor />
      <Navbar />
      <div className="flex-1 w-full relative z-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
