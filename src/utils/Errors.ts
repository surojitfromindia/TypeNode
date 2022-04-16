interface IError {
  [key: string]: string;
}

enum ERRORLIST {
  //for product controller
  P01 = 'Product not found',
  P02 = 'Product name already exists',
  P03 = 'Product update field invalid',
  P00 = 'Product update failed',
}

type ERRORKEY = keyof typeof ERRORLIST;

class TransactionError extends Error {
  code: string;
  message: string;
  constructor(code: ERRORKEY) {
    super();
    this.code = code;
    this.message = ERRORLIST[code];
  }
}

export { TransactionError };
