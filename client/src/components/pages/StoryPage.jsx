import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PageWrapper from "./PageWrapper";
import {Stack} from "react-bootstrap";
import {FaStar} from "react-icons/fa";
import {MdRemoveRedEye} from "react-icons/md";
import {IoTimeSharp} from "react-icons/io5";
import {FaCommentDots} from "react-icons/fa";
import {BsCalendar2DateFill} from "react-icons/bs";
import {inject, observer} from "mobx-react";


const StoryPage = inject("storiesStore")(observer(({storiesStore, ...props}) => {
    const {id: storyIdOrRandom} = useParams();
    const [story, setStory] = useState({});

    useEffect(
        () => {
            storiesStore.loadStory(storyIdOrRandom).then((result) => {
                if (result)
                    setStory(result);
            });
        },
        []
    )

    const {id, story: content, name, rating, views, read_time: readTime, author} = story;

    return (
        <PageWrapper>
            <h1 className="mt-5 text-center">{name}</h1>
            <div className="d-flex justify-content-center mt-3">
                <Stack direction="horizontal" gap={2}>

                    <div>
                        <BsCalendar2DateFill width="24" height="24"/>
                        November 16, 2023
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
                        <FaCommentDots width="24" height="24"/>
                        0
                    </div>
                    <div>
                        <IoTimeSharp width="24" height="24"/>
                        {readTime}m
                    </div>

                </Stack>
            </div>
            <div className="text-md ml-2 text-center mt-3">
                by&nbsp;
                <a className="text-white hover:underline"
                   href="https://creepypasta.org/u/10759/arkworthy">
                    {author?.nickname}
                </a>
            </div>
            <p className="mt-5">{content}</p>
        </PageWrapper>
    );
}));

export default StoryPage;