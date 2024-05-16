import { MapComponent } from './components/map/MapComponent'
import LoginButton from './components/auth/LoginButton'

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex-none bg-white">
        <LoginButton />
      </header>
      <main className="flex-grow">
        <MapComponent />
      </main>
    </div>
  )
}
