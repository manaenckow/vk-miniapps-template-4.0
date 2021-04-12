import React from 'react';
import {Group, Header, Panel, PanelHeader, PanelHeaderBack, Div} from '@vkontakte/vkui';

const Panel2 = props => (
    <Panel id={props.id}>
        <PanelHeader
            left={<PanelHeaderBack onClick={() => props.go('home')}/>}
        >
            Example
        </PanelHeader>
        <Group header={<Header>Panel 2</Header>}>
            <Div>
                Test
            </Div>
        </Group>
    </Panel>
);

export default Panel2;
