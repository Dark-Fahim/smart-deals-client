import React from "react";
import { FiSearch } from "react-icons/fi";

const Banner = () => {
  return (
    <section className="relative bg-linear-to-r from-[#f9f7ff] via-[#f6f3ff] to-[#f3f9ff] overflow-hidden py-20 px-4 text-center">
      {/* Decorative Background Shapes */}
      <div className="absolute left-0 top-0 w-64 h-64 rounded-full blur-3xl opacity-40 bg-[#9F62F2]/40"></div>
      <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full blur-3xl opacity-40 bg-[#632EE3]/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
          Deal Your{" "}
          <span className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
            Products
          </span>
          <br />
          In A{" "}
          <span className="bg-linear-to-r from-[#9F62F2] to-[#632EE3] bg-clip-text text-transparent">
            Smart
          </span>{" "}
          Way !
        </h1>

        <p className="text-gray-500 mt-4 text-sm md:text-base">
          SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex justify-center">
          <div className="flex w-full max-w-xl bg-white shadow-md rounded-full overflow-hidden border border-gray-200">
            <input
              type="text"
              placeholder="search For Products, Categories..."
              className="grow px-5 py-3 outline-none text-sm text-gray-700"
            />
            <button className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white px-5 flex items-center justify-center">
              <FiSearch className="text-xl" />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button className="bg-linear-to-r from-[#632EE3] to-[#9F62F2] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition-all">
            Watch All Products
          </button>
          <button className="border border-[#9F62F2] text-[#632EE3] px-6 py-3 rounded-lg font-semibold hover:bg-[#f5f0ff] transition-all">
            Post an Product
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
