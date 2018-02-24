const glob = require('glob');
const { join } = require('path');
const deleteEmpty = require('delete-empty');
const AliasLoader = require('./alias-loader');
const TypingProcessor = require('./typing-processor');

module.exports = class TypingsProcessor {
  constructor(config) {
    this.buildDir = config.buildDir;
    this.paths = glob.sync(join(this.buildDir, '**', '*.d.ts'), { absolute: true });
    this.aliases = new AliasLoader(config).getAliases();
  }

  process() {
    this.paths.map(path => new TypingProcessor(path, this.aliases))
      .map(processor => processor.process())
      .forEach(processor => processor.write());
    return this;
  }

  cleanUp() {
    deleteEmpty.sync(this.buildDir);
  }
}
