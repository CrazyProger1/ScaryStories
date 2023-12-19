import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PageWrapper from "./PageWrapper";
import StoriesTable from "../tables/StoriesTable";
import {inject, observer} from "mobx-react";
import AddButton from "../buttons/AddButton";
import StoryCreateUpdateModal from "../modals/StoryCreateUpdateModal";
import {set} from "mobx";


const CategoryPage = inject("storiesStore", "authStore", "categoriesStore")(observer(({
                                                                                          storiesStore,
                                                                                          authStore,
                                                                                          categoriesStore,
                                                                                          ...props
                                                                                      }) => {
    const {id: categoryId} = useParams();
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [category, setCategory] = useState({name: ""});


    useEffect(
        () => {
            storiesStore.readStories(categoryId, null);

            categoriesStore.categories.map(cat => {
                if (cat.id === parseInt(categoryId)) {
                    setCategory(cat);
                }
            })

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

    const {name} = category;

    return (
        <PageWrapper>
            <h1 className="text-center mt-5">#{name}</h1>

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
                title="Story Creating"
                buttonText="Add"
            />
        </PageWrapper>
    );
}));

export default CategoryPage;