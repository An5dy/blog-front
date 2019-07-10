const TOKEN_KEY = "access_token";

export default {
  set(token) {
    return localStorage.setItem(TOKEN_KEY, token);
  },
  get() {
    return localStorage.getItem(TOKEN_KEY);
  },
  del() {
    return localStorage.removeItem(TOKEN_KEY);
  }
};
