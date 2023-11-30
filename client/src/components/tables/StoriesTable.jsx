import React from 'react';
import StoryCard from "../cards/StoryCard";
import "../../styles/Stories.css"

const StoriesTable = ({stories, onChoose, onEdit, onDelete, ...props}) => {
    return (
        <div className="story-table">
            <div className="row">
                {stories.map((story) => (
                    <StoryCard
                        story={story}
                        onChoose={onChoose}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default StoriesTable;