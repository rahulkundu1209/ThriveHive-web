import React from "react";

const menu = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Worksheet", path: "/worksheet", extraClass: "text-[#333] font-semibold" },
  { id: 3, name: "About", path: "/about" }
];

export const Navbar = () => {
  return (
    <nav className="bg-[#6194b3] shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-[#FFD700] drop-shadow-md">
            Thrive Hives
          </h1>
        </div>
        
        {/* Navigation Links */}
        <div>
          <ul className="flex space-x-6 text-white font-medium">
            {menu.map((item) => (
              <li key={item.id}>
                <a
                  href={item.path}
                  className={`hover:text-[#E6C200] cursor-pointer transition duration-300 ${item.extraClass || ""}`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Login Button */}
        <div>
          <a href="/login">
            <button className="bg-gradient-to-r from-green-500 to-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition transform hover:-translate-y-1 shadow-md hover:shadow-lg">
              Login
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
