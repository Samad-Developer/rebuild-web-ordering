import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Checkout from "../pages/Checkout";
import Feedback from "../pages/Feedback";
import PrivacyPolicy from "../pages/PrivacyPolicy";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
  );
};

export default AppRoutes;
