/**
 * 修饰内容:
 *  - 同步 get set
 *  - 异步 get set
 *  - 命名空间
 *  - 节流
 *  - 分片
 */

/**
 * 同步获取值
 */
export const syncPresist = {
  get(key: string) {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : val;
  },
  set(key: string, val: any) {
    if (val === undefined) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(val));
  },
};

/**
 * 用于 fake 异步
 * @param time
 */
const wait = (time = 10) => new Promise((resolve) => setTimeout(resolve, time));

/**
 * 异步获取值
 * 接口获取值 // TODO 完善类型推导
 */
type AsyncPresist = {
  _executed: boolean;
  _store: { [key: string]: string };
  _tasks: Set<string>;
  get: (key: string) => Promise<any>;
  gets: (keys: string[]) => Promise<{ [key: string]: any }>;
  _preAddPreset: () => boolean;
  addPreset: (key: string) => void;
  addPresets: (keys: string[]) => void;
  getPreset: (key: string) => any;
  getPresets: (keys: string[]) => { [key: string]: any };
  set: (key: string, val: any) => Promise<void>;
  sets: (data: { [key: string]: any }) => Promise<void>;
  prefetch: () => Promise<void>;
};

export const asyncPresist: AsyncPresist = {
  _executed: false,
  _store: {},
  _tasks: new Set(),
  // 异步 单 key get
  async get(key: string) {
    await wait();
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : val;
  },
  // 异步 多 key get
  async gets(keys: string[]) {
    const result: { [key: string]: any } = {};
    keys.forEach((key) =>
      asyncPresist.get(key).then((value) => {
        result[key] = value;
      })
    );
    return result;
  },
  // 预先获取
  _preAddPreset() {
    if (asyncPresist._executed) {
      console.error("executed");
      return false;
    }
    return true;
  },
  addPreset(key) {
    if (asyncPresist._preAddPreset()) {
      asyncPresist._tasks.add(key);
    }
  },
  addPresets(keys) {
    if (asyncPresist._preAddPreset()) {
      keys.forEach((key) => {
        asyncPresist._tasks.add(key);
      });
    }
  },
  async prefetch() {
    const keys = [...asyncPresist._tasks];
    const result: { [key: string]: any } = {};
    await Promise.all(
      keys.map((key) =>
        asyncPresist.get(key).then((value) => {
          result[key] = value;
        })
      )
    );
    Object.assign(asyncPresist._store, result);
  },
  getPreset(key: string) {
    return asyncPresist._store[key];
  },
  getPresets(keys: string[]) {
    const result: { [key: string]: any } = {};
    keys.forEach((key) => {
      result[key] = asyncPresist._store[key];
    });
    return result;
  },
  async set(key: string, val: any) {
    await wait();
    if (val === undefined) {
      localStorage.removeItem(key);
      return;
    }
    localStorage.setItem(key, JSON.stringify(val));
  },
  async sets(data) {
    await Object.entries(data).map(([key, value]) =>
      asyncPresist.set(key, value)
    );
  },
};
