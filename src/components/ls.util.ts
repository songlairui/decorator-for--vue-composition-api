/**
 * 修饰 reactive 对象
 * @param getFn
 * @param setFn
 * @param identifier
 */
const decorateLs = (
  getFn: (...args: any[]) => any,
  setFn: (...args: any[]) => void,
  identifier: string
) =>
  function (obj: { [key: string]: any }) {
    const result: { [key: string]: any } = {};
    Object.keys(obj).forEach((key) => {
      const privateKey = `${key}_${identifier}`;
      result[privateKey] = getFn(key) || obj[key];
      result[key] = {
        get() {
          return result[privateKey];
        },
        set(val: any) {
          result[privateKey] = val;
          setFn(key, val);
          return true;
        },
      };
    });
    return result;
  };
