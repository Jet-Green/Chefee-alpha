<script setup>
import { ref, onMounted } from "vue"

import { useRecipes } from "../../stores/recipes"
import { useUser } from '../../stores/userStore'

import heart from '../../assets/icons/heart.svg'
import heartActive from '../../assets/icons/heart-active.svg'
// import comments from '../../assets/icons/comments.svg'
import repost from '../../assets/icons/repost.svg'

const props = defineProps(['_id', 'rating'])

const recipesStore = useRecipes()
const userStore = useUser()

const _id = props._id;
let rating = props.rating

let loginEmail = ref('')
let loginPassword = ref('')
let registrationEmail = ref('')
let registrationPassword = ref('')

let loginDialog = ref(false)
function openLoginDialog() {
    loginDialog.value = true;
    registrationDialog.value = false;
}
function login() {
    userStore.login(loginEmail.value, loginPassword.value)
    loginDialog.value = false;
}

let registrationDialog = ref(false)
function openRegistrationDialog() {
    registrationDialog.value = true;
    loginDialog.value = false;
}
function registration() {
    userStore.registration(registrationEmail.value, registrationPassword.value)
    registrationDialog.value = false;
}

let liked = ref(false)

let currentHeart = ref(heart)
function like() {
    if (!userStore.isAuth) {
        openLoginDialog()
        return;
    }
    liked.value = !liked.value;

    if (liked.value) {
        currentHeart.value = heartActive;
        rating.likes++;
    }
    else {
        currentHeart.value = heart;
        rating.likes--;
    }
    // recipesStore.likeRecipe(liked.value, _id, userStore.user.email)
    recipesStore.likeRecipe(liked.value, _id, userStore.user.email)
}
// function goToComments() {
//     console.log('go to recipepage  comments');
// }
let shareDialog = ref(false)
function share() {
    shareDialog.value = true;
}

function addShared() {
    recipesStore.shareRecipe(_id)
}

onMounted(() => {
    if (rating.likedBy.find((e) => e.email == userStore.user.email)) {
        currentHeart.value = heartActive;
        liked.value = true;
    }
})
</script>
<template>
    <div class="d-flex align-center" v-if="rating">
        <!-- onclick by rating-item -->
        <div class="rating-item ml-0" @click="like">
            <img :src="currentHeart" height="24" class="mr-1" :class="{ liked: liked }" /> {{ rating.likes }}
        </div>
        <!-- <div class="rating-item" @click="goToComments">
            <img :src="comments" height="24" class="mr-1" /> {{ rating.comments }}
        </div> -->
        <div class="rating-item" @click="share">
            <img :src="repost" height="24" class="mr-1" /> {{ rating.reposts }}
        </div>
        <v-dialog v-model="shareDialog">
            <v-card>
                <v-card-title>Поделиться рецептом</v-card-title>
                <v-card-text>
                    <ShareNetwork network="VK" :url="'http://localhost:5173' + '/recipe&_id=' + _id"
                        :title="'Кулинарный помощник Chefee | ' + rating.title + '\n' + rating.description"
                        description="Готовьте вместе с нами!" hashtags="рецепты,еда" @open="addShared">
                        <b>
                            VK
                        </b>
                    </ShareNetwork>
                    <ShareNetwork network="Telegram" :url="'http://localhost:5173' + '/recipe&_id=' + _id"
                        :title="'Кулинарный помощник Chefee | ' + rating.title + '  ' + rating.description"
                        description="Готовьте вместе с нами!" hashtags="рецепты,еда" @open="addShared">
                        <b>
                            Telegram
                        </b>
                    </ShareNetwork>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="loginDialog">
            <v-card style="min-width: 40vw">
                <v-card-title>
                    <h3>Вход</h3>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="loginEmail" placeholder="email" variant="outlined"
                                    hide-details="auto" density="compact" class="search-input">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="loginPassword" placeholder="пароль" variant="outlined"
                                    hide-details="auto" density="compact" class="search-input" type="password">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="login">
                        войти
                    </v-btn>
                    <v-btn @click="openRegistrationDialog">
                        регистрация
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


        <v-dialog v-model="registrationDialog">
            <v-card style="min-width: 30vw">
                <v-card-title>
                    <h3>Регистрация</h3>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="registrationEmail" placeholder="email" variant="outlined"
                                    hide-details="auto" density="compact" class="search-input">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="registrationPassword" placeholder="пароль" variant="outlined"
                                    hide-details="auto" density="compact" class="search-input" type="password">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="registration">
                        зарегистрироваться
                    </v-btn>
                    <v-btn @click="openLoginDialog">
                        вход
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<style scoped lang="scss">
.rating-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-left: 12px;
}

.liked {
    color: #FF6501 !important;
    transform: scale(1.2);
}
</style>