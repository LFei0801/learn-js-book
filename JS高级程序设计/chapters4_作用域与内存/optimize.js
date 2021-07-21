function createPerson(name) {
  let localPerson = new Object();
  localPerson.name = name;
  return localPerson;
}

let globalPerson = createPerson("曹操");
/**
 * 在不需要globalPerson变量后解除引用
 */

globalPerson = null;

class Vector {}

function addVector(a, b) {
  let ret = new Vector();
  ret.x = a.x + b.x;
  ret.y = a.y + b.y;
  return ret;
}

function addVector(a, b, vector) {
  vector.x = a.x + b.x;
  vector.y = a.y + b.y;
  return vector;
}
