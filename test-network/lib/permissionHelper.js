'use strict';

//const namespace = 'pt.ua.attr';

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
    const assetReg = getAssetRegistry(namespace + '.Attribute');

    let asset = assetReg.get(transaction.attrIDs);

    return (asset.owner.getIdentifier() == participant.getIdentifier());
    
   return true;
 }

 /**
 * check if participant was granted access to the asset
 * @param {*} participant the owner of the asset
 * @param {*} asset input from the transaction to authorize
 * @returns {boolean} true/false
 */
function participantGrantedAsset(participant, asset){
    const index = participant.granted ? participant.granted.indexOf(asset.getIdentifier()) : -1;
    return (index > -1);
}

 /**
 * check if participant is one of the revokers of the asset
 * @param {*} participant the owner of the asset
 * @param {*} asset input from the transaction to authorize
 * @returns {boolean} true/false
 */
function participantRevokerofAsset(participant, asset){
    const index = asset.revokers ? asset.revokers.indexOf(participant.getIdentifier()) : -1;
    return (index > -1);
}