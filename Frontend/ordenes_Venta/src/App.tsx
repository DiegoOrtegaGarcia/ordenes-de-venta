import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import { Login } from './components/Login'
import './App.css'
import Home from './components/Home';

function App() {
  return(
    <div className='flex items-center gap-6 h-screen flex-col bg-background'>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login></Login>} />
          <Route path="/" element={<Home></Home>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
