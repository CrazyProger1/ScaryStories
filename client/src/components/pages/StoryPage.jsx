import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import PageWrapper from "./PageWrapper";
import {Stack} from "react-bootstrap";
import {FaStar} from "react-icons/fa";
import {MdRemoveRedEye} from "react-icons/md";
import {IoTimeSharp} from "react-icons/io5";
import {FaCommentDots} from "react-icons/fa";
import {BsCalendar2DateFill} from "react-icons/bs";
import {inject, observer} from "mobx-react";
import useNavigateCustom from "../../hooks/useNavigateCustom";


const StoryPage = inject("storiesStore")(observer(({storiesStore, ...props}) => {
    const {id: storyIdOrRandom} = useParams();
    const [story, setStory] = useState({});
    const navigate = useNavigateCustom();

    useEffect(
        () => {
            storiesStore.readStory(storyIdOrRandom).then((result) => {
                if (result)
                    setStory(result);
            }).catch(error => {
                navigate("/");
            });

        },
        []
    )

    const {id, story: content, name, rating, views, read_time: readTime, author, create_date: createDateTime} = story;
    const date = createDateTime?.split("T")[0];

    const months = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
    };
    const [year, month, day] = date ? date.split("-") : []


    return (
        <PageWrapper>
            <h1 className="mt-5 text-center">{name}</h1>
            <div className="d-flex justify-content-center mt-3">
                <Stack direction="horizontal" gap={2}>

                    <div>
                        <BsCalendar2DateFill width="24" height="24"/>
                        {months[parseInt(month)]} {day}, {year}
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
                <Link className="text-white hover:underline"
                      to={"/author/" + author?.id}>
                    {author?.nickname}
                </Link>
            </div>
            <p className="mt-5">{content}</p>
        </PageWrapper>
    );
}));

export default StoryPage;