<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

let router = useRouter()

let request = ref('')

let recipes = ref([])
let recipesToShow = ref([])

function includesIngr(ingrs) {
    for (let ingr of ingrs) {
        if (ingr.toLowerCase().includes(request.value.toLowerCase())) return true
    }
    return false
}

function submit() {
    recipesToShow.value = []
    for (let r of recipes.value) {
        if (r.title.toLowerCase().includes(request.value.toLowerCase()) || includesIngr(r.ingridients)) {
            recipesToShow.value.push(r)
        }
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
    <!-- <v-form @submit.prevent="submit">
        <v-text-field v-model="request" placeholder="Введите" variant="outlined" density="compact"
            hint="Помидор, мясо, макароны">
            <template #append-icon>
            </template>
        </v-text-field>
        <v-btn icon flat class="ml-2">
            <v-icon icon="fas fa-search" />
        </v-btn>
    </v-form> -->
    <v-row class="d-flex justify-center">
        <v-col cols="12" sm="8" md="6">
            <v-row class="mt-6">
                <v-col v-for="recipe in recipesToShow" cols="12">
                    <v-card @click="router.push('/recipe')">
                        <v-card-title>{{ recipe.title }}</v-card-title>
                        <v-card-text>{{ recipe.ingridients }}</v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>