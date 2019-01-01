const path=require('path');

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
module.exports = {
    baseUrl:'/vote10/',
    devServer:{
        port:20583,
        disableHostCheck: true
    },
    configureWebpack(config) {
        
        // config.resolve.alias["vue-form10"]=resolve('../vue-form10');
        console.log(config.resolve);
        // resolve: {
        //     // symlinks: false,
        //     extensions: ['.js', '.vue', '.json'],
        //     alias: {
        //         'vue$': resolve('node_modules/vue/dist/vue.esm.js'),
        //         '@': resolve('src'),
        //     }
        // },
    }
};
