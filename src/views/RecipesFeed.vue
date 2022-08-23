<script setup>
import { ref, onMounted } from 'vue'
import { useSearch } from '../stores/search'

import RecipeCard from '../components/cards/RecipeCard.vue'

let useSearhStore = useSearch()

let searchRequest = ref('')

let recipesToShow = ref([])

function search() {
    if (searchRequest.value) {
        useSearhStore.searchRequest = searchRequest.value
        useSearhStore.fetchReipesByStrSearch()
    }
}

useSearhStore.$subscribe((mutation, state) => {
    if (mutation.events.key === 'recipesToShow') {
        recipesToShow.value = mutation.events.newValue
    }
})

onMounted(() => {
    useSearhStore.fetchAllRecipes()
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