
export interface IError {
  code: string;
  message: string;
}

const ERROR_CODES: {[key: string]: string} = {
  'auth/bad-body': 'Falta de informação no corpo da requisição',
  'auth/incorrect-credentials': 'Credenciais incorretas',
  'user/not-found': 'Usuário não encontrado',
};

export class HandlerError {
  public static getErrorMessage(error: any): string {
    if ('code' in error) {
      const { code, message } = error;

      return ERROR_CODES[code] || message;
    } else if ('message' in error) {
      const { message } = error;

      switch(message) {
        default: return message;
      }
    } else {
      if (typeof error !== 'object') {
        return error || '';
      } else {
        return '';
      }
    }
  }
}
