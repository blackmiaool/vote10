<template>
    <div class="wrap">
        <Vote v-if="voteConfig" v-bind="voteConfig" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Vote from "./Vote.vue";
import request from "@/io.ts";

export default Vue.extend({
    name: "HelloWorld",
    props: {
        msg: String
    },
    data(){
        return {
            voteConfig:null,
        }
    },
    async beforeMount() {
        // console.log(this.$router.currentRoute.query.id)
        const result = await request({
            method: "getVote",
            data: { _id: this.$router.currentRoute.query.id }
        });
        console.log(result);
        this.voteConfig=result.data.data;
    },
    components:{
        Vote
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.wrap{
    max-width:1200px;
    padding:0 20px;
    margin:auto;
}
</style>
