import {Map, List} from 'immutable';
import Immutable from 'immutable';
import {itemSubTypeByItemTypeAndId} from './utilities';
import {gameBuilder} from './models/Game';
import {defaultUser} from './models/User';
import {contentItemBuilder, defaultContentItem} from './models/ContentItem';
import {setSession} from './utilities';

var _ = require('lodash');

const uuidv1 = require('uuid/v1');

function setState(state, newState) {
    return state.merge(newState);
}

function cleanState() {
    const cleanState = Map({
        games: List.of(),
        editingGame: null,
        editingContentItem: null,
        savingGame: Map({error: null, loading: false}),
        savingContentItem: Map({error: null, loading: false}),
        gamesList: Map({games: List.of(), error: null, loading: false}),
        contentItemsList: Map({contentItems: List.of(), error: null, loading: false}),
        login: Map({session: null, error: null, loading: false}),
        logout: Map({error: null, loading: false}),
        loginUser: null,
        liveContent: List.of(),
        upcomingContent: List.of(),
        finishedContent: List.of()
    });

    return cleanState
}

function startEditingGame(state) {
    return state.set('editingGame', gameBuilder("testing"))
}

function endEditingGame(state) {
    return state.set('editingGame', null)
}

function updateEditingGameName(state, name) {
    const editingGame = state.get('editingGame')
    return state.set('editingGame', editingGame.set('name', name))
}

function saveGame(state){
    return state.set('savingGame', Map({error: null, loading: true}))
}

function saveGameSuccess(state, payload){
    const newState = endEditingGame(state)
    return newState.set('savingGame', Map({error: null, loading: false}))
}

function saveGameError(state, error){
    return state.set('savingGame', Map({error: error, loading: false}))
}

function loadGames(state) {
    return state.set('gamesList', Map({games: List.of(), error: null, loading: true}));
}

function loadGamesSuccess(state, games) {
    return state.set('gamesList', Map({games: Immutable.fromJS(games), error: null, loading: false}));
}

function loadGamesError(state, error) {
    return state.set('gamesList', Map({games: List.of(), error: error, loading: false}));
}

function startEditingContentItem(state, item) {
    const contentItem = item == null ? defaultContentItem() : item
    return state.set('editingContentItem', contentItem)
}

function endEditingContentItem(state) {
    return state.set('editingContentItem', null)
}

function saveContentItem(state) {
    return state.set('savingContentItem', Map({error: null, loading: true}))
}

function saveContentItemSuccess(state, payload) {
    const newState = endEditingContentItem(state)
    return newState.set('savingContentItem', Map({error: null, loading: false}))
}

function saveContentItemError(state, error) {
    return state.set('savingContentItem', Map({error: error, loading: false}))
}

function updateEditingContentItem(state, contentItem) {
    return state.set('editingContentItem', contentItem)
}

function loadContentItems(state) {
    return state.set('contentItemsList', Map({contentItems: List.of(), error: null, loading: true}))
}

function loadContentItemsSuccess(state, contentItems) {

    const items = Immutable.fromJS(contentItems)

    var liveContent = List.of()
    var upcomingContent = List.of()
    var finishedContent = List.of()


    items.map(function(o){
        const started = o.get("started")
        const ended = o.get("ended")
        if(started && !ended){
            liveContent = liveContent.push(o)
        } else if(!started && !ended){
            upcomingContent = upcomingContent.push(o)
        } else {
            finishedContent = finishedContent.push(o)
        }
    })

    const liveState = state.set('liveContent', liveContent);
    const upcomingState = liveState.set('upcomingContent', upcomingContent);
    const finishedState = upcomingState.set('finishedContent', finishedContent);

    return finishedState.set('contentItemsList', Map({contentItems: items, error: null, loading: false}))
}

function loadContentItemsError(state, error) {
    return state.set('contentItemsList', Map({contentItems: List.of(), error: error, loading: false}))
}

function removeContentItem(state) {
    return state.set('savingContentItem', Map({error: null, loading: true}))
}

