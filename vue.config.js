const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
    // plugins: [
    //   //去掉打包之后的打印
    //   new TerserPlugin({
    //     terserOptions: {
    //       ecma: undefined,
    //       warnings: false,
    //       parse: {},
    //       compress: {
    //         drop_console: true,
    //         drop_debugger: false,
    //         pure_funcs: ["console.log"], // 移除console
    //       },
    //     },
    //   }),
    // ],
  },
};
