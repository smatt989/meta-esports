import React from 'react';
import { render } from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Modal, Button, FormControl} from 'react-bootstrap';
import {login, loginSuccess, loginError, createLoginUser, finishedLoginUser} from '../action_creators';
import {authenticationHeader} from '../utilities';
import {markerByKey} from '../utilities';
import {gameBuilder} from '../models/Game';

var _ = require('lodash');

const LoginForm = React.createClass({
  mixins: [PureRenderMixin],
  user: function() {
    return this.props.loginUser
  },
  updatedUserName: function(username) {
    return this.user().set('username', username)
  },
  updatedPassword: function(password) {
    return this.user().set('password', password)
  },
  render: function() {

    const show = this.user() != null;

    const finishedLoginUser = this.props.finishedLoginUser
    const createLoginUser = this.props.createLoginUser

    const updatedUserName = this.updatedUserName
    const updatedPassword = this.updatedPassword

    const login = this.props.login

    if(!show){
        return <Modal show={show} onHide={close} />
    }
    else {

        const username = this.user().get("username")
        const password = this.user().get("password")

        const close = function() {
            finishedLoginUser()
        }

        return <Modal show={show}>
                 <Modal.Header closeButton onHide={close}>
                   <Modal.Title>Login</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>
                    <h4>Username:</h4><FormControl value={username} onChange={function(a){createLoginUser(updatedUserName(a.target.value))}} type="text" placeholder="Username" />
                    <h4>Password:</h4><FormControl value={password} onChange={function(a){createLoginUser(updatedPassword(a.target.value))}} type="password" placeholder="Password" />
                 </Modal.Body>
                 <Modal.Footer>
                   <Button onClick={close}>Close</Button>
                   <Button onClick={() => login(username, password)} bsStyle="primary">Login</Button>
                 </Modal.Footer>
               </Modal>
    }
  }
});

function mapStateToProps(state) {
  return {
    loginUser: state.get('loginUser')
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        finishedLoginUser: () => {
            dispatch(finishedLoginUser())
        },
        createLoginUser: (user) => {
            dispatch(createLoginUser(user))
        },
        login: (username, password) => {
            dispatch(login(username, password)).then((response) => {
                if(!response.error){
                    dispatch(loginSuccess(response.payload.headers[authenticationHeader.toLowerCase()]));
                } else {
                    dispatch(loginError(response.error));
                }
            });
        }
    }
}

export const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);