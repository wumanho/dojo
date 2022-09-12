const ctx = new Proxy(
  {},
  {
    get(target, key) {
      if (
        key === "req" ||
        key === "request" ||
        key === "res" ||
        key === "response"
      ) {
        return Reflect.get(target, key);
      } else {
        const resResult = Reflect.get(target["response"], key);
        const reqResult = Reflect.get(target["request"], key);
        const result = Reflect.get(target, key);
        return resResult || reqResult || result;
      }
    },
    set(target, key, value) {
      return Reflect.set(target, key, value);
    },
  }
);

module.exports = ctx;
