/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import 'react-simple-color-picker-design/styles/base.css'
// import if not using Tailwind /!\
import 'react-simple-color-picker-design/styles/withoutTailwind.css'
// import one theme if not using daisyUI /!\
import 'react-simple-color-picker-design/styles/light.css'

import SimpleColorPicker from 'react-simple-color-picker-design'
import Picker from './components/colorpk'

function App() {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState('#9adedb')

  return (
    <div className='App'>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
      <div style={{ margin: '50px' }}></div>
      <Picker defaultColor={color} setColor={setColor} />

      <div style={{ margin: '50px' }}></div>

      <Picker
        labelOne='Yayy'
        colorList={[
          'red',
          'green',
          'blue',
          'white',
          '#9adedb',
          '#aa9499',
          '#aaf0d1',
          '#b2fba5',
          '#b39eb5',
          '#bdb0d0',
          '#bee7a5',
          '#befd73',
          '#c1c6fc',
          '#c6a4a4',
          '#ff9899',
          '#ffb7ce',
          '#ca9bf7',
        ]}
        labelTwo='Custom List !'
        defaultColor='#aaf0d1' // Base selected color
        setColor={setColor} // Update state
      />

      <SimpleColorPicker
        labelOne='Yayy'
        colorList={[
          'red',
          'green',
          'blue',
          'white',
          '#9adedb',
          '#aa9499',
          '#aaf0d1',
          '#b2fba5',
          '#b39eb5',
          '#bdb0d0',
          '#bee7a5',
          '#befd73',
          '#c1c6fc',
          '#c6a4a4',
          '#ff9899',
          '#ffb7ce',
          '#ca9bf7',
        ]}
        nativePicker={false} // Swith to native html color picker
        labelTwo='Custom List !'
        defaultColor='#aaf0d1' // Base selected color
        setColor={setColor} // Update state
      />
    </div>
  )
}

export default App
