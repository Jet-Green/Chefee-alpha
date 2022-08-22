<script setup>
import { ref, onMounted } from 'vue'
import { useSearch } from '../stores/search'
import axios from 'axios'

import RecipeCard from '../components/cards/RecipeCard.vue'

let useSearhStore = useSearch()

let searchRequest = ref('')


let recipes = ref([])
let recipesToShow = ref([])

// function includesIngr(ingrs) {
//     for (let ingr of ingrs) {
//         if (ingr.toLowerCase().includes(request.value.toLowerCase())) return true
//     }
//     return false
// }

// function submit() {
//     recipesToShow.value = []
//     for (let r of recipes.value) {
//         if (r.title.toLowerCase().includes(request.value.toLowerCase()) || includesIngr(r.ingridients)) {
//             recipesToShow.value.push(r)
//         }
//     }
// }

function search() {
    if (searchRequest.value) {
        useSearhStore.searchRequest = searchRequest.value
        console.log('dfgdfg');
        // console.log(useSearhStore.searchRequest);
    }
}
onMounted(() => {
    axios.get('http://localhost:3300/recipes/get-all')
        .then((res) => {
            recipes.value = res.data;
            recipesToShow.value = recipes.value;
        })
        .catch((err) => console.error(err))
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
            <v-row class="mt-6">
                <v-col v-for="recipe in recipesToShow" cols="12">
                    <RecipeCard :recipe="recipe" />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>