import api from '../api';

export const login = async (data) => {
    return await api.post('/auth/login', data).then((response) => {
        if (response.status === 200) {
            return response.data;
        }
    }).catch((error) => {
        return error.response.data;
    });
};

export const register = async (data) => {
    return await api.post('/auth/register', data).then((response) => {
        if (response.status === 201) {
            return response.data;
        }
    }).catch((error) => {
        return error.response.data;
    });
};

export const logout = async () => {
    return await api.post('/auth/logout').then((response) => {
        if (response.status === 200) {
            return response.data;
        }
    }).catch((error) => {
        return error.response.data;
    });
};

const AuthService = {
    login,
    register,
    logout,
}

export default AuthService;