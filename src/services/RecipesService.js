import $api from "../plugins/axios";

export default {
    async getAll() {
        return $api.get('/recipes/get-all')
    },
    async like(_id, action, userEmail) {
        return $api.post('/recipes/like', { _id, action, userEmail })
    },
    async share(_id, userEmail) {
        return $api.post('/recipes/share', { _id, userEmail })
    }
}