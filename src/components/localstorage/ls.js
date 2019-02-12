function compileStr(jsonstr) {
  return JSON.parse(jsonstr);
}
function trans2Json(obj) {
  return JSON.stringify(obj);
}
const __ls = window.localStorage;
/**
 * localStorage Dao 会将每一项存储为数组
 */
class LocalStorageUtil {
  constructor(key = 'LOCALSTORAGE_DEFAULT_KEY') {
    this.__key = key;
  }
  set(arr) {
    arr.forEach(item => {
      this.setOne(item);
    });
  }
  coverSet(content) {
    let tostr = Function.prototype.call.bind(Object.prototype.toString);
    let copyContent = content;
    if (
      tostr(content) !== '[object Array]' &&
      tostr(content) !== '[object Object]'
    ) {
      return;
    }

    if (tostr(content) !== '[object Array]') {
      copyContent = [copyContent];
    }
    try {
      __ls[this.__key] = trans2Json(copyContent);
    } catch (e) {
      console.error('Local Storage is full!\r\n', e);
    }
  }
  setOne(obj) {
    if (!('id' in obj)) {
      obj.id = +new Date();
    }
    try {
      let arr = this.get();
      arr.unshift(obj);
      __ls[this.__key] = trans2Json(arr);
    } catch (e) {
      console.error('Local Storage is full!\r\n', e);
    }
  }
  get() {
    return compileStr(__ls[this.__key] || '[]');
  }
  getOne(id) {
    return this.get().find(item => {
      return id == item.id;
    });
  }
  del(id) {
    let arr = this.get().filter(item => {
      return item.id != id;
    });
    this.clear();
    this.set(arr);
  }
  clear() {
    __ls[this.__key] = trans2Json([]);
  }
}
export const ls = new LocalStorageUtil();
export default LocalStorageUtil;
