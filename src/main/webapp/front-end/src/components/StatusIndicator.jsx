import React from 'react';
import { render } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Label} from 'react-bootstrap';

var _ = require('lodash');

const THIRTY_MINUTES_MILLISECONDS = 30 * 60 * 1000

const StatusIndicator = React.createClass({
  mixins: [PureRenderMixin],
  getStarted: function(){
    return this.props.started
  },
  getEnded: function() {
    return this.props.ended
  },
  getStartMillis: function() {
    return this.props.startMillis
  },
  status: function() {
    if(this.getStarted() && !this.getEnded()){
        return <Label bsStyle="danger">LIVE</Label>
    } else if (!this.getStarted() && (new Date()).getTime() - this.getStartMillis() < THIRTY_MINUTES_MILLISECONDS) {
        return <Label bsStyle="primary">SOON</Label>
    } else {
        return null
    }
  },
  render: function() {
    return <span>{this.status()}</span>
  }
});

function mapStateToProps(state) {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export const StatusIndicatorContainer = connect(mapStateToProps, mapDispatchToProps)(StatusIndicator);