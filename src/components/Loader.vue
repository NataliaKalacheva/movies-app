<template>
 <div class="loader__wrapper" v-if="isShowLoader">
    <div>
     <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
 </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Loader",
    computed: {
        ...mapGetters(["isShowLoader"])
    }
}

</script>

<style lang="scss" scoped>
.loader__wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
}
</style>