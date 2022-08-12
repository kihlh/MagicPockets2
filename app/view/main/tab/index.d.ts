/*
 * @Author: your name
 * @Date: 2022-01-06 00:50:11
 * @LastEditTime: 2022-05-20 23:36:12
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \app\view\main\tab\index.d.ts
 */
declare class _ChromeTabs {
    /**
     * 创建标签页实例
     * @param el 寄托元素
     * @param ShowMenu 是否显示关闭最大化最小化..
     */
    constructor(el: Element|null, ShowMenu: boolean);
    el: Element
    init(el:Element):any
    emit(eventName:string, data:any):any
    setupCustomProperties():any
    setupStyleEl():any
    setupEvents():any
    get tabEls(): HTMLDivElement[]
    get GetAllWidth(): any
    get tabContentEl(): any
    get tabContentWidths(): any
    get tabContentPositions(): any
    get tabPositions(): any
    layoutTabs():any
    createNewTabEl():any
    /**
     * 添加新标签
     * @param tabProperties  实例配置
     * @param config 附加配置
     */
    addTab(tabProperties: NewTabConfig, config?: config): Element
    get activeTabEl(): any
    setTabCloseEventListener(tabEl: any):any
    hasActiveTab():any
    setCurrentTab(tabEl: any):any
    removeTab(tabEl: Element|HTMLDivElement|string): any
    updateTab(tabEl: any, tabProperties: any):any
    cleanUpPreviouslyDraggedTabs():any
    setupDraggabilly():any
    animateTabMove(tabEl: any, originIndex: any, destinationIndex: any):any

}

/**实例配置 */
type NewTabConfig = {
    /**标题 */
    title: string
    /**图标 */
    favicon?: string | false
    /**是否显示关闭按钮 */
    close?: boolean
    /**唯一id */
    id:string
}
/**附加配置 */
type config = {
    /**动画 */
    animate?: boolean,
    /**静默添加 */
    background?: boolean
}
export { _ChromeTabs }