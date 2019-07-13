export class Login {
  constructor({
    email = ``,
    password = ``
  } = {}) {
    this.email = email;
    this.password = password;
  }
}

export function createLogin(data) {
  return new Login(data);
}
