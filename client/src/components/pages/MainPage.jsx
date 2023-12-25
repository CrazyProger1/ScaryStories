import React, {useEffect} from 'react';
import PageWrapper from "./PageWrapper";
import {inject, observer} from "mobx-react";
import StoriesTable from "../tables/StoriesTable";

const MainPage = inject("storiesStore")(observer(({storiesStore, ...props}) => {

    useEffect(
        () => {
            storiesStore.readStories(null, null, true);
        },
        []
    )

    return (
        <PageWrapper>
            <h1 className="text-center mt-5">Most Viewed</h1>
            <div className="mt-5">
                <StoriesTable
                    stories={storiesStore.stories}
                />
            </div>
        </PageWrapper>
    );
}));

export default MainPage;