import React from 'react';
import StoryCard from "../cards/StoryCard";
import "../../styles/Stories.css"

const StoriesTable = ({stories, onChoose, onEdit, onDelete, ...props}) => {
    return (
        <div className="story-table">
            <div className="row">
                {stories.map((story) => (
                    <div className="col-md-4 mb-4">
                        <StoryCard
                            story={story}
                            onChoose={onChoose}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoriesTable;