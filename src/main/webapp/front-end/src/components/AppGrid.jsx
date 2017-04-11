import React from 'react';
import { render } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Grid, Row, Col, Panel, Tabs, Tab } from 'react-bootstrap';
import {connect} from 'react-redux';
import {NavBarContainer} from './NavBar';
import {ContentItemGridContainer} from './ContentItemGrid';
import {GameFormContainer} from './GameForm';
import {ContentFormContainer} from './ContentForm';
import {LoginFormContainer} from './LoginForm';

const AppGrid = React.createClass({
    mixins: [PureRenderMixin],
    getAdventureId: function() {
        return parseInt(this.props.params.adventureId) || 0;
    },
    render: function() {
        return <Grid>
            <Row>
                <Col>
                    <NavBarContainer />
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