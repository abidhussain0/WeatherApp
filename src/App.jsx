import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UilReact from '@iconscout/react-unicons/icons/uil-react'

import Weather2 from './Weather2'
import New from './New'



function App() {
  const [count, setCount] = useState(0)

  return (
    < >
      <UilReact size="140" color="#61DAFB"></UilReact>
      <New></New>
    </>
  )
}

export default App
