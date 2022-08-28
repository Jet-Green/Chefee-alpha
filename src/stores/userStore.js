import { defineStore } from 'pinia'
import AuthService from '../services/AuthService';
import axios from 'axios'
import { API_URL } from '../plugins/axios';

export const useUser = defineStore('user', {
    state: () => ({
        user: {},
        isAuth: false
    }),
    getters: {
    },
    actions: {
        setAuth(bool) {
            this.isAuth = bool;
        },

        setUser(user) {
            this.user = user;
        },

        async login(email, password) {
            try {
                const response = await AuthService.login(email, password);
                localStorage.setItem('token', response.data.accessToken);

                console.log(response);

                this.setAuth(true);
                this.setUser(response.data.user)
            } catch (err) {
                console.log(err.response?.data?.message);
            }
        },

        async registration(email, password) {
            try {
                const response = await AuthService.registration(email, password);
                localStorage.setItem('token', response.data.accessToken);

                console.log(response);

                this.setAuth(true);
                this.setUser(response.data.user)
            } catch (err) {
                console.log(err.response?.data?.message);
            }
        },

        async logout() {
            try {
                const response = await AuthService.logout();
                localStorage.removeItem('token');

                console.log(response);

                this.setAuth(false);
                this.setUser({})
            } catch (err) {
                console.log(err.response?.data?.message);
            }
        },

        async checkAuth() {
            try {
                const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true })

                localStorage.setItem('token', response.data.accessToken);

                console.log(response);

                this.setAuth(true);
                this.setUser(response.data.user)
            } catch (error) {
                console.log(err.response?.data?.message);
            }
        }
    },
})