import React from 'react';
import PageWrapper from "./PageWrapper";
import {Image, Stack} from "react-bootstrap";
// import facebook from '../../../public/imgs/icons/facebook.png';

const AboutPage = () => {
    return (
        <PageWrapper>
            <div>
                <h1 className="text-center mt-5">About</h1>
                <p className="mt-5">Scary Stories is a platform for sharing scary stories. Bla bla bla bla bla bla bla
                    bla bla bla bla
                    bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
                    bla bla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla bla
                    bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla
                    bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla
                    bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla
                    bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla blabla bla
                    bla bla bla bla bla bla bla</p>


                <h2 className="text-center" style={{marginTop: "10rem"}}>Meet the team</h2>

                <div className="align-content-center">
                    <Stack className="mt-5" direction="horizontal" gap={3}>
                        <Image
                            className="rounded-circle"
                            src="https://cdn.pixabay.com/photo/2020/05/09/21/43/hacker-5151533_1280.jpg"
                            width="200px"
                        />
                        <div>
                            <h3>Nikolay Hetman</h3>
                            <h5>Developer In Chief</h5>
                            <p/>
                            <p>Hi, I'm the Python Developer.</p>
                            <Stack gap={1} direction="horizontal">
                                <a href="https://www.facebook.com/yourpage" target="_blank">
                                    <img src={process.env.PUBLIC_URL + '/imgs/icons/instagram.png'} alt="Instagram"
                                         width="40px"/>
                                </a>
                                <a href="https://www.facebook.com/yourpage" target="_blank">
                                    <img src={process.env.PUBLIC_URL + '/imgs/icons/linkedin.png'} alt="Linkedin"
                                         width="40px"/>
                                </a>
                                <a href="https://www.facebook.com/yourpage" target="_blank">
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