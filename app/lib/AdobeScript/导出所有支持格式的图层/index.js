"use strict";
///@ts-nocheck
/// <reference path="../node_modules/types-for-adobe/Photoshop/2015.5/index.d.ts" />
var ID = "K9V7O9NLGG3GP";
var ColorList = ["黑色", "深棕", "灰色", "白色", "深蓝", "浅灰", "藕粉", "薄荷色", "抹茶绿", "木炭灰", "驼色", "杏色", "棕色", "黄色", "浅蓝色", "绿色", "克莱因蓝"];
var PushBlackPrintsList = ["白色", "黄色", "杏色", "驼色", "抹茶绿", "浅灰"];
function mkFolder(path) {
    var folder = Folder(path);
    if (!folder.exists)
        folder.create();
}
/**
*运行脚本
*/
function evalJavaScript(jsxPath) {
    var idAdobeScriptAutomationScripts = stringIDToTypeID("AdobeScriptAutomation Scripts");
    var desc1786 = new ActionDescriptor();
    var idjsCt = charIDToTypeID("jsCt");
    desc1786.putPath(idjsCt, new File(jsxPath));
    var idjsMs = charIDToTypeID("jsMs");
    // desc1786.putString( idjsMs, "","undefined","" );
    executeAction(idAdobeScriptAutomationScripts, desc1786, DialogModes.NO);
}
/**
 * Web(JPEG)导出(切片)
 */
