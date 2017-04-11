import React from 'react';
import { render } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Grid, Col, Row, Thumbnail, Button} from 'react-bootstrap';
import {showProps} from '../utilities';
import {List, Map} from 'immutable';
import _ from 'lodash';
import {playVideo} from '../youtube-api'
import {ContentItemElementContainer} from './ContentItemElement';

const ContentItemGrid = React.createClass({
    mixins: [PureRenderMixin],
    componentDidMount: function() {
/*            var options = {
                channel: "tsm_dyrus"
            };
            var player = new Twitch.Player("tsm_dyrus", options);

      playVideo('bz1QwWSxVN8', 'player')*/

    },
    render: function() {
        //player.setVolume(0.5);
        //player.addEventListener(Twitch.Player.PAUSE, () => { console.log('Player is paused!'); });

        console.log(this.props.contentItems)

        return <Grid>
            <Row>
            {this.props.contentItems.map((contentItem =>
                <ContentItemElementContainer contentItem={contentItem} />
            ))}
            </Row>
        </Grid>
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

function mapStateToProps(state) {
  return {
    contentItems: state.getIn(['contentItemsList', 'contentItems'])
  };
}

export const ContentItemGridContainer = connect(mapStateToProps, mapDispatchToProps)(ContentItemGrid);