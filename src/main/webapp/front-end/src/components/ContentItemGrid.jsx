import React from 'react';
import { render } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Grid, Col, Row, Thumbnail, Button, Clearfix} from 'react-bootstrap';
import {showProps} from '../utilities';
import {List, Map} from 'immutable';
import _ from 'lodash';
import {playVideo} from '../youtube-api'
import {ContentItemElementContainer} from './ContentItemElement';
import {ContentItemRowContainer} from './ContentItemRow';

const ContentItemGrid = React.createClass({
    mixins: [PureRenderMixin],
    componentDidMount: function() {
/*            var options = {
                channel: "tsm_dyrus"
            };
            var player = new Twitch.Player("tsm_dyrus", options);

      playVideo('bz1QwWSxVN8', 'player')*/

    },
    addSmallClearfix: function(index) {
        if(index%2 == 0) {
            return <Clearfix visibleSmBlock />
        }
        return null
    },
    addMediumClearfix: function(index) {
        if(index%3 == 0) {
            return <Clearfix visibleMdBlock />
        }
        return null
    },
    addLargeClearfix: function(index) {
        if(index%4 == 0) {
            return <Clearfix visibleLgBlock />
        }
        return null
    },
    render: function() {

        var nowTitle = null
        var nowRow = null

        var soonTitle = null
        var soonRow = null

        var doneTitle = null
        var doneRow = null

        if(this.props.liveContent != null && this.props.liveContent.size > 0){
            nowTitle = <h3>NOW:</h3>
            nowRow = <ContentItemRowContainer contentItems={this.props.liveContent} />
        }

        if(this.props.upcomingContent != null && this.props.upcomingContent.size > 0){
            soonTitle = <h3>SOON:</h3>
            soonRow = <ContentItemRowContainer contentItems={this.props.upcomingContent} />
        }

        if(this.props.finishedContent != null && this.props.finishedContent.size > 0){
            doneTitle = <h3>DONE:</h3>
            doneRow = <ContentItemRowContainer contentItems={this.props.finishedContent} />
        }

        return <Grid>
            {nowTitle}
            {nowRow}
            {soonTitle}
            {soonRow}
            {doneTitle}
            {doneRow}
        </Grid>
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

function mapStateToProps(state) {
  return {
    contentItems: state.getIn(['contentItemsList', 'contentItems']),
    liveContent: state.get('liveContent'),
    upcomingContent: state.get('upcomingContent'),
    finishedContent: state.get('finishedContent')
  };
}

export const ContentItemGridContainer = connect(mapStateToProps, mapDispatchToProps)(ContentItemGrid);