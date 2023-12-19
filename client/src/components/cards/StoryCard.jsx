import React, {useEffect, useState} from 'react';
import {BsCalendar2DateFill} from "react-icons/bs";
import {IoTimeSharp} from "react-icons/io5";
import {FaCommentDots, FaStar} from "react-icons/fa";
import {MdRemoveRedEye} from "react-icons/md";
import {Stack} from "react-bootstrap";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import {inject, observer} from "mobx-react";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import QuestionModal from "../modals/QuestionModal";
import StoryCreateUpdateModal from "../modals/StoryCreateUpdateModal";
import {PICTURE_NOT_AVAILABLE_SRC} from "../../constants/defaults";


const StoryCard = inject("authStore", "storiesStore")(observer(({
                                                                    authStore,
                                                                    storiesStore,
                                                                    story,
                                                                    ...props
                                                                }) => {

    const [pictureSrc, setPictureSrc] = useState(PICTURE_NOT_AVAILABLE_SRC);
    const [questionModalVisible, setQuestionModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [defaultEditModalData, setDefaultEditModalData] = useState({name: "", pictureUrl: "", story: ""});
    const navigate = useNavigateCustom();

    const {
        id,
        name,
        picture_url: pictureUrl,
        author,
        views,
        category,
        rating,
        read_time: readTimeMin,
        create_date: createDateTime
    } = story;

    useEffect(
        _ => {
            if (pictureUrl)
                setPictureSrc(pictureUrl);
            else
                setPictureSrc(PICTURE_NOT_AVAILABLE_SRC);
        },
        [pictureUrl]
    )


    const handleStoryDelete = () => {
        setQuestionModalVisible(false);
        storiesStore.deleteStory(id)
    }
    const handleStoryEdit = (data) => {
        setEditModalVisible(false);
        storiesStore.updateStory(
            data.id,
            data.name,
            data.pictureUrl,
            data.story
        );
    }


    const handleImageError = () =>
        setPictureSrc(PICTURE_NOT_AVAILABLE_SRC);


    const handleStoryChoose = () => {
        if (!questionModalVisible && !editModalVisible)
            navigate("/story/" + id)
    }

    const handleDeleteButtonClick = (event) => {
        event.stopPropagation();
        setQuestionModalVisible(true);
    }


    const handleEditButtonClick = (event) => {
        event.stopPropagation();
        setEditModalVisible(true);
        storiesStore.readStory(story.id).then(story => {
            setDefaultEditModalData({
                name: story.name,
                pictureUrl: story.picture_url,
                id: story.id,
                story: story.story
            });
        })
    }

    const date = createDateTime?.split("T")[0];
    const [year, month, day] = date ? date.split("-") : []


    return (
        <div className="card story-card" style={{cursor: "pointer"}} onClick={handleStoryChoose}>
            <img src={pictureSrc} className="card-img-top" alt={name} onErrorCapture={handleImageError}/>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title story-card-title">{name}</h5>
                <p className="card-text">Author:&nbsp; {author.nickname}</p>
                <p className="card-text">
                    <Stack direction="horizontal" gap={2}>
                        <div>
                            <BsCalendar2DateFill width="24" height="24"/>
                            {day}.{month}.{year}
                        </div>
                        <div>
                            <FaStar width="24" height="24"/>
                            {rating}
                        </div>
                        <div>
                            <MdRemoveRedEye width="24" height="24"/>
                            {views}
                        </div>
                        <div>
                            <IoTimeSharp width="24" height="24"/>
                            {readTimeMin.toFixed(2)}m
                        </div>
                        <div className="ms-auto mt-auto">
                            <Stack direction="horizontal">
                                {
                                    authStore.isAuthorized && (authStore.currentUser?.is_superuser || authStore.currentUser.id === author.id) ?
                                        <div className="ms-auto mt-auto"
                                             style={{display: 'flex', flexDirection: 'row'}}>
                                            <EditButton onClick={handleEditButtonClick}/>
                                            <DeleteButton onClick={handleDeleteButtonClick}/>
                                        </div> : <div/>
                                }
                            </Stack>
                        </div>
                    </Stack>
                </p>
            </div>
            <QuestionModal
                show={questionModalVisible}
                onClose={_ => setQuestionModalVisible(false)}
                title="Story Deleting"
                message="Are you sure?"
                onContinue={handleStoryDelete}
            />
            <StoryCreateUpdateModal
                defaultData={defaultEditModalData}
                show={editModalVisible}
                onSubmit={handleStoryEdit}
                onClose={() => setEditModalVisible(false)}
                title="Story Editing"
                buttonText="Save"
            />
        </div>
    );
}));

export default StoryCard;