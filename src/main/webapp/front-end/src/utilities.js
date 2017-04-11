var _ = require('lodash');

export function showProps(obj){
   for(var key in obj){
       console.log(key+": "+obj[key]);
   }
}

export var authenticatedSession = null;

export var authenticationHeader = "Meta-Session-Key"

export function setSession(session) {
    authenticatedSession = session
}

export function authenticate() {
    var authentication = {}
    authentication[authenticationHeader] = authenticatedSession
    return authentication
}