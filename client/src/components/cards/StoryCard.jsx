import React, {useState} from 'react';
import {BsCalendar2DateFill} from "react-icons/bs";
import {IoTimeSharp} from "react-icons/io5";
import {FaCommentDots, FaStar} from "react-icons/fa";
import {MdRemoveRedEye} from "react-icons/md";
import {Stack} from "react-bootstrap";


const StoryCard = ({story, onChoose, ...props}) => {
    const {name, picture_url: pictureUrl, author, views, category, rating, read_time: readTimeMin, date} = story;

    const [picSrc, setPicSrc] = useState(pictureUrl);

    const handleImageError = () =>
        setPicSrc(process.env.PUBLIC_URL + '/imgs/defaults/picture.jpg');


    return (
        <div className="col-md-4 mb-4" onClick={() => onChoose(story)}>
            <div className="card story-card">
                <img
                    src={picSrc}
                    className="card-img-top"
                    alt={name}
                    onErrorCapture={handleImageError}
                />
                <div className="card-body">
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
                                {readTimeMin}m
                            </div>

                        </Stack>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;