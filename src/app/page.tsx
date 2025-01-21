import { MapComponent } from './components/map/MapComponent';
import LoginButton from './components/auth/LoginButton';

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row items-center justify-between p-2 bg-white shadow-md pl-8 pr-10">
        <LoginButton />
      </div>
      <main className="flex-grow">
        <MapComponent />
      </main>
    </div>
  );
}
