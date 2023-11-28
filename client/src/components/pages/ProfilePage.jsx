import React, {useState} from 'react';
import PageWrapper from "./PageWrapper";
import {inject, observer} from "mobx-react";
import {Image, Stack} from "react-bootstrap";
import useNavigateCustom from "../../hooks/useNavigateCustom";


const ProfilePage = inject("authStore")(observer(({authStore, ...props}) => {
    const {
        id,
        nickname,
        email,
        registered_at: registeredAt,
        photo_url: photoUrl,
        is_superuser: isSuperuser
    } = authStore.currentUser;
    const [picSrc, setPicSrc] = useState(photoUrl);
    const navigate = useNavigateCustom();

    if (!authStore.isAuthorized)
        navigate("/");



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
            </div>
        </PageWrapper>
    );
}));

export default ProfilePage;