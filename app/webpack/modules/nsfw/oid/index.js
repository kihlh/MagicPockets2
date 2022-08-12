{
    const fs = require("fs")
    const path = require('path');
    const shake = require("../防抖")
    const NSFW = require('./nsfw.node');

    function NSFWFilePoller(watchPath, eventCallback, debounceMS) {
        const {
            CREATED,
            DELETED,
            MODIFIED
        } = nsfw.actions;
        const directory = path.dirname(watchPath);
        const file = path.basename(watchPath);

        let fileStatus;
        let filePollerInterval;

        const getStatus = async () => {
            try {
                const status = await  fs.promises.stat(watchPath);
                if (fileStatus === null) {
                    fileStatus = status;
                    eventCallback([{
                        action: CREATED,
                        directory,
                        file
                    }]);
                } else if (
                    status.mtime - fileStatus.mtime !== 0 ||
                    status.ctime - fileStatus.ctime !== 0
                ) {
                    fileStatus = status;
                    eventCallback([{
                        action: MODIFIED,
                        directory,
                        file
                    }]);
                }
            } catch (e) {
                if (fileStatus !== null) {
                    fileStatus = null;
                    eventCallback([{
                        action: DELETED,
                        directory,
                        file
                    }]);
                }
            }
        };

        this.start = async () => {
            try {
                fileStatus = await  fs.promises.stat(watchPath);
            } catch (e) {
                fileStatus = null;
            }

            filePollerInterval = setInterval(getStatus, debounceMS);
        };

        this.stop = async () => {
            clearInterval(filePollerInterval);
        };

        this.pause = () => this.stop();
        this.resume = () => this.start();
    }


    const buildNSFW = async (watchPath, eventCallback, {
        debounceMS = 500,
        errorCallback: _errorCallback
    } = {}) => {
        if (Number.isInteger(debounceMS)) {
            if (debounceMS < 1) {
                throw new Error('Minimum debounce is 1ms.');
            }
        } else {
            throw new Error('debounceMS must be an integer.');
        }

        const errorCallback = _errorCallback || ((nsfwError) => {
            throw nsfwError;
        });

        if (!path.isAbsolute(watchPath)) {
            throw new Error('Path to watch must be an absolute path.');
        }

        let stats;
        try {
            stats = await fs.promises.stat(watchPath);
        } catch (e) {
            throw new Error('Path must be a valid path to a file or a directory.');
        }

        if (stats.isDirectory()) {
            return new NSFW(watchPath, eventCallback, {
                debounceMS,
                errorCallback
            });
        } else if (stats.isFile()) {
            return new NSFWFilePoller(watchPath, eventCallback, debounceMS);
        } else {
            throw new Error('Path must be a valid path to a file or a directory');
        }
    };

    function nsfw(watchPath, eventCallback, options) {
        if (!(this instanceof nsfw)) {
            return buildNSFW(watchPath, eventCallback, options).then(implementation => new nsfw(implementation));
        }

        const implementation = watchPath;

        this.start = () => implementation.start();
        this.stop = () => implementation.stop();
        this.pause = () => implementation.pause();
        this.resume = () => implementation.resume();
    }

    nsfw.actions = {
        CREATED: 0,
        DELETED: 1,
        MODIFIED: 2,
        RENAMED: 3
    };

    nsfw._native = NSFW;

    if (NSFW.getAllocatedInstanceCount) {
        nsfw.getAllocatedInstanceCount = NSFW.getAllocatedInstanceCount;
    }


    function NULLS(events, Path, VAR_1, VAR_2, VAR_3) {
        events = {
            /**
                    add:("unlink", PATH, {})
                    rename:("rename", newFile,oldFile, {})
                    unlink:("unlink", PATH, {})
                    change:("change", PATH, stat, {})
                     */
        }

    }
    async function Setcallback(events, runcallback = NULLS, SetEvenTs, ignored) {
        let runback = [];
        for (let i = 0; i < events.length; i++) { //value.action 1:unlink,2:change,3:rename,0:add
            const value = events[i]
            // 拦截1.2秒内重复更新 且按照正则移除格式中的更新
            if (ignored && ((value.file || value.oldFile).match(ignored) || shake.isset((value.file || value.oldFile), 1200))) continue;

            const EvenTsType = {
                change: value.action === 2 && (SetEvenTs === "all" || SetEvenTs === "change"),
                unlink: value.action === 1 && (SetEvenTs === "all" || SetEvenTs === "unlink"),
                add: value.action === 0 && (SetEvenTs === "all" || SetEvenTs === "add"),
                rename: value.action === 3 && (SetEvenTs === "all" || SetEvenTs === "rename")
            }
            const NULLStat = {
                "dev": 0,
                "mode": 0,
                "nlink": 1,
                "uid": 0,
                "gid": 0,
                "rdev": 0,
                "blksize": 4096,
                "ino": 0,
                "size": 0,
                "blocks": 0,
                "atimeMs": 0,
                "mtimeMs": 0,
                "ctimeMs": 0,
                "birthtimeMs": 0,
                "atime": "",
                "mtime": "",
                "ctime": "",
                "birthtime": ""
            };
            if (EvenTsType.change) {
                const PATH = path.join(value.directory, value.file)
                const stat = await fs.promises.stat(PATH).catch(e => {}) || NULLStat;
                if (stat.mtimeMs > +new Date() - 900) runcallback("change", PATH, stat, Object.assign({
                    type: "change"
                }, path.parse(PATH), stat, value))
            } else if (EvenTsType.unlink) {
                const PATH = path.join(value.directory, value.file)
                runcallback("unlink", PATH, Object.assign({
                    type: "unlink",
                }, value, path.parse(PATH)))
            } else if (EvenTsType.add) {
                const PATH = path.join(value.directory, value.file)
                let stat = await fs.promises.stat(PATH).catch(e => {}) || NULLStat;
                runcallback("add", PATH, stat, Object.assign({
                    path: PATH,
                    type: "add"
                }, path.parse(PATH), stat, value))
            } else if (EvenTsType.rename) {
                const NewPATH = path.join(value.newDirectory, value.newFile)
                const PATH = path.join(value.directory, value.oldFile)
                runcallback("rename", PATH, NewPATH, Object.assign({
                    path: PATH,
                    type: "rename"
                }, path.parse(PATH), value))
            }

        }

    }
    module.exports = {
        nsfw:nsfw,
        async watcher(Path, Callback, oneven = "all", filter) {
            if (!Path || !Callback) throw new Error("未提供重要信息，如路径，回调函数")

            function gotu(events) {
                Setcallback(events, Callback, oneven, filter)
            }
            let watcher = await (nsfw(Path, gotu, {
                debounceMS: 500
            }))
            watcher.start()
            return watcher
        },
        Even: {
            rename: "rename",
            add: "add",
            unlink: "unlink",
            change: "change"
        },
        funVar: {
            rename: "events,Path,NewPath,Parse",
            add: "events,Path,Stat,Parse",
            unlink: "events,Path,Parse",
            change: "events,Path,Stats,Parse"
        }
    }
}


