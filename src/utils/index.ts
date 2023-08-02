import { ContractParams, getContract } from './contract'
import { isInWalletBrowser, isMetaMaskBrowser, isMobileDevice } from './detectors'
import {
  fCurrency,
  fDecimal,
  fPercent,
  getPrecision,
  kFormatter,
  subscript,
  superScript,
  tokenPriceSS
} from './formatNumber'

import * as ManifestHelpers from './manifestHelper';
import * as TextTransformer from './textTransformer';
import * as TokenPrice from './tokenPrice';

import * as UrlExplorers from './urlExplorer';
export * from './errors';

export {
  ContractParams,
  getContract,
  isInWalletBrowser,
  isMetaMaskBrowser,
  isMobileDevice,
  fCurrency,
  fDecimal,
  fPercent,
  getPrecision,
  kFormatter,
  subscript,
  superScript,
  tokenPriceSS,
  ManifestHelpers,
  TextTransformer,
  TokenPrice,
  UrlExplorers
};
