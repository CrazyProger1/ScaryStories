import React, {useEffect, useState} from 'react';
import PageWrapper from "./PageWrapper";
import {inject, observer} from "mobx-react";
import {Image, Stack} from "react-bootstrap";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import {MdRemoveRedEye} from "react-icons/md";
import {BiSolidFileTxt} from "react-icons/bi";
import {useParams} from "react-router-dom";

const ProfilePage = inject("authStore", "statisticsStore")(observer(({authStore, statisticsStore, ...props}) => {
    const {
        id,
        nickname,
        email,
        registered_at: registeredAt,
        photo_url: photoUrl,
        is_superuser: isSuperuser
    } = authStore.currentUser;

    const {id: userId} = useParams();
    console.log(userId)
    const [picSrc, setPicSrc] = useState(photoUrl);
    const [userStatistics, setUserStatistics] = useState({viewsNumber: 0, storiesNumber: 0});
    const navigate = useNavigateCustom();

    if (!authStore.isAuthorized)
        navigate("/");


    useEffect(
        _ => {
            statisticsStore.readUserStatistics(authStore.currentUser.id).then(
                result => {
                    setUserStatistics({
                        viewsNumber: result?.views_number,
                        storiesNumber: result?.stories_number
                    });
                }
            )
        },
        [id]
    )

    const {viewsNumber, storiesNumber} = userStatistics;


    const handleImageError = () =>
        setPicSrc(process.env.PUBLIC_URL + '/imgs/defaults/user.png');

    if (picSrc === null)
        setPicSrc(process.env.PUBLIC_URL + '/imgs/defaults/user.png');

    return (
        <PageWrapper>
            <div className="text-center mt-5">
                <Stack className="d-inline-block" direction="vertical" gap={2}>
                    <Image
                        className="rounded-circle"
                        src={picSrc}
                        width="250px"
                        onErrorCapture={handleImageError}
                    />
                    <h1>
                        {nickname}{isSuperuser ? "(admin)" : ""}
                    </h1>
                </Stack>
                <Stack direction="vertical">
                    <div>
                        <MdRemoveRedEye/>
                        {viewsNumber}
                    </div>
                    <div>
                        <BiSolidFileTxt/>
                        {storiesNumber}
                    </div>
                </Stack>
            </div>
        </PageWrapper>
    );
}));

export default ProfilePage;