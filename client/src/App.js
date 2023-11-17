import {Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/App.css';
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import CategoriesPage from "./pages/CategoriesPage";


const App = () =>
    <div className='App'>
        <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/categories' element={<CategoriesPage/>}/>
        </Routes>
    </div>


export default App;
