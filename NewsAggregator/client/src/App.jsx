import { useState } from "react";
import "./App.css";
import Login from "./pages/login";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
// import Footer from "./components/Footer";
import TopHeadlines from "./components/TopHeadlines";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import CountryNews from "./components/CountryNews";

function AppContent() {
  const location = useLocation();
  
  // Hide Header on login (or add more routes if needed)
  const hideHeader = location.pathname === "/";

  return (
    <div className="w-full">
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/all-news" element={<AllNews />} />
        <Route path="/top-headlines/:category" element={<TopHeadlines />} />
        <Route path="/country/:iso" element={<CountryNews />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
