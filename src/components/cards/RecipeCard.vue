<script setup>
import healthIndicatorHealthy from '../../assets/icons/health-indicator-healthy.svg'
import heart from '../../assets/icons/heart.svg'
import comments from '../../assets/icons/comments.svg'
import repost from '../../assets/icons/repost.svg'
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
            <v-col cols="3" class="d-flex justify-end">
                <v-btn color="accent" variant="text">подписаться</v-btn>
            </v-col>
        </v-row>
        <v-row class="recipe-info-section">
            <v-col cols="6">
                <h3>
                    {{ recipe.title }}
                </h3>
            </v-col>
            <v-col class="d-flex align-center">
                {{ recipe.ingredients.length }} ингредиентов
                <v-menu :close-on-content-click="false" location="end">
                    <template v-slot:activator="{ props }">
                        <v-icon v-bind="props" icon="mdi:mdi-chevron-down" style="width: 40px; height: 40px;">
                        </v-icon>
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
            <v-col class="d-flex align-center">
                {{ recipe.portions }} порций
            </v-col>
            <v-col class="d-flex align-center">
                {{ recipe.time }}
            </v-col>
        </v-row>
        <v-row class="photo-container">
            <v-col>
                <v-img src="https://www.gastronom.ru/binfiles/images/20200227/b4a40816.jpg" class="photo"></v-img>
            </v-col>
        </v-row>
        <v-row class="rating-section">
            <v-col class="d-flex align-center">
                <img :src="heart" height="24" class="mr-1" /> {{ recipe.likes }}
                <img :src="comments" height="24" class="mr-1 ml-2" /> {{ recipe.comments }}
                <img :src="repost" height="24" class="mr-1 ml-2" /> {{ recipe.reposts }}
            </v-col>
            <v-col class="d-flex align-center justify-end">
                {{ recipe.healthIndex }} / 10
                <img :src="healthIndicatorHealthy" height="24" class="ml-1" />
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
                <span class="show-all-comments">
                    показать все комментарии
                </span>
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
        align-items: center;

        .avatar {
            background-color: #D8D8D8;
            margin-right: 20px;
        }
    }

    .recipe-info-section {
        margin: 0 20px 0 20px;
    }

    .photo {
        object-fit: cover;
    }

    .rating-section {
        margin: 0 20px 0 20px;

        img {
            cursor: pointer;
        }
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

        .show-all-comments {
            cursor: pointer;
            color: #3C3730;
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