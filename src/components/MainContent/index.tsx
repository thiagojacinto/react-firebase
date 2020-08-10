import React from "react";
import Footer from "../Footer";

export const MainContent: React.FC = ({ children }) => {
  return (
    <section>
      {children}
      <Footer />
    </section>
  );
};

export default MainContent;
