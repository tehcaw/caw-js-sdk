import { AddressType } from ".";

export type CAW_ACTION = 'CAW' | 'LIKE' | 'RECAW' | 'FOLLOW';

export const CAW_ACTION_ENUM: { [key: string]: number } = Object.freeze(
  {
    CAW: 0,
    LIKE: 1,
    RECAW: 2,
    FOLLOW: 3,
  });

export interface CawActionData {
  actionType: CAW_ACTION;
  sender: AddressType;
  senderTokenId: number;
  receiverTokenId?: number;
  tipAmount: number;
  timestamp: number;
  cawId?: string;
  text: string;
}

export interface MakeCaw_ActionModel {
  actionType: CAW_ACTION;
  message: string;
  timestamp: number;
  sender: AddressType;
  senderTokenId: number;
}

export interface Recaw_ActionModel {
  actionType: CAW_ACTION;
  timestamp: number;
  cawId: string;
  sender: AddressType;
  senderTokenId: number;
  receiverTokenId: number;
}

export interface LikeCaw_ActionModel {
  actionType: CAW_ACTION;
  timestamp: number;
  cawId: string;
  sender: AddressType;
  senderTokenId: number;
  receiverTokenId: number;
}

export interface FollowAcc_ActionModel {
  actionType: CAW_ACTION;
  timestamp: number;
  sender: AddressType;
  senderTokenId: number;
  receiverTokenId: number;
}
