// Type definitions for sharp 0.30
// Project: https://github.com/lovell/sharp
// Definitions by: Wooseop Kim <https://github.com/wooseopkim>
//                 Bradley Odell <https://github.com/BTOdell>
//                 Jamie Woodbury <https://github.com/JamieWoodbury>
//                 Floris de Bijl <https://github.com/Fdebijl>
//                 Billy Kwok <https://github.com/billykwok>
//                 Espen Hovlandsdal <https://github.com/rexxars>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.1

/// <reference types="node" />

import { Duplex } from 'stream';

//#region Constructor functions

/**
 * 从图像创建一个sharp实例
 * @param 输入 Buffer 也可以是 JPEG, PNG, WebP, AVIF, GIF, SVG, TIFF ,SVG文本,或原始像素图像数据，或包含 JPEG、PNG、WebP、AVIF、GIF、SVG 或 TIFF 图像文件路径的字符串。
 * @param options 具有可选属性的对象。
 * @throws {Error} 无效参数将引发错误
 * @returns 可用于异步操作的sharp实例
 */
declare function sharp(options?: sharp.SharpOptions): sharp.Sharp;
declare function sharp(
    input?:
        | Buffer
        | Uint8Array
        | Uint8ClampedArray
        | Int8Array
        | Uint16Array
        | Int16Array
        | Uint32Array
        | Int32Array
        | Float32Array
        | Float64Array
        | string,
    options?: sharp.SharpOptions,
): sharp.Sharp;

declare namespace sharp {
    /** 包含表示可用输入和输出格式/方法的嵌套布尔值的对象。 */
    const format: FormatEnum;

    /** 一个包含 libvips 版本号及其依赖项的对象。 */
    const versions: {
        vips: string;
        cairo?: string | undefined;
        croco?: string | undefined;
        exif?: string | undefined;
        expat?: string | undefined;
        ffi?: string | undefined;
        fontconfig?: string | undefined;
        freetype?: string | undefined;
        gdkpixbuf?: string | undefined;
        gif?: string | undefined;
        glib?: string | undefined;
        gsf?: string | undefined;
        harfbuzz?: string | undefined;
        jpeg?: string | undefined;
        lcms?: string | undefined;
        orc?: string | undefined;
        pango?: string | undefined;
        pixman?: string | undefined;
        png?: string | undefined;
        svg?: string | undefined;
        tiff?: string | undefined;
        webp?: string | undefined;
        avif?: string | undefined;
        heif?: string | undefined;
        xml?: string | undefined;
        zlib?: string | undefined;
    };

    /** 一个对象，包含当前和已安装的二进制编译文件的平台和体系结构。*/
    const vendor: {
        current: string;
        installed: string[];
    };

    /** 一个 EventEmitter，它在任务排队时发出更改事件，等待 libuv 提供工作线程，完成 */
    const queue: NodeJS.EventEmitter;

    //#endregion

    //#region Utility functions

    /**
     * 获取或在提供选项时设置 libvips 操作缓存的限制。
     * 在限制发生任何更改后，缓存中的现有条目将被修剪。
     * 此方法始终返回缓存统计信息，可用于确定特定任务需要多少工作内存。
     * @param options 具有以下属性的对象，或 Boolean，其中 true 使用默认缓存设置， false 删除所有缓存（可选，默认 true）
     * @returns The cache results.
     */
    function cache(options?: boolean | CacheOptions): CacheResult;

    /**
     * 获取或设置libvips'应该创建的处理每个图像的线程数。
     * 默认值是CPU核心的数量。如果数值为0，将重置为这个默认值。
     * 可以并行处理的最大图像数受libuv的UV_THREADPOOL_SIZE环境变量的限制。
     * @param concurrency 新的并发值。
     * @returns 当前的并发值。
     */
    function concurrency(concurrency?: number): number;

    /**
     * 提供对内部任务计数器的访问
     * @returns 包含任务计数器的对象
     */
    function counters(): SharpCounters;

    /**
     * 获取和设置 SIMD 向量单元指令的使用。 要求 libvips 已在 liborc 支持下编译。
     * 通过利用 CPU 的 SIMD 矢量单元提高调整大小、模糊和锐化操作的性能，例如 英特尔 SSE 和 ARM NEON。
     * @param enable 启用或禁用 SIMD 矢量单元指令
     * @returns 如果启用了 SIMD 向量单元指令的使用，则为 true
     */
    function simd(enable?: boolean): boolean;

    //#endregion

    const gravity: GravityEnum;
    const strategy: StrategyEnum;
    const kernel: KernelEnum;
    const fit: FitEnum;
    const bool: BoolEnum;

    interface Sharp extends Duplex {
        //#region Channel functions

        /**
         * 删除 Alpha 通道（如果有）。 如果图像没有 Alpha 通道，则这是无操作的。
         * @returns 持续操作的Sharp异步实例
         */
        removeAlpha(): Sharp;

        /**
         * 确保alpha通道，如果缺少的话。添加的alpha通道将是完全不透明的。如果图像已经有一个alpha通道，这将是一个无用的操作。
         * @param alpha =完全透明，1=完全不透明）（可选，默认为1）。
         * @returns 持续操作的Sharp异步实例
         */
        ensureAlpha(alpha?: number): Sharp;

        /**
         * Extract a single channel from a multi-channel image.
         * @param channel zero-indexed band number to extract, or red, green or blue as alternative to 0, 1 or 2 respectively.
         * @throws {Error} Invalid channel
         * @returns 持续操作的Sharp异步实例
         */
        extractChannel(channel: number | string): Sharp;

        /**
         * 加入一个或多个通道到图像中。添加的通道的含义取决于输出色域，通过toColourspace()设置。
         * 默认情况下，输出的图像将是网络友好的sRGB，额外的通道被解释为alpha通道。通道排序遵循vips惯例。
         * sRGB：0：红色，1：绿色，2：蓝色，3：阿尔法。
         * - CMYK：0：洋红，1：青色，2：黄色，3：黑色，4：阿尔法。
         *
         * 缓冲区可以是sharp支持的任何图像格式。
         * 对于原始像素输入，options对象应包含一个raw属性，它遵循sharp()构造函数中同名属性的格式。
         * @param images 一个或多个图像（文件路径，缓冲区）。
         * @param options 图像选项，见sharp()构造函数。
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        joinChannel(images: string | Buffer | ArrayLike<string | Buffer>, options?: SharpOptions): Sharp;

        /**
         * 对所有的输入图像通道（波段）进行比特布尔运算，产生一个单通道输出图像。
         * @param boolOp是 "and"、"or "或 "eor "中的一个，用来执行该位操作，就像C逻辑运算符&、|和^一样。
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        bandbool(boolOp: string): Sharp;

        //#endregion

        //#region Color functions

        /**
         * 使用提供的色度对图像进行着色，同时保留图像的亮度。
         * 可能存在一个alpha通道，该操作将不被改变。
         * @param rgb 由颜色模块解析以提取色度值。
         * @returns 持续操作的Sharp异步实例
         */
        tint(rgb: Color): Sharp;

