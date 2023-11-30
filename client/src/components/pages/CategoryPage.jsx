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
    const [createModalShow, setCreateModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [defaultEditModalData, setDefaultEditModalData] = useState({name: "", pictureUrl: "", story: ""});

    useEffect(
        () => {
            storiesStore.loadStories(categoryId);
        },
        []
    )


    const handleStoryChoose = (story) =>
        navigate("/story/" + story.id);

    const handleStoryDeleteButtonClick = (story) => {
        storiesStore.deleteStory(story.id)
    }

    const handleStoryEditButtonClick = (story) => {
        setEditModalShow(true);
        setDefaultEditModalData({
            name: story.name,
            pictureUrl: story.picture_url,
            id: story.id,
            story: story.story
        });
    }


    const handleAddStoryButtonClick = () =>
        setCreateModalShow(true);

    const handleStoryAdd = (data) => {
        setCreateModalShow(false);
        storiesStore.createStory(
            data.name,
            data.pictureUrl,
            data.story,
            categoryId
        )
    }

    const handleStoryEdit = (data) => {
        setEditModalShow(false);
        storiesStore.updateStory(data.id, data.name, data.pictureUrl, data.story);
    }

    return (
        <PageWrapper>
            {authStore.isAuthorized && !isNaN(parseInt(categoryId)) ? <div className="mt-5">
                <AddButton onClick={handleAddStoryButtonClick}/>
            </div> : <div/>}

            <div className="mt-5">
                <StoriesTable
                    stories={storiesStore.stories}
                    onChoose={handleStoryChoose}
                    onEdit={handleStoryEditButtonClick}
                    onDelete={handleStoryDeleteButtonClick}
                />
            </div>
            <StoryCreateUpdateModal
                show={createModalShow}
                onSubmit={handleStoryAdd}
                onClose={() => setCreateModalShow(false)}
                title="Story Creation"
                buttonText="Add"
            />
            <StoryCreateUpdateModal
                defaultData={defaultEditModalData}
                show={editModalShow}
                onSubmit={handleStoryEdit}
                onClose={() => setEditModalShow(false)}
                title="Story Edition"
                buttonText="Save"
            />
        </PageWrapper>
    );
}));

export default CategoryPage;