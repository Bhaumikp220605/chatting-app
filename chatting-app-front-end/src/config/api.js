// const BASE_URL = "https://student-portal-backend-cfrm.onrender.com"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const API_ENDPOINTS = {
    LOGIN: `${BASE_URL}/log-in`,
    REGISTER: `${BASE_URL}/register`,

    GET_GROUP: `${BASE_URL}/get-group`,
    GET_MESSAGE: `${BASE_URL}/get-message`,

    JOIN_GROUP: `${BASE_URL}/join-group`,
    CREATE_GROUP: `${BASE_URL}/create-group`,
};

const ROUTES = {
    // LOGIN: "/login",
}

const Constants = {
    API_ENDPOINTS,
    ROUTES
}

export default Constants;