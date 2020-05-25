export const getCurrentUser = (cookies, reduxStateCurrentUser) => {
  if (cookies) {
    return cookies.get("currentUser")
      ? cookies.get("currentUser")
      : reduxStateCurrentUser.toString();
  }
};
