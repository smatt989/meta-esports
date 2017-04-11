import axios from 'axios';
import {authenticatedSession, authenticationHeader, authenticate} from './utilities';

const fullstack = false;
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







export function setAdventureId(id){
    return {
        type: 'SET_ADVENTURE_ID',
        id: id
    }
}

export function setLatLng(lat, lng){
    return {
        type: 'SET_LAT_LNG',
        lat: lat,
        lng: lng
    }
}

export function createMarker(latlng, title){
    return {
        type: 'CREATE_MARKER',
        latlng: latlng,
        title: title
    }
}

export function removeMarker(key){
    return {
        type: 'REMOVE_MARKER',
        key: key
    }
}

export function updateMarker(marker){
    return {
        type: 'UPDATE_MARKER',
        marker: marker
    }
}

export function forceMapCenter(){
    return {
        type: 'FORCE_MAP_CENTER'
    }
}

export function mapCentered() {
    return {
        type: 'MAP_CENTERED'
    }
}

export function mapJumpTo(latlng, locationType) {
    return {
        type: 'MAP_JUMP_TO',
        latlng: latlng,
        locationType: locationType
    }
}

export function mapJumped(){
    return {
        type: 'MAP_JUMPED'
    }
}

export function loadTriggerElementSubTypes(){
    const request = axios({
        method: 'get',
        url: `${domain}/specifications/triggers`,
        header: []
    });

    return {
        type: 'LOAD_TRIGGER_ELEMENT_SUB_TYPES',
        payload: request
    }
}

export function loadTriggerElementSubTypesSuccess(loaded){
    return {
        type: 'LOAD_TRIGGER_ELEMENT_SUB_TYPES_SUCCESS',
        payload: loaded
    }
}

export function loadTriggerElementSubTypesError(error){
    return {
        type: 'LOAD_TRIGGER_ELEMENT_SUB_TYPES_ERROR',
        payload: error
    }
}

export function loadAdventure(id){
    const request = axios({
        method: 'get',
        url: `${domain}/adventures/${id}`,
        header: []
    });

    return {
        type: 'LOAD_ADVENTURE',
        payload: request
    }
}

export function loadAdventureSuccess(loaded){
    return {
        type: 'LOAD_ADVENTURE_SUCCESS',
        payload: loaded
    }
}

export function loadAdventureError(error){
    return {
        type: 'LOAD_ADVENTURE_ERROR',
        error: error
    }
}

export function saveAdventure(adventure){
    const request = axios({
        method: 'post',
        url: `${domain}/adventures/save`,
        data: adventure.toJS(),
        header: []
    })

    return {
        type: 'SAVE_ADVENTURE',
        payload: request
    }
}

export function saveAdventureSuccess(loaded){
    return {
        type: 'SAVE_ADVENTURE_SUCCESS',
        payload: loaded
    }
}

export function saveAdventureError(error){
    return {
        type: 'SAVE_ADVENTURE_ERROR',
        error: error
    }
}

export function searchRemoteLocations(query){
    const request = axios({
        method: 'get',
        url: `${mapzen}?api_key=${mapzen_api_key}&text=${query}`,
        header: []
    });

    return {
        type: 'SEARCH_REMOTE_LOCATIONS',
        payload: request
    }
}

export function searchRemoteLocationsSuccess(cities){
    return {
        type: 'SEARCH_REMOTE_LOCATIONS_SUCCESS',
        payload: cities
    }
}

export function searchRemoteLocationsError(error){
    return {
        type: 'SEARCH_REMOTE_LOCATIONS_SUCCESS',
        payload: error
    }
}

export function clearRemoteLocationSearchResults(){
    return {
        type: 'CLEAR_REMOTE_LOCATION_SEARCH_RESULTS'
    }
}

export function selectMarker(key){
    return {
        type: 'SELECT_MARKER',
        key: key
    }
}

export function deselectMarker(){
    return {
        type: 'DESELECT_MARKER'
    }
}

export function stageMarkerForEdit(key){
    return {
        type: 'STAGE_MARKER_FOR_EDIT',
        key
    }
}

export function unstageMarkerForEdit(){
    return {
        type: 'UNSTAGE_MARKER_FOR_EDIT'
    }
}

export function createTrigger(title){
    return {
        type: 'CREATE_TRIGGER',
        title: title
    }
}

export function removeTrigger(key){
    return {
        type: 'REMOVE_TRIGGER',
        key: key
    }
}

export function updateTrigger(trigger){
    return {
        type: 'UPDATE_TRIGGER',
        trigger: trigger
    }
}

export function stageTriggerForEdit(trigger){
    return {
        type: 'STAGE_TRIGGER_FOR_EDIT',
        trigger: trigger
    }
}

export function unstageTriggerForEdit(){
    return {
        type: 'UNSTAGE_TRIGGER_FOR_EDIT'
    }
}

export function addActionToStagedTrigger(){
    return {
        type: 'ADD_ACTION_TO_STAGED_TRIGGER'
    }
}

export function updateTitleOfStagedTrigger(title){
    return {
        type: 'UPDATE_TITLE_OF_STAGED_TRIGGER',
        title: title
    }
}

export function updateItemOfStagedTrigger(itemType, itemSubTypeId, key){
    return {
        type: 'UPDATE_ITEM_OF_STAGED_TRIGGER',
        itemType: itemType,
        itemSubTypeId: parseInt(itemSubTypeId),
        key: key
    }
}

export function removeActionFromStagedTrigger(key){
    return {
        type: 'REMOVE_ACTION_FROM_STAGED_TRIGGER',
        key: key
    }
}

export function updateItemVariableAssignmentInStagedTrigger(itemType, itemKey, variableIndex, arrayIndex, assignment){
    return {
        type: 'UPDATE_ITEM_VARIABLE_ASSIGNMENT_IN_STAGED_TRIGGER',
        itemType: itemType,
        itemKey: itemKey,
        variableIndex: variableIndex,
        arrayIndex: arrayIndex,
        assignment: assignment
    }
}

export function removeItemVariableAssignmentInStagedTrigger(itemType, itemKey, variableIndex, arrayIndex, assignment){
    return {
        type: 'REMOVE_ITEM_VARIABLE_ASSIGNMENT_IN_STAGED_TRIGGER',
        itemType: itemType,
        itemKey: itemKey,
        variableIndex: variableIndex,
        arrayIndex: arrayIndex
    }
}

export function addItemVariableAssignmentSlotInStagedTrigger(itemType, itemKey, variableIndex){
    return {
        type: 'ADD_ITEM_VARIABLE_ASSIGNMENT_SLOT_IN_STAGED_TRIGGER',
        itemType: itemType,
        itemKey: itemKey,
        variableIndex: variableIndex
    }
}