import React from 'react';
import {
    SplitCol,
    Cell,
    Group,
    Epic,
    Tabbar,
    TabbarItem,
    ViewWidth,
    VKCOM,
    SplitLayout,
    Panel,
    PanelHeader,
    View,

} from '@vkontakte/vkui';
import {Icon28Profile, Icon28SettingsOutline} from "@vkontakte/icons";

import Onboarding from "./panels/Onboarding";
import Home from "./panels/Home";
import Panel2 from "./panels/Panel2";

const Structure = props => {
    const {activeStory, activePanel, setPState} = props;
    const platform = props.platform();
    const isDesktop = window.innerWidth >= ViewWidth.DESKTOP * 200;
    const hasHeader = platform !== VKCOM;

    return (
        <SplitLayout
            header={hasHeader && <PanelHeader separator={false}/>}
            style={{justifyContent: 'center'}}
        >
            {isDesktop && (
                <SplitCol fixed width="280px" maxWidth="280px">
                    <Panel>
                        {hasHeader && <PanelHeader/>}
                        <Group>
                            <Cell
                                disabled={activeStory === 'home'}
                                style={activeStory === 'home' ? {
                                    backgroundColor: "var(--button_secondary_background)",
                                    borderRadius: 8
                                } : {}}
                                onClick={() => {
                                    setPState({
                                        activeStory: 'home'
                                    })
                                }}
                                before={<Icon28Profile/>}
                            >
                                Панель 1
                            </Cell>
                            <Cell
                                disabled={activeStory === 'panel2'}
                                style={
                                    activeStory === 'panel2' ? {
                                        backgroundColor: "var(--button_secondary_background)",
                                        borderRadius: 8
                                    } : {}
                                }
                                onClick={() => {
                                    setPState({
                                        activeStory: 'panel2'
                                    })
                                }}
                                before={<Icon28SettingsOutline/>}
                            >
                                Панель 2
                            </Cell>
                        </Group>
                    </Panel>
                </SplitCol>
            )}

            <SplitCol
                animate={!isDesktop}
                spaced={isDesktop}
                width={isDesktop ? '560px' : '100%'}
                maxWidth={isDesktop ? '560px' : '100%'}
            >
                <Epic activeStory={activeStory} tabbar={!isDesktop && activePanel !== 'onboarding' &&
                <Tabbar>
                    <TabbarItem
                        onClick={() => {
                            setPState({
                                activeStory: 'home'
                            })
                        }}
                        selected={activeStory === 'home'}
                        text="Панель 1"
                    >
                        <Icon28Profile/>
                    </TabbarItem>
                    <TabbarItem
                        onClick={() => {
                            setPState({
                                activeStory: 'panel2'
                            })
                        }}
                        selected={activeStory === 'panel2'}
                        text="Панель 2"
                    >
                        <Icon28SettingsOutline/>
                    </TabbarItem>
                </Tabbar>
                }>
                    <View id='home' {...props}>
                        <Onboarding
                            id='onboarding'
                            {...props}
                        />
                        <Home id='home' {...props} />
                        <Panel2 id='panel2' {...props} />
                    </View>
                    <View id='panel2' {...props}>
                        <Home id='home' {...props} />
                        <Panel2 id='panel2' {...props} />
                    </View>
                </Epic>
            </SplitCol>
        </SplitLayout>
    );
};

export default Structure;