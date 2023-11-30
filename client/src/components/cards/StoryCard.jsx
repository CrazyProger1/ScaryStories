import React, {useEffect, useState} from 'react';
import {BsCalendar2DateFill} from "react-icons/bs";
import {IoTimeSharp} from "react-icons/io5";
import {FaCommentDots, FaStar} from "react-icons/fa";
import {MdRemoveRedEye} from "react-icons/md";
import {Stack} from "react-bootstrap";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";


const StoryCard = ({story, onChoose, onEdit, onDelete, ...props}) => {
    const {name, picture_url: pictureUrl, author, views, category, rating, read_time: readTimeMin, date} = story;

    const [picSrc, setPicSrc] = useState(pictureUrl);

    useEffect(
        _ => {
            if (picSrc === null)
                setPicSrc(process.env.PUBLIC_URL + '/imgs/defaults/picture.jpg');
        },
        [picSrc]
    )

    const handleImageError = () =>
        setPicSrc(process.env.PUBLIC_URL + '/imgs/defaults/picture.jpg');

    const handleEditButtonClick = (event) => {
        event.stopPropagation();
        onEdit(story);
    }

    const handleDeleteButtonClick = (event) => {
        event.stopPropagation();
        onDelete(story);
    }


    return (
        <div className="card story-card" style={{cursor: "pointer"}} onClick={() => onChoose(story)}>
            <img src={picSrc} className="card-img-top" alt={name} onErrorCapture={handleImageError}/>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title story-card-title">{name}</h5>
                <p className="card-text">Author:&nbsp; {author.nickname}</p>
                <p className="card-text">
                    <Stack direction="horizontal" gap={2}>
                        <div>
                            <BsCalendar2DateFill width="24" height="24"/>
                            {date}
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
                                <EditButton onClick={handleEditButtonClick}/>
                                <DeleteButton onClick={handleDeleteButtonClick}/>
                            </Stack>
                        </div>
                    </Stack>
                </p>
            </div>
        </div>
    );
};

export default StoryCard;