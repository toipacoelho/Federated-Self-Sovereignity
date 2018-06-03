'use strict';

const namespace = 'pt.ua.attr';

/*
 * Track granted authorizations to access attributes
 * @param {pt.ua.attr.GrantAccess} transaction - grant access
 * @transaction
 */
 async function GrantAccess(tx){
    //required registries for this operation
    const participantReg = await getParticipantRegistry(namespace + '.SP');
    const assetReg = await getAssetRegistry(namespace + '.Attribute');

    let sp = await participantReg.get(tx.memberID);
    let attr = await assetReg.get(tx.attrID);
    let attrID = tx.attrID;
    let index = -1;
    
    try {
        if(attr.revokeStatus.status){
            throw new Error("Attribute revoked")
        }
    }catch(err){}

    if(!sp.granted){
        sp.granted = [];
    }
    else {
        index = sp.granted.indexOf(attrID);
    }
    
    if(index < 0){
        sp.granted.push(attrID);
        await participantReg.update(sp);
    }
}

 /*
 * Track granted authorizations to access attributes
 * @param {pt.ua.attr.RevokeAccess} transaction - revoke access
 * @transaction
 */
async function RevokeAccess(tx){
    //required registries for this operation
    const participantReg = await getParticipantRegistry(namespace + '.SP');
    const assetReg = await getAssetRegistry(namespace + '.Attribute');

    let sp = await participantReg.get(tx.memberID)
    let attrID = tx.attrID;
    
    const index = sp.granted ? sp.granted.indexOf(attrID) : -1;

    if(index > -1){
        sp.granted.splice(index, 1);
        await participantReg.update(sp);
    }
}

/*
 * Track granted authorizations to access attributes
 * @param {pt.ua.attr.RevokeAttr} transaction - revoke an attribute
 * @transaction
 */
async function RevokeAttr(tx){
    //required registries for this operation
    const assetReg = await getAssetRegistry(namespace + '.Attribute');

    let attr = await assetReg.get(tx.attrID);
    
    attr.revokeStatus = tx.revokeStatus;
    
    await assetReg.update(attr);
}