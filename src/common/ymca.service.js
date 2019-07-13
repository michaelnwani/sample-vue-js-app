const YMCA_EMAIL_TOKEN = 'ymca_email';
const YMCA_PHONE_NUMBER_TOKEN = 'ymca_phone_number';
const TEMP_USER_ID = 'temp_user_id';

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
  saveTokens() {
    window.localStorage.setItem(YMCA_EMAIL_TOKEN, getCookie(YMCA_EMAIL_TOKEN));
    window.localStorage.setItem(YMCA_PHONE_NUMBER_TOKEN, getCookie(YMCA_PHONE_NUMBER_TOKEN));
  },

  destroyTokens() {
    window.localStorage.removeItem(YMCA_EMAIL_TOKEN);
    window.localStorage.removeItem(YMCA_PHONE_NUMBER_TOKEN);
  },

  getEmail() {
    return window.localStorage.getItem(YMCA_EMAIL_TOKEN);
  },

  getPhoneNumber() {
    return window.localStorage.getItem(YMCA_PHONE_NUMBER_TOKEN);
  },

  getTempUserId() {
    return window.localStorage.getItem(TEMP_USER_ID);
  }
};
