import React from 'react';
import StoryCard from "../cards/StoryCard";
import "../../styles/Stories.css"

const StoriesTable = ({stories, onChoose, ...props}) => {
    return (
        <div className="story-table mt-4">
            <div className="row">
                {stories.map((story) => (
                    <StoryCard story={story} onChoose={onChoose}/>
                ))}
            </div>
        </div>
    );
};

export default StoriesTable;