import {Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/App.css';
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProfilePage from "./pages/ProfilePage";
import StoriesPage from "./pages/StoriesPage";
import StoryPage from "./pages/StoryPage";


const App = () =>
    <div className='App'>
        <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/categories' element={<CategoriesPage/>}/>
            <Route path='/stories/:category' element={<StoriesPage/>}/>
            <Route path='/story/:id' element={<StoryPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
    </div>


export default App;
