import React from 'react';
import {useParams} from "react-router-dom";
import PageWrapper from "../components/PageWrapper";


const StoriesPage = () => {
    const {category} = useParams();

    return (
        <PageWrapper>
            <h1>Stories</h1>
        </PageWrapper>
    );
}


export default StoriesPage;