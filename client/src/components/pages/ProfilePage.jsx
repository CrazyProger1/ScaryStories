import React, {useEffect, useState} from 'react';
import PageWrapper from "./PageWrapper";
import {inject, observer} from "mobx-react";
import {Image, Stack} from "react-bootstrap";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import QuestionModal from "../modals/QuestionModal";
import {DEFAULT_USER_PICTURE_SRC} from "../../constants/defaults";


const ProfilePage = inject("authStore", "statisticsStore")(observer(({authStore, statisticsStore, ...props}) => {
    const [user, setUser] = useState(authStore.currentUser);
    const [userStatistics, setUserStatistics] = useState({viewsNumber: 0, storiesNumber: 0});
    const [questionModalVisible, setQuestionModalVisible] = useState(false);
    const navigate = useNavigateCustom();


    if (!authStore.isAuthorized)
        navigate("/");

    useEffect(
        _ => {
            setUser(authStore.currentUser)
            statisticsStore.readUserStatistics(authStore.currentUser.id).then(statistics => {
                setUserStatistics(statistics);
            }).catch(error => {

            })
        },
        [authStore.isAuthorized]
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
        setPicture(DEFAULT_USER_PICTURE_SRC);


    const handleDeleteButtonClick = () =>
        setQuestionModalVisible(true);

    const handleDelete = () => {
        setQuestionModalVisible(false);
        authStore.deleteUser();
    }

    return (
        <PageWrapper>
            <div className="text-center mt-5">
                <Stack className="d-inline-block" direction="vertical" gap={2}>
                    <Image
                        className="rounded-circle"
                        src={photoUrl ? photoUrl : DEFAULT_USER_PICTURE_SRC}
                        width="250px"
                        onErrorCapture={setDefaultPicture}
                    />
                    <h1>
                        {nickname}{isSuperuser ? "(admin)" : ""}
                    </h1>
                </Stack>
                <Stack direction="vertical">
                    <div>
                        Views Number:&nbsp;
                        {viewsNumber}
                    </div>
                    <div>
                        Stories Number:&nbsp;
                        {storiesNumber}
                    </div>
                </Stack>

            </div>

            <QuestionModal
                show={questionModalVisible}
                title=""
                message="Are you sure?"
                onClose={_ => setQuestionModalVisible(false)}
                onContinue={handleDelete}
            />


        </PageWrapper>
    );
}));

export default ProfilePage;