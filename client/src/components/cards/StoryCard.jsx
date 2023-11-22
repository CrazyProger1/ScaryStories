import React from 'react';
import {BsCalendar2DateFill} from "react-icons/bs";
import {IoTimeSharp} from "react-icons/io5";


const StoryCard = ({story, onChoose, ...props}) => {
    const {name, image, author, category, rating, read_time_minutes: readTimeMin, date} = story;

    return (
        <div className="col-md-4 mb-4" onClick={() => onChoose(story)}>
            <div className="card story-card">
                <img
                    src={image}
                    className="card-img-top" alt={name}/>
                <div className="card-body">
                    <h5 className="card-title story-card-title">{name}</h5>
                    <p className="card-text">Author:&nbsp; {author.username}</p>
                    <p className="card-text">
                        <div>
                            Time to read:&nbsp;
                            {readTimeMin}m
                        </div>
                    </p>
                    <p className="card-text">
                        <div>
                            <BsCalendar2DateFill width="24" height="24"/>
                            November 16, 2023
                        </div>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;