        /**
         * 转换为8位灰度；256级灰度。
         * 这是一个线性操作。
         * 如果输入的图像是一个非线性的颜色空间，如sRGB，请使用gamma()和greyscale()来获得最佳效果。
         * 默认情况下，输出的图像将是网络友好的sRGB，并包含三个（相同的）颜色通道。
         * 这一点可以被其他尖锐的操作所覆盖，比如toColourspace('b-w')，这将产生一个包含一个颜色通道的输出图像。
         * 一个alpha通道可能存在，并将被该操作改变。
         * @param greyscale true表示启用，false表示禁用（默认为true）。
         * @returns 持续操作的Sharp异步实例
         */
        greyscale(greyscale?: boolean): Sharp;

        /**
         * greyscale()的替代拼法。
         * @param grayscale true表示启用，false表示禁用（默认为true）。
         * @returns 持续操作的Sharp异步实例
         */
        grayscale(grayscale?: boolean): Sharp;

        /**
         * 设置管道的色彩空间。
         * 输入的图像将在流水线开始时被转换为所提供的色彩空间。
         * 所有的操作在转换到输出色彩空间之前都会使用这个色彩空间，如toColourspace所定义。
         * 这个功能是试验性的，还没有在所有的操作中得到充分测试。
         *
         * @param colourspace 管道颜色空间，例如rgb16, scrgb, lab, gray16 ...
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        pipelineColourspace(colourspace?: string): Sharp;

        /**
         * pipelineColourspace的替代拼法
         * @param colorspace 管道颜色空间，如rgb16, scrgb, lab, gray16 ...
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        pipelineColorspace(colorspace?: string): Sharp;

        /**
         * 设置输出色彩空间。
         * 默认情况下，输出的图像将是网络友好的sRGB，额外的通道被解释为alpha通道。
         * @param colourspace 输出色彩空间，例如srgb, rgb, cmyk, lab, b-w ...
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        toColourspace(colourspace?: string): Sharp;

        /**
         * toColourspace()的替代拼法。
         * @param colorspace 输出颜色空间，例如：Srgb, rgb, cmyk, lab, b-w ...
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        toColorspace(colorspace: string): Sharp;

        //#endregion

        //#region Composite functions

        /**
         * 在已处理（调整大小、提取等）的图像上合成图像。
         *
         * 要合成的图像必须与处理后的图像大小相同或更小。
         * 如果同时提供了`top`和`left`选项，它们将优先于`gravity`。
         * @param images - 要合成的图像的有序列表
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        composite(images: OverlayOptions[]): Sharp;

        //#endregion

        //#region Input functions

        /**
         * 对Sharp实例进行 "快照"，返回一个新的实例。
         * 克隆的实例继承其父实例的输入。
         * 这允许多个输出流，因此多个处理管道共享一个输入流。
         * @returns 持续操作的Sharp异步实例
         */
        clone(): Sharp;

        /**
         * 快速访问（未缓存的）图像元数据，无需解码任何压缩的图像数据。
         * @returns 持续操作的Sharp异步实例
         */
        metadata(callback: (err: Error, metadata: Metadata) => void): Sharp;

        /**
         * 快速访问（未缓存的）图像元数据，而无需解码任何压缩的图像数据。
         * @returns 一个承诺，用一个元数据对象进行解析
         */
        metadata(): Promise<Metadata>;

        /**
         * 访问图像中每个通道的像素衍生的图像统计数据。
         * @returns 持续操作的Sharp异步实例
         */
        stats(callback: (err: Error, stats: Stats) => void): Sharp;

        /**
         * Access to pixel-derived image statistics for every channel in the image.
         * @returns A promise that resolves with a stats object
         */
        stats(): Promise<Stats>;

        //#endregion

        //#region Operation functions

        /**
         * 将输出的图像旋转一个明确的角度或根据EXIF方向标签自动调整方向。
         *
         * 如果提供了一个角度，它将被转换为有效的正度旋转。例如，-450将产生一个270度的旋转。
         *
         * 当以90的倍数以外的角度旋转时，可以用背景选项提供背景颜色。
         *
         * 如果没有提供角度，它将从EXIF数据中确定。支持镜像，可以推断出使用了翻转操作。
         *
         * 旋转的使用意味着删除EXIF方向标签，如果有的话。
         *
         * 在旋转和提取区域时，方法的顺序很重要，例如rotate(x).extract(y)会产生与extract(y).rotate(x)不同的结果。
         * @param angle 旋转的角度。(可选，默认为自动)
         * @param options if present, is an Object with optional attributes.
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        rotate(angle?: number, options?: RotateOptions): Sharp;

        /**
         * 围绕垂直Y轴翻转图像。这总是发生在旋转之后，如果有的话。
         * 使用翻转意味着删除EXIF方向标签，如果有的话。
         * @param flip true表示启用，false表示禁用（默认为true）。
         * @returns 持续操作的Sharp异步实例
         */
        flip(flip?: boolean): Sharp;

        /**
         *围绕水平X轴翻转图像。这总是发生在旋转之后，如果有的话。
         * 使用翻转意味着删除EXIF方向标签，如果有的话。
         * @param flop true表示启用，false表示禁用（默认为true）。
         * @returns 持续操作的Sharp异步实例
         */
        flop(flop?: boolean): Sharp;

        /**
         * 锐化图像。
         * 当不使用参数时，对输出图像进行快速、温和的锐化。
         * 当提供西格玛时，对LAB色彩空间中的L通道执行较慢的、更精确的锐化。
         * 对 "平坦 "和 "锯齿 "区域的锐化水平有单独的控制。
         * @param sigma 高斯蒙版的sigma，其中sigma = 1 + radius / 2。
         * @param flat 适用于 "平坦 "区域的锐化程度。(可选，默认为1.0)
         * @param jagged 适用于 "锯齿状 "区域的锐化程度。(可选，默认为2.0)
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        sharpen(sigma?: number, flat?: number, jagged?: number): Sharp;

        /**
         * 应用中值滤波器。当不使用参数时，默认窗口为3x3。
         * @param size square mask size: size x size (optional, default 3)
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        median(size?: number): Sharp;

        /**
         * 模糊图像。
         * 当不使用参数时，对输出图像进行快速、温和的模糊处理。
         * 当提供一个sigma时，执行一个较慢的、更精确的高斯模糊。
         * 当提供一个布尔值sigma时，就会进行温和的模糊处理或禁用模糊处理。
         * @param sigma 一个在0.3和1000之间的值，代表高斯蒙版的sigma，其中sigma = 1 + radius / 2。
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        blur(sigma?: number | boolean): Sharp;

        /**
         *合并alpha透明通道，如果有的话，与背景合并。
         * @param flatten true表示启用，false表示禁用（默认为true）。
         * @returns 持续操作的Sharp异步实例
         */
        flatten(flatten?: boolean | FlattenOptions): Sharp;

