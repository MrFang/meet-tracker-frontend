export const BASE_API_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : `${window.location.protocol}//${window.location.host}/api`
