<script setup>
import { computed } from "vue"
import { useRouter } from 'vue-router'
import { useRecipes } from '../../stores/recipes'

import Rating from '../recipe/Rating.vue'
import HealthIndex from '../recipe/HealthIndex.vue'

const router = useRouter();
const useRecipesStore = useRecipes();
const props = defineProps(['_id'])

let _id = props._id
let recipe = computed(() =>
    useRecipesStore.recipesToShow.find((r) => r._id == _id)
)


let HI = computed(() =>
    ((recipe.value.health.protein / 61.25) * 2.5 +
        (recipe.value.health.fat / 61.25) * 2.5 +
        (recipe.value.health.carbohydrates / 61.25) * 2.5 +
        (recipe.value.health.kcal / 700) * 2.5)
        .toFixed(1)
)

let youHave = computed(() => {
    let count = 0;
    for (let ingrInSearch of useRecipesStore.requestsHistory) {
        for (let ingr of recipe.value.ingredients) {
            if (ingr.name.toLowerCase().includes(ingrInSearch.toLowerCase())) {
                count++;
                break;
            }
        }
    }
    return count;
})
</script>
<template>
    <div class="recipe-card">
        <!-- <v-row class="author-section">
            <v-col>
                <v-avatar class="avatar"></v-avatar>
                {{ recipe.author }}
            </v-col>
            <v-col class="d-flex justify-end">
                <v-btn color="accent" variant="text" class="accent-btn">Подписаться
                </v-btn>
            </v-col>
        </v-row> -->


        <v-row class="recipe-info-section" gutter="16">
            <v-col cols="12" md="5"
                @click="router.push({ name: 'RecipePage', query: { _id: recipe._id }, params: { recipe } })"
                style="cursor: pointer">
                <h2 style="font-weight: 500;">
                    {{ recipe.title }}
                </h2>
            </v-col>
            <v-col class="d-flex align-center" style="justify-content: end;">
                <v-menu :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props" class="ingr-dropdown">
                            <div v-if="!youHave">
                                {{ recipe.ingredients.length }} ингредиентов
                            </div>
                            <div v-else>
                                Есть {{ youHave }} из {{ recipe.ingredients.length }}
                                ингредиентов
                            </div>
                            <span class="material-icons">expand_more</span>
                        </div>
                    </template>
                    <v-card min-width="100">
                        <v-list>
                            <v-list-item v-for="ingr of recipe.ingredients">
                                {{ ingr.name }}
                                <v-divider></v-divider>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
            </v-col>
            <v-col class="d-flex align-center" style="justify-content: end;">
                {{ recipe.portions }} порций
            </v-col>
            <v-col class="d-flex align-center" style="justify-content: end;">
                {{ recipe.time }}
            </v-col>
        </v-row>


        <v-row class="photo-section"
            @click="router.push({ name: 'RecipePage', query: { _id: recipe._id }, params: { recipe } })"
            style="cursor: pointer">
            <v-col>
                <v-img :src="recipe.previewImage"></v-img>
            </v-col>
        </v-row>


        <v-row class="rating-section">
            <v-col class="d-flex align-center">
                <Rating :_id="_id" :rating="recipe" />
            </v-col>
            <v-col>
                <HealthIndex :healthIndex="HI" />
            </v-col>
        </v-row>


        <!-- <v-divider color="secondary"></v-divider> -->


        <!-- <v-row class="comments-section">
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
                    <v-col cols="12" class="pb-0">
                        <v-btn class="comment-show-all" variant="text">
                            показать все комментарии
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row> -->


        <!-- <v-divider color="secondary"></v-divider>


        <v-row class="add-comment-section">
            <v-col cols="11">
                <v-text-field variant="plain" density="compact" placeholder="Добавьте комментарий" hide-details="auto">
                </v-text-field>
            </v-col>
            <v-col cols="1" class="d-flex justify-end align-center">
                <img :src="arrowRight" height="24" />
            </v-col>
        </v-row> -->
    </div>
</template>
<style scoped lang="scss">
.recipe-card {
    border: 1px solid #D8D8D8;
    border-radius: 10px;
    font-weight: 400;
    padding: 0;
    background-color: #fff;

    .author-section {
        margin: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: 16px;
        font-weight: 500;


        .avatar {
            background-color: #D8D8D8;
            margin-right: 20px;
        }
    }

    .recipe-info-section {
        margin: 0 20px 0 20px;
        font-size: 14px;

        .ingr-dropdown {
            display: flex;
            align-items: center;
            cursor: pointer;
        }
    }

    .photo-section {
        img {
            object-fit: cover;
        }
    }

    .rating-section {
        margin: 0 20px 0 20px;
        font-size: 14px;
        font-weight: 500;
    }

    .add-comment-section {
        margin: 0 20px 0 20px;
        color: #3C3730;

        img {
            cursor: pointer;
        }
    }
}
</style>