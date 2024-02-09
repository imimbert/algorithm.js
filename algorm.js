const algorm = {};
algorm.graph = require("./DataStructure/graph");
algorm.stack = require("./DataStructure/stack")
algorm.queue = require("./DataStructure/queue")
algorm.hash = require("./DataStructure/hash")
algorm.tree = require("./DataStructure/tree")
algorm.linkedlist = require("./DataStructure/linkedlist")
algorm.doublylinkedlist = require("./DataStructure/doublylinkedlist")
algorm.set = require("./DataStructure/set")

algorm.sort = require("./algorithm/sort")
algorm.huffman = require("./algorithm/string/huffman")
algorm.kmp = require("./algorithm/string/kmp")
algorm.lcs = require("./algorithm/string/lcs")
algorm.lcss = require("./algorithm/string/lcss")
algorm.rabinkarp = require("./algorithm/string/rabinkarp")
algorm.lsd = require("./algorithm/string/lsd")

module.exports=algorm;
