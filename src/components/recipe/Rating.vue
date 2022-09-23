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

let liked = ref(false)

let currentHeart = ref(heart)
function like() {
    liked.value = !liked.value;

    if (liked.value) {
        currentHeart.value = heartActive;
        rating.likes++;
    }
    else {
        currentHeart.value = heart;
        rating.likes--;
    }

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