export interface Bitmap {
  width: number
  height: number
  image: any
  byteWidth: number
  bitsPerPixel: number
  bytesPerPixel: number
  /**
   * 取色
   * @param x 从左到右的距离(left)
   * @param y 从上到下的距离(top)
   */
  colorAt(x: number, y: number): string
}

export interface Screen {
/**
 * 截图
 * @param x 从左到右的距离(left)
 * @param y 从上到下的距离(top)
 * @param width 宽度
 * @param height 高度
 */
  capture(x?: number, y?: number, width?: number, height?: number): Bitmap
}
/**设置键盘延迟
 * @param ms 延迟时间 默认10ms
 */
export function setKeyboardDelay(ms: number) : void
/**
 * 按一个键
 * @param key 
 * @param modifier 附加按键组 (三大按键)
 */
export function keyTap(key: KeyType, modifier?: modifier | modifier[]) : void
/**
 * 发送按键
 * @param key 
 * @param down 类型
 * - down 按下
 * - up 松开
 * @param modifier 附加按键组 (三大按键)
 */
export function keyToggle(key: KeyType, down: "up"|"down", modifier?: modifier | modifier[]) : void

export function unicodeTap(value: number) : void
/**
 * 输入文本
 * @param string 字符串
 */
export function typeString(string: string) : void
/**
 * 输入文本 延迟
 * @param string 字符串
 * @param cpm 每分钟字符数
 */
export function typeStringDelayed(string: string, cpm: number) : void
/**
 * 鼠标休眠时间
 * @param delay 毫秒 
 */
export function setMouseDelay(delay: number) : void
export function updateScreenMetrics() : void
/**
 * 立即将鼠标移动到此位置
 * @param x 从左到右的距离(left)
 * @param y 从上到下的距离(top)
 */
export function moveMouse(x: number, y: number) : void
/**
 * 模拟人类移动鼠标
 * @param x 从左到右的距离(left)
 * @param y 从上到下的距离(top)
 * @param speed 
 */
export function moveMouseSmooth(x: number, y: number) : void
/**
 * 单击/双击鼠标
 * @param button 按键 
 * - right 左侧
 * - left 右侧
 * - middle 滚轮键
 * @param double 是否双击
 */
export function mouseClick(button?: "right"|"left"|"middle", double?: boolean) : void
/**
 * 按钮长按
 * @param down 按下/松开
 * - up 松开
 * - down 按下
 * @param button  按键 
 * - right 左侧
 * - left 右侧
 * - middle 滚轮键
 */
export function mouseToggle(down?: "up"|"down", button?: "right"|"left"|"middle") : void
/**
 * 拖拽鼠标到指定位置(例如拖拽文件)
 * @param x 从左到右的距离(left)
 * @param y 从上到下的距离(top)
 */
export function dragMouse(x: number, y: number) : void
/**
 * 滚动鼠标
 * @param x  左右滚动的幅度和方向。左为负。
 * @param y 上下滚动的幅度和方向。向下为负。
 */
export function scrollMouse(x: number, y: number) : void
/**
 * 获取鼠标位置
 */
export function getMousePos(): { x: number, y: number }
/**
 * 获取坐标位置的颜色(hex)
 * @param x 
 * @param y 
 */
export function getPixelColor(x: number, y: number): string
/**
 * 获取屏幕大小
 */
export function getScreenSize(): { width: number, height: number }

export var screen: Screen

type modifier = "alt"|"ctrl"|"command"|"control";
type KeyType="backspace"|"delete"|"enter"|"tab"|"escape"|"up"|"down"|"right"|"left"|"home"|"end"|"pageup"|"pagedown"|"f1"|"f2"|"f3"|"f4"|"f5"|"f6"|"f7"|"f8"|"f9"|"f10"|"f11"|"f12"|"command"|"alt"|"control"|"shift"|"right_shift"|"space"|"printscreen"|"insert"|"audio_mute"|"audio_vol_down"|"audio_vol_up"|"audio_play"|"audio_stop"|"audio_pause"|"audio_prev"|"audio_next"|"audio_rewind"|"audio_forward"|"audio_repeat"|"audio_random"|"numpad_0"|"numpad_1"|"numpad_2"|"numpad_3"|"numpad_4"|"numpad_5"|"numpad_6"|"numpad_7"|"numpad_8"|"numpad_9"|"lights_mon_up"|"lights_mon_down"|"lights_kbd_toggle"|"lights_kbd_up"|"lights_kbd_down";