function removeContentItemSuccess(state, payload){
    const newState = endEditingContentItem(state)
    return newState.set('savingContentItem', Map({error: null, loading: false}))
}

function removeContentItemError(state, error){
    return state.set('savingContentItem', Map({error: error, loading: false}))
}

function login(state){
    return state.set('login', Map({session: null, error: null, loading: true}));
}

function loginSuccess(state, session) {
    setSession(session)
    const newState = finishedLoginUser(state)
    return newState.set('login', Map({session: session, error: null, loading: false}));
}

function loginError(state, error) {
    return state.set('login', Map({session: null, error: error, loading: false}));
}

function logout(state){
    return state.set('logout', Map({error: null, loading: true}));
}

function logoutSuccess(state, payload){
    setSession(null)
    const newState = state.set('login', Map({session: null, error: null, loading: false}));
    return newState.set('logout', Map({error: null, loading: false}));
}

function logoutError(state, error) {
    return state.set('logout', Map({error: error, loading: false}));
}

function createLoginUser(state, user) {
    const u = user == null ? defaultUser() : user
    return state.set('loginUser', u);
}

function finishedLoginUser(state) {
    return state.set('loginUser', null);
}


export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'CLEAN_STATE':
    return cleanState();
  case 'START_EDITING_GAME':
    return startEditingGame(state);
  case 'END_EDITING_GAME':
    return endEditingGame(state);
  case 'UPDATE_EDITING_GAME_NAME':
    return updateEditingGameName(state, action.name);
  case 'SAVE_GAME':
    return saveGame(state);
  case 'SAVE_GAME_SUCCESS':
    return saveGameSuccess(state, action.payload);
  case 'SAVE_GAME_ERROR':
    return saveGameError(state, action.error);
  case 'LOAD_GAMES':
    return loadGames(state);
  case 'LOAD_GAMES_SUCCESS':
    return loadGamesSuccess(state, action.payload);
  case 'LOAD_GAMES_ERROR':
    return loadGamesError(state, action.error);
  case 'START_EDITING_CONTENT_ITEM':
    return startEditingContentItem(state, action.contentItem);
  case 'END_EDITING_CONTENT_ITEM':
    return endEditingContentItem(state);
  case 'SAVE_CONTENT_ITEM':
    return saveContentItem(state);
  case 'SAVE_CONTENT_ITEM_SUCCESS':
    return saveContentItemSuccess(state, action.payload);
  case 'SAVE_CONTENT_ITEM_ERROR':
    return saveContentItemError(state, action.error);
  case 'UPDATE_EDITING_CONTENT_ITEM':
    return updateEditingContentItem(state, action.contentItem);
  case 'LOAD_CONTENT_ITEMS':
    return loadContentItems(state);
  case 'LOAD_CONTENT_ITEMS_SUCCESS':
    return loadContentItemsSuccess(state, action.payload);
  case 'LOAD_CONTENT_ITEMS_ERROR':
    return loadContentItemsError(state, action.error);
  case 'REMOVE_CONTENT_ITEM':
    return removeContentItem(state);
  case 'REMOVE_CONTENT_ITEM_SUCCESS':
    return removeContentItemSuccess(state, action.payload);
  case 'REMOVE_CONTENT_ITEM_ERROR':
    return removeContentItemError(state, action.error);
  case 'LOGIN':
    return login(state);
  case 'LOGIN_SUCCESS':
    return loginSuccess(state, action.payload);
  case 'LOGIN_ERROR':
    return loginError(state, action.error);
  case 'LOGOUT':
    return logout(state);
  case 'LOGOUT_SUCCESS':
    return logoutSuccess(state, action.payload);
  case 'LOGOUT_ERROR':
    return logoutError(state, action.error);
  case 'CREATE_LOGIN_USER':
    return createLoginUser(state, action.user);
  case 'FINISHED_LOGIN_USER':
    return finishedLoginUser(state);
  }
  return state;
}