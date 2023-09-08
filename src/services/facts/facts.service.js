import api from '../api';

export const getRandomFacts = async () => {
    return await api.get('/facts/random').then((response) => {
        if (response.status === 200) {
            return response.data;
        }
    }).catch((error) => {
        return error.response.data;
    });
};

const FactsService = {
    getRandomFacts,
}

export default FactsService;