function Web_JPEG_ExportSlice() {
    // µ¼³ö
    function step1(enabled, withDialog) {
        if (enabled != undefined && !enabled)
            return;
        var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
        var desc1 = new ActionDescriptor();
        var desc2 = new ActionDescriptor();
        desc2.putEnumerated(cTID('Op  '), cTID('SWOp'), cTID('OpSa'));
        desc2.putBoolean(cTID('DIDr'), true);
        desc2.putPath(cTID('In  '), new File("~/Pictures/Saved Pictures/kiic"));
        desc2.putEnumerated(cTID('Fmt '), cTID('IRFm'), sTID("JPEGFormat"));
        desc2.putBoolean(cTID('Intr'), false);
        desc2.putInteger(cTID('Qlty'), 100);
        desc2.putInteger(cTID('QChS'), 0);
        desc2.putInteger(cTID('QCUI'), 0);
        desc2.putBoolean(cTID('QChT'), false);
        desc2.putBoolean(cTID('QChV'), false);
        desc2.putBoolean(cTID('Optm'), true);
        desc2.putInteger(cTID('Pass'), 1);
        desc2.putDouble(cTID('blur'), 0);
        desc2.putBoolean(cTID('Mtt '), true);
        desc2.putBoolean(cTID('EICC'), false);
        desc2.putInteger(cTID('MttR'), 255);
        desc2.putInteger(cTID('MttG'), 255);
        desc2.putInteger(cTID('MttB'), 255);
        desc2.putBoolean(cTID('SHTM'), false);
        desc2.putBoolean(cTID('SImg'), true);
        desc2.putEnumerated(cTID('SWsl'), cTID('STsl'), cTID('SLAl'));
        desc2.putEnumerated(cTID('SWch'), cTID('STch'), cTID('CHsR'));
        desc2.putEnumerated(cTID('SWmd'), cTID('STmd'), cTID('MDCC'));
        desc2.putBoolean(cTID('ohXH'), false);
        desc2.putBoolean(cTID('ohIC'), true);
        desc2.putBoolean(cTID('ohAA'), true);
        desc2.putBoolean(cTID('ohQA'), true);
        desc2.putBoolean(cTID('ohCA'), false);
        desc2.putBoolean(cTID('ohIZ'), true);
        desc2.putEnumerated(cTID('ohTC'), cTID('SToc'), cTID('OC03'));
        desc2.putEnumerated(cTID('ohAC'), cTID('SToc'), cTID('OC03'));
        desc2.putInteger(cTID('ohIn'), -1);
        desc2.putEnumerated(cTID('ohLE'), cTID('STle'), cTID('LE03'));
        desc2.putEnumerated(cTID('ohEn'), cTID('STen'), cTID('EN00'));
        desc2.putBoolean(cTID('olCS'), false);
        desc2.putEnumerated(cTID('olEC'), cTID('STst'), cTID('ST00'));
        desc2.putEnumerated(cTID('olWH'), cTID('STwh'), cTID('WH01'));
        desc2.putEnumerated(cTID('olSV'), cTID('STsp'), cTID('SP04'));
        desc2.putEnumerated(cTID('olSH'), cTID('STsp'), cTID('SP04'));
        var list1 = new ActionList();
        var desc3 = new ActionDescriptor();
        desc3.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC00'));
        list1.putObject(cTID('SCnc'), desc3);
        var desc4 = new ActionDescriptor();
        desc4.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC19'));
        list1.putObject(cTID('SCnc'), desc4);
        var desc5 = new ActionDescriptor();
        desc5.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC28'));
        list1.putObject(cTID('SCnc'), desc5);
        var desc6 = new ActionDescriptor();
        desc6.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
        list1.putObject(cTID('SCnc'), desc6);
        var desc7 = new ActionDescriptor();
        desc7.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
        list1.putObject(cTID('SCnc'), desc7);
        var desc8 = new ActionDescriptor();
        desc8.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
        list1.putObject(cTID('SCnc'), desc8);
        desc2.putList(cTID('olNC'), list1);
        desc2.putBoolean(cTID('obIA'), false);
        desc2.putString(cTID('obIP'), "");
        desc2.putEnumerated(cTID('obCS'), cTID('STcs'), cTID('CS01'));
        var list2 = new ActionList();
        var desc9 = new ActionDescriptor();
        desc9.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC01'));
        list2.putObject(cTID('SCnc'), desc9);
        var desc10 = new ActionDescriptor();
        desc10.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC20'));
        list2.putObject(cTID('SCnc'), desc10);
        var desc11 = new ActionDescriptor();
        desc11.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC02'));
        list2.putObject(cTID('SCnc'), desc11);
        var desc12 = new ActionDescriptor();
        desc12.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC19'));
        list2.putObject(cTID('SCnc'), desc12);
        var desc13 = new ActionDescriptor();
        desc13.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC06'));
        list2.putObject(cTID('SCnc'), desc13);
        var desc14 = new ActionDescriptor();
        desc14.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
        list2.putObject(cTID('SCnc'), desc14);
        var desc15 = new ActionDescriptor();
        desc15.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
        list2.putObject(cTID('SCnc'), desc15);
        var desc16 = new ActionDescriptor();
        desc16.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
        list2.putObject(cTID('SCnc'), desc16);
        var desc17 = new ActionDescriptor();
        desc17.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC22'));
        list2.putObject(cTID('SCnc'), desc17);
        desc2.putList(cTID('ovNC'), list2);
        desc2.putBoolean(cTID('ovCM'), false);
        desc2.putBoolean(cTID('ovCW'), true);
        desc2.putBoolean(cTID('ovCU'), true);
        desc2.putBoolean(cTID('ovSF'), true);
        desc2.putBoolean(cTID('ovCB'), true);
        desc2.putString(cTID('ovSN'), "images");
        desc1.putObject(cTID('Usng'), sTID("SaveForWeb"), desc2);
        executeAction(sTID('export'), desc1, dialogMode);
    }
    ;
    step1(); // µ¼³ö
}
;
function exportMainImages() {
    var is_Drew = app.activeDocument.name.match(/!--单面_DrewT恤带阴影800|!--单面_T恤带阴影800/);
    var is_Drew_1200 = app.activeDocument.name.match(/!--单面_DrewT恤带阴影1200|!--单面_T恤带阴影1200/);
    var is_Prints = is_Drew || is_Drew_1200 || confirm("Print？");
    var is_ToPNG = is_Drew || is_Drew_1200 || confirm("ToPNG?");
    var ___Dir = "~/Pictures/Saved Pictures/kiic";
    if (is_Drew || is_Drew_1200) {
        is_Prints = false;
        if (app.activeDocument.name.match(/Drew/)) {
            ___Dir = ___Dir + "/Drew";
        }
        else {
            ___Dir = ___Dir + "/KING";
        }
    }
    mkFolder(___Dir);
    // if (typeof is_Prints == 'object' && is_Prints == null) is_Prints = confirm("Print？");
    // if (typeof is_ToPNG == 'object' && is_ToPNG == null) is_ToPNG = confirm("ToPNG?");
    // 选择黑色印花
    function ChooseBlackFlowers() {
        evalJavaScript("F:\\PS-lib\\lib\\选择黑色印花.jsx");
        $.sleep(15);
    }
    function cTID(s) { return app.charIDToTypeID(s); }
    ;
    function sTID(s) { return app.stringIDToTypeID(s); }
    ;
    // 选择白色印sa花
    function ChooseWhiteFlowers() {
        evalJavaScript("F:\\PS-lib\\lib\\选择白色印花.jsx");
        $.sleep(15);
    }
    /**
     * 隐藏所有印花
     */
    function HideAllFlowers() {
        try {
            ChooseWhiteFlowers();
            HideLayer();
            ChooseBlackFlowers();
            HideLayer();
            return true;
        }
        catch (err) {
            return false;
        }
    }
    function ShowLayer(Name) {
        if (Name) {
            var idShw = charIDToTypeID("Shw ");
            var desc4537 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var list39 = new ActionList();
            var ref138 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref138.putName(idLyr, Name);
            list39.putReference(ref138);
            desc4537.putList(idnull, list39);
            executeAction(idShw, desc4537, DialogModes.NO);
        }
        else {
            var idShw = charIDToTypeID("Shw ");
            var desc58 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var list15 = new ActionList();
            var ref21 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idTrgt = charIDToTypeID("Trgt");
            ref21.putEnumerated(idLyr, idOrdn, idTrgt);
            list15.putReference(ref21);
            desc58.putList(idnull, list15);
            executeAction(idShw, desc58, DialogModes.NO);
        }
    }
    function lookNameToSaveJPEG(Name, Dir) {
        var cTID = function (s) { return app.charIDToTypeID(s); };
        var sTID = function (s) { return app.stringIDToTypeID(s); };
        // ÏÔÊ¾
        function step1(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var list1 = new ActionList();
            var ref1 = new ActionReference();
            ref1.putName(cTID('Lyr '), Name);
            list1.putReference(ref1);
            desc1.putList(cTID('null'), list1);
            executeAction(sTID('show'), desc1, dialogMode);
        }
        ;
        // Ñ¡Ôñ
        function step2(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var ref1 = new ActionReference();
            ref1.putName(cTID('Lyr '), Name);
            desc1.putReference(cTID('null'), ref1);
            desc1.putBoolean(cTID('MkVs'), false);
            var list1 = new ActionList();
            list1.putInteger(37);
            desc1.putList(cTID('LyrI'), list1);
            executeAction(sTID('select'), desc1, dialogMode);
        }
        ;
        // µ¼³ö
        function step3(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var desc2 = new ActionDescriptor();
            desc2.putEnumerated(cTID('Op  '), cTID('SWOp'), cTID('OpSa'));
            desc2.putBoolean(cTID('DIDr'), true);
            desc2.putPath(cTID('In  '), new File(Dir || ___Dir || "~/Pictures/Saved Pictures/kiic"));
            desc2.putString(cTID('ovFN'), Name + ".jpg");
            desc2.putEnumerated(cTID('Fmt '), cTID('IRFm'), sTID("JPEGFormat"));
            desc2.putBoolean(cTID('Intr'), false);
            desc2.putInteger(cTID('Qlty'), 100);
            desc2.putInteger(cTID('QChS'), 0);
            desc2.putInteger(cTID('QCUI'), 0);
            desc2.putBoolean(cTID('QChT'), false);
            desc2.putBoolean(cTID('QChV'), false);
            desc2.putBoolean(cTID('Optm'), true);
            desc2.putInteger(cTID('Pass'), 1);
            desc2.putDouble(cTID('blur'), 0);
            desc2.putBoolean(cTID('Mtt '), true);
            desc2.putBoolean(cTID('EICC'), false);
            desc2.putInteger(cTID('MttR'), 255);
            desc2.putInteger(cTID('MttG'), 255);
            desc2.putInteger(cTID('MttB'), 255);
            desc2.putBoolean(cTID('SHTM'), false);
            desc2.putBoolean(cTID('SImg'), true);
            desc2.putEnumerated(cTID('SWsl'), cTID('STsl'), cTID('SLAl'));
            desc2.putEnumerated(cTID('SWch'), cTID('STch'), cTID('CHsR'));
            desc2.putEnumerated(cTID('SWmd'), cTID('STmd'), cTID('MDCC'));
            desc2.putBoolean(cTID('ohXH'), false);
            desc2.putBoolean(cTID('ohIC'), true);
            desc2.putBoolean(cTID('ohAA'), true);
            desc2.putBoolean(cTID('ohQA'), true);
            desc2.putBoolean(cTID('ohCA'), false);
            desc2.putBoolean(cTID('ohIZ'), true);
            desc2.putEnumerated(cTID('ohTC'), cTID('SToc'), cTID('OC03'));
            desc2.putEnumerated(cTID('ohAC'), cTID('SToc'), cTID('OC03'));
            desc2.putInteger(cTID('ohIn'), -1);
            desc2.putEnumerated(cTID('ohLE'), cTID('STle'), cTID('LE03'));
            desc2.putEnumerated(cTID('ohEn'), cTID('STen'), cTID('EN00'));
            desc2.putBoolean(cTID('olCS'), false);
            desc2.putEnumerated(cTID('olEC'), cTID('STst'), cTID('ST00'));
            desc2.putEnumerated(cTID('olWH'), cTID('STwh'), cTID('WH01'));
            desc2.putEnumerated(cTID('olSV'), cTID('STsp'), cTID('SP04'));
            desc2.putEnumerated(cTID('olSH'), cTID('STsp'), cTID('SP04'));
            var list1 = new ActionList();
            var desc3 = new ActionDescriptor();
            desc3.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC00'));
            list1.putObject(cTID('SCnc'), desc3);
            var desc4 = new ActionDescriptor();
            desc4.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC19'));
            list1.putObject(cTID('SCnc'), desc4);
            var desc5 = new ActionDescriptor();
            desc5.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC28'));
            list1.putObject(cTID('SCnc'), desc5);
            var desc6 = new ActionDescriptor();
            desc6.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
            list1.putObject(cTID('SCnc'), desc6);
            var desc7 = new ActionDescriptor();
            desc7.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
            list1.putObject(cTID('SCnc'), desc7);
            var desc8 = new ActionDescriptor();
            desc8.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
            list1.putObject(cTID('SCnc'), desc8);
            desc2.putList(cTID('olNC'), list1);
            desc2.putBoolean(cTID('obIA'), false);
            desc2.putString(cTID('obIP'), "");
            desc2.putEnumerated(cTID('obCS'), cTID('STcs'), cTID('CS01'));
            var list2 = new ActionList();
            var desc9 = new ActionDescriptor();
            desc9.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC01'));
            list2.putObject(cTID('SCnc'), desc9);
            var desc10 = new ActionDescriptor();
            desc10.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC20'));
            list2.putObject(cTID('SCnc'), desc10);
            var desc11 = new ActionDescriptor();
            desc11.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC02'));
            list2.putObject(cTID('SCnc'), desc11);
            var desc12 = new ActionDescriptor();
            desc12.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC19'));
            list2.putObject(cTID('SCnc'), desc12);
            var desc13 = new ActionDescriptor();
            desc13.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC06'));
            list2.putObject(cTID('SCnc'), desc13);
            var desc14 = new ActionDescriptor();
            desc14.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
            list2.putObject(cTID('SCnc'), desc14);
            var desc15 = new ActionDescriptor();
            desc15.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
            list2.putObject(cTID('SCnc'), desc15);
            var desc16 = new ActionDescriptor();
            desc16.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
            list2.putObject(cTID('SCnc'), desc16);
            var desc17 = new ActionDescriptor();
            desc17.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC22'));
            list2.putObject(cTID('SCnc'), desc17);
            desc2.putList(cTID('ovNC'), list2);
            desc2.putBoolean(cTID('ovCM'), false);
            desc2.putBoolean(cTID('ovCW'), true);
            desc2.putBoolean(cTID('ovCU'), true);
            desc2.putBoolean(cTID('ovSF'), true);
            desc2.putBoolean(cTID('ovCB'), true);
            desc2.putString(cTID('ovSN'), "images");
            desc1.putObject(cTID('Usng'), sTID("SaveForWeb"), desc2);
            executeAction(sTID('export'), desc1, dialogMode);
        }
        ;
        // Òþ²Ø
        function step4(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var list1 = new ActionList();
            var ref1 = new ActionReference();
            ref1.putName(cTID('Lyr '), Name);
            list1.putReference(ref1);
            desc1.putList(cTID('null'), list1);
            executeAction(sTID('hide'), desc1, dialogMode);
        }
        ;
        step1(); // ÏÔÊ¾
        step2(); // Ñ¡Ôñ
        step3(); // µ¼³ö
        step4(); // Òþ²Ø
    }
    ;
    function HideLayer(Name) {
        if (Name) {
            var idHd = charIDToTypeID("Hd  ");
            var desc4538 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var list40 = new ActionList();
            var ref139 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            ref139.putName(idLyr, Name);
            list40.putReference(ref139);
            desc4538.putList(idnull, list40);
            executeAction(idHd, desc4538, DialogModes.NO);
        }
        else {
            var idHd = charIDToTypeID("Hd  ");
            var desc59 = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var list16 = new ActionList();
            var ref22 = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idTrgt = charIDToTypeID("Trgt");
            ref22.putEnumerated(idLyr, idOrdn, idTrgt);
            list16.putReference(ref22);
            desc59.putList(idnull, list16);
            executeAction(idHd, desc59, DialogModes.NO);
        }
    }
    function ArrayHas(ArrayData, data) {
        for (var _i = 0, ArrayData_1 = ArrayData; _i < ArrayData_1.length; _i++) {
            var data_ = ArrayData_1[_i];
            if (data == data_)
                return true;
        }
        return false;
    }
    function lookNameToSavePNG(Name, Dir) {
        var cTID = function (s) { return app.charIDToTypeID(s); };
        var sTID = function (s) { return app.stringIDToTypeID(s); };
        // ÏÔÊ¾
        function step1(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var list1 = new ActionList();
            var ref1 = new ActionReference();
            ref1.putName(cTID('Lyr '), Name);
            list1.putReference(ref1);
            desc1.putList(cTID('null'), list1);
            executeAction(sTID('show'), desc1, dialogMode);
        }
        ;
        // Ñ¡Ôñ
        function step2(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var ref1 = new ActionReference();
            ref1.putName(cTID('Lyr '), Name);
            desc1.putReference(cTID('null'), ref1);
            desc1.putBoolean(cTID('MkVs'), false);
            var list1 = new ActionList();
            list1.putInteger(37);
            desc1.putList(cTID('LyrI'), list1);
            executeAction(sTID('select'), desc1, dialogMode);
        }
        ;
        // µ¼³ö
        function step3(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var desc2 = new ActionDescriptor();
            desc2.putEnumerated(cTID('Op  '), cTID('SWOp'), cTID('OpSa'));
            desc2.putBoolean(cTID('DIDr'), true);
            desc2.putPath(cTID('In  '), new File(Dir || ___Dir || "~/Pictures/Saved Pictures/kiic"));
            desc2.putString(cTID('ovFN'), Name + ".png");
            desc2.putEnumerated(cTID('Fmt '), cTID('IRFm'), cTID('PN24'));
            desc2.putBoolean(cTID('Intr'), false);
            desc2.putBoolean(cTID('Trns'), true);
            desc2.putBoolean(cTID('Mtt '), true);
            desc2.putBoolean(cTID('EICC'), false);
            desc2.putInteger(cTID('MttR'), 255);
            desc2.putInteger(cTID('MttG'), 255);
            desc2.putInteger(cTID('MttB'), 255);
            desc2.putBoolean(cTID('SHTM'), false);
            desc2.putBoolean(cTID('SImg'), true);
            desc2.putEnumerated(cTID('SWsl'), cTID('STsl'), cTID('SLAl'));
            desc2.putEnumerated(cTID('SWch'), cTID('STch'), cTID('CHsR'));
            desc2.putEnumerated(cTID('SWmd'), cTID('STmd'), cTID('MDCC'));
            desc2.putBoolean(cTID('ohXH'), false);
            desc2.putBoolean(cTID('ohIC'), true);
            desc2.putBoolean(cTID('ohAA'), true);
            desc2.putBoolean(cTID('ohQA'), true);
            desc2.putBoolean(cTID('ohCA'), false);
            desc2.putBoolean(cTID('ohIZ'), true);
            desc2.putEnumerated(cTID('ohTC'), cTID('SToc'), cTID('OC03'));
            desc2.putEnumerated(cTID('ohAC'), cTID('SToc'), cTID('OC03'));
            desc2.putInteger(cTID('ohIn'), -1);
            desc2.putEnumerated(cTID('ohLE'), cTID('STle'), cTID('LE03'));
            desc2.putEnumerated(cTID('ohEn'), cTID('STen'), cTID('EN00'));
            desc2.putBoolean(cTID('olCS'), false);
            desc2.putEnumerated(cTID('olEC'), cTID('STst'), cTID('ST00'));
            desc2.putEnumerated(cTID('olWH'), cTID('STwh'), cTID('WH01'));
            desc2.putEnumerated(cTID('olSV'), cTID('STsp'), cTID('SP04'));
            desc2.putEnumerated(cTID('olSH'), cTID('STsp'), cTID('SP04'));
            var list1 = new ActionList();
            var desc3 = new ActionDescriptor();
            desc3.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC00'));
            list1.putObject(cTID('SCnc'), desc3);
            var desc4 = new ActionDescriptor();
            desc4.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC19'));
            list1.putObject(cTID('SCnc'), desc4);
            var desc5 = new ActionDescriptor();
            desc5.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC28'));
            list1.putObject(cTID('SCnc'), desc5);
            var desc6 = new ActionDescriptor();
            desc6.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
            list1.putObject(cTID('SCnc'), desc6);
            var desc7 = new ActionDescriptor();
            desc7.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
            list1.putObject(cTID('SCnc'), desc7);
            var desc8 = new ActionDescriptor();
            desc8.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
            list1.putObject(cTID('SCnc'), desc8);
            desc2.putList(cTID('olNC'), list1);
            desc2.putBoolean(cTID('obIA'), false);
            desc2.putString(cTID('obIP'), "");
            desc2.putEnumerated(cTID('obCS'), cTID('STcs'), cTID('CS01'));
            var list2 = new ActionList();
            var desc9 = new ActionDescriptor();
            desc9.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC01'));
            list2.putObject(cTID('SCnc'), desc9);
            var desc10 = new ActionDescriptor();
            desc10.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC20'));
            list2.putObject(cTID('SCnc'), desc10);
            var desc11 = new ActionDescriptor();
            desc11.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC02'));
            list2.putObject(cTID('SCnc'), desc11);
            var desc12 = new ActionDescriptor();
            desc12.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC19'));
            list2.putObject(cTID('SCnc'), desc12);
            var desc13 = new ActionDescriptor();
            desc13.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC06'));
            list2.putObject(cTID('SCnc'), desc13);
            var desc14 = new ActionDescriptor();
            desc14.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
            list2.putObject(cTID('SCnc'), desc14);
            var desc15 = new ActionDescriptor();
            desc15.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
            list2.putObject(cTID('SCnc'), desc15);
            var desc16 = new ActionDescriptor();
            desc16.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC24'));
            list2.putObject(cTID('SCnc'), desc16);
            var desc17 = new ActionDescriptor();
            desc17.putEnumerated(cTID('ncTp'), cTID('STnc'), cTID('NC22'));
            list2.putObject(cTID('SCnc'), desc17);
            desc2.putList(cTID('ovNC'), list2);
            desc2.putBoolean(cTID('ovCM'), false);
            desc2.putBoolean(cTID('ovCW'), true);
            desc2.putBoolean(cTID('ovCU'), true);
            desc2.putBoolean(cTID('ovSF'), true);
            desc2.putBoolean(cTID('ovCB'), true);
            desc2.putString(cTID('ovSN'), "images");
            desc1.putObject(cTID('Usng'), sTID("SaveForWeb"), desc2);
            executeAction(sTID('export'), desc1, dialogMode);
        }
        ;
        // Òþ²Ø
        function step4(enabled, withDialog) {
            if (enabled != undefined && !enabled)
                return;
            var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
            var desc1 = new ActionDescriptor();
            var list1 = new ActionList();
            var ref1 = new ActionReference();
            ref1.putName(cTID('Lyr '), Name);
            list1.putReference(ref1);
            desc1.putList(cTID('null'), list1);
            executeAction(sTID('hide'), desc1, dialogMode);
        }
        ;
        step1(); // ÏÔÊ¾
        step2(); // Ñ¡Ôñ
        step3(); // µ¼³ö
        step4(); // Òþ²Ø
    }
    ;
    // 获取所有图层
    var AllLayers = [];
    var Get_layers = app.activeDocument.layers;
    /**
     * 遍历此文档所有图层
     * @param Get_layers
     */
    function ForEach_Layers(layersMainList) {
        for (var _i = 0, layersMainList_1 = layersMainList; _i < layersMainList_1.length; _i++) {
            var layers = layersMainList_1[_i];
            AllLayers.push(layers);
            if (layers.typename == "LayerSet") { // 如果当前图层是图层组，就遍历它里头的图层
                ForEach_Layers(layers.layers || []);
            }
        }
    }
    ForEach_Layers(Get_layers);
    function export_All(dirs) {
        for (var _i = 0, AllLayers_2 = AllLayers; _i < AllLayers_2.length; _i++) {
            var Layers_1 = AllLayers_2[_i];
            var Lname = Layers_1.name;
            var envName = Lname.replace(/背面|正面|前面|后面|背部/, '');
            // alert(Lname)
            if (ArrayHas(ColorList, envName)) {
                HideAllFlowers();
                // 需要印花
                if (is_Prints) {
                    // 是否是黑色印花
                    var isBlack = ArrayHas(PushBlackPrintsList, envName);
                    if (isBlack) {
                        ChooseBlackFlowers();
                        ShowLayer();
                    }
                    else {
                        ChooseWhiteFlowers();
                        ShowLayer();
                    }
                }
                if (is_Drew && Lname + "".match(/背部|后面|背面/)) {
                    HideLayer("LEE实物吊牌");
                }
                if (!is_ToPNG)
                    lookNameToSaveJPEG(Lname, dirs);
                else {
                    lookNameToSavePNG(Lname, dirs);
                }
            }
        }
    }
    var Class_AllLayers = [];
    // 首次遍历
    for (var _i = 0, AllLayers_1 = AllLayers; _i < AllLayers_1.length; _i++) {
        var Layers_2 = AllLayers_1[_i];
        var Lname = Layers_2.name, L_kind = Layers_2.kind;
        var envName = Lname.replace(/背面|正面|前面|后面|背部/, '');
        if (ArrayHas(ColorList, envName)) {
            Class_AllLayers.push(Layers_2);
            HideLayer(Lname);
            // alert(Lname)
        }
        if (L_kind == "LayerKind.NORMAL") {
            if (ArrayHas(["黑", "白", "中性灰"], envName)) {
                HideLayer(Lname);
            }
        }
    }
    if (is_Drew) {
        var env_ = is_ToPNG ? true : false;
        app.doAction("Dr_invoke_导出主图", "Build");
        is_ToPNG = false;
        var Path_0 = ___Dir + "\\主图";
        export_All(Path_0);
        $.sleep(1000);
        is_ToPNG = false;
        app.doAction("Dr_invoke_导出SKU", "Build");
        var Path_1 = ___Dir + "\\SKU";
        export_All(Path_1);
        is_ToPNG = true;
        app.doAction("Dr_invoke_导出透明", "Build");
        $.sleep(1000);
        var Path_2 = ___Dir + "\\透明";
        export_All(Path_2);
        $.sleep(2000);
        is_ToPNG = env_;
        app.doAction("Dr_invoke_导出主图", "Build");
    }
    else if (is_Drew_1200) {
        var Path_1 = ___Dir + "\\1200";
        is_ToPNG = false;
        export_All(Path_1);
    }
    else {
        export_All();
    }
    if (is_Prints)
        HideAllFlowers();
    function GetRandomly() {
        if (Class_AllLayers.length) {
            for (var i = 0; i < 1000; i++) {
                var For_INDEX = Math.floor(Math.random() * 10);
                if (Class_AllLayers.length > For_INDEX) {
                    return Class_AllLayers[For_INDEX].name;
                }
            }
        }
    }
    if (Class_AllLayers.length)
        ShowLayer(GetRandomly());
    var fileOut = new File("C:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\HC_Photoshop_Info.cc0");
    fileOut.open("a+", "TEXT", "????");
    fileOut.write(ID + "\n");
    fileOut.close();
}
exportMainImages();
