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
        deleteFromReqHistory(ingr) {
            this.requestsHistory.splice(this.requestsHistory.indexOf(ingr), 1)
            this.fetchReipesByStrSearch()
        },
        setSearchRequest(searchRequest) {
            this.searchRequest = searchRequest;

            this.requestsHistory.push(searchRequest)
            // let recipes = this.recipesToShow
            // с дубликатами
            // let tempHistory = [];
            // for (let i = 0; i < recipes.length; i++) {
            //     let ingredients = recipes[i].ingredients;
            //     for (let ingredient of ingredients) {
            //         if (ingredient.name.toLowerCase().includes(this.searchRequest.toLowerCase())) {
            //             tempHistory.push(ingredient.name)
            //         }
            //     }
            // }
            // this.requestsHistory.push(...tempHistory.filter((el, index) => tempHistory.indexOf(el) === index))
        },
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
            // const request = this.searchRequest;
            axios.get(`${import.meta.env.VITE_API_URL}/recipes/get-by-str-request?request=${this.requestsHistory}`)
                .then((res) => {
                    let data = res.data
                    this.recipesToShow = data;
                })
                .catch((err) => console.error(err))
        },
        async likeRecipe(value, _id, userEmail) {
            // let found = this.recipesToShow.find(recipe => recipe._id == _id)

            // if (value && found)
            //     found.likes++;
            // else if (found) found.likes--;

            if (value) {
                let res = await RecipesService.like(_id, 'inc', userEmail)
                console.log(res);
                return res
            }
            else {
                let res = await RecipesService.like(_id, 'dec', userEmail)
                console.log(res);
                return res
            }
        },
        async shareRecipe(_id, userEmail) {
            let res = await RecipesService.share(_id)
            console.log(res);
        }
    },
})