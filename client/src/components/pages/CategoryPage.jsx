import React from 'react';
import {useParams} from "react-router-dom";
import PageWrapper from "./PageWrapper";
import StoriesTable from "../tables/StoriesTable";
import useNavigateCustom from "../../hooks/useNavigateCustom";

const stories = [
    {
        id: 1,
        name: "Scary Story #1",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkodjAtKyrUFKt7QE7UjG3VwbiiV72fhWCcA&usqp=CAU",
        author: {
            username: "crazyproger1"
        },
        category: {},
        rating: 3.5,
        read_time_minutes: 10,
        date: "20.11.2023"
    },
    {
        id: 2,
        name: "Scary Story #2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMUwmEjQHjRrKq2-jifQKvLujNOFUm2d8qhQ&usqp=CAU",
        author: {
            username: "Abc"
        },
        category: {},
        rating: 4.5,
        read_time_minutes: 3.5,
        date: "23.11.2023"
    },
];

const CategoryPage = () => {
    const {id: categoryId} = useParams();
    const navigate = useNavigateCustom();


    const handleStoryChoose = (story) =>
        navigate("/story/" + story.id);


    return (
        <PageWrapper>
            <div className="mt-5">
                <StoriesTable stories={stories} onChoose={handleStoryChoose}/>
            </div>
        </PageWrapper>
    );
};

export default CategoryPage;