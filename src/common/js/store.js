const TAG_NAME = 'TAG_NAME';

export function saveToLocal(id, key, value) {
  let obj = window.localStorage.__obj__;
  let ID = (id === null) ? TAG_NAME : id;
  if (!obj) {
    obj = {};
    obj[ID] = {};
  } else {
    obj = JSON.parse(obj);
    if (!obj[ID]) {
      obj[ID] = {};
    }
  }
  obj[ID][key] = value;
  window.localStorage.__obj__ = JSON.stringify(obj);
};

export function clearLocal() {
  window.localStorage.clear();
}

export function loadFromLocal(id, key, def) {
  let obj = window.localStorage.__obj__;
  let ID = (id === null) ? TAG_NAME : id;
  if (!obj) {
    return def;
  }
  obj = JSON.parse(obj)[ID];
  if (!obj) {
    return def;
  }
  let ret = obj[key];
  return ret || def;
};
