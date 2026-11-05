import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Pieces from "./pages/Pieces";
import PiecePage from "./pages/Piece";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import CmsPieces from "./pages/CmsPieces";
import CmsPiece from "./pages/CmsPiece";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import ContactDock from "./components/ContactDock";
import { PageViews } from "./site";

/**
 * The site. The public pages share the header and the footer; the private
 * area is an application and brings its own shell (DashboardLayout), so it
 * sits outside them.
 */
export default function App() {
  return (
    <>
      <PageViews />
      <ScrollToTop />
      <Routes>
        <Route path="/cms" element={<CmsPieces />} />
        <Route path="/cms/new" element={<CmsPiece />} />
        <Route path="/cms/:id" element={<CmsPiece />} />
        <Route path="*" element={<PublicSite />} />
      </Routes>
    </>
  );
}

function PublicSite() {
  const { pathname } = useLocation();
  const hero = pathname === "/";
  return (
    <div className="flex min-h-screen flex-col bg-ground font-body text-ink">
      <SiteHeader over={hero} />
      <main className={`flex-1 ${hero ? "" : "pt-[var(--space-12)]"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pieces" element={<Pieces />} />
          <Route path="/pieces/:id" element={<PiecePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<Pieces />} />
        </Routes>
      </main>
      <SiteFooter />
      <ContactDock />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
