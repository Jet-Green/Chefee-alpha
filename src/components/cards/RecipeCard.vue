<script setup>
import Rating from '../recipe/Rating.vue'
import HealthIndex from '../recipe/HealthIndex.vue'

import arrowRight from '../../assets/icons/arrow-circle-right.svg'

const props = defineProps(['recipe'])
let recipe = props.recipe;
</script>
<template>
    <div class="recipe-card">
        <v-row class="author-section">
            <v-col>
                <v-avatar class="avatar"></v-avatar>
                {{ recipe.author }}
            </v-col>
            <v-col class="d-flex justify-end">
                <v-btn color="accent" variant="text" class="subscribe-btn">Подписаться
                </v-btn>
            </v-col>
        </v-row>


        <v-row class="recipe-info-section">
            <v-col cols="12" md="8" lg="7">
                <h3>
                    {{ recipe.title }}
                </h3>
            </v-col>
            <v-col class="d-flex align-center">
                <v-menu :close-on-content-click="false" location="end">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props" class="ingr-dropdown">
                            {{ recipe.ingredients.length }} ингредиентов
                            <v-icon icon="mdi:mdi-chevron-down" style="width: 40px; height: 40px;">
                            </v-icon>
                        </div>
                    </template>
                    <v-card min-width="100">
                        <v-list>
                            <v-list-item v-for="ingr of recipe.ingredients">
                                {{ ingr }}
                                <v-divider></v-divider>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
            </v-col>
            <v-col class="d-flex align-center jusitfy-end">
                {{ recipe.portions }} порций
            </v-col>
            <v-col class="d-flex align-center">
                {{ recipe.time }}
            </v-col>
        </v-row>


        <v-row class="photo-section">
            <v-col>
                <v-img src="https://www.gastronom.ru/binfiles/images/20200227/b4a40816.jpg"></v-img>
            </v-col>
        </v-row>


        <v-row class="rating-section">
            <v-col class="d-flex align-center">
                <!-- onclick by rating-item -->
                <Rating :rating="{ likes: recipe.likes, comments: recipe.comments, reposts: recipe.reposts }" />
            </v-col>
            <v-col>
                <HealthIndex :healthIndex="recipe.healthIndex" />
            </v-col>
        </v-row>


        <v-divider color="secondary"></v-divider>


        <v-row class="comments-section">
            <v-col cols="12">
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
        </v-row>


        <v-divider color="secondary"></v-divider>


        <v-row class="add-comment-section">
            <v-col cols="11">
                <v-text-field variant="plain" density="compact" placeholder="Добавьте комментарий" hide-details="auto">
                </v-text-field>
            </v-col>
            <v-col cols="1" class="d-flex justify-end align-center">
                <img :src="arrowRight" height="24" />
            </v-col>
        </v-row>
    </div>
</template>
<style scoped lang="scss">
.recipe-card {
    border: 1px solid #D8D8D8;
    border-radius: 10px;
    font-weight: 400;
    padding: 0;

    .author-section {
        margin: 20px 20px 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: 14px;
        font-weight: 500;


        .avatar {
            background-color: #D8D8D8;
            margin-right: 20px;
        }
    }

    .recipe-info-section {
        margin: 0 20px 0 20px;
        font-size: 12px;

        .ingr-dropdown {
            display: flex;
            flex-direction: row;
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
        font-size: 12px;
        font-weight: 500;
    }

    .comments-section {
        margin: 0 20px 0 20px;

        .text {
            font-size: 14px;
            color: #666666;
        }

        .actions {
            display: flex;
            align-items: center;

            .action {
                color: #2A5885;
                text-transform: none;
            }

            img {
                margin: 0 0 0 6px;
                cursor: pointer;
            }
        }


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