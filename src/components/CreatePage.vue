<template>
    <div style="margin:auto;display:flex;align-items:center;flex-direction:column;max-width:600px;">
        <Form10 ref="form10" :schema="schema" :plugins="form10plugins" v-model="model" style="width:100%;flex:1;" :options="options"/>
        <el-button type="primary" style="width:100%;" @click="submit">提交</el-button>
    </div>
</template>

<script lang="ts">
import Form10 from "vue-form10";
import form10plugins from "vue-form10/libs/plugins";
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import array2Format from "./array.vue";

Vue.use(ElementUI);
export default {
    name: "Create",
    data() {
        return {
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
                                description: {
                                    type: "string",
                                    title: "描述"
                                }
                            }
                        },
                        default: [{}]
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
                        condition:"parentModel.multiple"
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
            const result=await this.$refs.form10.submit();
            if(result.error) {
                this.$message.error(result.error.message);
            }
            console.log(await this.$refs.form10.submit());
        }
    },
    props: {
        msg: String
    },
    components: {
        Form10
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
