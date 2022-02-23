// webpack.config.js
const JavaScriptObfuscator = require('webpack-obfuscator');
module.exports = (config, options) => {
    if (config.mode === 'production') {
        config.plugins.push(new JavaScriptObfuscator({
            rotateStringArray: true, // please customizable with options
        }, ['exclude_bundle.js']));
    }
}
