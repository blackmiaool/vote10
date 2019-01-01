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
            <Vote v-bind="model" />
        </div>
        <el-dialog title="创建成功" :visible.sync="dialogVisible" width="30%">
            <h4 style="margin:0;">投票地址：</h4>
            <a :href="createdDetailUrl" target="_blank">
                {{createdDetailUrl}}
            </a>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="copyUrl">复制url</el-button>
                <el-button type="default" @click="dialogVisible = false">哦了</el-button>
            </span>
        </el-dialog>
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

const copy = require("clipboard-copy");

Vue.use(ElementUI);

export default Vue.extend({
    name: "Create",
    data() {
        return {
            dialogVisible: false,
            createResultId: null,
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
                                }
                                // description: {
                                //     type: "string",
                                //     title: "描述"
                                // }
                            }
                        }
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
    computed: {
        createdDetailUrl(): string {
            return (
                location.origin +
                location.pathname +
                "#/detail?id=" +
                this.createResultId
            );
        }
    },
    methods: {
        copyUrl() {
            copy(this.createdDetailUrl);
            this.$message({
                message: "复制成功",
                type: "success"
            });
        },
        async submit() {
            const result = await this.$refs.form10.submit();
            if (result.error) {
                this.$message.error(result.error.message);
                return;
            }
            console.log(await this.$refs.form10.submit());
            this.voteConfig = result.value;
            const createResult = await request({
                method: "createVote",
                data: result.value
            });
            this.dialogVisible = true;

            this.createResultId = createResult.data.data._id;
        }
    },
    props: {
        msg: String
    },
    components: {
        Form10: Form10 as Vue.Component,
        Vote
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.create-left {
    position: absolute;
    left: 5%;
    width: 40%;
}
.create-right {
    position: absolute;
    right: 5%;
    width: 40%;
}
</style>
