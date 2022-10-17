<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRecipes } from '../stores/recipes'

import RecipeCard from '../components/cards/RecipeCard.vue'

let useRecipesStore = useRecipes()

let searchRequest = ref('')

let requestsHistory = computed(() => useRecipesStore.requestsHistory)

let recipesToShow = computed(() => useRecipesStore.recipesToShow)

function search() {
    if (searchRequest.value.trim()) {
        useRecipesStore.setSearchRequest(searchRequest.value.trim());
        useRecipesStore.fetchReipesByStrSearch();
    }
}

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
                <v-col>
                    <v-chip color="accent" v-for="ingredient of requestsHistory" class="ma-1">
                        {{ ingredient }}
                        <template #append>
                            <span class="material-icons" @click="useRecipesStore.deleteFromReqHistory(ingredient)"
                                style="cursor: pointer;">close</span>
                        </template>
                    </v-chip>
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
