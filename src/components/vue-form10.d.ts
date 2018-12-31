interface FormatMixin1{
    model:any;
}
declare module "vue-form10" {
    export const FormatMixin: FormatMixin1;
    export function getDefaultFromSchema(schema:any,root:boolean):any;
}
