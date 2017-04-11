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

const ContentItemRow = React.createClass({
    mixins: [PureRenderMixin],
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

        return  <Row>
            {this.props.contentItems.map((contentItem, index) =>
                <div key={contentItem.get("id")}>
                <ContentItemElementContainer key={contentItem.get("id")} index={index} contentItem={contentItem} />
                {this.addSmallClearfix(index + 1)}
                {this.addMediumClearfix(index + 1)}
                {this.addLargeClearfix(index + 1)}
                </div>
            )}
            </Row>
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

function mapStateToProps(state) {
  return {
  };
}

export const ContentItemRowContainer = connect(mapStateToProps, mapDispatchToProps)(ContentItemRow);