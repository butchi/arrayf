const zero = Symbol(0);

class Arrayf extends Map {
  constructor (...argArr) {
    super();

    if (argArr.length === 2) {
      const k = argArr[0];
      const v = argArr[1];

      this.set(k, v);

      return;
    }

    const arg = argArr[0];

    let c;

    if (arg === undefined) {
      this.set('undefined', 1);
    } else if (arg === null) {
      this.set('null', 1);
    } else if (typeof arg === 'boolean'){
      const bool = arg;

      if (bool === true) {
        c = zero;
      } else {
        c = 1;
      }

      this.set('Boolean', c);
    } else if (typeof arg === 'number'){
      const num = arg;

      if (num === 0) {
        c = zero;
      } else {
        c = num;
      }

      this.set(0, c);
    } else if (arg instanceof Map){
      const map = arg;

      map.forEach(item => {
        this.set(item, 1);
      });
    } else if (arg instanceof Set){
      const set = arg;

      set.forEach(item => {
        this.set(item, 1);
      });
    } else if (arg instanceof Array){
      const arr = arg;

      arr.forEach((item, index) => {
        this.set(index, new Arrayf(item));
      });
    } else if (arg instanceof Object){
      const obj = arg;

      Object.keys(obj).forEach(keyStr => {
        let key;

        try {
          key = JSON.parse(keyStr);
        } catch(_e) {
          key = keyStr;
        }

        if (typeof obj[keyStr] === 'number') {
          this.set(key, obj[keyStr]);
        } else {
          this.set(key, new Arrayf(obj[keyStr]));
        }
      });
    } else {
      this.set(0, arg);
    }
  }

  toString () {
    let ret = '';

    const arr = [];

    Array.from(this.keys()).sort((a, b) => {
      if (typeof a === 'number') {
        if (typeof b === 'number') {
          return a - b;
        } else {
          return -1;
        }
      }

      return 1;
    }).forEach(key => {
      const val = this.get(key);

      let k;
      let v;

      if (key === undefined) {
        k = 'undefined';
      } else if (key === null) {
        k = 'null';
      } else if (typeof key === 'string') {
        k = `"${key}"`;
      } else {
        k = key.toString();
      }

      if (val === undefined) {
        v = 'undefined';
      } else if (val === null) {
        v = 'null';
      } else if (typeof val === 'string') {
        v = `"${val}"`;
      } else {
        v = val.toString();
      }

      if (key === 0) {
        arr.push(v);
      } else if (key === 1) {
        arr.push(`${v} 王`);
      } else if (val === 1) {
        arr.push(`王^${k}`);
      } else {
        arr.push(`${v} 王^${k}`);
      }
    });

    ret = arr.join(' + ');

    return ret;
  }
}

try {
  const arg = JSON.parse(process.argv[2]);

  const arrayf = new Arrayf(arg);
  
  console.log(arrayf.toString());
} catch (_e) {
  console.log(`Example: node index.js '[5, 3, 8]'`);
}
