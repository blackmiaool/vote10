<template>
    <TypeWrapper v-bind="typeWrapperProps" ref="typeWrapper">
        <div slot="input" class="array-wrap">
            <draggable v-if="model&&model.length" class="list-group" element="ol" :list="model" :options="{animation: 150,handle:'.sort-handle'}">
                <li v-for="(item,$index) in model" :key="$index" class="list-group-item" :class="{inline:options.inline}">
                    <AnyType :options="options" :schema="schema.items" :parent-path="path" parent="array" :name="$index" :is-last="$index===model.length-1" v-bind="getChildProps($index)" />
                    <i class="el-icon-sort sort-handle tool-btn" :title="'拖拽排序(序号:'+$index+')'" v-if="form.draggable"></i>
                    <i class="el-icon-delete delete-btn tool-btn" @click="deleteItem($index)" title="删除"></i>
                </li>
            </draggable>
            <el-button type="default" class="add-btn" @click="addItem" v-if="schema.items">
                <i class="el-icon-plus"></i> 添加
            </el-button>
            <div v-if="!schema.items">
                {{$t('noItems')}}
            </div>
        </div>

    </TypeWrapper>
</template>

<script  lang="ts">
import Vue from "vue";
import draggable from "vuedraggable";

//1/ <reference path="./vue-form10.d.ts" />
import { getDefaultFromSchema, FormatMixin } from "vue-form10";

interface FormatMixinI {
    data: {
        model: any[]
    };
}
const FormatMixin1 = FormatMixin as any;
// declare module "vue/types/options" {
//     interface ComponentOptions<V extends Vue> {
//         // This adds the `middleware` property to the existing `vue/types/options/ComponentOptions` type
//         form10?: any;
//     }
// }

export default {
    name: "array2-default",
    mixins: [FormatMixin],
    form10: {
        format: {
            name: "array2",
            types: ["array"]
        },
        defaultSchema: {
            form: {
                draggable: true
            }
        },
        formSchema: {
            type: "object",
            properties: {
                draggable: {
                    type: "boolean",
                    title: "Draggable"
                }
            }
        },
        preview: {
            schema: {
                type: "array",
                // items: {
                //     type: 'object',
                //     title: 'content'
                // },
                form: {
                    draggable: true
                }
            },
            data: [{}]
        }
    },
    props: [],
    data() {
        return {};
    },
    mounted() {
        if (!this.model || !this.model.length) {
            if (this.form.startEmpty === false && this.schema.items) {
                this.addItem();
            }
        }
    },
    methods: {
        addItem() {
            const defaultData = getDefaultFromSchema(this.schema.items, true);
            let model = this.model;
            if (!Array.isArray(model)) {
                model = [];
            }
            model.push(defaultData);
            this.model = model;
        },
        deleteItem(key) {
            this.model.splice(key, 1);
        },
        getChildProps($index) {
            return {
                margin:
                    $index === this.model.length - 1
                        ? "0px"
                        : "0px 0px 15px 0px "
            };
        }
    },
    components: { draggable }
};
</script>


<style scoped lang="less">
.array-wrap {
    overflow: auto;
    .add-btn {
        float: right;
        margin-top: 10px;
    }
}
.list-group {
    box-sizing: border-box;
    overflow: auto;
    margin: 0;
    width: 100%;
    list-style-type: none;
    margin-right: 0;
    margin-left: 0;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 10px;
    padding-bottom: 15px;
    .list-group-item {
        position: relative;
        border-bottom: 1px solid #dcdfe6;
        margin-top: 5px;
        &.inline {
            padding-right: 20px;
            padding-top: 10px;
            > .delete-btn {
                right: 0px;
                cursor: pointer;
                top: 12px;
            }
            > .sort-handle {
                right: 1px;
                cursor: move;
                top: 32px;
            }
        }
        &:first-child {
            margin-top: 0;
        }
        &:last-child {
            border-bottom: none;
        }
        .tool-btn {
            position: absolute;
            top: 8px;
            color: #555;
        }
        > .delete-btn {
            right: 1px;
            cursor: pointer;
        }
        > .sort-handle {
            right: 18px;
            cursor: move;
        }
    }
}
</style>