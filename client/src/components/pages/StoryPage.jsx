import React from 'react';
import {useParams} from "react-router-dom";
import PageWrapper from "./PageWrapper";

const StoryPage = ({...props}) => {
    const {id: storyId} = useParams();

    return (
        <PageWrapper>
            <h1 className="mt-5 text-center">Some scary story</h1>
            <p className="mt-5">Very very scary story bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
                bla bla
                bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla bla
                bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla
                bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla
                bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla
                bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla
                bla bla bla bla bla bla bla</p>
        </PageWrapper>
    );
};

export default StoryPage;