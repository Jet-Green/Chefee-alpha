<script setup>
import { ref, onMounted } from 'vue'
import { useSearch } from '../stores/search'

import RecipeCard from '../components/cards/RecipeCard.vue'

let useSearchStore = useSearch()

let searchRequest = ref('')
let requestsHistory = ref([])

let recipesToShow = ref([])

function search() {
    if (searchRequest.value) {
        useSearchStore.searchRequest = searchRequest.value
        useSearchStore.fetchReipesByStrSearch();
        // ищется searchRequest.value в ингрединетах и добавляется в историю запросов
        // console.log(searchRequest.value);
        // useSearchStore.addRequestsHistory(searchRequest.value)
        // console.log(useSearchStore.requestsHistory);
    }
}

useSearchStore.$subscribe((mutation, state) => {
    if (mutation.events.key === 'recipesToShow') {
        // console.log(mutation);
        let newRecipes = mutation.events.newValue;
        recipesToShow.value = newRecipes;
        // requestsHistory.value = state.requestsHistory;
    }

    // TODO. 
    requestsHistory.value = state.requestsHistory;
})

onMounted(() => {
    useSearchStore.fetchAllRecipes()
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
                <v-col v-for="request of requestsHistory">
                    <v-chip color="accent">{{ request }}</v-chip>
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