const chalk = require('chalk')

const error = chalk.bold.red;
const warning = chalk.hex('#FFA500');
const info = chalk.bold.greenBright;
const alert = chalk.white.bold.bgBlueBright;

module.exports = {
  error: function (msg) {
    console.log(error(`❎ [webpack-collector-plugin] ${msg}`))
  },
  warning: function (msg) {
    console.log(warning(`⚠️ [webpack-collector-plugin] ${msg}`))
  },
  info: function (msg) {
    console.log(info(`💬 [webpack-collector-plugin] ${msg}`))
  },
  alert: function (msg) {
    console.log(alert(`💬 [webpack-collector-plugin] ${msg}`))
  },
}
