import $api from "../plugins/axios";

export default {
    async getAll() {
        return $api.get('/recipes/get-all')
    },
}