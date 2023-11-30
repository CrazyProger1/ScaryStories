import React from 'react';
import StoryCard from "../cards/StoryCard";
import "../../styles/Stories.css"
import {observer} from "mobx-react";

const StoriesTable = observer(({stories, onChoose, onEdit, onDelete, ...props}) =>
    <div className="story-table">
        <div className="row">
            {stories.map((story) => (
                <div className="col-md-4 mb-4">
                    <StoryCard
                        key={story.id}
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


export default StoriesTable;