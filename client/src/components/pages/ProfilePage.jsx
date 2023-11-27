import React from 'react';
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
        photo_url,
        is_superuser: isSuperuser
    } = authStore.currentUser;

    const navigate = useNavigateCustom();
    if (!authStore.isAuthorized)
        navigate("/");


    return (
        <PageWrapper>
            <div className="text-center mt-5">
                <Stack className="d-inline-block" direction="vertical" gap={2}>
                    <Image
                        className="rounded-circle"
                        src={photo_url}
                        width="250px"
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