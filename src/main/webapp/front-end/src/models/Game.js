import {Map, List} from 'immutable';
import Immutable from 'immutable';

export function gameBuilder(name, id = null, imageString = null) {
    return Map({id: id, name: name, imageString: imageString})
}