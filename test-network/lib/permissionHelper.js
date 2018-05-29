'use strict';

/**
 * Permissions helper for ACL rules
 */

/**
 * check if participant owns the asset
 * @param {*} participant the owner of the asset
 * @param {*} transaction input from the transaction to authorize
 * @returns {boolean} true/false
 */
 function participantOwnerofAsset(participant, transaction){
     return true
 }

 /**
 * check if participant was granted access to the asset
 * @param {*} participant the owner of the asset
 * @param {*} asset input from the transaction to authorize
 * @returns {boolean} true/false
 */
function participantGrantedAsset(participant, asset){
    const index = participant.granted ? participant.granted.indexOf(asset.getIdentifier()) : -1;
    if (index > -1){
        return true
    }
    else{
        return false
    }
}

 /**
 * check if participant is one of the revokers of the asset
 * @param {*} participant the owner of the asset
 * @param {*} asset input from the transaction to authorize
 * @returns {boolean} true/false
 */
function participantRevokerofAsset(participant, asset){
    return true
}