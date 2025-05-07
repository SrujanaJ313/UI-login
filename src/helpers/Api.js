// import { logout, refreshToken } from '@/store/slices/auth';
// import { store } from '../store/store';
import { CookieNames, getCookieItem } from '../utils/cookies';
import axios from 'axios';

let isAlreadyFetchingAccessToken = false;

let subscribers = [];

function onAccessTokenFetched(accessToken) {
    subscribers = subscribers.filter((callback) => callback(accessToken));
}

function addSubscriber(callback) {
    subscribers.push(callback);
}

const client = axios.create({
    headers: { 'Content-Type': 'application/json' },
});

const ROUTE_WITHOUT_TOKEN = ['login'];

function logout() {

}
function refreshToken () {

}

client.interceptors.request.use(
    (request) => {
        const authRoutes = ROUTE_WITHOUT_TOKEN.some((i) => request?.url?.includes(i));
        const accessToken = getCookieItem(CookieNames.ACCESS_TOKEN);
        if (!authRoutes && request.headers && accessToken) {
            request.headers.Authorization = `Bearer ${accessToken}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    },
);

client.interceptors.response.use(
    (response) => {
        if (response.data.error) {
            return Promise.reject(response.data);
        }
        return Promise.resolve(response.data);
    },
    async (error) => {
        if (error?.config?.url?.includes('refreshToken')) {
            // store.dispatch(logout());
            return Promise.reject(error.response?.data);
        }

        if (error.response?.status === 401) {
            const originalRequest = error.config;

            const retryOriginalRequest = new Promise((resolve) => {
                addSubscriber((accessToken) => {
                    if (originalRequest?.headers && accessToken) {
                        originalRequest.headers.Authorization = accessToken;
                    }
                    if (originalRequest) {
                        resolve(client(originalRequest));
                    }
                });
            });
            try {
                if (!isAlreadyFetchingAccessToken && getCookieItem(CookieNames.REFRESH_TOKEN)) {
                    isAlreadyFetchingAccessToken = true;
                    const data = await refreshToken();
                    isAlreadyFetchingAccessToken = false;
                    onAccessTokenFetched(data.accessToken);
                }

                return retryOriginalRequest;
            } catch (err) {
                // await store.dispatch(logout());
                return retryOriginalRequest;
            }
        }
        return Promise.reject(error.response?.data);
    },
);

export default client;
