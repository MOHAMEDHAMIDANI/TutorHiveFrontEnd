import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // List of full API endpoints that should not include the Authorization header
        const publicEndpoints = [
            `${config.baseURL}/login/`,
            `${config.baseURL}/signup/`
        ];

        // Check if the request URL is not in the list of public endpoints
        if (!publicEndpoints.includes(config.url)) {
            // Retrieve the user data from localStorage
            const userDataString = localStorage.getItem('tutor_token');
            console.log('userDataString', userDataString);
            if (userDataString) {
                try {
                     if (userDataString) {
                        // Add the token to the Authorization header
                        config.headers.Authorization = `Bearer ${userDataString}`;
                    } else {
                        console.log('Token not found in user data');
                    }
                } catch (error) {
                    console.error('Error parsing user data from localStorage:', error);
                }
            } else {
                console.log('No user data found in localStorage');
            }
        }

        // Set Content-Type for FormData
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('tutor_token');
            localStorage.removeItem('tutor_user');
            localStorage.removeItem('tutor_refreshToken');
            if (window.location.pathname !== '/login') {
                localStorage.removeItem('tutor_token');
                localStorage.removeItem('tutor_user');
                localStorage.removeItem('tutor_refreshToken');
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;