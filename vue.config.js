const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      // 需要重启 IDE
      .set('assets',resolve('src/assets'))
      .set('common',resolve('src/common'))
      .set('components',resolve('src/components'))
      .set('network',resolve('src/network'))
      .set('views',resolve('src/views'))
      
  }
};