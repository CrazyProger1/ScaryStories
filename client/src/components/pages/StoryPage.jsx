import React from 'react';
import {useParams} from "react-router-dom";
import PageWrapper from "./PageWrapper";
import {Stack} from "react-bootstrap";
import {FaStar} from "react-icons/fa";
import {MdRemoveRedEye} from "react-icons/md";
import {IoTimeSharp} from "react-icons/io5";
import {FaCommentDots} from "react-icons/fa";
import {BsCalendar2DateFill} from "react-icons/bs";

const StoryPage = ({...props}) => {
    const {id: storyId} = useParams();

    const {id, story, name, author, category, created_date, rating, read_time} = {
        id: 1,
        story: "Very very scary story bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla\n" +
            "                bla bla bla bla bla bla bla bla bla bla bla bla bla\n" +
            "                bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla\n" +
            "                bla bla\n" +
            "                bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla\n" +
            "                bla bla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla bla\n" +
            "                bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla\n" +
            "                bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla\n" +
            "                bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla\n" +
            "                bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla\n" +
            "                bla bla bla bla bla bla bla",
        name: "Some scary story",
        author: {
            id: 1,
            email: "crazyproger1@gmail.com",
            username: "crazyproger1"
        },
        category: {
            id: 1,
            name: "Abandoned Buildings"
        },
        created_date: "22.11.2023",
        rating: {
            rating: 4.3,
        },
        read_time: 0.5
    }

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
                        {rating.rating}
                    </div>


                    <div>
                        <MdRemoveRedEye width="24" height="24"/>
                        71
                    </div>


                    <div>
                        <FaCommentDots width="24" height="24"/>
                        1
                    </div>
                    <div>
                        <IoTimeSharp width="24" height="24"/>
                        {read_time}m
                    </div>

                </Stack>
            </div>
            <div className="text-md ml-2 text-center mt-3">
                by&nbsp;
                <a className="text-white hover:underline"
                   href="https://creepypasta.org/u/10759/arkworthy">
                    {author.username}
                </a>
            </div>
            <p className="mt-5">{story}</p>
        </PageWrapper>
    );
};

export default StoryPage;