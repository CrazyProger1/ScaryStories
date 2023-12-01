import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {inject, observer} from "mobx-react";
import PageWrapper from "./PageWrapper";
import StoriesTable from "../tables/StoriesTable";

const AuthorStoriesPage = inject("storiesStore")(observer(({storiesStore, ...props}) => {
    const {id: authorId} = useParams();

    useEffect(
        () => {
            storiesStore.readStories(null, authorId);
        },
        []
    )


    return (
        <PageWrapper>
            <div className="mt-5">
                <StoriesTable
                    stories={storiesStore.stories}
                />
            </div>
        </PageWrapper>
    );
}));

export default AuthorStoriesPage;