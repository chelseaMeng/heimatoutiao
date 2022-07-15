// 在index.js中导入二次封装的本地存储函数文件 导出后 main.js中统一导入
// 1.从@/utils/auth引入所有   按需导出的东西
// 2.把这些东西,原封不动的按需暴露出去
// 3.不会导出默认暴露的东西 (export default..... 不导出)
export * from './auth'
