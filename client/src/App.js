import {Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "./styles/Fonts.css";
import MainPage from "./components/pages/MainPage";
import CategoriesPage from "./components/pages/CategoriesPage";
import AboutPage from "./components/pages/AboutPage";
import CategoryPage from "./components/pages/CategoryPage";
import StoryPage from "./components/pages/StoryPage";
import ProfilePage from "./components/pages/ProfilePage";


const App = () =>
    <div className='App'>
        <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/about' element={<AboutPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/categories' element={<CategoriesPage/>}/>
            <Route path='/category/:id' element={<CategoryPage/>}/>
            <Route path='/story/:id' element={<StoryPage/>}/>

        </Routes>
    </div>


export default App;
