/// <reference types="node" />
/// <reference types="node" />
/// <reference types="ref-napi" />
import child_process from "child_process";
import { ChildProcess, ChildProcessWithoutNullStreams, SpawnOptionsWithoutStdio } from "child_process";
declare let run: {
    (Command: string | string[], Callback?: any, Options?: any): Promise<NodeCmdReturnResult> | void | ChildProcess;
    (Command: string | string[]): Promise<NodeCmdReturnResult>;
    (Command: string | string[], Callback: (error: NodeCmdReturnResult["err"], data: NodeCmdReturnResult["data"], stderr: NodeCmdReturnResult["stderr"]) => void): ChildProcess | void;
}, runSync: (Command: string | string[]) => {
    data: string;
    err: any;
    stderr: any;
} | {
    data: any;
    err: string;
    stderr: string;
}, SetDecode: (decode: encodingTypeof) => boolean, spawn: (file: string, args: string[], callback?: (this: ChildProcessWithoutNullStreams | undefined, data: string) => void, options?: SpawnOptionsWithoutStdio) => StartSpawn, execFile: Function;
export { run, runSync, SetDecode, spawn, execFile, StartSpawn, NodeCmdReturnResult };
declare const _default: {
    run: {
        (Command: string | string[], Callback?: any, Options?: any): void | ChildProcess | Promise<NodeCmdReturnResult>;
        (Command: string | string[]): Promise<NodeCmdReturnResult>;
        (Command: string | string[], Callback: (error: string | Error, data: string, stderr: string) => void): void | ChildProcess;
    };
    runSync: (Command: string | string[]) => {
        data: string;
        err: any;
        stderr: any;
    } | {
        data: any;
        err: string;
        stderr: string;
    };
    SetDecode: (decode: encodingTypeof) => boolean;
    spawn: (file: string, args: string[], callback?: (this: ChildProcessWithoutNullStreams, data: string) => void, options?: SpawnOptionsWithoutStdio) => StartSpawn;
    execFile: Function;
};
export default _default;
interface SpawnAdditionStdout {
    on?: {
        (event: "close", listener: () => void): import("stream").Readable;
        (event: "data", listener: (chunk: any) => void): import("stream").Readable;
        (event: "end", listener: () => void): import("stream").Readable;
        (event: "error", listener: (err: Error) => void): import("stream").Readable;
        (event: "pause", listener: () => void): import("stream").Readable;
        (event: "readable", listener: () => void): import("stream").Readable;
        (event: "resume", listener: () => void): import("stream").Readable;
        (event: string | symbol, listener: (...args: any[]) => void): import("stream").Readable;
    };
    /**
     * 退出
     */
    Quit?: () => void;
    /**
     * 返回当前已有的所有文本 并编码
     */
    GetData?: () => string;
    /**
     * 返回当前已经有的Buffer 未经过编码
     */
    GetDataList?: () => Set<Buffer>;
    /**途中发生的错误都会记录在这里 */
    ErrorList?: Set<Error>;
    Spawn?: child_process.ChildProcessWithoutNullStreams;
    Options?: SpawnOptionsWithoutStdio;
    /**进行中的所有返回的Buffer
     * ?数据获取结束后会清空该内容
    */
    HaveDataList?: Set<Buffer>;
    /**
     * 是否完成
     */
    Fulfil?: boolean;
}
declare type StartSpawn = Promise<string> & SpawnAdditionStdout;
declare type NodeCmdReturnResult = {
    data: string | null | undefined;
    err: null | Error | string | undefined;
    stderr: null | string | undefined;
};
declare type encodingTypeof = "cp936" | "win1251" | "utf8" | "us-ascii" | "utf-32be" | "utf-16be" | "ucs2" | "utf16-le" | "ascii" | "binary" | "base64" | "hex" | "utf16" | "utf-7" | "utf-7-imap" | "utf32" | "ISO-8859" | "ISO-8859" | "family" | "Windows 125x family" | "IBM/DOS" | "'us-ascii" | "latin1" | "EUC-JP." | "Shift_JIS" | "GB18030" | "GBK" | "GB2312" | "CP950" | "CP949" | "CP936" | "CP932";
