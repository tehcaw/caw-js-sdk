export const getBlockChainErrMsg = (error: any) => {

  let { message, code } = error;
  message = message ? message.split("(")[0] : "";
  code = code ? code : '0';

  return {
    message: String(message || ''),
    code: String(code || '')
  };
}
