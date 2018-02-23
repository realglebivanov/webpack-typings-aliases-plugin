const glob = require('glob');
const { join } = require('path');
const deleteEmpty = require('delete-empty');
const AliasLoader = require('./alias-loader');
const AliasProcessor = require('./alias-processor');

module.exports = class TypingsProcessor {
  constructor(config) {
    this.buildDir = config.buildDir;
    this.paths = glob.sync(join(this.buildDir, '**', '*.d.ts'), { absolute: true });
    this.aliases = new AliasLoader(config).getAliases();
  }

  process() {
    this.paths.map(path => new AliasProcessor(path, this.aliases))
      .map(processor => processor.load())
      .forEach(processor => processor.write());
    return this;
  }

  cleanUp() {
    deleteEmpty.sync(this.buildDir);
  }
}