        /**
         *应用伽玛校正，通过减少编码（变暗）预调整的系数为1/伽玛，然后增加编码（变亮）后调整的系数为伽玛。
         * 这可以改善非线性色彩空间中调整后的图像的感知亮度。
         * JPEG和WebP输入图像在应用伽玛校正时，不会利用加载时收缩的性能优化。
         * @param 伽玛值在1.0和3.0之间。(可选的，默认为2.2)
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        gamma(gamma?: number): Sharp;

        /**
         *产生图像的 "负面"。
         * @param negate true表示启用，false表示禁用，或一个选项对象（默认为true）。
         * @returns 持续操作的Sharp异步实例
         */
        negate(negate?: boolean | NegateOptions): Sharp;

        /**
         *通过拉伸其亮度以覆盖整个动态范围来增强输出图像的对比度。
         * @param normalise true表示启用，false表示禁用（默认为true）。
         * @returns 持续操作的Sharp异步实例
         */
        normalise(normalise?: boolean): Sharp;

        /**
         * normalise的替代拼写。
         * @param normalize true表示启用，false表示禁用（默认为true）。
         * @returns 持续操作的Sharp异步实例
         */
        normalize(normalize?: boolean): Sharp;

        /**
         * 执行对比度限制的自适应直方图均衡化（CLAHE）。
         *
         * 一般来说，这将提高图像的清晰度。
         * 较暗的细节。请在这里阅读更多关于CLAHE的信息。
         * https://en.wikipedia.org/wiki/Adaptive_histogram_equalization#Contrast_Limited_AHE
         *
         * @param options clahe options
         */
        clahe(options: ClaheOptions): Sharp;

        /**
         *用指定的内核对图像进行卷积。
         * @param kernel 指定的内核
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        convolve(kernel: Kernel): Sharp;

        /**
         *任何大于或等于阈值的像素值将被设置为255，否则将被设置为0。
         * @param threshold 一个在0-255范围内的值，代表将应用阈值的水平。(可选，默认为128)
         * @param options 阈值选项
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        threshold(threshold?: number, options?: ThresholdOptions): Sharp;

        /**
         * 对操作数图像进行位布尔运算。
         * 该操作创建一个输出图像，其中每个像素是输入图像的相应像素之间选定的位布尔运算的结果。
         * @param operand Buffer包含图像数据或String包含图像文件的路径。
         * @param operator "and"、"or "或 "eor "中的一个，用来执行该位操作，就像C逻辑运算符&、|和^一样。
         * @param options 描述使用原始像素数据时的操作数。
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        boolean(operand: string | Buffer, operator: string, options?: { raw: Raw }): Sharp;

        /**
         *将线性公式a * input + b应用于图像（水平调整）。
         * @param a multiplier (optional, default 1.0)
         * @param b offset (optional, default 0.0)
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        linear(a?: number | null, b?: number): Sharp;

        /**
         *用指定的矩阵重新组合图像。
         * @param inputMatrix 3x3 重组矩阵
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        recomb(inputMatrix: Matrix3x3): Sharp;

        /**
         * 使用亮度、饱和度、色调旋转和明度对图像进行转换。
         * 亮度和明度都对亮度进行操作，区别在于亮度是乘法的，而明度是加法的。
         * @param options 描述了调制的方式
         * @returns 持续操作的Sharp异步实例
         */
        modulate(options?: {
            brightness?: number | undefined;
            saturation?: number | undefined;
            hue?: number | undefined;
            lightness?: number | undefined;
        }): Sharp;

        //#endregion

        //#region Output functions

        /**
         * 将输出的图像数据写到一个文件中。
         * 如果没有选择明确的输出格式，它将从扩展名中推断出来，支持JPEG、PNG、WebP、AVIF、TIFF、DZI和libvips的V格式。
         * 注意，原始像素数据只支持缓冲区输出。
         * @param fileOut 写入图像数据的路径。
         * @param callback 完成时调用的回调函数，有两个参数（err，info）。info包含输出图像格式，大小（字节），宽度，高度和通道。
         * @throws {Error} 无效参数
         * @returns 持续操作的Sharp异步实例
         */
        toFile(fileOut: string, callback: (err: Error, info: OutputInfo) => void): Sharp;

        /**
         *将输出的图像数据写到一个文件。
         * @param fileOut 要写入图像数据的路径。
         * @throws {错误} 无效参数
         * @returns 一个承诺，该承诺以一个包含结果文件信息的对象来实现。
         */
        toFile(fileOut: string): Promise<OutputInfo>;

        /**
         * 将输出写入一个缓冲区。支持JPEG、PNG、WebP、AVIF、TIFF、GIF和RAW输出。
         * 默认情况下，格式将与输入图像相匹配，除了SVG输入会变成PNG输出。
         * @param callback 在完成时用三个参数（err, buffer, info）调用回调函数。
         * @returns 持续操作的Sharp异步实例
         */
        toBuffer(callback: (err: Error, buffer: Buffer, info: OutputInfo) => void): Sharp;

        /**
         * 将输出写入一个缓冲区。支持JPEG、PNG、WebP、AVIF、TIFF、GIF和RAW输出。
         * 默认情况下，格式将与输入图像相匹配，除了SVG输入会变成PNG输出。
         * @param options解析选项
         * @param options.resolveWithObject 用一个包含数据和信息属性的对象来解析Promise，而不是只用数据解析。
         * @returns 一个用Buffer数据解析的承诺。
         */
        toBuffer(options?: { resolveWithObject: false }): Promise<Buffer>;

        /**
         * Write output to a Buffer. JPEG, PNG, WebP, AVIF, TIFF, GIF and RAW output are supported.
         * By default, the format will match the input image, except SVG input which becomes PNG output.
         * @param options resolve options
         * @param options.resolveWithObject Resolve the Promise with an Object containing data and info properties instead of resolving only with data.
         * @returns A promise that resolves with an object containing the Buffer data and an info object containing the output image format, size (bytes), width, height and channels
         */
        toBuffer(options: { resolveWithObject: true }): Promise<{ data: Buffer; info: OutputInfo }>;

