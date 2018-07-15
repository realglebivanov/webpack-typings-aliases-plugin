const TypingsProcessor = require('./typings-processor');

module.exports = class WebpackTypingsAliasesPlugin {
  constructor(config) {
      this.config = config;
  }

  apply(compiler) {
    compiler.hooks.done.tap(WebpackTypingsAliasesPlugin.name, () =>
      new TypingsProcessor(this.config).process().cleanUp()
    );
  }
}
