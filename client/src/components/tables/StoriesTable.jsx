import React, {useEffect, useState} from 'react';
import StoryCard from "../cards/StoryCard";
import "../../styles/Stories.css"
import {inject, observer} from "mobx-react";

const StoriesTable = inject("storiesStore", "authStore")(observer(({
                                                                       stories,
                                                                       storiesStore,
                                                                       authStore,
                                                                       ...props
                                                                   }) => {
    return (
        <div className="story-table">
            <div className="row">
                {stories.map((story) => (
                    <div className="col-md-4 mb-4">
                        <StoryCard
                            key={story.id}
                            story={story}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}));


export default StoriesTable;