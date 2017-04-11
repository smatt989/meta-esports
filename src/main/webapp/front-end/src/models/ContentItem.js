import {Map, List} from 'immutable';
import Immutable from 'immutable';

export function contentItemBuilder(gameId, name, description, startMillis, started, ended, rating = null, id = null, streamLink= null, vodLink = null, imageLink = null) {
    return Map({
        id: id,
        name: name,
        gameId: gameId,
        description: description,
        rating: rating,
        startMillis: startMillis,
        started: started,
        ended: ended,
        streamLink: streamLink,
        vodLink: vodLink,
        imageLink: imageLink
    })
}

export function defaultContentItem() {
    return contentItemBuilder(
        1,
        "",
        "",
        initialStartDate(),
        false,
        false,
        2
    )
}

function initialStartDate(){
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setMinutes(tomorrow.getMinutes() + 30);
    tomorrow.setMinutes(0);
    return tomorrow.getTime()
}