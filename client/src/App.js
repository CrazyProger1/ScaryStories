import {Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import MainPage from "./components/pages/MainPage";


const App = () =>
    <div className='App'>
        <Routes>
            <Route path='/' element={<MainPage/>}/>
        </Routes>
    </div>


export default App;
