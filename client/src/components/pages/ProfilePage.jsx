import React, {useEffect, useState} from 'react';
import PageWrapper from "./PageWrapper";
import {inject, observer} from "mobx-react";
import {Image, Stack} from "react-bootstrap";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import {MdRemoveRedEye} from "react-icons/md";
import {BiSolidFileTxt} from "react-icons/bi";


const ProfilePage = inject("authStore", "statisticsStore")(observer(({authStore, statisticsStore, ...props}) => {
    const [user, setUser] = useState(authStore.currentUser);
    const [userStatistics, setUserStatistics] = useState({viewsNumber: 0, storiesNumber: 0});
    const navigate = useNavigateCustom();


    if (!authStore.isAuthorized)
        navigate("/");

    useEffect(
        _ => {
            setUser(authStore.currentUser)
            statisticsStore.readUserStatistics(authStore.currentUser.id).then(statistics => {
                setUserStatistics(statistics);
            })
        },
        [authStore.currentUser]
    )


    const {
        id,
        nickname,
        email,
        registered_at: registeredAt,
        photo_url: photoUrl,
        is_superuser: isSuperuser
    } = user;

    const {viewsNumber, storiesNumber} = userStatistics;

    const setPicture = (src) => {
        setUser(
            {
                ...user,
                photoUrl: src
            }
        );
    }


    const setDefaultPicture = () =>
        setPicture(process.env.PUBLIC_URL + "/imgs/defaults/user.png");


    return (
        <PageWrapper>
            <div className="text-center mt-5">
                <Stack className="d-inline-block" direction="vertical" gap={2}>
                    <Image
                        className="rounded-circle"
                        src={photoUrl ? photoUrl : process.env.PUBLIC_URL + "/imgs/defaults/user.png"}
                        width="250px"
                        onErrorCapture={setDefaultPicture}
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