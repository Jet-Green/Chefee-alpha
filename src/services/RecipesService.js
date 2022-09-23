import $api from "../plugins/axios";

export default {
    async getAll() {
        return $api.get('/recipes/get-all')
    },
    async changeRating(_id, item, action, userEmail) {
        return $api.post('/recipes/change-rating', { _id, item, action, userEmail })
    }
}