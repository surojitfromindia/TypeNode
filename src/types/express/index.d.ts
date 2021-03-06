declare namespace Express {
  interface Response {
    responseBody: import('../../Interface/IResponseBody').IResponseBody;
    logs: [import('./../../Interface/ILogger').ILogger];
    status: number;
  }
  interface Request {
    userinfo : import ("./../../Interface/IUser").IUser
  }
}
