import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Navbar, NavItem, NavDropdown, MenuItem, Nav} from 'react-bootstrap';
import {List} from 'immutable';
import {loadGames, loadGamesSucceed, loadGamesError, startEditingGame, startEditingContentItem, createLoginUser, logout, logoutSuccess, logoutError} from '../action_creators';

const NavBar = React.createClass({
    mixins: [PureRenderMixin],
    getGames: function() {
        return this.props.games || List.of()
    },
    getSession: function() {
        return this.props.session
    },
    render: function(){
        const startEditingGame = this.props.startEditingGame
        const startEditingContentItem = this.props.startEditingContentItem
        const createLoginUser = this.props.createLoginUser

        const logout = this.props.logout

        var loginLogoutButton = null

        if(this.getSession() != null) {
            loginLogoutButton = <NavItem onClick={logout} eventKey={1} href="#">Logout</NavItem>
        } else {
            loginLogoutButton = <NavItem onClick={createLoginUser} eventKey={1} href="#">Login</NavItem>
        }

        return <Navbar inverse collapseOnSelect>
                   <Navbar.Header>
                     <Navbar.Brand>
                       <a href="#">Map Editor</a>
                     </Navbar.Brand>
                     <Navbar.Toggle />
                   </Navbar.Header>
                   <Navbar.Collapse>
                     <Nav>
                       <NavDropdown eventKey={3} title="Games" id="basic-nav-dropdown">
                        {this.getGames().map((game) =>
                            <MenuItem key={game.get('id')}>{game.get('name')}</MenuItem>
                        )}
                         <MenuItem divider />
                         <MenuItem onClick={startEditingGame} eventKey={3.3}>New Game</MenuItem>
                       </NavDropdown>
                       <NavItem onClick={startEditingContentItem} eventKey={2} href="#">New Content</NavItem>
                     </Nav>
                     <Nav pullRight>
                       {loginLogoutButton}
                     </Nav>
                   </Navbar.Collapse>
                 </Navbar>;
    }
});

function mapStateToProps(state) {
  return {
    games: state.getIn(['gamesList', 'games']),
    session: state.getIn(['login', 'session'])
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startEditingGame: () => {
            dispatch(startEditingGame())
        },
        loadGames: () => {
            dispatch(loadGames()).then((response) => {
                if(!response.error){
                    dispatch(loadGamesSuccess(response.payload.data));
                } else {
                    dispatch(loadGamesError(response.error));
                }
            });
        },
        startEditingContentItem: () => {
            dispatch(startEditingContentItem())
        },
        createLoginUser: () => {
            dispatch(createLoginUser())
        },
        logout: () => {
            dispatch(logout()).then((response) => {
                if(!response.error){
                    dispatch(logoutSuccess(response.payload.data));
                } else {
                    dispatch(loginError(response.error));
                }
            });
        }
    }
}

export const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);