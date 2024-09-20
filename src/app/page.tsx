import { MapComponent } from './components/map/MapComponent';
import LoginButton from './components/auth/LoginButton';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row items-center justify-between p-2 bg-white shadow-md">
        <Link href="/about">
          <div className="md:ml-5 bg-blue-500 text-blue-100 py-1 px-3 rounded hover:bg-blue-100 border-4 border-blue-800 hover:text-blue-800">
            Project Overview
          </div>
        </Link>
        <Link href="/locations">
          <div className="md:ml-5 bg-slate-800 text-blue-100 py-1 px-3 rounded hover:bg-blue-100 border-4 border-green-800 hover:text-blue-800">
            sites list
          </div>
        </Link>
        <LoginButton />
      </div>
      <main className="flex-grow">
        <MapComponent />
      </main>
    </div>
  );
}
