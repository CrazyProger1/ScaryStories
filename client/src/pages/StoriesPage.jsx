import React from 'react';
import PageWrapper from "../components/PageWrapper";

const CategoryPage = ({category, ...props}) => {
    console.log(category)
    return (
        <PageWrapper>
            <h1>Stories</h1>
        </PageWrapper>
    );
}


export default CategoryPage;