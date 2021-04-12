import React, {Component} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
    ConfigProvider,
    Snackbar,
    Avatar,
    IS_PLATFORM_ANDROID,
    Div,
    ModalRoot,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    ScreenSpinner,
    IS_PLATFORM_IOS,
    usePlatform
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import './css/main.css';
import './css/fonts.css';

import API from './helpers/API.js';

import Structure from './Structure';

import {
    Icon16Clear,
    Icon16Done,
    Icon24Cancel
} from '@vkontakte/icons';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'home',
            activeStory: 'home',

            slideIndex: 1,

            popout: null,
            modal: null,
            snackbar: null,

            fetchedUser: {
                id: 1,
                first_name: 'Test',
                last_name: 'User'
            },

            scheme: 'bright_light'
        };
        this.api = new API();
        this.initHelpers();
    }

    componentDidMount() {
        bridge.send("VKWebAppInit");
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                const schemeAttribute = document.createAttribute('scheme');
                schemeAttribute.value = data.scheme;
                document.body.attributes.setNamedItem(schemeAttribute);
                this.setState({scheme: data.scheme});
            }
            if (type === 'VKWebAppGetUserInfoResult') {
                this.setState({fetchedUser: data});
            }
        });
        bridge.send('VKWebAppGetUserInfo');
    }

    initHelpers = () => {
        window.startLoad = () => {
            this.setState({
                popout: <ScreenSpinner/>
            })
        }

        window.endLoad = () => {
            this.setState({
                popout: null
            })
        }

        window.openDoneSnackBar = this.openDoneSnackBar;
        window.openErrorSnackBar = this.openErrorSnackBar;
    }

    go = (activePanel) => {
        this.setState({activePanel});
        window.history.pushState('', '', '')
    };

    openDoneSnackBar = (t, duration = 3000) => {
        this.setState({
            snackbar:
                <Snackbar
                    layout="vertical"
                    duration={duration}
                    onClose={() => this.setState({snackbar: null})}
                    before={
                        <Avatar size={24} style={{backgroundColor: '#4bb34b'}}>
                            <Icon16Done fill="#fff" width={14} height={14}/>
                        </Avatar>
                    }
                >
                    {t}
                </Snackbar>
        });
    };

    openErrorSnackBar = (e, duration = 3000) => {
        this.setState({
            snackbar:
                <Snackbar
                    duration={duration}
                    layout="vertical"
                    onClose={() => this.setState({snackbar: null})}
                    before={
                        <Avatar size={24} style={{backgroundColor: '#FF0000'}}>
                            <Icon16Clear fill="#fff" width={14} height={14}/>
                        </Avatar>
                    }
                >
                    {e}
                </Snackbar>
        });
    };

    closeModal = () => {
        this.setState({modal: null});
    };

    openModal = (modal) => {
        this.setState({modal: modal});
    };

    render() {

        const modal = (
            <ModalRoot activeModal={this.state.modal} onClose={this.closeModal}>
                <ModalPage
                    id='main'
                    onClose={this.closeModal}
                    header={
                        <ModalPageHeader
                            left={IS_PLATFORM_ANDROID &&
                            <PanelHeaderButton onClick={this.closeModal}>
                                <Icon24Cancel/>
                            </PanelHeaderButton>}
                            right={IS_PLATFORM_IOS &&
                                <PanelHeaderButton onClick={this.closeModal}>
                                     <Div>Готово</Div>
                                </PanelHeaderButton>
                            }
                        >
                            Simple modal
                        </ModalPageHeader>
                    }
                >
                    <Div>
                        Simple modal content
                    </Div>
                </ModalPage>
            </ModalRoot>
        );

        const {state} = this;
        const {activePanel, activeStory, popout, scheme} = state;
        const history = ['home', 'onboarding'].includes(activePanel) ? [activePanel] : ['home', activePanel];
        const onSwipeBack = () => this.go('home');
        const setPState = this.setState.bind(this);
        const props = { state, activeStory, setPState, activePanel, popout, modal, history, onSwipeBack, platform: usePlatform, ...this};
        return (
            <ConfigProvider scheme={scheme}>
                <Structure {...props} {...this}/>
            </ConfigProvider>
        );
    }
}

export default App;

