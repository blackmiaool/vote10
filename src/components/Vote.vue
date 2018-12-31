<template>
  <div >
      <h3>{{title}}</h3>
        <p>{{description}}</p>
        <el-form :model="model" label-position="top">
            <el-form-item v-if="multiple">
                <el-checkbox-group v-model="model.type">                
                    <div v-for="li in choices" class="choice">
                        <el-checkbox :label="li.title" name="type"></el-checkbox>
                    </div> 
                </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="!multiple">
                <el-radio-group v-model="model.resource" style="line-height:inherit;">
                    <div v-for="li in choices" class="choice">
                        <el-radio :label="li.title" name="type"></el-radio>
                    </div>                    
                </el-radio-group>
            </el-form-item>
        </el-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

function shuffle(arr) {
    const ret = [...arr];
    // eslint-disable-next-line
    for (let i =0;i < ret.length; i++) {
        const index = Math.floor(Math.random() * ret.length);
        const item = ret[index];
        ret.splice(index, 1);
        ret.push(item);
    }
    return ret;
}
export default {
    name: "Vote",
    data() {
        return {
            model: {

            }
        };
    },
    computed: {
        choices() {
            if (this.random) {
                return shuffle(this.list);
            } else {
                return this.list;
            }
        }
    },
    props: {
        description: String,
        list: Array as () => ChoiceItem[],
        multiple: Boolean,
        random: Boolean,
        title: String
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .choice{
        margin-bottom:10px;
    }
</style>
