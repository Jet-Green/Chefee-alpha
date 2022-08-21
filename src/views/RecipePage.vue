<script setup>
import { useRoute } from 'vue-router'

import HealthIndex from '../components/recipe/HealthIndex.vue'
import heart from '../assets/icons/heart.svg'

import Rating from '../components/recipe/Rating.vue'
const route = useRoute()

let recipe = route.params;
</script>
<template>
    <v-row class="d-flex justify-center">
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
                    <HealthIndex :healthIndex="recipe.healthIndex" />
                </v-col>
                <v-col class="d-flex align-center justify-end" cols="4">
                    <Rating :rating="{ likes: recipe.likes, comments: recipe.comments, reposts: recipe.reposts }" />
                </v-col>
            </v-row>


            <v-row class="slider">
                <v-col>
                    <v-img src="https://www.gastronom.ru/binfiles/images/20200227/b4a40816.jpg"></v-img>
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
                                    {{ ingr }}
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
                <v-col cols="12">
                    <v-row>
                        <v-col cols="6">
                            <v-img src="https://www.gastronom.ru/binfiles/images/20200227/b4a40816.jpg"></v-img>
                        </v-col>
                        <v-col cols="6">

                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="6">

                        </v-col>
                        <v-col cols="6">
                            <v-img src="https://www.gastronom.ru/binfiles/images/20200227/b4a40816.jpg"></v-img>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12">
                    <v-row>
                        <v-col cols="6">
                            <v-img src="https://www.gastronom.ru/binfiles/images/20200227/b4a40816.jpg"></v-img>
                        </v-col>
                        <v-col cols="6">

                        </v-col>
                    </v-row>
                </v-col>
            </v-row>


            <v-row class="comments">
                <v-col>
                    <h3>Комментарии</h3>
                </v-col>
                <v-divider color="secondary"></v-divider>
                <v-col>
                    <v-list>
                        <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                            :title="recipe.firstComment.author">
                            <div class="text">
                                {{ recipe.firstComment.text }}
                            </div>
                            <div class="actions">
                                <v-btn class="action" variant="text">
                                    ответить
                                </v-btn>
                                <v-btn class="action" variant="text">
                                    поделиться
                                </v-btn>
                                <img :src="heart" height="14" />
                            </div>
                            <!-- <template v-slot:append>
                            <v-btn variant="text" :class="fav ? 'text-red' : ''" icon="mdi-heart" @click="fav = !fav">
                            </v-btn>
                        </template> -->
                        </v-list-item>
                    </v-list>
                </v-col>
                <v-col cols="12">
                    <v-btn class="show-all-comments-btn" variant="text">
                        показать все комментарии
                    </v-btn>
                </v-col>
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