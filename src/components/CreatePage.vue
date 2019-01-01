<template>
    <div style="">
        <div class="create-left">
            <div style="text-align:center;">
                <h2 style="color: #42b983;">创建一个投票</h2>
            </div>
            <Form10 ref="form10" :schema="schema" :plugins="form10plugins" v-model="model" style="width:100%;flex:1;" :options="options" />
            <el-button type="primary" style="width:100%;" @click="submit">提交</el-button>
        </div>
        <div class="create-right">
            <div style="text-align:center;">
                <h2 style="color: #428983;">预览</h2>                
            </div>
            <Vote v-bind="model"/>
        </div>
    </div>
</template>

<script lang="ts">
import Form10 from "vue-form10";
import form10plugins from "vue-form10/libs/plugins";
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import array2Format from "./array.vue";
import Vote from "./Vote.vue";
import axios from "axios";
import request from "@/io.ts";

Vue.use(ElementUI);

export default Vue.extend({
    name: "Create",
    data() {
        return {
            voteConfig: {},
            model: {},
            form10plugins: form10plugins.concat(array2Format),
            options: {
                inline: true,
                formProps: {
                    "label-width": "100px"
                }
            },
            schema: {
                type: "object",
                required: ["title"],
                properties: {
                    title: {
                        type: "string",
                        title: "标题"
                    },
                    description: {
                        type: "string",
                        title: "描述",
                        format: "textarea"
                    },
                    list: {
                        type: "array",
                        title: "选项列表",
                        form: {
                            draggable: true
                        },
                        format: "array2",
                        items: {
                            type: "object",
                            title: "选项",
                            required: ["title"],
                            properties: {
                                title: {
                                    type: "string",
                                    title: "标题"
                                },
                                // description: {
                                //     type: "string",
                                //     title: "描述"
                                // }
                            }
                        },
                        // default: [{}]
                    },
                    anonymous: {
                        type: "boolean",
                        title: "匿名投票",
                        default: true
                    },
                    random: {
                        type: "boolean",
                        title: "选项随机排序",
                        default: true
                    },
                    multiple: {
                        type: "boolean",
                        title: "多选",
                        default: false
                    },
                    maximum: {
                        type: "integer",
                        title: "数量上限",
                        condition: "parentModel.multiple"
                    },
                    deadline: {
                        type: "number",
                        title: "截止时间",
                        format: "timestamp"
                    }
                }
            }
        };
    },
    methods: {
        async submit() {
            const result = await this.$refs.form10.submit();
            if (result.error) {
                this.$message.error(result.error.message);
            }
            console.log(await this.$refs.form10.submit());
            this.voteConfig = result.value;
            request({
                method: "createVote",
                data: result.value
            });
        }
    },
    props: {
        msg: String,

    },
    components: {
        Form10: Form10 as Vue.Component, Vote
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.create-left {
    position: absolute;
    left: 5%;
    width:40%;
}
.create-right {
    position: absolute;
    right:5%;
    width:40%;
}
</style>
