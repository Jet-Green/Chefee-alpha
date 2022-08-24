import axios from 'axios'
import { defineStore } from 'pinia'

export const useSearch = defineStore('data', {
    state: () => ({
        searchRequest: '',
        requestsHistory: [],
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
        addRequestsHistory(request) {
            let allIngrs = []
            // пока ищется только из тех, которые пришли с get all
            for (let recipe of this.recipesToShow) {
                for (let ingr of recipe.ingredients) {
                    if (ingr.toLowerCase().includes(request.toLowerCase())) {
                        // если ингредиент уже есть в history, то не добавляем
                        if (this.requestsHistory.length > 0 || allIngrs.length > 0) {
                            let isPresent = false;
                            for (let hI of this.requestsHistory) {
                                if (ingr == hI) {
                                    isPresent = true;
                                }
                            }
                            for (let curIngr of allIngrs) {
                                if (ingr == curIngr) {
                                    isPresent = true;
                                }
                            }
                            if (!isPresent)
                                allIngrs.push(ingr)
                        } else {
                            allIngrs.push(ingr)
                        }
                    }
                }
            }
            this.requestsHistory.push(...allIngrs);
        },
        async fetchReipesByStrSearch() {
            let searchRequest = this.searchRequest;
            axios.get(`http://localhost:3300/recipes/get-by-str-request?request=${searchRequest}`)
                .then((res) => {
                    this.recipesToShow = res.data;
                })
                .catch((err) => console.error(err))
        }
    },
})