import React from 'react';
import {
    Panel,
    PanelHeader,
    Gallery,
    Div, Button, FixedLayout, VKCOM
} from '@vkontakte/vkui';

import '../css/Page.css';
import light1 from "./components/onboardingPanels/light1.png";
import dark1 from "./components/onboardingPanels/dark1.png";
import light4 from "./components/onboardingPanels/light4.png";
import dark4 from "./components/onboardingPanels/dark4.png";
import light6 from "./components/onboardingPanels/light6.png";
import dark6 from "./components/onboardingPanels/dark6.png";
import light7 from "./components/onboardingPanels/light7.png";
import dark7 from "./components/onboardingPanels/dark7.png";


const Onboarding = props => {

    const {state, setPState} = props;
    const WEB = window.location.port || props.platform() === VKCOM;
    const {scheme} = state;
    const lightScheme = scheme === 'bright_light';

    const pages = [
        {
            image: lightScheme ? light1 : dark1,
            title: 'Заголовок',
            subtitle: 'Подзаголовок',
        },
        {
            image: lightScheme ? light4 : dark4,
            title: 'Заголовок',
            subtitle: 'Подзаголовок',
        },
        {
            image: lightScheme ? light6 : dark6,
            title: 'Заголовок',
            subtitle: 'Подзаголовок',
        },
        {
            image: lightScheme ? light7 : dark7,
            title: 'Заголовок',
            subtitle: 'Подзаголовок',
        },
    ];

    const PageDot = ({selected, id}) => (
        <div
            className={lightScheme ? 'dot' : 'dotDark'}
            style={{
                width: (selected ? '8px' : '6px'),
                height: (selected ? '8px' : '6px')
            }}
            onClick={() => {
                props.setPState({slideIndex: id});
            }}
        />
    );

    const PageDots = ({pages, currentPage}) => (
        <div className="dots">
            {Array.from(new Array(pages), (x, i) => i).map((page) => (
                <PageDot key={page} selected={page === currentPage} id={page}/>
            ))}
        </div>
    );

    return (
        <Panel id={props.id}>
            <PanelHeader separator={false}/>
            <FixedLayout vertical='top'>
                <Gallery
                    onChange={(slideIndex) => setPState({slideIndex})}
                    slideIndex={state.slideIndex}
                    style={{height: window.innerHeight}}
                >
                    {pages.map((page, key) => {
                        const {image, title, subtitle} = page;
                        return (
                            <div key={key} className="onboarding">
                                <img alt='пикча' src={image} className="image"/>
                                <span className={lightScheme ? 'title' : 'titleD'}>{title}</span>
                                <span className={lightScheme ? 'subtitle' : 'subtitleD'}>{subtitle}</span>
                            </div>
                        );
                    })}
                </Gallery>
            </FixedLayout>
            <FixedLayout style={{marginBottom: 40}} vertical={'bottom'}>
                <Div>
                    <Button
                        style={{
                            marginBottom: -10
                        }}
                        stretched
                        onClick={() => {
                            if (pages.length - 1 === state.slideIndex) {
                                setPState({activePanel: 'home'});
                            } else {
                                setPState({slideIndex: state.slideIndex + 1});
                            }
                        }}
                    >
                        {pages.length - 1 === state.slideIndex ? 'Начать' : 'Далее'}
                    </Button>
                </Div>
                {
                    !WEB &&
                    <Div>
                        <PageDots pages={pages.length} currentPage={state.slideIndex}/>
                    </Div>
                }
            </FixedLayout>
        </Panel>
    );
}

export default Onboarding;
