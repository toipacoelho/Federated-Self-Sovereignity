import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace pt.ua.attr{
   export class RevokeStatus {
      status: boolean;
      details: string;
   }
   export enum BusinessType {
      BANK,
      EDU,
      GOV,
      ND,
   }
   export class Attribute extends Asset {
      attrID: string;
      blob: string;
      issuer: AP;
      owner: User;
      type: BusinessType;
      revokeStatus: RevokeStatus;
      revokers: Member[];
   }
   export abstract class Member extends Participant {
      memberID: string;
      certificate: string;
   }
   export class AP extends Member {
      name: string;
      type: BusinessType;
   }
   export class RB extends Member {
      name: string;
      type: BusinessType;
   }
   export class SP extends Member {
      name: string;
      granted: string[];
   }
   export class User extends Member {
   }
   export abstract class Attrtransaction extends Transaction {
      memberID: string;
   }
   export class GrantAccess extends Attrtransaction {
      attrIDs: string;
   }
   export class RevokeAccess extends Attrtransaction {
      attrIDs: string;
   }
   export class RevokeAttr extends Attrtransaction {
      attrID: string;
      revokestatus: RevokeStatus;
   }
   export class AttrEvent extends Event {
      attrtransaction: Attrtransaction;
   }
// }
