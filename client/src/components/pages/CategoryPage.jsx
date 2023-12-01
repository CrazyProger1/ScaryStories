import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PageWrapper from "./PageWrapper";
import StoriesTable from "../tables/StoriesTable";
import {inject, observer} from "mobx-react";
import AddButton from "../buttons/AddButton";
import StoryCreateUpdateModal from "../modals/StoryCreateUpdateModal";


const CategoryPage = inject("storiesStore", "authStore")(observer(({storiesStore, authStore, ...props}) => {
    const {id: categoryId} = useParams();
    const [createModalVisible, setCreateModalVisible] = useState(false);


    useEffect(
        () => {
            storiesStore.readStories(categoryId, null);
        },
        []
    )

    const handleAddStoryButtonClick = () =>
        setCreateModalVisible(true);

    const handleStoryAdd = (data) => {
        setCreateModalVisible(false);
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
                <StoriesTable
                    stories={storiesStore.stories}
                />
            </div>
            <StoryCreateUpdateModal
                show={createModalVisible}
                onSubmit={handleStoryAdd}
                onClose={() => setCreateModalVisible(false)}
                title="Story Creation"
                buttonText="Add"
            />
        </PageWrapper>
    );
}));

export default CategoryPage;