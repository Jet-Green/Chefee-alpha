<script setup>
import { reactive } from 'vue';
let recipe = reactive({
  author: 'Chefee',
  title: "",
  previewImage: '',
  ingredients: [],
  portions: 0,
  time: "",
  likes: 0,
  likedBy: [],
  reposts: 0,
  comments: [],
  steps: [],
  description: "",
  health: {
    protein: 0,
    fat: 0,
    carbohydrates: 0,
    kcal: 0
  }
})

const ingredientNameVariants = [
  "Репчатый Лук", "Соевый соус", "Сыр"
]
</script>
<template>
  <v-row class="d-flex jusitfy-center">
    <v-col col="8">
      <v-row>
        <v-col cols="6">
          <v-text-field clearable label="title" density="compact" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field clearable label="author" density="compact" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field clearable label="portions" density="compact" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field clearable label="time" density="compact" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field clearable label="description" density="compact" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12">
          <h3>Ingredients</h3>
          <v-list>
            <v-list-item v-for="ingr of recipe.ingredients"></v-list-item>
          </v-list>
        </v-col>
        <v-col cols="6">
          <v-autocomplete label="name" variant="outlined" density="compact" :items="ingredientNameVariants">
          </v-autocomplete>
        </v-col>
        <v-col cols="3">
          <v-text-field clearable type="number" label="amount number" density="compact" variant="outlined">
          </v-text-field>
        </v-col>
        <v-col cols="3">
          <v-autocomplete label="amount name" variant="outlined" density="compact"></v-autocomplete>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>