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
                    console.log(res);
                })
                .catch((err) => console.error(err))
        },
        addRequestsHistory(request) {
            let allIngrs = []
            // пока ищется только из тех, которые пришли с get all
            for (let recipe of this.recipesToShow) {
                for (let ingr of recipe.ingredients) {
                    if (ingr.name.toLowerCase().includes(request.toLowerCase())) {
                        // если ингредиент уже есть в history, то не добавляем
                        if (this.requestsHistory.length > 0 || allIngrs.length > 0) {
                            let isPresent = false;
                            for (let hIngr of this.requestsHistory) {
                                if (ingr.name == hIngr.name) {
                                    isPresent = true;
                                }
                            }
                            for (let curIngr of allIngrs) {
                                if (ingr.name == curIngr.name) {
                                    isPresent = true;
                                }
                            }
                            if (!isPresent)
                                allIngrs.push({ name: ingr.name, youHave: true })
                        } else {
                            allIngrs.push({ name: ingr.name, youHave: true })
                        }
                    }
                }
            }
            this.requestsHistory.push(...allIngrs);
        },
        removeReq(request) {

        },
        async fetchReipesByStrSearch() {
            let searchRequest = this.searchRequest;
            axios.get(`http://localhost:3300/recipes/get-by-str-request?request=${searchRequest}`)
                .then((res) => {
                    let data = res.data
                    this.addRequestsHistory(searchRequest)
                    for (let recipeI = 0; recipeI < data.length; recipeI++) {
                        for (let ingrI = 0; ingrI < data[recipeI].ingredients.length; ingrI++) {
                            for (let request of this.requestsHistory) {
                                if (data[recipeI].ingredients[ingrI].name == request.name) {
                                    data[recipeI].ingredients[ingrI].youHave = true;
                                }
                            }
                        }
                    }
                    console.log(data);
                    this.recipesToShow = data;
                })
                .catch((err) => console.error(err))
        },
        async likeRecipe(value, _id) {
            // RecipesService.likeRecipe(id)
            let found = this.recipesToShow.find(recipe => recipe._id == _id)

            if (value && found)
                found.likes++;
            else if (found) found.likes--;

            if (value) {
                let res = await RecipesService.changeRating(_id, 'likes', 'increase')
            }
            else {
                let res = await RecipesService.changeRating(_id, 'likes', 'decrease')
            }
        }
    },
})