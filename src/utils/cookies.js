
export const CookieNames = {
  ACCESS_TOKEN: 'omg.token',
  REFRESH_TOKEN: 'omg.refreshToken',
  USER_ID: 'omg.userId',
  USER_ROLE: 'omg.userRole',
  USER: 'omg.user',
}

export const setCookieItem = (cName, cValue, expDays) => {
  const cookieDetails = `${cName}=${cValue};`;
  if (expDays) {
    const expires = `expires=${expDays};`;
    document.cookie = `${cookieDetails} ${expires} path=/`;
  } else {
    document.cookie = `${cookieDetails} path=/`;
  }
};

export const getCookieItem = (cName) => {
  const match = document.cookie.match(new RegExp(`(^| )${cName}=([^;]+)`));
  if (match) return match[2];
  return '';
};

export const removeCookieItem = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export function getTokenExpiry() {
  const addThirtyDays = 30 * 24 * 60 * 60 * 1000;
  const currentDate = new Date();
  const futureDate = new Date(currentDate.getTime() + addThirtyDays);
  return futureDate.toUTCString();
}

// export function getRefreshTokenExpiry() {
//   const addTenDays = 240 * 60 * 60 * 1000;
//   const currentDate = new Date();
//   const futureDate = new Date(currentDate.getTime() + addTenDays);
//   return futureDate.toUTCString();
//   // return new Date(2147483647 * 1000).toUTCString();
// }

export const setSession = (sessionData) => {
  const { accessToken, documentId, refreshToken, userRole, userData } = sessionData;

  const tokenExpiry = getTokenExpiry();
  setCookieItem(CookieNames.ACCESS_TOKEN, accessToken, tokenExpiry);
  setCookieItem(CookieNames.USER_ID, documentId, tokenExpiry);
  setCookieItem(CookieNames.REFRESH_TOKEN, refreshToken, tokenExpiry);
  setCookieItem(CookieNames.USER_ROLE, userRole, tokenExpiry);
  setCookieItem(CookieNames.USER, JSON.stringify(userData), tokenExpiry);
};

export const clearSession = (redirectToHome = false) => {
  removeCookieItem(CookieNames.ACCESS_TOKEN);
  removeCookieItem(CookieNames.USER_ID);
  removeCookieItem(CookieNames.REFRESH_TOKEN);
  removeCookieItem(CookieNames.USER_ROLE);
  removeCookieItem(CookieNames.USER);

  if (redirectToHome) window.location.href = '/auth/login';
};

export const getSession = () => {
  return {
    accessToken: getCookieItem(CookieNames.ACCESS_TOKEN),
    user: getCookieItem(CookieNames.USER) ? JSON.parse(getCookieItem(CookieNames.USER)) : null,
  };
};
