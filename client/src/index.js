import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import uiStore from "./stores/UIStore";
import authStore from "./stores/AuthStore"
import categoriesStore from "./stores/CategoriesStore"
import storiesStore from "./stores/StoriesStore"
import {Provider} from 'mobx-react';


const stores = {
    uiStore: uiStore,
    authStore: authStore,
    categoriesStore: categoriesStore,
    storiesStore: storiesStore
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