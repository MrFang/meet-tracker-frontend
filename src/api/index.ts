export const BASE_API_URL = process.env.NODE_ENV === 'development'
    ? `${window.location.protocol}//${window.location.hostname}:5000/api`
    : `${window.location.origin}/api`