        /**
         * Include all metadata (EXIF, XMP, IPTC) from the input image in the output image.
         * The default behaviour, when withMetadata is not used, is to strip all metadata and convert to the device-independent sRGB colour space.
         * This will also convert to and add a web-friendly sRGB ICC profile.
         * @param withMetadata
         * @throws {Error} Invalid parameters.
         */
        withMetadata(withMetadata?: WriteableMetadata): Sharp;

        /**
         * Use these JPEG options for output image.
         * @param options Output options.
         * @throws {Error} Invalid options
         * @returns 持续操作的Sharp异步实例
         */
        jpeg(options?: JpegOptions): Sharp;

        /**
         * Use these JP2 (JPEG 2000) options for output image.
         * @param options Output options.
         * @throws {Error} Invalid options
         * @returns 持续操作的Sharp异步实例
         */
        jp2: (options?: Jp2Options) => Sharp;

        /**
         * Use these PNG options for output image.
         * PNG output is always full colour at 8 or 16 bits per pixel.
         * Indexed PNG input at 1, 2 or 4 bits per pixel is converted to 8 bits per pixel.
         * @param options Output options.
         * @throws {Error} Invalid options
         * @returns 持续操作的Sharp异步实例
         */
        png(options?: PngOptions): Sharp;

        /**
         * Use these WebP options for output image.
         * @param options Output options.
         * @throws {Error} Invalid options
         * @returns 持续操作的Sharp异步实例
         */
        webp(options?: WebpOptions): Sharp;

        /**
         * Use these GIF options for output image.
         * Requires libvips compiled with support for ImageMagick or GraphicsMagick. The prebuilt binaries do not include this - see installing a custom libvips.
         * @param options Output options.
         * @throws {Error} Invalid options
         * @returns 持续操作的Sharp异步实例
         */
        gif(options?: GifOptions): Sharp;

        /**
         * Use these AVIF options for output image.
         * Whilst it is possible to create AVIF images smaller than 16x16 pixels, most web browsers do not display these properly.
         * @param options Output options.
         * @throws {Error} Invalid options
         * @returns 持续操作的Sharp异步实例
         */
        avif(options?: AvifOptions): Sharp;

        /**
         * Use these HEIF options for output image.
         * Support for patent-encumbered HEIC images requires the use of a globally-installed libvips compiled with support for libheif, libde265 and x265.
         * @param options Output options.
         * @throws {Error} Invalid options
         * @returns 持续操作的Sharp异步实例
         */
        heif(options?: HeifOptions): Sharp;

        /**
         * Use these TIFF options for output image.
         * @param options Output options.
         * @throws {Error} Invalid options
         * @returns 持续操作的Sharp异步实例
         */
        tiff(options?: TiffOptions): Sharp;

        /**
         * Force output to be raw, uncompressed uint8 pixel data.
         * @param options Raw output options.
         * @throws {Error} Invalid options
         * @returns 持续操作的Sharp异步实例
         */
        raw(options?: RawOptions): Sharp;

        /**
         * Force output to a given format.
         * @param format a String or an Object with an 'id' attribute
         * @param options output options
         * @throws {Error} Unsupported format or options
         * @returns 持续操作的Sharp异步实例
         */
        toFormat(
            format: keyof FormatEnum | AvailableFormatInfo,
            options?:
                | OutputOptions
                | JpegOptions
                | PngOptions
                | WebpOptions
                | AvifOptions
                | HeifOptions
                | GifOptions
                | TiffOptions,
        ): Sharp;

        /**
         * Use tile-based deep zoom (image pyramid) output.
         * Set the format and options for tile images via the toFormat, jpeg, png or webp functions.
         * Use a .zip or .szi file extension with toFile to write to a compressed archive file format.
         *
         * Warning: multiple sharp instances concurrently producing tile output can expose a possible race condition in some versions of libgsf.
         * @param tile tile options
         * @throws {Error} Invalid options
         * @returns 持续操作的Sharp异步实例
         */
        tile(tile?: TileOptions): Sharp;

        /**
         * Set a timeout for processing, in seconds. Use a value of zero to continue processing indefinitely, the default behaviour.
         * The clock starts when libvips opens an input image for processing. Time spent waiting for a libuv thread to become available is not included.
         * @param options Object with a `seconds` attribute between 0 and 3600 (number)
         * @throws {Error} Invalid options
         * @returns 持续操作的Sharp异步实例
         */
        timeout(options: TimeoutOptions): Sharp;

        //#endregion

        //#region Resize functions

        /**
         * Resize image to width, height or width x height.
         *
         * When both a width and height are provided, the possible methods by which the image should fit these are:
         *  - cover: Crop to cover both provided dimensions (the default).
         *  - contain: Embed within both provided dimensions.
         *  - fill: Ignore the aspect ratio of the input and stretch to both provided dimensions.
         *  - inside: Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified.
         *  - outside: Preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified.
         *             Some of these values are based on the object-fit CSS property.
         *
         * When using a fit of cover or contain, the default position is centre. Other options are:
         *  - sharp.position: top, right top, right, right bottom, bottom, left bottom, left, left top.
         *  - sharp.gravity: north, northeast, east, southeast, south, southwest, west, northwest, center or centre.
         *  - sharp.strategy: cover only, dynamically crop using either the entropy or attention strategy. Some of these values are based on the object-position CSS property.
         *
         * The experimental strategy-based approach resizes so one dimension is at its target length then repeatedly ranks edge regions,
         * discarding the edge with the lowest score based on the selected strategy.
         *  - entropy: focus on the region with the highest Shannon entropy.
         *  - attention: focus on the region with the highest luminance frequency, colour saturation and presence of skin tones.
         *
         * Possible interpolation kernels are:
         *  - nearest: Use nearest neighbour interpolation.
         *  - cubic: Use a Catmull-Rom spline.
         *  - lanczos2: Use a Lanczos kernel with a=2.
         *  - lanczos3: Use a Lanczos kernel with a=3 (the default).
         *
         * @param width pixels wide the resultant image should be. Use null or undefined to auto-scale the width to match the height.
         * @param height pixels high the resultant image should be. Use null or undefined to auto-scale the height to match the width.
         * @param options resize options
         * @throws {Error} Invalid parameters
         * @returns 持续操作的Sharp异步实例
         */
        resize(width?: number | null, height?: number | null, options?: ResizeOptions): Sharp;

        /**
         * Shorthand for resize(null, null, options);
         *
         * @param options resize options
         * @throws {Error} Invalid parameters
         * @returns 持续操作的Sharp异步实例
         */
        resize(options: ResizeOptions): Sharp;

        /**
         * Extends/pads the edges of the image with the provided background colour.
         * This operation will always occur after resizing and extraction, if any.
         * @param extend single pixel count to add to all edges or an Object with per-edge counts
         * @throws {Error} Invalid parameters
         * @returns 持续操作的Sharp异步实例
         */
        extend(extend: number | ExtendOptions): Sharp;

