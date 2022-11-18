import dayjs from 'dayjs' ;

// 本地化插件
import localizedFormat from 'dayjs/plugin/localizedFormat' ;
dayjs.extend(localizedFormat) ;

// 周插件
// https://dayjs.gitee.io/docs/zh-CN/plugin/week-of-year
// var weekOfYear = require('dayjs/plugin/weekOfYear')
import weekOfYear from 'dayjs/plugin/weekOfYear' ;
dayjs.extend(weekOfYear)

const ydmFormat = 'YYYY-MM-DD' ;
export {
    ydmFormat,
    dayjs as dayjs2
}
