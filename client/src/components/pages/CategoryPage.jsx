import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PageWrapper from "./PageWrapper";
import StoriesTable from "../tables/StoriesTable";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import {inject, observer} from "mobx-react";
import AddButton from "../buttons/AddButton";
import StoryCreateUpdateModal from "../modals/StoryCreateUpdateModal";


const CategoryPage = inject("storiesStore", "authStore")(observer(({storiesStore, authStore, ...props}) => {
    const {id: categoryId} = useParams();
    const navigate = useNavigateCustom();
    const [modalShow, setModalShow] = useState(false);

    useEffect(
        () => {
            storiesStore.loadStories(categoryId);
        },
        []
    )


    const handleStoryChoose = (story) =>
        navigate("/story/" + story.id);


    const handleAddStoryButtonClick = () =>
        setModalShow(true);

    const handleStoryAdd = (data) => {
        setModalShow(false);
        storiesStore.createStory(
            data.name,
            data.pictureUrl,
            data.story,
            categoryId
        )
    }

    return (
        <PageWrapper>
            {authStore.isAuthorized && !isNaN(parseInt(categoryId)) ? <div className="mt-5">
                <AddButton onClick={handleAddStoryButtonClick}/>
            </div> : <div/>}

            <div className="mt-5">
                <StoriesTable stories={storiesStore.stories} onChoose={handleStoryChoose}/>
            </div>
            <StoryCreateUpdateModal
                show={modalShow}
                onSubmit={handleStoryAdd}
                onClose={() => setModalShow(false)}
                title="Story Creation"
                buttonText="Add"
            />
        </PageWrapper>
    );
}));

export default CategoryPage;