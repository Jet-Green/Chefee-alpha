import axios from 'axios'
import { defineStore } from 'pinia'

export const useSearch = defineStore('data', {
    state: () => ({
        searchRequest: '',
        recipesToShow: []
    }),
    getters: {
    },
    actions: {
        async fetchAllRecipes() {
            axios.get('http://localhost:3300/recipes/get-all')
                .then((res) => {
                    this.recipesToShow = res.data
                })
                .catch((err) => console.error(err))
        },
        async fetchReipesByStrSearch() {
            axios.get(`http://localhost:3300/recipes/get-by-str-request?request=${this.searchRequest}`)
                .then((res) => {
                    this.recipesToShow = res.data;
                })
                .catch((err) => console.error(err))
        }
    },
})