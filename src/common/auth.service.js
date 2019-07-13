const CLIENT_ID_TOKEN = 'client_id';
const REMEMBER_TOKEN  = 'remember_token';
const CLIENT          = 'client';

export const getCookie = name => {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return parts
      .pop()
      .split(';')
      .shift();
  }
};

export default {
  getToken() {
    return window.localStorage.getItem(CLIENT_ID_TOKEN);
  },

  saveTokens() {
    window.localStorage.setItem(CLIENT_ID_TOKEN, getCookie(CLIENT_ID_TOKEN));
    window.localStorage.setItem(REMEMBER_TOKEN, getCookie(REMEMBER_TOKEN));
  },

  destroyTokens() {
    window.localStorage.removeItem(CLIENT_ID_TOKEN);
    window.localStorage.removeItem(REMEMBER_TOKEN);
    window.localStorage.removeItem(CLIENT);
  },

  saveClient(client) {
    window.localStorage.setItem(CLIENT, JSON.stringify(client));
  },

  getClient() {
    return JSON.parse(window.localStorage.getItem(CLIENT));
  },

  getClientId() {
    console.log(`Document.cookie: ${Document.cookie}`);
    return Document.cookie;
  },

  getClientEmail() {
    var currentClient = JSON.parse(window.localStorage.getItem(CLIENT));
    if (currentClient == null) {
      return null;
    }
    return currentClient.email;
  },

  getClientBrandName() {
    var currentClient = JSON.parse(window.localStorage.getItem(CLIENT));
    if (currentClient == null) {
      return null;
    }
    return currentClient.brandName;
  }
};
