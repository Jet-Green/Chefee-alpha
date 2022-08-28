import $api from "../plugins/axios";

export default class UserService {
    static fetchUsers() {
        return $api.get('/users')
    }
}