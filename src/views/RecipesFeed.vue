<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRecipes } from '../stores/recipes'

import RecipeCard from '../components/cards/RecipeCard.vue'

let useRecipesStore = useRecipes()

let searchRequest = ref('')
let requestsHistory = computed(() => {
    if (useRecipesStore.searchRequest) {
        let recipes = useRecipesStore.recipesToShow
        // с дубликатами
        let tempHistory = [];
        for (let i = 0; i < recipes.length; i++) {
            let ingredients = recipes[i].ingredients;
            for (let ingredient of ingredients) {
                if (ingredient.name.toLowerCase().includes(useRecipesStore.searchRequest.toLowerCase())) {
                    tempHistory.push(ingredient.name)
                }
            }
        }

        return tempHistory.filter((el, index) => tempHistory.indexOf(el) === index)
    }
    return []
})

let recipesToShow = computed(() => useRecipesStore.recipesToShow)

function search() {
    if (searchRequest.value) {
        useRecipesStore.searchRequest = searchRequest.value;
        useRecipesStore.fetchReipesByStrSearch();
        // ищется searchRequest.value в ингрединетах и добавляется в историю запросов
        // console.log(searchRequest.value);
        // console.log(useSearchStore.requestsHistory);
    }
}

// useRecipesStore.$subscribe((mutation, state) => {
//     if (mutation.events.key === 'recipesToShow') {
//         let newRecipes = state.recipesToShow;
//         recipesToShow.value = newRecipes;
//         // requestsHistory.value = state.requestsHistory;
//     }

//     // TODO. 
//     requestsHistory.value = state.requestsHistory;
// })

onMounted(() => {
    useRecipesStore.fetchAllRecipes()
})
</script>
<template>
    <v-row class="d-flex justify-center">
        <v-col cols="12" sm="8" md="6">
            <v-row class="d-flex d-md-none justify-space-between">
                <v-col cols="12">
                    <v-form class="w-100" @submit.prevent="search">
                        <v-text-field variant="outlined" density="compact"
                            placeholder="Поиск по ингредиентам или по названию" hide-details="auto" class="search-input"
                            v-model="searchRequest">
                            <template #append-inner>
                                <span class="material-icons" @click="search">search</span>
                            </template>
                        </v-text-field>
                    </v-form>
                </v-col>
                <v-col cols="12">
                    <v-btn class="accent-button">Поиск по фото</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-for="ingredient of requestsHistory">
                    <v-chip color="accent">{{ ingredient }}</v-chip>
                </v-col>
            </v-row>
            <v-row v-if="recipesToShow.length" class="mt-6">
                <v-col v-for="recipe in recipesToShow" cols="12">
                    <RecipeCard :_id="recipe._id" />
                </v-col>
            </v-row>
            <v-row v-else style="display: flex; text-align: center;">
                <v-col>
                    Ничего не нашлось
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
