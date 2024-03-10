import { useEffect } from 'react'
import http from "../http";
import './App.css'

function App() {
  useEffect(() => {
    http.get("/tutorials");
  }, [])
  return (
    <div className='fixed left-0 top-0 w-screen h-screen bg-black'></div>
  )
}

export default App
