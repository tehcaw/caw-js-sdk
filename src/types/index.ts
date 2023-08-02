export * from './dtos'
export type AddressType = `0x${string}`;
export declare type Address = AddressType;
export type CAW_ACTION = 'FOLLOW_ACC' | 'SEND_CAW' | 'LIKECAW' | 'RECAW';
export type SUPPORTED_NETWORKS = 'mainnet' | 'goerli';

export type EmitEventType = 'before' | 'sent' | 'completed';
