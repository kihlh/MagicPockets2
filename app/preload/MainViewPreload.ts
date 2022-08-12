
require("./AllPreload");

import{SetGlobalWindowListType} from "./AllPreload"
declare var window: Window & typeof globalThis & SetGlobalWindowListType;