        /**
         * Extract a region of the image.
         *  - Use extract() before resize() for pre-resize extraction.
         *  - Use extract() after resize() for post-resize extraction.
         *  - Use extract() before and after for both.
         *
         * @param region The region to extract
         * @throws {Error} Invalid parameters
         * @returns 持续操作的Sharp异步实例
         */
        extract(region: Region): Sharp;

        /**
         * Trim "boring" pixels from all edges that contain values similar to the top-left pixel.
         * The info response Object will contain trimOffsetLeft and trimOffsetTop properties.
         * @param threshold The allowed difference from the top-left pixel, a number greater than zero. (optional, default 10)
         * @throws {Error} Invalid parameters
         * @returns 持续操作的Sharp异步实例
         */
        trim(threshold?: number): Sharp;

        //#endregion
    }

    interface SharpOptions {
        /**
         * By default halt processing and raise an error when loading invalid images.
         * Set this flag to false if you'd rather apply a "best effort" to decode images,
         * even if the data is corrupt or invalid. (optional, default true)
         * (optional, default true)
         */
        failOnError?: boolean | undefined;
        /**
         * Do not process input images where the number of pixels (width x height) exceeds this limit.
         * Assumes image dimensions contained in the input metadata can be trusted.
         * An integral Number of pixels, zero or false to remove limit, true to use default limit of 268402689 (0x3FFF x 0x3FFF). (optional, default 268402689)
         */
        limitInputPixels?: number | boolean | undefined;
        /** Set this to true to remove safety features that help prevent memory exhaustion (SVG, PNG). (optional, default false) */
        unlimited?: boolean | undefined;
        /** Set this to true to use sequential rather than random access where possible. This can reduce memory usage and might improve performance on some systems. (optional, default false) */
        sequentialRead?: boolean | undefined;
        /** Number representing the DPI for vector images. (optional, default 72) */
        density?: number | undefined;
        /** Number of pages to extract for multi-page input (GIF, TIFF, PDF), use -1 for all pages */
        pages?: number | undefined;
        /** Page number to start extracting from for multi-page input (GIF, TIFF, PDF), zero based. (optional, default 0) */
        page?: number | undefined;
        /** subIFD (Sub Image File Directory) to extract for OME-TIFF, defaults to main image. (optional, default -1) */
        subifd?: number | undefined;
        /** Level to extract from a multi-level input (OpenSlide), zero based. (optional, default 0) */
        level?: number | undefined;
        /** Set to `true` to read all frames/pages of an animated image (equivalent of setting `pages` to `-1`). (optional, default false) */
        animated?: boolean | undefined;
        /** Describes raw pixel input image data. See raw() for pixel ordering. */
        raw?: Raw | undefined;
        /** Describes a new image to be created. */
        create?: Create | undefined;
    }

    interface CacheOptions {
        /** Is the maximum memory in MB to use for this cache (optional, default 50) */
        memory?: number | undefined;
        /** Is the maximum number of files to hold open (optional, default 20) */
        files?: number | undefined;
        /** Is the maximum number of operations to cache (optional, default 100) */
        items?: number | undefined;
    }

    interface TimeoutOptions {
        /** Number of seconds after which processing will be stopped (default 0, eg disabled) */
        seconds: number;
    }

    interface SharpCounters {
        /** The number of tasks this module has queued waiting for libuv to provide a worker thread from its pool. */
        queue: number;
        /** The number of resize tasks currently being processed. */
        process: number;
    }

    interface Raw {
        width: number;
        height: number;
        channels: 1 | 2 | 3 | 4;
    }

    interface Create {
        /** Number of pixels wide. */
        width: number;
        /** Number of pixels high. */
        height: number;
        /** Number of bands e.g. 3 for RGB, 4 for RGBA */
        channels: Channels;
        /** Parsed by the [color](https://www.npmjs.org/package/color) module to extract values for red, green, blue and alpha. */
        background: Color;
        /** Describes a noise to be created. */
        noise?: Noise | undefined;
    }

    interface WriteableMetadata {
        /** Value between 1 and 8, used to update the EXIF Orientation tag. */
        orientation?: number | undefined;
        /** Filesystem path to output ICC profile, defaults to sRGB. */
        icc?: string | undefined;
        /** Object keyed by IFD0, IFD1 etc. of key/value string pairs to write as EXIF data. (optional, default {}) */
        exif?: Record<string, any> | undefined;
        /** Number of pixels per inch (DPI) */
        density?: number | undefined;
    }

    interface Metadata {
        /** Number value of the EXIF Orientation header, if present */
        orientation?: number | undefined;
        /** Name of decoder used to decompress image data e.g. jpeg, png, webp, gif, svg */
        format?: keyof FormatEnum | undefined;
        /** Total size of image in bytes, for Stream and Buffer input only */
        size?: number | undefined;
        /** Number of pixels wide (EXIF orientation is not taken into consideration) */
        width?: number | undefined;
        /** Number of pixels high (EXIF orientation is not taken into consideration) */
        height?: number | undefined;
        /** Name of colour space interpretation */
        space?: keyof ColourspaceEnum | undefined;
        /** Number of bands e.g. 3 for sRGB, 4 for CMYK */
        channels?: Channels | undefined;
        /** Name of pixel depth format e.g. uchar, char, ushort, float ... */
        depth?: string | undefined;
        /** Number of pixels per inch (DPI), if present */
        density?: number | undefined;
        /** String containing JPEG chroma subsampling, 4:2:0 or 4:4:4 for RGB, 4:2:0:4 or 4:4:4:4 for CMYK */
        chromaSubsampling: string;
        /** Boolean indicating whether the image is interlaced using a progressive scan */
        isProgressive?: boolean | undefined;
        /** Number of pages/frames contained within the image, with support for TIFF, HEIF, PDF, animated GIF and animated WebP */
        pages?: number | undefined;
        /** Number of pixels high each page in a multi-page image will be. */
        pageHeight?: number | undefined;
        /** Number of times to loop an animated image, zero refers to a continuous loop. */
        loop?: number | undefined;
        /** Delay in ms between each page in an animated image, provided as an array of integers. */
        delay?: number[] | undefined;
        /**  Number of the primary page in a HEIF image */
        pagePrimary?: number | undefined;
        /** Boolean indicating the presence of an embedded ICC profile */
        hasProfile?: boolean | undefined;
        /** Boolean indicating the presence of an alpha transparency channel */
        hasAlpha?: boolean | undefined;
        /** Buffer containing raw EXIF data, if present */
        exif?: Buffer | undefined;
        /** Buffer containing raw ICC profile data, if present */
        icc?: Buffer | undefined;
        /** Buffer containing raw IPTC data, if present */
        iptc?: Buffer | undefined;
        /** Buffer containing raw XMP data, if present */
        xmp?: Buffer | undefined;
        /** Buffer containing raw TIFFTAG_PHOTOSHOP data, if present */
        tifftagPhotoshop?: Buffer | undefined;
        /** The encoder used to compress an HEIF file, `av1` (AVIF) or `hevc` (HEIC) */
        compression?: 'av1' | 'hevc';
        /** Default background colour, if present, for PNG (bKGD) and GIF images, either an RGB Object or a single greyscale value */
        background?: { r: number; g: number; b: number } | number;
    }

