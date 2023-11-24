import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import PageWrapper from "./PageWrapper";
import StoriesTable from "../tables/StoriesTable";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import {inject, observer} from "mobx-react";


const CategoryPage = inject("storiesStore")(observer(({storiesStore, ...props}) => {
    const {id: categoryId} = useParams();
    const navigate = useNavigateCustom();

    useEffect(
        () => {
            storiesStore.loadStories(categoryId);
        },
        []
    )


    const handleStoryChoose = (story) =>
        navigate("/story/" + story.id);


    return (
        <PageWrapper>
            <div className="mt-5">
                <StoriesTable stories={storiesStore.stories} onChoose={handleStoryChoose}/>
            </div>
        </PageWrapper>
    );
}));

export default CategoryPage;