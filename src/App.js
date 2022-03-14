import './App.css';
import {AppProvider} from './contest'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Error from './components/Error'
import Country from './components/Country';

function App() {

  return (
    <AppProvider>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navbar/>}>
              <Route index element={<Home />}></Route>
              <Route path='country/:country' element={<Country/>}></Route>
              <Route path='*' element={<Error />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
    </AppProvider>
  );
}

export default App;