    interface Stats {
        /** Array of channel statistics for each channel in the image. */
        channels: ChannelStats[];
        /** Value to identify if the image is opaque or transparent, based on the presence and use of alpha channel */
        isOpaque: boolean;
        /** Histogram-based estimation of greyscale entropy, discarding alpha channel if any (experimental) */
        entropy: number;
        /** Estimation of greyscale sharpness based on the standard deviation of a Laplacian convolution, discarding alpha channel if any (experimental) */
        sharpness: number;
        /** Object containing most dominant sRGB colour based on a 4096-bin 3D histogram (experimental) */
        dominant: { r: number; g: number; b: number };
    }

    interface ChannelStats {
        /** minimum value in the channel */
        min: number;
        /** maximum value in the channel */
        max: number;
        /** sum of all values in a channel */
        sum: number;
        /** sum of squared values in a channel */
        squaresSum: number;
        /** mean of the values in a channel */
        mean: number;
        /** standard deviation for the values in a channel */
        stdev: number;
        /** x-coordinate of one of the pixel where the minimum lies */
        minX: number;
        /** y-coordinate of one of the pixel where the minimum lies */
        minY: number;
        /** x-coordinate of one of the pixel where the maximum lies */
        maxX: number;
        /** y-coordinate of one of the pixel where the maximum lies */
        maxY: number;
    }

    interface OutputOptions {
        /** Force format output, otherwise attempt to use input format (optional, default true) */
        force?: boolean | undefined;
    }

    interface JpegOptions extends OutputOptions {
        /** Quality, integer 1-100 (optional, default 80) */
        quality?: number | undefined;
        /** Use progressive (interlace) scan (optional, default false) */
        progressive?: boolean | undefined;
        /** Set to '4:4:4' to prevent chroma subsampling when quality <= 90 (optional, default '4:2:0') */
        chromaSubsampling?: string | undefined;
        /** Apply trellis quantisation (optional, default  false) */
        trellisQuantisation?: boolean | undefined;
        /** Apply overshoot deringing (optional, default  false) */
        overshootDeringing?: boolean | undefined;
        /** Optimise progressive scans, forces progressive (optional, default false) */
        optimiseScans?: boolean | undefined;
        /** Alternative spelling of optimiseScans (optional, default false) */
        optimizeScans?: boolean | undefined;
        /** Optimise Huffman coding tables (optional, default true) */
        optimiseCoding?: boolean | undefined;
        /** Alternative spelling of optimiseCoding (optional, default true) */
        optimizeCoding?: boolean | undefined;
        /** Quantization table to use, integer 0-8 (optional, default 0) */
        quantisationTable?: number | undefined;
        /** Alternative spelling of quantisationTable (optional, default 0) */
        quantizationTable?: number | undefined;
        /** Use mozjpeg defaults (optional, default false) */
        mozjpeg?: boolean | undefined;
    }

    interface Jp2Options extends OutputOptions {
        /** Quality, integer 1-100 (optional, default 80) */
        quality?: number;
        /** Use lossless compression mode (optional, default false) */
        lossless?: boolean;
        /** Horizontal tile size (optional, default 512) */
        tileWidth?: number;
        /** Vertical tile size (optional, default 512) */
        tileHeight?: number;
        /** Set to '4:2:0' to enable chroma subsampling (optional, default '4:4:4') */
        chromaSubsampling?: '4:4:4' | '4:2:0';
    }

    interface WebpOptions extends OutputOptions, AnimationOptions {
        /** Quality, integer 1-100 (optional, default 80) */
        quality?: number | undefined;
        /** Quality of alpha layer, number from 0-100 (optional, default 100) */
        alphaQuality?: number | undefined;
        /** Use lossless compression mode (optional, default false) */
        lossless?: boolean | undefined;
        /** Use near_lossless compression mode (optional, default false) */
        nearLossless?: boolean | undefined;
        /** Use high quality chroma subsampling (optional, default false) */
        smartSubsample?: boolean | undefined;
        /** Level of CPU effort to reduce file size, integer 0-6 (optional, default 4) */
        effort?: number | undefined;
        /**
         * Level of CPU effort to reduce file size, integer 0-6 (optional, default 4)
         * @deprecated Use `effort` instead
         */
        reductionEffort?: number | undefined;
    }

    interface AvifOptions extends OutputOptions {
        /** quality, integer 1-100 (optional, default 50) */
        quality?: number | undefined;
        /** use lossless compression (optional, default false) */
        lossless?: boolean | undefined;
        /**
         * CPU effort vs file size, 0 (slowest/smallest) to 9 (fastest/largest) (optional, default 5)
         * @deprecated Use `effort` instead
         */
        speed?: number | undefined;
        /** Level of CPU effort to reduce file size, between 0 (fastest) and 9 (slowest) (optional, default 4) */
        effort?: number | undefined;
        /** set to '4:2:0' to use chroma subsampling, requires libvips v8.11.0 (optional, default '4:4:4') */
        chromaSubsampling?: string | undefined;
    }

    interface HeifOptions extends OutputOptions {
        /** quality, integer 1-100 (optional, default 50) */
        quality?: number | undefined;
        /** compression format: av1, hevc (optional, default 'av1') */
        compression?: 'av1' | 'hevc' | undefined;
        /** use lossless compression (optional, default false) */
        lossless?: boolean | undefined;
        /**
         * effort vs file size, 0 (slowest/smallest) to 9 (fastest/largest) (optional, default 5)
         * @deprecated Use `effort` instead
         */
        speed?: number | undefined;
        /** Level of CPU effort to reduce file size, between 0 (fastest) and 9 (slowest) (optional, default 4) */
        effort?: number | undefined;
    }

    interface GifOptions extends OutputOptions, AnimationOptions {
        /** Maximum number of palette entries, including transparency, between 2 and 256 (optional, default 256) */
        colours?: number | undefined;
        /** Alternative Spelling of "colours". Maximum number of palette entries, including transparency, between 2 and 256 (optional, default 256) */
        colors?: number | undefined;
        /** Level of CPU effort to reduce file size, between 1 (fastest) and 10 (slowest) (optional, default 7) */
        effort?: number | undefined;
        /** Level of Floyd-Steinberg error diffusion, between 0 (least) and 1 (most) (optional, default 1.0) */
        dither?: number | undefined;
    }

