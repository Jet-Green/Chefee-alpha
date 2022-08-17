<script setup>
import healthIndicatorHealthy from '../../assets/icons/health-indicator-healthy.svg'

const props = defineProps(['healthIndex'])

let healthIndex = props.healthIndex;
</script>
<template>
    <div class="health-index">
        {{ healthIndex }} / 10
        <img :src="healthIndicatorHealthy" height="24" class="ml-1" />
    </div>
</template>
<style scoped lang="scss">
.health-index {
    display: flex;
    align-items: center;
    justify-content: end;
    font-size: 20px;
}
</style>