
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Token from './components/Token';

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}>
        </Route>
        <Route path="/token/meta" element={<Token />}>
        </Route>
      </Routes>
    </>
  )
}

export default App