    interface TiffOptions extends OutputOptions {
        /** Quality, integer 1-100 (optional, default 80) */
        quality?: number | undefined;
        /** Compression options: lzw, deflate, jpeg, ccittfax4 (optional, default 'jpeg') */
        compression?: string | undefined;
        /** Compression predictor options: none, horizontal, float (optional, default 'horizontal') */
        predictor?: string | undefined;
        /** Write an image pyramid (optional, default false) */
        pyramid?: boolean | undefined;
        /** Write a tiled tiff (optional, default false) */
        tile?: boolean | undefined;
        /** Horizontal tile size (optional, default 256) */
        tileWidth?: boolean | undefined;
        /** Vertical tile size (optional, default 256) */
        tileHeight?: boolean | undefined;
        /** Horizontal resolution in pixels/mm (optional, default 1.0) */
        xres?: number | undefined;
        /** Vertical resolution in pixels/mm (optional, default 1.0) */
        yres?: number | undefined;
        /** Reduce bitdepth to 1, 2 or 4 bit (optional, default 8) */
        bitdepth?: 1 | 2 | 4 | 8 | undefined;
        /** Resolution unit options: inch, cm (optional, default 'inch') */
        resolutionUnit?: 'inch' | 'cm' | undefined;
    }

    interface PngOptions extends OutputOptions {
        /** Use progressive (interlace) scan (optional, default false) */
        progressive?: boolean | undefined;
        /** zlib compression level, 0-9 (optional, default 6) */
        compressionLevel?: number | undefined;
        /** Use adaptive row filtering (optional, default false) */
        adaptiveFiltering?: boolean | undefined;
        /** Use the lowest number of colours needed to achieve given quality (optional, default `100`) */
        quality?: number | undefined;
        /** Level of CPU effort to reduce file size, between 1 (fastest) and 10 (slowest), sets palette to true (optional, default 7) */
        effort?: number | undefined;
        /** Quantise to a palette-based image with alpha transparency support (optional, default false) */
        palette?: boolean | undefined;
        /** Maximum number of palette entries (optional, default 256) */
        colours?: number | undefined;
        /** Alternative Spelling of "colours". Maximum number of palette entries (optional, default 256) */
        colors?: number | undefined;
        /**  Level of Floyd-Steinberg error diffusion (optional, default 1.0) */
        dither?: number | undefined;
    }

    interface RotateOptions {
        /** parsed by the color module to extract values for red, green, blue and alpha. (optional, default "#000000") */
        background?: Color | undefined;
    }

    interface FlattenOptions {
        /** background colour, parsed by the color module, defaults to black. (optional, default {r:0,g:0,b:0}) */
        background?: Color | undefined;
    }

    interface NegateOptions {
        /** whether or not to negate any alpha channel. (optional, default true) */
        alpha?: boolean | undefined;
    }

    interface ResizeOptions {
        /** Alternative means of specifying width. If both are present this take priority. */
        width?: number | undefined;
        /** Alternative means of specifying height. If both are present this take priority. */
        height?: number | undefined;
        /** How the image should be resized to fit both provided dimensions, one of cover, contain, fill, inside or outside. (optional, default 'cover') */
        fit?: keyof FitEnum | undefined;
        /** Position, gravity or strategy to use when fit is cover or contain. (optional, default 'centre') */
        position?: number | string | undefined;
        /** Background colour when using a fit of contain, parsed by the color module, defaults to black without transparency. (optional, default {r:0,g:0,b:0,alpha:1}) */
        background?: Color | undefined;
        /** The kernel to use for image reduction. (optional, default 'lanczos3') */
        kernel?: keyof KernelEnum | undefined;
        /** Do not enlarge if the width or height are already less than the specified dimensions, equivalent to GraphicsMagick's > geometry option. (optional, default false) */
        withoutEnlargement?: boolean | undefined;
        /** Do not reduce if the width or height are already greater than the specified dimensions, equivalent to GraphicsMagick's < geometry option. (optional, default false) */
        withoutReduction?: boolean | undefined;
        /** Take greater advantage of the JPEG and WebP shrink-on-load feature, which can lead to a slight moiré pattern on some images. (optional, default true) */
        fastShrinkOnLoad?: boolean | undefined;
    }

    interface Region {
        /** zero-indexed offset from left edge */
        left: number;
        /** zero-indexed offset from top edge */
        top: number;
        /** dimension of extracted image */
        width: number;
        /** dimension of extracted image */
        height: number;
    }

    interface Noise {
        /** type of generated noise, currently only gaussian is supported. */
        type?: 'gaussian' | undefined;
        /** mean of pixels in generated noise. */
        mean?: number | undefined;
        /** standard deviation of pixels in generated noise. */
        sigma?: number | undefined;
    }

    interface ExtendOptions {
        /** single pixel count to top edge (optional, default 0) */
        top?: number | undefined;
        /** single pixel count to left edge (optional, default 0) */
        left?: number | undefined;
        /** single pixel count to bottom edge (optional, default 0) */
        bottom?: number | undefined;
        /** single pixel count to right edge (optional, default 0) */
        right?: number | undefined;
        /** background colour, parsed by the color module, defaults to black without transparency. (optional, default {r:0,g:0,b:0,alpha:1}) */
        background?: Color | undefined;
    }

    interface RawOptions {
        depth?: 'char' | 'uchar' | 'short' | 'ushort' | 'int' | 'uint' | 'float' | 'complex' | 'double' | 'dpcomplex';
    }

    /** 3 for sRGB, 4 for CMYK */
    type Channels = 3 | 4;

    interface RGBA {
        r?: number | undefined;
        g?: number | undefined;
        b?: number | undefined;
        alpha?: number | undefined;
    }

    type Color = string | RGBA;

    interface Kernel {
        /** width of the kernel in pixels. */
        width: number;
        /** height of the kernel in pixels. */
        height: number;
        /** Array of length width*height containing the kernel values. */
        kernel: ArrayLike<number>;
        /** the scale of the kernel in pixels. (optional, default sum) */
        scale?: number | undefined;
        /** the offset of the kernel in pixels. (optional, default 0) */
        offset?: number | undefined;
    }

    interface ClaheOptions {
        /** width of the region */
        width: number;
        /** height of the region */
        height: number;
        /** max slope of the cumulative contrast. (optional, default 3) */
        maxSlope?: number | undefined;
    }

