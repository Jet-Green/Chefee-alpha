<script setup>
function update(stream) {
    document.querySelector('video').src = stream.url;
}
</script>
<template>
    <div>
        <h1>camera</h1>
        <input type="file" id="camera" capture="user" accept="image/*">
        <!-- <device type="media" onchange="update(this.data)"></device>
        <video autoplay></video> -->
    </div>
</template>