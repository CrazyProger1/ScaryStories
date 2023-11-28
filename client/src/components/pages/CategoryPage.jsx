import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import PageWrapper from "./PageWrapper";
import StoriesTable from "../tables/StoriesTable";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import {inject, observer} from "mobx-react";
import AddButton from "../buttons/AddButton";


const CategoryPage = inject("storiesStore", "authStore")(observer(({storiesStore, authStore, ...props}) => {
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


    const handleAddStoryButtonClick = () => {

    }
    return (
        <PageWrapper>
            {authStore.isAuthorized && !isNaN(parseInt(categoryId)) ? <div className="mt-5">
                <AddButton onClick={handleAddStoryButtonClick}/>
            </div> : <div/>}

            <div className="mt-5">
                <StoriesTable stories={storiesStore.stories} onChoose={handleStoryChoose}/>
            </div>
        </PageWrapper>
    );
}));

export default CategoryPage;