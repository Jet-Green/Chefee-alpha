<script setup>
import { ref, computed } from "vue"

import { useRecipes } from "../../stores/recipes"

import heart from '../../assets/icons/heart.svg'
import comments from '../../assets/icons/comments.svg'
import repost from '../../assets/icons/repost.svg'

const props = defineProps(['id'])

const id = props.id;

let recipesStrore = useRecipes()


let recipe = computed(() => recipesStrore.getRecipeById(id))
let liked = ref(false)

function like() {
    liked.value = !liked.value;

    recipesStrore.likeRecipe(liked.value, id)
}
function goToComments() {
    console.log('go to recipepage  comments');
}
function share() {
    console.log('share');
}
</script>
<template>
    <div class="d-flex align-center">
        <!-- onclick by rating-item -->
        <div class="rating-item ml-0" @click="like">
            <img :src="heart" height="24" class="mr-1" /> {{ recipe.likes }}
        </div>
        <!-- <div class="rating-item" @click="goToComments">
            <img :src="comments" height="24" class="mr-1" /> {{ recipe.comments }}
        </div> -->
        <div class="rating-item" @click="share">
            <img :src="repost" height="24" class="mr-1" /> {{ recipe.reposts }}
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
</style>