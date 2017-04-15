import React from 'react';
import { render } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Modal, Button, FormControl, Col, Thumbnail} from 'react-bootstrap';
import {startEditingContentItem} from '../action_creators';
import {playVideo, isAYoutubeLink, isATwitchLink, youtubeVideoId, twitchVideoId} from '../youtube-api'
import {RatingContainer} from './Rating';
import {StatusIndicatorContainer} from './StatusIndicator';
import moment from 'moment';

var _ = require('lodash');

const ContentItemElement = React.createClass({
  mixins: [PureRenderMixin],
  contentItem: function() {
    return this.props.contentItem
  },
  componentDidMount: function() {
    const linkToUse = this.linkToUse()
    if(linkToUse != null){
        const link = this.contentItem().get(linkToUse)
        this.createPlayerFromLink(link);
    }
    document.getElementById(this.thumbnailId() + "p").innerHTML = this.contentItem().get("description");
  },
  linkToUse: function() {
    const vodLink = this.contentItem().get("vodLink")
    const streamLink = this.contentItem().get("streamLink")
    const imageLink = this.contentItem().get("imageLink")

    const hasAVodLink = vodLink != null && vodLink != ""
    const hasAStreamLink = streamLink != null && streamLink != ""
    const hasAnImageLink = imageLink != null && imageLink != ""

    if(this.contentItem().get("finished")){
        if(hasAVodLink){
            return "vodLink"
        } else if (hasAStreamLink){
            return "streamLink"
        } else if (hasAnImageLink){
            return "imageLink"
        }
    } else if (this.contentItem().get("started")){
        if(hasAStreamLink){
            return "streamLink"
        } else if (hasAnImageLink){
            return "imageLink"
        } else if (hasAVodLink){
            return "vodLink"
        }
    } else {
        if(hasAnImageLink){
            return "imageLink"
        } else if (hasAStreamLink){
            return "streamLink"
        } else if (hasAVodLink){
            return "vodLink"
        }
    }
    return null
  },
  createPlayerFromLink: function(link) {
    const thumbnailId = this.thumbnailId()
    if(isAYoutubeLink(link)){
        const id = youtubeVideoId(link)
        playVideo(id, thumbnailId)
    } else if (isATwitchLink(link)){
        const id = twitchVideoId(link)
        var player = new Twitch.Player(thumbnailId, {channel: id, muted: true});
    }
  },
  thumbnailId: function() {
    return "item"+this.contentItem().get("id")
  },
  render: function() {
        const hasSession = this.props.session != null

        const startEditingContentItem = this.props.startEditingContentItem

        const videoDiv = <div className="thumbnail_div" id={this.thumbnailId()}></div>
        const imageDiv = <div className="thumbnail_div"><img src={this.contentItem().get("imageLink", "http://theark.org/sites/default/files/listen_youtube.jpg")} /></div>

        var thumbnail = null
        const linkToUse = this.linkToUse()
        if(linkToUse == "streamLink"){
            thumbnail = videoDiv
        } else if(linkToUse == "vodLink"){
            thumbnail = videoDiv
        } else if (linkToUse == "imageLink"){
            thumbnail = imageDiv
        } else {
            thumbnail = imageDiv
        }

        var editButton = null
        if(hasSession){
            editButton = <p><Button bsStyle="default" onClick={() => startEditingContentItem(this.contentItem())}>Edit</Button>&nbsp;</p>
        }

        return <Col xs={6} md={4} lg={3}>
                  <Thumbnail >
                    <div>

                    {thumbnail}
                    </div>

                    <h4>{this.contentItem().get("name")}</h4>
                    <RatingContainer rating={this.contentItem().get("rating")} />
                    <StatusIndicatorContainer started={this.contentItem().get("started")} ended={this.contentItem().get("ended")} startMillis={this.contentItem().get("startMillis")} />
                    <br />
                    <em>{moment(new Date(this.contentItem().get("startMillis"))).format("dddd, MMMM Do YYYY, h:mm a")}</em>
                    <p id={this.thumbnailId() + "p"}>{this.contentItem().get("description")}</p>
                    {editButton}
                  </Thumbnail>
                </Col>
  }
});

function mapStateToProps(state) {
  return {
    editingGame: state.get('editingGame'),
    session: state.getIn(['login', 'session'])
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startEditingContentItem: (item) => {
            dispatch(startEditingContentItem(item))
        }
    }
}

export const ContentItemElementContainer = connect(mapStateToProps, mapDispatchToProps)(ContentItemElement);