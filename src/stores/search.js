import { defineStore } from 'pinia'
import { axios } from 'axios'

export const useSearch = defineStore('data', {
    state: () => ({
        searchRequest: '',
    }),
    getters: {
        getSearched(state) {
            axios.get(`http://loacalhost:3300/recipes?request=${state.searchRequest}`)
                .then((res) => {
                    console.log(res.data);
                })
            return 'nothing'
        }
    },
    actions: {
    },
})