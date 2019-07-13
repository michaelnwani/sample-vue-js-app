export class Client {
  constructor({
    email = ``,
    brandName = ``
  } = {}) {
    this.email = email;
    this.brandName = brandName;
  }
}

export function createClient(data) {
  console.log(`[createClient] data=${JSON.stringify(data)}`);
  return Object.freeze(new Client(data));
}
