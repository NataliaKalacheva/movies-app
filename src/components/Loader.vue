<template>
 <div>Loader</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Loader",
    computed: {
        ...mapGetters("loader", ["isShowLoader"])
    }
}

</script>