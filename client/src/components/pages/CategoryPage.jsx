import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PageWrapper from "./PageWrapper";
import StoriesTable from "../tables/StoriesTable";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import {inject, observer} from "mobx-react";
import AddButton from "../buttons/AddButton";
import StoryCreateUpdateModal from "../modals/StoryCreateUpdateModal";
import QuestionModal from "../modals/QuestionModal";


const CategoryPage = inject("storiesStore", "authStore")(observer(({storiesStore, authStore, ...props}) => {
    const {id: categoryId} = useParams();
    const navigate = useNavigateCustom();
    const [createModalShow, setCreateModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [defaultEditModalData, setDefaultEditModalData] = useState({name: "", pictureUrl: "", story: ""});
    const [questionModalVisible, setQuestionModalVisible] = useState(false);
    const [storyToDelete, setStoryToDelete] = useState(null);

    useEffect(
        () => {
            storiesStore.readStories(categoryId);
        },
        []
    )


    const handleStoryChoose = (story) =>
        navigate("/story/" + story.id);

    const handleStoryDeleteButtonClick = (story) => {
        setStoryToDelete(story);
        setQuestionModalVisible(true);
    }


    const handleStoryEditButtonClick = (story) => {
        setEditModalShow(true);
        storiesStore.readStory(story.id).then(story => {
            setDefaultEditModalData({
                name: story.name,
                pictureUrl: story.picture_url,
                id: story.id,
                story: story.story
            });
        })
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
        storiesStore.updateStory(
            data.id,
            data.name,
            data.pictureUrl,
            data.story
        );
    }

    const handleDeleteStory = () => {
        setQuestionModalVisible(false);
        if (storyToDelete)
            storiesStore.deleteStory(storyToDelete.id)
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
            <QuestionModal
                show={questionModalVisible}
                onClose={_ => setQuestionModalVisible(false)}
                title="Story Deleting"
                message="Are you sure?"
                onContinue={handleDeleteStory}
            />
        </PageWrapper>
    );
}));

export default CategoryPage;