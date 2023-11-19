import React from 'react';
import Header from './headers/Header';
import Footer from './footers/Footer';
import "../styles/Page.css"

const PageWrapper = ({children, ...props}) =>
    <div>
        <Header/>
        <div className="container">
            {children}
        </div>
        <Footer/>
    </div>


export default PageWrapper;