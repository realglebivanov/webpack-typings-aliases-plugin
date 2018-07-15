const fs = require('fs');
const ts = require('typescript');
const { relative, parse } = require('path');

module.exports = class TypingProcessor {
  constructor(path, aliases) {
    this.path = path;
    this.aliases = aliases;
    this.sourceFile = ts.createSourceFile(path, fs.readFileSync(path).toString());
  }

  process() {
    this.processNode(this.sourceFile);
    return this;
  }

  processNode(node) {
    if (this.shouldUpdateNode(node)) {
      this.updateModuleSpecifier(node.moduleSpecifier);
    }
    node.forEachChild(child => this.processNode(child));
  }

  updateModuleSpecifier(moduleSpecifier) {
    moduleSpecifier.text = Object.keys(this.aliases).reduce(
      (result, alias) => result.replace(alias, this.getRelativePath(alias)),
      moduleSpecifier.text || ''
    );
  }

  getRelativePath(alias) {
    return relative(parse(this.path).dir, this.aliases[alias]);
  }

  shouldUpdateNode(node) {
    return node.kind === ts.SyntaxKind.ImportDeclaration
      || node.kind === ts.SyntaxKind.ExportDeclaration;
  }

  write() {
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    const newContent = printer.printNode(ts.EmitHint.Unspecified, this.sourceFile);
    fs.writeFileSync(this.path, newContent);
  }
}
