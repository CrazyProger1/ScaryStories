import React from "react";
import DefaultHeader from "../headers/DefaultHeader";
import DefaultFooter from "../footers/DefaultFooter";
import "../../styles/Page.css"

const PageWrapper = ({children, ...props}) =>
    <div className={"page"}>
        <DefaultHeader/>
        <div className="container">
            {children}
        </div>
        <DefaultFooter/>
    </div>

export default PageWrapper;