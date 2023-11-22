import React from 'react';
import PageWrapper from "./PageWrapper";
import {Image, Stack} from "react-bootstrap";

const AboutPage = () => {
    return (
        <PageWrapper>
            <div>
                <h1 className="text-center mt-5">About</h1>
                <p className="mt-5">Scary Stories is a platform for sharing scary stories.</p>


                <h2 className="text-center" style={{marginTop: "10rem"}}>Meet the team</h2>

                <div className="align-content-center">
                    <Stack className="mt-5" direction="horizontal" gap={3}>
                        <Image
                            className="rounded-circle"
                            src="https://cdn.pixabay.com/photo/2020/05/09/21/43/hacker-5151533_1280.jpg"
                            width="250px"
                        />
                        <div>
                            <h3>Nikolay Hetman</h3>
                            <h5>Developer In Chief</h5>
                            <p/>
                            <p>Hi, I'm third-year student of Kharkiv National University of Economics majoring in
                                Computer Science. I've always been interested in technology and have spent last five
                                years to study programming. I've been involved in several pet projects some of them have
                                gained some popularity at the university and at the GitHub. Now, I'm actively looking
                                for my first job.</p>
                            <Stack gap={1} direction="horizontal">
                                <a href="https://www.instagram.com/crazyproger/" target="_blank">
                                    <img src={process.env.PUBLIC_URL + '/imgs/icons/instagram.png'} alt="Instagram"
                                         width="40px"/>
                                </a>
                                <a href="https://www.linkedin.com/in/nikolay-hetman-366933221/" target="_blank">
                                    <img src={process.env.PUBLIC_URL + '/imgs/icons/linkedin.png'} alt="Linkedin"
                                         width="40px"/>
                                </a>
                                <a href="https://t.me/crazyproger1" target="_blank">
                                    <img src={process.env.PUBLIC_URL + '/imgs/icons/telegram.png'} alt="Telegram"
                                         width="40px"/>
                                </a>
                            </Stack>
                        </div>


                    </Stack>
                </div>


            </div>
        </PageWrapper>
    );
};

export default AboutPage;