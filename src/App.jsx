import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Exhibitions from "./pages/exhibitions/Exhibitions";
import Visit from "./pages/visit/Visit";
import PrivacyPolicy from "./pages/policy/PrivacyPolicy";
import CookiesPolicy from "./pages/policy/CookiesPolicy";
import Terms from "./pages/policy/Terms";
import Contact from "./pages/policy/Contact";

function App() {
  return (
    <BrowserRouter>
      <Header />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/exhibitions" element={<Exhibitions />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;