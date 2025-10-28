import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className=" bg-white shadow-md hidden md:block">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="block px-3 py-3 rounded hover:bg-primary bg-primary rounded-[5px]">
            <img alt="icon_home" src="/assets/icons/home.png" />
            </Link>
          </li>
          <li>
            <Link
              to="/add"
              className="block px-3 py-3 rounded hover:bg-gray-50 rounded-[5px]"
            >
                         <img alt="icon_tambah" src="/assets/icons/user.png" />
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
