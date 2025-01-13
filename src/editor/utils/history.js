export class History {
  constructor() {
    this.items = [];
    this.index = -1;
  }

  push(content) {
    this.index++;
    this.items = this.items.slice(0, this.index);
    this.items.push(content);
  }

  undo() {
    if (this.index > 0) {
      this.index--;
      return this.items[this.index];
    }
    return null;
  }

  redo() {
    if (this.index < this.items.length - 1) {
      this.index++;
      return this.items[this.index];
    }
    return null;
  }
}