<script setup>
import { ref, reactive } from 'vue'

let request = ref('')
let recipes = reactive([
    {
        title: "Recipe!!!!!!!!!!!!",
        ingridients: ["молоко", "сыр", "мука"]
    },
    {
        title: "Recipe!!!!!!!!!!!!",
        ingridients: ["малина", "мука"]
    },
    {
        title: "Recipe!!!!!!!!!!!!",
        ingridients: ["курица", "сыр", "картофель"]
    }
])

let recipesToShow = ref([])

function includesIngr(ingrs) {
    for (let ingr of ingrs) {
        if (ingr.toLowerCase().includes(request.value.toLowerCase())) return true
    }
    return false
}

function submit() {
    recipesToShow.value = []
    for (let r of recipes) {
        if (r.title.toLowerCase().includes(request.value.toLowerCase()) || includesIngr(r.ingridients)) {
            recipesToShow.value.push(r)
        }
    }
}
</script>
<template>
    <div class="mb-2">
        <h1>recipes and search</h1>
        <router-link to="/camera">
            <v-btn>СФОТОГРАФИРОВАТЬ!</v-btn>
        </router-link>
        <v-form @submit.prevent="submit">
            <v-text-field v-model="request" placeholder="Введите" variant="outlined" density="compact"
                hint="Помидор, мясо, макароны">
                <!-- <template #append-icon>
                </template> -->
            </v-text-field>
            <!-- <v-btn icon flat class="ml-2">
            <v-icon icon="fas fa-search" />
        </v-btn> -->
        </v-form>
        <v-row>
            <v-col cols="12" sm="6" v-for="recipe in recipesToShow">
                <v-card>
                    <v-card-title>{{ recipe.title }}</v-card-title>
                    <v-card-text>{{ recipe.ingridients }}</v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>