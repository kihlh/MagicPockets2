#target photoshop
//
// 下个文件.jsx
//

//
// Generated Wed Jun 01 2022 10:48:25 GMT+0800
//

cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };

//
//==================== 下一个文件 ==============
//
function () {
  // Ñ¡Ôñ
  function step1(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putOffset(cTID('Dcmn'), 1);
    desc1.putReference(cTID('null'), ref1);
    desc1.putInteger(cTID('DocI'), 226);
    executeAction(sTID('select'), desc1, dialogMode);
  };

  step1();      // Ñ¡Ôñ
};

// EOF

"下个文件.jsx"
// EOF
