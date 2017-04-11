import React from 'react';
import { render } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Modal, Button, FormControl, FormGroup, ControlLabel, Form} from 'react-bootstrap';
import {endEditingContentItem, saveContentItem, saveContentItemSuccess, saveContentItemError, updateEditingContentItem, loadContentItems, loadContentItemsSuccess, loadContentItemsError, removeContentItem, removeContentItemSuccess, removeContentItemError} from '../action_creators';
import {markerByKey} from '../utilities';
import {gameBuilder} from '../models/Game';
import Datetime from 'react-datetime';

var _ = require('lodash');
const ContentForm = React.createClass({
  mixins: [PureRenderMixin],
  editingContentItem: function() {
    return this.props.editingContentItem || null;
  },
  newContentItem: function() {
    return this.editingContentItem() != null;
  },
  updateContentItem: function(key, value) {
    this.props.updateEditingContentItem(this.editingContentItem().set(key, value))
  },
  contentItemValueByKey: function(key) {
    return this.editingContentItem().get(key)
  },
  startedValueByStartTime: function(startTime) {
    return startTime < (new Date()).getTime()
  },
  endedValueByStartTime: function(startTime) {
    return startTime > (new Date()).getTime()
  },
  render: function() {

    const editingContentItem = this.editingContentItem()
    const updateContentItem = this.updateContentItem
    const endEditingContentItem = this.props.endEditingContentItem

    const show = this.newContentItem()

    const byKey = this.contentItemValueByKey

    if(!show){
        return <Modal show={show} onHide={close} />
    }
    else {
        const saveContentItem = this.props.saveContentItem
        const removeContentItem = this.props.removeContentItem

        const close = function() {
            endEditingContentItem()
        }

        var deleteButton = null

        if(editingContentItem.get("id") != null) {
            deleteButton = <Button onClick={() => removeContentItem(editingContentItem.get("id"))} bsStyle="danger">Delete</Button>
        }

        return <Modal show={show}>
                 <Modal.Header closeButton onHide={close}>
                   <Modal.Title>New Content Item</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Game: </ControlLabel>
                  <FormControl value={String(byKey("gameId"))} onChange={function(a){updateContentItem("gameId", Number(a.target.value))}} componentClass="select" placeholder="Choose game...">
                    {this.props.games.map((game) =>
                        <option key={game.get("id")} value={game.get("id")}>{game.get("name")}</option>
                    )}

                  </FormControl>
                </FormGroup>

                   <h4>Title: </h4>
                   <FormControl value={byKey("name")} onChange={function(a){updateContentItem("name", a.target.value)}} type="text" placeholder="Title" />

                   <FormGroup controlId="formControlsTextarea">
                     <ControlLabel>Description</ControlLabel>
                     <FormControl value={byKey("description")} onChange={function(a){updateContentItem("description", a.target.value)}} componentClass="textarea" placeholder="description" />
                   </FormGroup>

                     <FormGroup controlId="formControlsSelect">
                       <ControlLabel>Importance: </ControlLabel>
                       <FormControl value={String(byKey("rating"))} onChange={function(a){updateContentItem("rating", Number(a.target.value))}} componentClass="select" placeholder="1">
                          <option key="1" value="1">Not important</option>
                          <option key="2" value="2">Standard importance</option>
                          <option key="3" value="3">Should be interesting</option>
                          <option key="4" value="4">Very Important</option>
                          <option key="5" value="5">Must watch</option>
                       </FormControl>
                     </FormGroup>


                    <Form inline>
                       <FormGroup controlId="formControlsSelect">
                         <ControlLabel>Start Time: </ControlLabel>
                         {' '}
                         <Datetime value={new Date(byKey("startMillis"))} onChange={function(a){updateContentItem("startMillis", a.valueOf())}} />
                         {' '}
                         <ControlLabel>Started: </ControlLabel>
                         {' '}
                         <FormControl value={byKey("started")} onChange={function(a){updateContentItem("started", a.target.value == 'true')}} componentClass="select" placeholder="false">
                            <option key="false" value="false">false</option>
                            <option key="true" value="true">true</option>
                         </FormControl>
                         {' '}
                         <ControlLabel>Ended: </ControlLabel>
                         {' '}
                         <FormControl value={byKey("ended")} onChange={function(a){updateContentItem("ended", a.target.value == 'true')}} componentClass="select" placeholder="false">
                            <option key="false" value="false">false</option>
                            <option key="true" value="true">true</option>
                         </FormControl>
                       </FormGroup>
                   </Form>

                  <h4>Stream Link: </h4><FormControl value={byKey("streamLink")} onChange={function(a){updateContentItem("streamLink", a.target.value)}} type="text" placeholder="Stream Link" defaultValue={""} />

                  <h4>VOD Link: </h4><FormControl value={byKey("vodLink")} onChange={function(a){updateContentItem("vodLink", a.target.value)}} type="text" placeholder="VOD Link" defaultValue={""} />

                  <h4>Image Link: </h4><FormControl value={byKey("imageLink")} onChange={function(a){updateContentItem("imageLink", a.target.value)}} type="text" placeholder="Image Link (optional)" defaultValue={""} />




                 </Modal.Body>
                 <Modal.Footer>
                   <Button onClick={close}>Close</Button>
                   {deleteButton}
                   <Button onClick={() => saveContentItem(editingContentItem)} bsStyle="primary">Keep changes</Button>
                 </Modal.Footer>
               </Modal>
        }
  }
});

function mapStateToProps(state) {
  return {
    games: state.getIn(['gamesList', 'games']),
    editingContentItem: state.get('editingContentItem')
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startEditingGame: () => {
            dispatch(endEditingContentItem())
        },
        updateEditingContentItem: (contentItem) => {
            dispatch(updateEditingContentItem(contentItem))
        },
        endEditingContentItem: () => {
            dispatch(endEditingContentItem())
        },
        saveContentItem: (contentItem) => {
            dispatch(saveContentItem(contentItem)).then((response) => {
                if(!response.error){
                    dispatch(saveContentItemSuccess(response.payload.data));
                    dispatch(loadContentItems()).then((response) => {
                        if(!response.error){
                            dispatch(loadContentItemsSuccess(response.payload.data));
                        } else {
                            dispatch(loadContentItemsError(response.error));
                        }
                    });
                } else {
                    dispatch(saveContentItemError(response.error));
                }
            });
        },
        removeContentItem: (contentItemId) => {
            dispatch(removeContentItem(contentItemId)).then((response) => {
                if(!response.error){
                    dispatch(removeContentItemSuccess(response.payload.data));
                    dispatch(loadContentItems()).then((response) => {
                        if(!response.error){
                            dispatch(loadContentItemsSuccess(response.payload.data));
                        } else {
                            dispatch(loadContentItemsError(response.error));
                        }
                    });
                } else {
                    dispatch(removeContentItemError(response.error));
                }
            });
        }
    }
}

export const ContentFormContainer = connect(mapStateToProps, mapDispatchToProps)(ContentForm);