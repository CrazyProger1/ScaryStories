import React from 'react';
import PageWrapper from "./PageWrapper";
import {inject, observer} from "mobx-react";
import {Image, Stack} from "react-bootstrap";

const ProfilePage = inject("authStore")(observer(({authStore, ...props}) => {
    const {id, nickname, email, registered_at, photo_url} = {
        id: 1,
        nickname: "crazyproger1",
        email: "crazyproger1@gmail.com",
        registered_at: "20.11.2023",
        photo_url: "https://cdn.gogeticon.net/files/1925428/fa0cbc2764f70113bf2fad3905933545.png"
    }
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
                        {nickname}
                    </h1>
                </Stack>

            </div>
        </PageWrapper>
    );
}));

export default ProfilePage;