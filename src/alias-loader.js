module.exports = class AliasLoader {
  constructor(config) {
    this.aliases = config.aliases;
    this.srcDir = config.srcDir;
    this.buildDir = config.buildDir;
  }

  getAliases() {
    return Object.keys(this.aliases)
      .map(alias => ({[alias]: this.generateOutputPath(alias)}))
      .reduce((acc, curr) => Object.assign(acc, curr), {})
  }

  generateOutputPath(alias) {
    return this.aliases[alias].replace(this.srcDir, this.buildDir)
  }
}