    interface ThresholdOptions {
        /** convert to single channel greyscale. (optional, default true) */
        greyscale?: boolean | undefined;
        /** alternative spelling for greyscale. (optional, default true) */
        grayscale?: boolean | undefined;
    }

    interface OverlayOptions {
        /** Buffer containing image data, String containing the path to an image file, or Create object  */
        input?: string | Buffer | { create: Create } | undefined;
        /** how to blend this image with the image below. (optional, default `'over'`) */
        blend?: Blend | undefined;
        /** gravity at which to place the overlay. (optional, default 'centre') */
        gravity?: Gravity | undefined;
        /** the pixel offset from the top edge. */
        top?: number | undefined;
        /** the pixel offset from the left edge. */
        left?: number | undefined;
        /** set to true to repeat the overlay image across the entire image with the given  gravity. (optional, default false) */
        tile?: boolean | undefined;
        /** number representing the DPI for vector overlay image. (optional, default 72) */
        density?: number | undefined;
        /** describes overlay when using raw pixel data. */
        raw?: Raw | undefined;
        /** Set to true to avoid premultipling the image below. Equivalent to the --premultiplied vips option. */
        premultiplied?: boolean | undefined;
        /**
         * Do not process input images where the number of pixels (width x height) exceeds this limit.
         * Assumes image dimensions contained in the input metadata can be trusted.
         * An integral Number of pixels, zero or false to remove limit, true to use default limit of 268402689 (0x3FFF x 0x3FFF). (optional, default 268402689)
         */
        limitInputPixels?: number | boolean | undefined;
    }

    interface TileOptions {
        /** Tile size in pixels, a value between 1 and 8192. (optional, default 256) */
        size?: number | undefined;
        /** Tile overlap in pixels, a value between 0 and 8192. (optional, default 0) */
        overlap?: number | undefined;
        /** Tile angle of rotation, must be a multiple of 90. (optional, default 0) */
        angle?: number | undefined;
        /** background colour, parsed by the color module, defaults to white without transparency. (optional, default {r:255,g:255,b:255,alpha:1}) */
        background?: string | RGBA | undefined;
        /** How deep to make the pyramid, possible values are "onepixel", "onetile" or "one" (default based on layout) */
        depth?: string | undefined;
        /** Threshold to skip tile generation, a value 0 - 255 for 8-bit images or 0 - 65535 for 16-bit images */
        skipBlanks?: number | undefined;
        /** Tile container, with value fs (filesystem) or zip (compressed file). (optional, default 'fs') */
        container?: string | undefined;
        /** 文件系统布局，可能的值是dz、iiif、iiif3、zoomify或google。(可选，默认为'dz') */
        layout?: TileLayout | undefined;
        /** 将图像放在画布的中心。(可选，默认为false) */
        centre?: boolean | undefined;
        /**中心的替代拼写。(可选，默认为false) */
        center?: boolean | undefined;
        /** 当布局为iiif/iiif3时，设置info.json的@id/id属性（可选，默认为'https://example.com/iiif' ） */
        id?: string | undefined;
    }

    interface AnimationOptions {
        /**动画迭代的次数，在0到65535之间。使用0表示无限的动画。(可选，默认为0) */
        loop?: number | undefined;
        /**动画帧之间的延迟（以毫秒为单位），每个值在0到65535之间。(可选) */
        delay?: number | number[] | undefined;
    }

    interface OutputInfo {
        format: string;
        size: number;
        width: number;
        height: number;
        channels: 1 | 2 | 3 | 4;
        /**表示是否使用预乘法 */
        premultiplied: boolean;
        /**只在使用作物策略时定义 */
        cropOffsetLeft?: number | undefined;
        /**只在使用作物策略时定义 */
        cropOffsetTop?: number | undefined;
        /**只在使用修剪方法时定义 */
        trimOffsetLeft?: number | undefined;
        /**只在使用修剪方法时定义 */
        trimOffsetTop?: number | undefined;
    }

    interface AvailableFormatInfo {
        id: string;
        input: { file: boolean; buffer: boolean; stream: boolean };
        output: { file: boolean; buffer: boolean; stream: boolean };
    }

    interface FitEnum {
        contain: 'contain';
        cover: 'cover';
        fill: 'fill';
        inside: 'inside';
        outside: 'outside';
    }

    interface KernelEnum {
        nearest: 'nearest';
        cubic: 'cubic';
        mitchell: 'mitchell';
        lanczos2: 'lanczos2';
        lanczos3: 'lanczos3';
    }

    interface BoolEnum {
        and: 'and';
        or: 'or';
        eor: 'eor';
    }

    interface ColourspaceEnum {
        multiband: string;
        'b-w': string;
        bw: string;
        cmyk: string;
        srgb: string;
    }

    type TileLayout = 'dz' | 'iiif' | 'iiif3' | 'zoomify' | 'google';

    type Blend =
        | 'clear'
        | 'source'
        | 'over'
        | 'in'
        | 'out'
        | 'atop'
        | 'dest'
        | 'dest-over'
        | 'dest-in'
        | 'dest-out'
        | 'dest-atop'
        | 'xor'
        | 'add'
        | 'saturate'
        | 'multiply'
        | 'screen'
        | 'overlay'
        | 'darken'
        | 'lighten'
        | 'colour-dodge'
        | 'colour-dodge'
        | 'colour-burn'
        | 'colour-burn'
        | 'hard-light'
        | 'soft-light'
        | 'difference'
        | 'exclusion';

    type Gravity = number | string;

    interface GravityEnum {
        north: number;
        northeast: number;
        southeast: number;
        south: number;
        southwest: number;
        west: number;
        northwest: number;
        east: number;
        center: number;
        centre: number;
    }

    interface StrategyEnum {
        entropy: number;
        attention: number;
    }

    interface FormatEnum {
        avif: AvailableFormatInfo;
        dz: AvailableFormatInfo;
        fits: AvailableFormatInfo;
        gif: AvailableFormatInfo;
        heif: AvailableFormatInfo;
        input: AvailableFormatInfo;
        jpeg: AvailableFormatInfo;
        jpg: AvailableFormatInfo;
        magick: AvailableFormatInfo;
        openslide: AvailableFormatInfo;
        pdf: AvailableFormatInfo;
        png: AvailableFormatInfo;
        ppm: AvailableFormatInfo;
        raw: AvailableFormatInfo;
        svg: AvailableFormatInfo;
        tiff: AvailableFormatInfo;
        tif: AvailableFormatInfo;
        v: AvailableFormatInfo;
        webp: AvailableFormatInfo;
    }

    interface CacheResult {
        memory: { current: number; high: number; max: number };
        files: { current: number; max: number };
        items: { current: number; max: number };
    }

    type Matrix3x3 = [[number, number, number], [number, number, number], [number, number, number]];
}

export = sharp;
