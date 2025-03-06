import React from "react";
import Navbar from "./Navbar";
import Banner from "./Banner";
import Footer from "./Footer";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar with fixed positioning and z-index */}
      <header className="fixed w-full top-0 z-50">
        <Navbar />
      </header>

      {/* Main content with padding to avoid navbar/footer overlap */}
      <main className="flex-grow pt-6 pb-24 md:pb-16"> {/* Adjust padding based on header/footer height */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Banner />
          {/* Add other content sections here with proper spacing */}
        </div>
      </main>

      {/* Footer with proper spacing */}
      <footer className="border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </footer>
    </div>
  );
}

export default Home;