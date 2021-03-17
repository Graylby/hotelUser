import Cookies from 'js-cookie'

const TokenKey = 'hotel-client-user-token';
const RefreshTokenKey = 'hotel-client-user-refresh-token';

export function getToken () {
    return Cookies.get(TokenKey)
}

export function setToken (token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken () {
    return Cookies.remove(TokenKey)
}

export function getRefreshToken () {
    return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken (refreshToken) {
    return Cookies.set(RefreshTokenKey, refreshToken)
}

export function removeRefreshToken () {
    return Cookies.remove(RefreshTokenKey)
}

