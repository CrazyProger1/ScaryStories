import React from 'react';
import PageWrapper from "./PageWrapper";
import {Image, Stack} from "react-bootstrap";

const AboutPage = () => {
    return (
        <PageWrapper>
            <div>
                <h1 className="text-center">About</h1>
                <p>Scary Stories is a platform for... It designed... Bla bla bla...</p>
                <h2 className="text-center">Meet the team</h2>

                <Stack direction="horizontal" gap={2}>
                    <div>
                        <h3>Nikolay Hetman</h3>
                        <h5>Developer In Chief</h5>
                        <p/>
                        <p>I'm the Python Developer... Bla bla bla I'm the Python Developer... Bla bla bla I'm the Python Developer... Bla bla bla</p>
                        <p>I'm the Python Developer... Bla bla bla</p>
                        <p>I'm the Python Developer... Bla bla bla</p>
                        <p>I'm the Python Developer... Bla bla bla</p>
                        <p>I'm the Python Developer... Bla bla bla</p>
                        <p>I'm the Python Developer... Bla bla bla</p>
                    </div>

                    <Image
                        className="rounded-circle ms-auto"
                        src="https://images.techinsider.ru/upload/img_cache/b41/b41448dba630129d02ca5dfaad0fc5b7_cropped_666x666.jpg"
                        width="200px"
                    />
                </Stack>


            </div>
        </PageWrapper>
    );
};

export default AboutPage;