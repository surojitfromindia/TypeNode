class ErrorResponse extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public messages?: string[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.messages = messages;
  }
}

interface successBody {
  success: boolean;
  status: number;
  data: object;
  message?: string;
}

const successResponse = (
  statusCode: number,
  body: object,
  message?: string,
  exclude?: string[]
): successBody => {
  if (exclude) {
    exclude.forEach((key) => {
      delete body[key];
    });
  }
  return { success: true, status: statusCode, data: body, message };
};

export { ErrorResponse, successResponse };
