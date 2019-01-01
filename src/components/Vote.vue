<template>
    <div>
        <h3>{{title}}</h3>
        <p>{{description}}</p>
        <div v-if="deadline"  style="margin-bottom:20px;">
            <h4>剩余时间</h4>
            <Countdown :deadline="deadline" :key="deadline"/>
        </div>        
        <el-form :model="model" label-position="top">
            <el-form-item v-if="multiple">
                <el-checkbox-group v-model="model.checkbox" :max="maximum">
                    <div v-for="(li,index) in choices" class="choice" :key="index">
                        <el-checkbox :label="li.$uid">{{li.title}}</el-checkbox>
                    </div>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item v-if="!multiple">
                <el-radio-group v-model="model.radio" style="line-height:inherit;">
                    <div v-for="(li,index) in choices" class="choice" :key="index">
                        <el-radio :label="li.$uid">{{li.title}}</el-radio>
                    </div>
                </el-radio-group>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Countdown from "@blackmiaool/vuejs-countdown";

function shuffle<T>(arr: T[]= []): T[] {
    const ret = [...arr];
    for (let i = 0; i < ret.length; i++) {
        const index = Math.floor(Math.random() * ret.length);
        const item = ret[index];
        ret.splice(index, 1);
        ret.push(item);
    }
    return ret;
}
interface ChoiceItem {
    title: string;
}
@Component({
    name: "Vote",
    components: {
        Countdown
    }
})
export default class Vote extends Vue {
    public model = {
        checkbox: [],
        radio: null
    };
    @Prop(Boolean) private random!: boolean;
    @Prop(Boolean) private multiple!: boolean;
    @Prop(String) private description!: string;
    @Prop(String) private title!: string;
    @Prop(Array) private list!: ChoiceItem[];
    @Prop(Number) private deadline!: number;
    @Prop(Number) private maximum!: number;
    public get choices() {
        if (this.random) {
            return shuffle(this.list);
        } else {
            return this.list;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.choice {
    margin-bottom: 10px;
}
</style>
