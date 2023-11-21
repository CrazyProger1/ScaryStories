import React from 'react';
import {useParams} from "react-router-dom";
import PageWrapper from "./PageWrapper";

const StoryPage = ({...props}) => {
    const {id: storyId} = useParams();

    return (
        <PageWrapper>
            <p>Story bla bla bla bla bla bla bla bla bla bla bla bla bla</p>
        </PageWrapper>
    );
};

export default StoryPage;