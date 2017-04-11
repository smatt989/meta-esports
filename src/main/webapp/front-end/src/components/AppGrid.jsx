import React from 'react';
import { render } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Grid, Row, Col, Panel, Tabs, Tab } from 'react-bootstrap';
import {connect} from 'react-redux';
import {loadAdventure, loadAdventureSuccess, loadAdventureError, forceMapCenter, setAdventureId} from '../action_creators';
import {MapWrapperContainer} from './MapWrapper';
import {ObjectListContainer} from './ObjectList';
import {TriggerListContainer} from './TriggerList';
import {NavBarContainer} from './NavBar';
import {MapToolbarContainer} from './MapToolbar';
import {MarkerInfoContainer} from './MarkerInfo';
import {ContentItemGridContainer} from './ContentItemGrid';
import {TriggerInfoContainer} from './TriggerInfo';
import {GameFormContainer} from './GameForm';
import {ContentFormContainer} from './ContentForm';
import {LoginFormContainer} from './LoginForm';

const AppGrid = React.createClass({
    mixins: [PureRenderMixin],
    getAdventureId: function() {
        return parseInt(this.props.params.adventureId) || 0;
    },
    componentDidMount: function() {
        this.props.setAdventureId(this.getAdventureId());
    },
    componentDidUpdate: function(){
        const adventureId = this.props.adventureId;
        if(adventureId != 0){
            this.props.loadAdventure(adventureId);
        }
    },
    render: function() {
        return <Grid>
            <Row>
                <Col>
                    <NavBarContainer />
                    <MarkerInfoContainer />
                    <TriggerInfoContainer />
                    <GameFormContainer />
                    <ContentFormContainer />
                    <LoginFormContainer />
                </Col>
            </Row>
            <Row className="show-grid">
               <ContentItemGridContainer />
            </Row>
        </Grid>
    }

});

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

function mapStateToProps(state) {
  return {

  };
}

export const AppGridContainer = connect(mapStateToProps, mapDispatchToProps)(AppGrid);