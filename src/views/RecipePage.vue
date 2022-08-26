<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSearch } from '../stores/search'
import axios from 'axios'

import HealthIndex from '../components/recipe/HealthIndex.vue'
import heart from '../assets/icons/heart.svg'
import Rating from '../components/recipe/Rating.vue'

const route = useRoute()
const searchStore = useSearch()

let recipe = ref(null)
let HI = ref(null)
onMounted(async () => {
    let id = route.query.id;
    if (searchStore.fetchedRecipes.length) {
        for (let fetchedRecipe of searchStore.fetchedRecipes) {
            if (fetchedRecipe.id != id) {
                let res = await axios.get(`http://localhost:3300/recipes/get?id=${id}`)

                recipe.value = res.data
                let h = recipe.value.health
                HI.value = ((h.protein / 61.25) * 2.5 + (h.fat / 61.25) * 2.5 + (h.carbohydrates / 61.25) * 2.5 + (h.kcal / 700) * 2.5).toFixed(1)
            } else {
                recipe.value = fetchedRecipe
                let h = recipe.value.health
                HI.value = ((h.protein / 61.25) * 2.5 + (h.fat / 61.25) * 2.5 + (h.carbohydrates / 61.25) * 2.5 + (h.kcal / 700) * 2.5).toFixed(1)
            }
        }
    } else {
        let res = await axios.get(`http://localhost:3300/recipes/get?id=${id}`)

        recipe.value = res.data
        let h = recipe.value.health
        HI.value = ((h.protein / 61.25) * 2.5 + (h.fat / 61.25) * 2.5 + (h.carbohydrates / 61.25) * 2.5 + (h.kcal / 700) * 2.5).toFixed(1)
    }


})
</script>
<template>
    <div v-if="!recipe" style="min-height: 90vh; display: flex; justify-content: center; align-items: center;">
        <v-progress-circular :size="50" color="accent" indeterminate></v-progress-circular>
    </div>
    <v-row v-else class="d-flex justify-center">
        <v-col cols="12" lg="8">
            <v-row>
                <v-col cols="12">
                    <h1 class="recipe-title">{{ recipe.title }}</h1>
                </v-col>
            </v-row>


            <v-row class="rating-tray">
                <v-col cols="4">
                    Время приготовления {{ recipe.time }}
                </v-col>
                <v-col class="d-flex justify-center" cols="4">
                    <HealthIndex :healthIndex="HI" />
                </v-col>
                <v-col class="d-flex align-center justify-end" cols="4">
                    <Rating :rating="{ likes: recipe.likes, comments: recipe.comments, reposts: recipe.reposts }" />
                </v-col>
            </v-row>


            <v-row class="slider">
                <v-col>
                    <v-img :src="recipe.previewImage"></v-img>
                </v-col>
            </v-row>


            <v-row class="description">
                <v-col cols="12">
                    <h3>Описание</h3>
                    <p>
                        {{ recipe.description }}
                    </p>
                </v-col>
            </v-row>

            <v-row class="ingredients">
                <v-col cols="6">
                    <v-row>
                        <v-col>
                            <h3>Ингредиенты</h3>
                        </v-col>
                        <v-col class="d-flex justify-end">
                            Порции {{ recipe.portions }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-list>
                                <v-list-item v-for="ingr in recipe.ingredients">
                                    {{ ingr.name }} {{ ingr.amount }}
                                    <v-divider color="secondary"></v-divider>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="instruction">
                <v-col cols="12">
                    <h3>Инструкция приготовления</h3>
                </v-col>
                <v-col v-for="(step, index) of recipe.steps" cols="12">
                    <v-row v-if="index % 2 == 0">
                        <v-col cols="6">
                            <v-img :src="step.image"></v-img>
                        </v-col>
                        <v-col cols="6">
                            {{ step.description }}
                        </v-col>
                    </v-row>
                    <v-row v-else>
                        <v-col cols="6">
                            {{ step.description }}
                        </v-col>
                        <v-col cols="6">
                            <v-img :src="step.image"></v-img>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>


            <v-row class="comments">
                <v-col>
                    <h3>Комментарии</h3>
                </v-col>
                <v-divider color="secondary"></v-divider>
                <v-row class="comments-section">
                    <v-col cols="12">
                        <v-row class="comment">
                            <v-col cols="12" class="comment-author">
                                <v-avatar>
                                    <v-img src="https://cdn.vuetifyjs.com/images/john.jpg">
                                    </v-img>
                                </v-avatar>
                                <span class="comment-author-name">
                                    {{ recipe.firstComment.author }}
                                </span>
                            </v-col>
                            <v-col class="comment-text">
                                {{ recipe.firstComment.text }}
                            </v-col>
                            <v-col cols="12" class="comment-actions">
                                <span class="text-btn">
                                    ответить
                                </span>
                                <span class="text-btn mx-2">
                                    поделиться
                                </span>
                                <img :src="heart" height="16" />
                            </v-col>
                            <v-col cols="12">
                                <v-btn class="comment-show-all" variant="text">
                                    показать все комментарии
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-col cols="12">
                    <v-row class="d-flex justify-center">
                        <v-col cols="8" class="d-flex justify-center">
                            <v-textarea variant="outlined" placeholder="Добавьте комментарий" hide-details="auto"
                                rows="3" style="background-color: #fff"></v-textarea>
                        </v-col>
                        <v-col cols="8" class="d-flex justify-center">
                            <v-btn class="accent-button">Отправить</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<style scoped lang="scss">
.recipe-title {
    text-align: center;
}

.rating-tray {
    font-size: 16px;
    font-weight: 500;
}

.slider {
    img {
        object-fit: cover;
    }
}

.description {
    p {
        font-size: 16px;
        font-weight: 400;
    }
}
</style>