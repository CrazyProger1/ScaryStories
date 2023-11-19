import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import UIStore from "./stores/UIStore";
import { Provider } from 'mobx-react';


const stores = {
    uiStore: new UIStore()
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider {...stores}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);