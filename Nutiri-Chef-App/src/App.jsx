import { Outlet } from "react-router-dom";
import Navbar from './components/layout/Navigationbar';


function App() {

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>

    // <div className="min-h-screen bg-background p-4">
    //   <h1 className="text-3xl font-bold text-slate-800">Nutri-Chef Recipe App</h1>
    //   <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors">Test Button</button>
    // </div>
  )
}

export default App
