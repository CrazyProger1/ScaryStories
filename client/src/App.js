import {Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/App.css';
import Main from "./pages/Main";
import About from "./pages/About";
import Categories from "./pages/Categories";


const App = () =>
    <div className='App'>
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/categories' element={<Categories/>}/>
        </Routes>
    </div>


export default App;
