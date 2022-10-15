import axios from 'axios'
import { defineStore } from 'pinia'
import RecipesService from '../services/RecipesService'

export const useRecipes = defineStore('recipes', {
    state: () => ({
        searchRequest: '',
        requestsHistory: [],
        recipesToShow: [],
        fetchedRecipes: [],
        currentRecipe: {}
    }),
    getters: {

    },
    actions: {
        async getRecipeById(_id) {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/recipes/get?id=${_id}`)

            this.currentRecipe = data;
        },
        async fetchAllRecipes() {
            RecipesService.getAll()
                .then((res) => {
                    // console.log(JSON.parse(res.data));
                    this.fetchedRecipes = res.data
                    this.recipesToShow = res.data
                })
                .catch((err) => console.error(err))
        },
        async fetchReipesByStrSearch() {
            const request = this.searchRequest;
            axios.get(`${import.meta.env.VITE_API_URL}/recipes/get-by-str-request?request=${request}`)
                .then((res) => {
                    let data = res.data
                    this.recipesToShow = data;
                })
                .catch((err) => console.error(err))
        },
        async likeRecipe(value, _id, userEmail) {
            let found = this.recipesToShow.find(recipe => recipe._id == _id)

            if (value && found)
                found.likes++;
            else if (found) found.likes--;

            if (value) {
                let res = await RecipesService.changeRating(_id, 'likes', 'incr', userEmail)
                console.log(res);
                return res
            }
            else {
                let res = await RecipesService.changeRating(_id, 'likes', 'decr', userEmail)
                console.log(res);
                return res
            }
        },
        async shareRecipe(_id) {
            let res = await RecipesService.changeRating(_id, 'reposts', 'incr', null)
            console.log(res);
        }
    },
})