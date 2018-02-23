const TypingsProcessor = require('./typings-processor');

module.exports = class WebpackTypingsAliasesPlugin {
  constructor(config) {
      this.config = config;
  }

  apply(compiler) {
    compiler.plugin('done', () =>
      new TypingsProcessor(this.config).process().cleanUp()
    );
  }
}
