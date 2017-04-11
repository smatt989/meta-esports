import axios from 'axios';
import {authenticatedSession, authenticationHeader, authenticate} from './utilities';

const fullstack = true;
const domain = fullstack ? "" : "http://localhost:8080";

const mapzen = "https://search.mapzen.com/v1/search";
const mapzen_api_key = "mapzen-d5Qip2m";


export function setState(state) {
    return {
        type: 'SET_STATE',
        state: state
    };
}

export function cleanState() {
    return {
        type: 'CLEAN_STATE'
    }
}

export function startEditingGame() {
    return {
        type: 'START_EDITING_GAME'
    }
}

export function endEditingGame() {
    return {
        type: 'END_EDITING_GAME'
    }
}

export function updateEditingGameName(name) {
    return {
        type: 'UPDATE_EDITING_GAME_NAME',
        name: name
    }
}

export function saveGame(game){
    const request = axios({
        method: 'post',
        url: `${domain}/games/save`,
        data: game.toJS(),
        headers: authenticate()
    });

    return {
        type: 'SAVE_GAME',
        payload: request
    }
}

export function saveGameSuccess(loaded){
    return {
        type: 'SAVE_GAME_SUCCESS',
        payload: loaded
    }
}

export function saveGameError(error){
    return {
        type: 'SAVE_GAME_ERROR',
        error: error
    }
}

export function loadGames() {
    const request = axios({
        method: 'get',
        url: `${domain}/games`,
        header: []
    });

    return {
        type: 'LOAD_GAMES',
        payload: request
    }
}

export function loadGamesSuccess(loaded){
    return {
        type: 'LOAD_GAMES_SUCCESS',
        payload: loaded
    }
}

export function loadGamesError(error) {
    return {
        type: 'LOAD_GAMES_ERROR',
        error: error
    }
}

export function startEditingContentItem(item) {
    return {
        type: 'START_EDITING_CONTENT_ITEM',
        contentItem: item
    }
}

export function endEditingContentItem() {
    return {
        type: 'END_EDITING_CONTENT_ITEM'
    }
}

export function saveContentItem(contentItem){
    const request = axios({
        method: 'post',
        url: `${domain}/games/content/save`,
        data: contentItem.toJS(),
        headers: authenticate()
    });

    return {
        type: 'SAVE_CONTENT_ITEM',
        payload: request
    }
}

export function saveContentItemSuccess(loaded){
    return {
        type: 'SAVE_CONTENT_ITEM_SUCCESS',
        payload: loaded
    }
}

export function saveContentItemError(error){
    return {
        type: 'SAVE_CONTENT_ITEM_ERROR',
        error: error
    }
}

export function removeContentItem(id){
    const request = axios({
        method: 'post',
        url: `${domain}/games/content/${id}/remove`,
        headers: authenticate()
    });

    return {
        type: 'REMOVE_CONTENT_ITEM',
        payload: request
    }
}

export function removeContentItemSuccess(loaded) {
    return {
        type: 'REMOVE_CONTENT_ITEM_SUCCESS',
        payload: loaded
    }
}

export function removeContentItemError(error) {
    return {
        type: 'REMOVE_CONTENT_ITEM_ERROR',
        error: error
    }
}

export function updateEditingContentItem(item){
    return {
        type: 'UPDATE_EDITING_CONTENT_ITEM',
        contentItem: item
    }
}

export function loadContentItems() {
    const request = axios({
        method: 'get',
        url: `${domain}/games/content/all`,
        header: []
    });

    return {
        type: 'LOAD_CONTENT_ITEMS',
        payload: request
    }
}

export function loadContentItemsSuccess(loaded){
    return {
        type: 'LOAD_CONTENT_ITEMS_SUCCESS',
        payload: loaded
    }
}

export function loadContentItemsError(error) {
    return {
        type: 'LOAD_CONTENT_ITEMS_ERROR',
        error: error
    }
}

export function login(username, password) {
    const request = axios({
        method: 'get',
        url: `${domain}/sessions/new`,
        headers: {
            'username': username,
            'password': password
        }
    });

    return {
        type: 'LOGIN',
        payload: request
    }
}

export function loginSuccess(loaded){
    return {
        type: 'LOGIN_SUCCESS',
        payload: loaded
    }
}

export function loginError(error) {
    return {
        type: 'LOGIN_ERROR',
        error: error
    }
}

export function logout(session){
    const request = axios({
        method: 'post',
        url: `${domain}/sessions/logout`,
        headers: authenticate()
    });

    return {
        type: 'LOGOUT',
        payload: request
    }
}

export function logoutSuccess(loaded){
    return {
        type: 'LOGOUT_SUCCESS',
        payload: loaded
    }
}

export function logoutError(error) {
    return {
        type: 'LOGOUT_ERROR',
        error: error
    }
}

export function createLoginUser(user){
    return {
        type: 'CREATE_LOGIN_USER',
        user: user
    }
}

export function finishedLoginUser(){
    return {
        type: 'FINISHED_LOGIN_USER'
    }
}