import React from 'react';
import DefaultHeader from "../headers/DefaultHeader";
import DefaultFooter from "../footers/DefaultFooter";

const PageWrapper = ({children, ...props}) =>
    <div>
        <DefaultHeader/>
        <div className="container">
            {children}
        </div>
        <DefaultFooter/>
    </div>

export default PageWrapper;