import { useState } from 'react'
import './App.css'
import Valentines from './components/pages/Valentines'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Valentines />
      </div>
    </>
  )
}

export default App
