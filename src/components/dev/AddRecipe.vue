<script setup>
import { reactive, ref } from 'vue';
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
    protein: null,
    fat: null,
    carbohydrates: null,
    kcal: null
  }
})

const ingredientNameVariants = [
  "Репчатый Лук", "Соевый соус", "Сыр"
]
const amountNameVariants = [
  'г', 'столовых ложек', 'чайных ложек'
]



let ingredientName = ref(null)
let ingredientNumber = ref(null)
let ingredientAmountName = ref(null)
function addIngredient() {
  if (ingredientName.value && ingredientNumber.value && ingredientAmountName.value) {
    let amount = ingredientNumber.value + ' ' + ingredientAmountName.value;
    recipe.ingredients.push({
      name: ingredientName.value,
      'amount': amount
    })
  }
}
function deleteIngredient(index) {
  recipe.ingredients.splice(index, 1)
}

let stepDescription = ref(null)
let stepImage = ref(null)
function addStep() {
  if (stepDescription.value && stepImage.value) {
    recipe.steps.push({
      description: stepDescription.value, image: stepImage.value
    })
  }
}
function deleteStep(index) {
  recipe.steps.splice(index, 1)
}

function submit() {
  console.log(recipe);
}
</script>
<template>
  <v-row class="d-flex jusitfy-center">
    <v-col col="8">
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="recipe.title" clearable label="title" density="compact" variant="outlined">
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="recipe.author" disabled label="author" density="compact" variant="outlined">
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="recipe.portions" clearable label="portions" density="compact" variant="outlined">
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="recipe.time" clearable label="time" density="compact" variant="outlined">
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="recipe.description" clearable label="description" density="compact" variant="outlined">
          </v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="recipe.previewImage" clearable label="previewImage" density="compact"
            variant="outlined"></v-text-field>
        </v-col>

        <v-col cols="12">
          <h3>Health</h3>
        </v-col>
        <v-col cols="3">
          <v-text-field clearable label="carbohydrates" density="compact" variant="outlined"
            v-model="recipe.health.carbohydrates"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field clearable label="fat" density="compact" variant="outlined" v-model="recipe.health.fat">
          </v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field clearable label="protein" density="compact" variant="outlined" v-model="recipe.health.protein">
          </v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field clearable label="kcal" density="compact" variant="outlined" v-model="recipe.health.kcal">
          </v-text-field>
        </v-col>


        <v-col cols="12">
          <h3>Ingredients</h3>
          <v-row class="d-flex">
            <v-col cols="2" v-for="(ingr, i) of recipe.ingredients">
              <v-card variant="tonal" class="pa-3">
                {{ i + 1 }}
                {{ ingr.name }} {{ ingr.amount }}
                <v-btn size="x-small" variant="plain" icon="mdi-delete" color="red" @click="deleteIngredient(i)">
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="5">
          <v-autocomplete label="name" variant="outlined" density="compact" :items="ingredientNameVariants"
            v-model="ingredientName">
          </v-autocomplete>
        </v-col>
        <v-col cols="3">
          <v-text-field clearable type="number" label="amount number" density="compact" variant="outlined"
            v-model="ingredientNumber">
          </v-text-field>
        </v-col>
        <v-col cols="3">
          <v-autocomplete label="amount name" variant="outlined" density="compact" v-model="ingredientAmountName"
            :items="amountNameVariants">
          </v-autocomplete>
        </v-col>
        <v-col cols="1">
          <v-btn variant="tonal" @click="addIngredient">добавить</v-btn>
        </v-col>


        <v-col cols="12">
          <h3>Steps</h3>
          <v-row>
            <v-col v-for="(step, index) of recipe.steps" cols="12">
              <v-row v-if="index % 2 == 0">
                <v-col cols="12" sm="6">
                  <v-img :src="step.image"></v-img>
                </v-col>
                <v-col cols="12" sm="6">
                  {{ step.description }}
                </v-col>
                <v-btn size="x-small" variant="plain" icon="mdi-delete" color="red" @click="deleteStep(index)">
                </v-btn>
              </v-row>
              <v-row v-else>
                <v-col cols="12" sm="6">
                  {{ step.description }}
                </v-col>
                <v-col cols="12" sm="6">
                  <v-img :src="step.image" alt="incorrect-image"></v-img>
                </v-col>
                <v-btn size="x-small" variant="plain" icon="mdi-delete" color="red" @click="deleteStep(index)">
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-textarea label="description" variant="plain" auto-grow rows="1" v-model="stepDescription">
          </v-textarea>
        </v-col>
        <v-col cols="11">
          <v-text-field label="image" variant="plain" v-model="stepImage">
          </v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn variant="tonal" @click="addStep">добавить</v-btn>
        </v-col>

        <v-col cols="12" class="d-flex justify-center">
          <v-btn @click="submit" color="accent">отправить</v-btn>
        </v-col>

      </v-row>
    </v-col>
  </v-row>
</template>