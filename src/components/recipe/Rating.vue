<script setup>
import { ref, computed } from "vue"

import { useRecipes } from "../../stores/recipes"

import heart from '../../assets/icons/heart.svg'
import heartActive from '../../assets/icons/heart-active.svg'
import comments from '../../assets/icons/comments.svg'
import repost from '../../assets/icons/repost.svg'

const props = defineProps(['id', 'rating'])

const recipesStore = useRecipes()

const id = props.id;

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
    recipesStore.likeRecipe(liked.value, id)
}
// function goToComments() {
//     console.log('go to recipepage  comments');
// }
function share() {
    console.log('share');
}
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