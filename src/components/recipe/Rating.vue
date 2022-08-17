<script setup>
import heart from '../../assets/icons/heart.svg'
import comments from '../../assets/icons/comments.svg'
import repost from '../../assets/icons/repost.svg'

const props = defineProps(['rating'])

let recipe = props.rating;
</script>
<template>
    <div class="d-flex align-center">
        <!-- onclick by rating-item -->
        <div class="rating-item ml-0">
            <img :src="heart" height="24" class="mr-1" /> {{ recipe.likes }}
        </div>
        <div class="rating-item">
            <img :src="comments" height="24" class="mr-1" /> {{ recipe.comments }}
        </div>
        <div class="rating-item">
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