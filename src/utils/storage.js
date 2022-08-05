class Storage {
  //
  set (key, value) {
    if (typeof value === 'object') {
      // 如果value是对象,就转成json字符串再存储
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  get (key) {
    // 先得到value值,再观察是对象或数组还是普通类型
    const value = localStorage.getItem(key)
    try {
      // 如果是对象或数组就序列化
      return JSON.parse(value)
    } catch (err) {
      // 如果不是对象或数组会报错进入err,再直接返回value值
      return value
    }
  }

  remove (key) {
    localStorage.removeItem(key)
  }
}
const storage = new Storage()
export default storage
