import React from 'react';
import { render } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Modal, Button, FormControl} from 'react-bootstrap';
import {gameBuilder} from '../models/Game';

var _ = require('lodash');

const Rating = React.createClass({
  mixins: [PureRenderMixin],
  getRating: function(){
    return this.props.rating || 2.0
  },
  filled: function(index){
    if(index <= this.getRating()){
        return true
    } else {
        return false
    }
  },
  render: function() {

    return <div className="rating">
           <span data-filled={this.filled(1)}>☆</span>
           <span data-filled={this.filled(2)}>☆</span>
           <span data-filled={this.filled(3)}>☆</span>
           <span data-filled={this.filled(4)}>☆</span>
           <span data-filled={this.filled(5)}>☆</span>
           </div>
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

export const RatingContainer = connect(mapStateToProps, mapDispatchToProps)(Rating);