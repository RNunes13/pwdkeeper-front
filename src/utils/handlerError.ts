
export interface IError {
  code: string;
  message: string;
}

export class HandlerError {
  public static getErrorMessage(error: any): string {
    if ('code' in error) {
      const { code, message } = error;

      switch(code) {
        default: return message;
      }
    } else if ('message' in error) {
      const { message } = error;

      switch(message) {
        default: return message;
      }
    } else {
      return error.message ? error.message : error;
    }
  }
}
