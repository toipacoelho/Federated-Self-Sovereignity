'use strict';

/*
 * Track granted authorizations to access attributes
 * @param {pt.ua.attr.GrantAccess} transaction - grant access
 * @transaction
 */

 async function GrantAccess(transaction){
    const me = getCurrentParticipant();

    if(!me){
        throw new Error('A participant/attribute mapping does not exist');
    }

    var serviceID = transaction.memberID
    if (!serviceID){
        throw new Error('Invalid rquest. \'memberID\' should be defined');
    }

    var meID = me.getIdentifier();

    console.log ('Member ' + meID + 'grating \'attribute\' access to ' + serviceID);
    
    //me should be in the following format: resource:pt.ua.attr.User#meID

    meResource = "resource:pt.ua.attr.User#" + meID

    return query("getAttributeByOwner", {member: meResource})
        .then(function (records){
            if (records.length > 0){
                var serializer = getSerializer();
                var attribute = serializer.toJSON(records[0])

                if(!Array.isArray(attribute.authorized)){
                    attribute.authorized = [];
                }

                if (attribute.authorized.indexOf(serviceID) < 0) {
                    degree.authorized.push(serviceID);

                    return getAssetRegistry('pt.ua.attr.Attribute')
                        .then (function (registry) {registry.update(serializer.fromJSON(attribute))})
                        .then (function(){
                            var event = getFactory().newEvent('pt.ua.attr', 'AttrEvent');
                            event.Attrtransaction = transaction;
                            emit(event)
                        });
                }
            }
        })
        .catch(function (ex) { console.error(ex); throw ex; });
 }

 /*
 * Track granted authorizations to access attributes
 * @param {pt.ua.attr.RevokeAccess} transaction - revoke access
 * @transaction
 */

async function RevokeAccess(transaction){
    const me = getCurrentParticipant();

    if(!me){
        throw new Error('A participant/attribute mapping does not exist');
    }

    var serviceID = transaction.memberID
    if (!serviceID){
        throw new Error('Invalid rquest. \'memberID\' should be defined');
    }

    var meID = me.getIdentifier();

    console.log ('Member ' + meID + 'grating \'attribute\' access to ' + serviceID);
    
    //me should be in the following format: resource:pt.ua.attr.User#meID

    meResource = "resource:pt.ua.attr.User#" + meID

    return query("getAttributeByOwner", {member: meResource})
        .then(function (records){
            if (records.length > 0){
                var serializer = getSerializer();
                var attribute = serializer.toJSON(records[0])

                if(!Array.isArray(attribute.authorized)){
                    var index = attribute.authorized.indexOf(serviceID);
                    
                    if (index >= 0) {
                        degree.authorized.splice(index, 1);

                        return getAssetRegistry('pt.ua.attr.Attribute')
                            .then (function (registry) {registry.update(serializer.fromJSON(attribute))})
                            .then (function(){
                                var event = getFactory().newEvent('pt.ua.attr', 'AttrEvent');
                                event.Attrtransaction = transaction;
                                emit(event)
                            });
                    }
                }
            }
        })
        .catch(function (ex) { console.error(ex); throw ex; });
}

/*
 * Track granted authorizations to access attributes
 * @param {pt.ua.attr.RevokeAttr} transaction - revoke an attribute
 * @transaction
 */

async function RevokeAttr(transaction){
     
}