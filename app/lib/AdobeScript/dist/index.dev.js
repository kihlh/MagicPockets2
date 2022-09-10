"use strict";

/// <reference path="./node_modules/types-for-adobe/Photoshop/2015.5/index.d.ts" />
// =======================================================
var idAdobeScriptAutomationScripts = stringIDToTypeID("AdobeScriptAutomation Scripts");
var desc30 = new ActionDescriptor();
desc30.putPath(idjsCt, new File("F:\\下个文件.jsx"));
executeAction(idAdobeScriptAutomationScripts, desc30, DialogModes.NO);