import React from 'react';

const StoryCard = ({story, onChoose, ...props}) => {
    const {name, image, author, category, rating, read_time_minutes: readTimeMin, date} = story;

    return (
        <div className="col-md-4 mb-4" onClick={() => onChoose(story)}>
            <div className="card story-card">
                <img
                    src={image}
                    className="card-img-top story-card-img" alt={name}/>
                <div className="card-body">
                    <h5 className="card-title story-card-title">{name}</h5>
                    <p className="card-text">Hello bla bla bla</p>
                    <p className="card-text">Author:</p>
                    <p className="card-text">Time to read: {readTimeMin}m</p>
                    <p className="card-text">Date: {date}</p>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;