import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 border-b flex items-center gap-2">
        <div className="text-xl font-bold">FTL iMeeting</div>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="block px-3 py-2 rounded hover:bg-gray-50">
              Daftar Booking
            </Link>
          </li>
          <li>
            <Link
              to="/add"
              className="block px-3 py-2 rounded hover:bg-gray-50"
            >
              Tambah Booking
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
