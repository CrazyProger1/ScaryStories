import React from 'react';
import PageWrapper from "./PageWrapper";
import {inject, observer} from "mobx-react";

const ProfilePage = inject("authStore")(observer(({authStore, ...props}) => {
    const {id, username} = {
        id: 1,
        username: "crazyproger1"
    }
    return (
        <PageWrapper>
            Profile
        </PageWrapper>
    );
}));

export default ProfilePage;