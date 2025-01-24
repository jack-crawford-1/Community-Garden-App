'use client';

import { useState } from 'react';
import { MapComponent } from './components/map/MapComponent';
import LoginButton from './components/auth/LoginButton';
import Sidebar from './components/overlays/Sidebar';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleViewSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-1 bg-white shadow-md pl-8 pr-10">
        <h1 className="text-2xl font-semibold">Community Gardens</h1>
        <div className="ml-auto">
          <LoginButton />
        </div>
      </div>

      <main className="flex-grow">
        <MapComponent />
      </main>

      <Sidebar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
    </div>
  );
}
