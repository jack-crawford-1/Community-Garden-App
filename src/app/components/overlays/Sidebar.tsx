import { MouseEventHandler } from 'react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: MouseEventHandler<HTMLElement>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`fixed left-8 bottom-24 w-96 h-[450px] bg-green-600 bg-opacity-70 text-white rounded-lg shadow-lg p-6 z-50 transition-opacity duration-300
  ${isOpen ? 'block' : 'hidden'}`}
      >
        <h1 className="font-semibold text-2xl text-left mb-4">
          Welcome to Community Gardens
        </h1>

        <p className="text-md text-left leading-snug">
          Once signed in, click the map to register a new community garden.
        </p>

        <p className="text-md text-left leading-snug mt-3">
          Click on a marker to view key details, including location, rating, and
          a quick overview.
        </p>

        <p className="text-md text-left leading-snug mt-3">
          Select &apos;View More&apos; to explore the full garden page with
          photos, reviews, and additional information.
        </p>

        <p className="text-md text-left leading-snug mt-3">
          The map is currently focused on Wellington, New Zealand.
        </p>

        <p className="text-md text-left leading-snug mt-3">
          Garden data is sourced from Google Places and community contributions.
        </p>
      </div>

      <button
        onClick={toggleSidebar}
        className="fixed left-4 bottom-10 bg-green-500 text-white px-4 py-2 rounded shadow-md transition hover:bg-green-600 z-50 bg-opacity-60"
      >
        {isOpen ? 'Hide' : 'Show'} details overlay
      </button>
    </>
  );
};

export default Sidebar;
