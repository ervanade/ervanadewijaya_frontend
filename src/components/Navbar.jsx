import React from "react";

export default function Navbar() {
  return (
    <header className="bg-[linear-gradient(90deg,#11191A_0%,#296377_100%)] border-b p-4 flex items-center justify-between text-white">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2">☰</button>
        <img alt="logo_ftl" src="/assets/logo.png" />
        <div className="text-lg text-white font-semibold">iMeeting</div>
      </div>
      <div className="flex items-center gap-4">
      <img alt="logo_ftl" src="/assets/profile.png" />
        <div className="text-sm">John Doe</div>
      </div>
    </header>
  );
}
