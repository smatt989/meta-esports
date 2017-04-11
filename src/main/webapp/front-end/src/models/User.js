import {Map, List} from 'immutable';
import Immutable from 'immutable';

export function userBuilder(name = null, password = null) {
    return Map({name: name, password: password})
}

export function defaultUser() {
    return userBuilder()
}