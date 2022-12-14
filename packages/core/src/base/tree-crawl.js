function Context(flags, cursor) {
  this.flags = flags;
  this.cursor = cursor;
}
Context.prototype = {
  skip: function skip() {
    this.flags.skip = true;
  },
  break: function _break() {
    this.flags.break = true;
  },
  remove: function remove() {
    this.flags.remove = true;
  },
  replace: function replace(node) {
    this.flags.replace = node;
  },
  get parent() {
    return this.cursor.parent;
  },
  get depth() {
    return this.cursor.depth;
  },
  get level() {
    return this.cursor.depth + 1;
  },
  get index() {
    return this.cursor.index;
  }
};
function ContextFactory(flags, cursor) {
  return new Context(flags, cursor);
}

function Stack(initial) {
  this.xs = [initial];
  this.top = 0;
}
Stack.prototype = {
  push: function push(x) {
    this.top++;
    if (this.top < this.xs.length) {
      this.xs[this.top] = x;
    } else {
      this.xs.push(x);
    }
  },
  pushArrayReverse: function pushArrayReverse(xs) {
    for (var i = xs.length - 1; i >= 0; i--) {
      this.push(xs[i]);
    }
  },
  pop: function pop() {
    var x = this.peek();
    this.top--;
    return x;
  },
  peek: function peek() {
    return this.xs[this.top];
  },
  isEmpty: function isEmpty() {
    return -1 === this.top;
  }
};
function QueueFactory(initial) {
  return new Stack(initial);
}

function DfsCursor() {
  this.depth = 0;
  this.stack = QueueFactory({ node: null, index: -1 });
}
DfsCursor.prototype = {
  moveDown: function moveDown(node) {
    this.depth++;
    this.stack.push({ node: node, index: 0 });
  },
  moveUp: function moveUp() {
    this.depth--;
    this.stack.pop();
  },
  moveNext: function moveNext() {
    this.stack.peek().index++;
  },
  get parent() {
    return this.stack.peek().node;
  },
  get index() {
    return this.stack.peek().index;
  }
};
function CursorFactory() {
  return new DfsCursor();
}

function Flags() {
  this.break = false;
  this.skip = false;
  this.remove = false;
  this.replace = null;
}
Flags.prototype = {
  reset: function reset() {
    this.break = false;
    this.skip = false;
    this.remove = false;
    this.replace = null;
  }
};
function FlagsFactory() {
  return new Flags();
}

function isNotEmpty(xs) {
  return xs && 0 !== xs.length;
}

function dfsPre(root, iteratee, getChildren) {
  var flags = FlagsFactory();
  var cursor = CursorFactory();
  var context = ContextFactory(flags, cursor);
  var stack = QueueFactory(root);
  var dummy = Object.assign({}, root);
  while (!stack.isEmpty()) {
    var node = stack.pop();
    if (node === dummy) {
      cursor.moveUp();
      continue;
    }
    flags.reset();
    iteratee(node, context);
    if (flags.break) break;
    if (flags.remove) continue;
    cursor.moveNext();
    if (!flags.skip) {
      if (flags.replace) {
        node = flags.replace;
      }
      var children = getChildren(node);
      if (isNotEmpty(children)) {
        stack.push(dummy);
        stack.pushArrayReverse(children);
        cursor.moveDown(node);
      }
    }
  }
}

function dfsPost(root, iteratee, getChildren) {
  var flags = FlagsFactory();
  var cursor = CursorFactory();
  var context = ContextFactory(flags, cursor);
  var stack = QueueFactory(root);
  var ancestors = QueueFactory(null);
  while (!stack.isEmpty()) {
    var node = stack.peek();
    var parent = ancestors.peek();
    var children = getChildren(node);
    flags.reset();
    if (node === parent || !isNotEmpty(children)) {
      if (node === parent) {
        ancestors.pop();
        cursor.moveUp();
      }
      stack.pop();
      iteratee(node, context);
      if (flags.break) break;
      if (flags.remove) continue;
      cursor.moveNext();
    } else {
      ancestors.push(node);
      cursor.moveDown(node);
      stack.pushArrayReverse(children);
    }
  }
}

var THRESHOLD = 32768;
function Queue(initial) {
  this.xs = [initial];
  this.top = 0;
  this.maxLength = 0;
}
Queue.prototype = {
  enqueue: function enqueue(x) {
    this.xs.push(x);
  },
  enqueueMultiple: function enqueueMultiple(xs) {
    for (var i = 0, len = xs.length; i < len; i++) {
      this.enqueue(xs[i]);
    }
  },
  dequeue: function dequeue() {
    var x = this.peek();
    this.top++;
    if (this.top === THRESHOLD) {
      this.xs = this.xs.slice(this.top);
      this.top = 0;
    }
    return x;
  },
  peek: function peek() {
    return this.xs[this.top];
  },
  isEmpty: function isEmpty() {
    return this.top === this.xs.length;
  }
};
function QueueFactory$1(initial) {
  return new Queue(initial);
}

function BfsCursor() {
  this.depth = 0;
  this.index = -1;
  this.queue = QueueFactory$1({ node: null, arity: 1 });
  this.levelNodes = 1;
  this.nextLevelNodes = 0;
}
BfsCursor.prototype = {
  store: function store(node, arity) {
    this.queue.enqueue({ node: node, arity: arity });
    this.nextLevelNodes += arity;
  },
  moveNext: function moveNext() {
    this.index++;
  },
  moveForward: function moveForward() {
    this.queue.peek().arity--;
    this.levelNodes--;
    if (0 === this.queue.peek().arity) {
      this.index = 0;
      this.queue.dequeue();
    }
    if (0 === this.levelNodes) {
      this.depth++;
      this.levelNodes = this.nextLevelNodes;
      this.nextLevelNodes = 0;
    }
  },
  get parent() {
    return this.queue.peek().node;
  }
};
function CursorFactory$1() {
  return new BfsCursor();
}

function bfs(root, iteratee, getChildren) {
  var flags = FlagsFactory();
  var cursor = CursorFactory$1();
  var context = ContextFactory(flags, cursor);
  var queue = QueueFactory$1(root);
  while (!queue.isEmpty()) {
    var node = queue.dequeue();
    flags.reset();
    iteratee(node, context);
    if (flags.break) break;
    if (!flags.remove) {
      cursor.moveNext();
      if (flags.replace) {
        node = flags.replace;
      }
      if (!flags.skip) {
        var children = getChildren(node);
        if (isNotEmpty(children)) {
          queue.enqueueMultiple(children);
          cursor.store(node, children.length);
        }
      }
    }
    cursor.moveForward();
  }
}

var defaultGetChildren = function defaultGetChildren(node) {
  return node.children;
};
function crawl(root, iteratee, options) {
  if (null == root) return;
  options = options || {};
  var order = options.order || 'pre';
  var getChildren = options.getChildren || defaultGetChildren;
  if ('pre' === order) {
    dfsPre(root, iteratee, getChildren);
  } else if ('post' === order) {
    dfsPost(root, iteratee, getChildren);
  } else if ('bfs' === order) {
    bfs(root, iteratee, getChildren);
  }
}

export default crawl;
