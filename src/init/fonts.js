import { css as font1 } from '@/assets/font/BlueakaBeta2GBK-DemiBold.ttf'
import { css as font2 } from '@/assets/font/BlueakaBeta2GBK-Bold.ttf'

export function loadFonts() {
  try {
    console.log(`加载字体: ${font1.family}, 字重: ${font1.weight}`)
    console.log(`加载字体: ${font2.family}, 字重: ${font2.weight}`)
    return Promise.resolve()
  } catch (error) {
    console.error('字体加载失败:', error)
    return Promise.reject(error)
  }
}
