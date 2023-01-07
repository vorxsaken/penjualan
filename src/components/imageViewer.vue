<template>
    <div class="container" v-if="show" @click.self="$emit('close')">
        <div class="card">
            <div class="card-text" ref="swipe">
                <PinchScrollZoom :width="320" :height="430" :scale="1" class="card-image">
                    <img class="image" :src="source" />
                </PinchScrollZoom>
            </div>
        </div>
    </div>
</template>

<script>
import PinchScrollZoom from '@coddicat/vue-pinch-scroll-zoom';

export default {
    props: ['show', 'source'],
    components: {
        PinchScrollZoom
    }

}
</script>

<style lang="scss" scoped>
.container {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.5);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    z-index: 10;

    .card {
        position: relative;
        top: 100px;
        width: 500px;
        height: auto;
        background-color: white;
        border-radius: 5px;
        overflow: auto;

        .card-text {
            padding: 5px 5px 5px 5px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

    }
}

.image {
    width: 100%;
    height: auto;
}
</style>