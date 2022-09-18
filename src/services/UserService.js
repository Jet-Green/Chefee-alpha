import $api from "../plugins/axios";

export default {
    fetchUsers() {
        return $api.get('/users')
    }
}