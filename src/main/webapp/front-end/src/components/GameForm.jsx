import React from 'react';
import { render } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Modal, Button, FormControl} from 'react-bootstrap';
import {startEditingGame, endEditingGame, updateEditingGameName, saveGame, saveGameSuccess, saveGameError, loadGames, loadGamesSuccess, loadGamesError} from '../action_creators';
import {gameBuilder} from '../models/Game';

var _ = require('lodash');

const GameForm = React.createClass({
  mixins: [PureRenderMixin],
  editingGame: function() {
    return this.props.editingGame || null;
  },
  newGame: function() {
    return this.editingGame() != null;
  },
  render: function() {

    const editingGame = this.editingGame()

    const show = this.newGame()

    if(!show){
        return <Modal show={show} onHide={close} />
    }
    else {
        const endEditingGame = this.props.endEditingGame
        const saveGame = this.props.saveGame
        const updateEditingGameName = this.props.updateEditingGameName

        const remove = function() {
            console.log("delete")
        }
        const close = function() {
            endEditingGame()
            console.log("close")
        }

        return <Modal show={show}>
                 <Modal.Header closeButton onHide={close}>
                   <Modal.Title>New Game</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                   <h4>Title: </h4><FormControl onChange={function(a){updateEditingGameName(a.target.value)}} type="text" placeholder="Title" defaultValue={editingGame.get("name")} />
                 </Modal.Body>
                 <Modal.Footer>
                   <Button onClick={close}>Close</Button>
                   <Button onClick={remove} bsStyle="danger">Delete</Button>
                   <Button onClick={() => saveGame(editingGame)} bsStyle="primary">Keep changes</Button>
                 </Modal.Footer>
               </Modal>
        }
  }
});

function mapStateToProps(state) {
  return {
    editingGame: state.get('editingGame')
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startEditingGame: () => {
            dispatch(startEditingGame())
        },
        endEditingGame: () => {
            dispatch(endEditingGame())
        },
        updateEditingGameName: (name) => {
            dispatch(updateEditingGameName(name))
        },
        saveGame: (game) => {
            dispatch(saveGame(game)).then((response) => {
                if(!response.error){
                    dispatch(saveGameSuccess(response.payload.data));
                    dispatch(loadGames()).then((response) => {
                        if(!response.error){
                            dispatch(loadGamesSuccess(response.payload.data));
                        } else {
                            dispatch(loadGamesError(response.error));
                        }
                    });
                } else {
                    dispatch(saveGameError(response.error));
                }
            });
        }
    }
}

export const GameFormContainer = connect(mapStateToProps, mapDispatchToProps)(GameForm);