import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' 
// 插件
import rTime from 'dayjs/plugin/relativeTime'

export function hotNumber(val) {
  const num = parseInt(val)
  if (num < 1000) {
    return val
  }
  val = val + ''
  return val.substring(0, val.length - 3) + 'k'
}

dayjs.locale('zh-cn')
dayjs.extend(rTime)

export function relativeTime(val) {
  return dayjs().to(dayjs(val)) 
}
