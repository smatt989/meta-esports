export function playVideo(videoId, divId){

    var player;
    var done = false;

    function onPlayerReady(event) {
        event.target.mute();
        event.target.playVideo();
    }

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
                  done = true;
        }
    }

    player = new YT.Player(divId, {
      height: '150',
      width: '100%',
      videoId: videoId,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

export function validLink(link){
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(link);
}

export function youtubeRegex() {
    return /youtube\.com\/watch\?v=([^=]([a-z|A-Z|0-9|_|-]*))/
}

export function twitchRegex() {
    return /twitch\.tv\/([^\/]([a-z|A-Z|0-9|_|-]*))/
}

export function isAYoutubeLink(link) {
    return youtubeRegex().test(link)
}

export function isATwitchLink(link){
    return twitchRegex().test(link)
}

export function youtubeVideoId(link) {
    if(isAYoutubeLink(link)){
        return link.match(youtubeRegex())[1]
    } else {
        return false
    }
}

export function twitchVideoId(link) {
    if(isATwitchLink(link)){
        return link.match(twitchRegex())[1]
    } else {
        return false
    }
}