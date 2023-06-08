const resolveServer = require('./resolver/resolveServer')
const resolvePlugin = require('./resolver/resolvePlugin')

const PLUGIN_NAME = 'webpack-collector-plugin'

class WebPackCollectorPlugin {
  constructor(options) {
    resolvePlugin(options)
    this.options = options || {};
  }

  async apply(compiler) {
    const hooks = compiler.hooks;
    hooks.environment.tap(PLUGIN_NAME, async function () {
      await resolveServer()
    });
  }
}


module.exports = WebPackCollectorPlugin
