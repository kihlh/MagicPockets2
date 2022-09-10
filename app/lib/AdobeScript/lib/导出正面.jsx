function forEach (IputArray,CallBack){
    for (var index = 0; index < IputArray.length; index++) {
        var data=IputArray[index];
            CallBack(data,index)
    }
}
function HideLyr(Name){
var idHd = charIDToTypeID( "Hd  " );
    var desc4113 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var list203 = new ActionList();
            var ref362 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            ref362.putName( idLyr, Name );
        list203.putReference( ref362 );
    desc4113.putList( idnull, list203 );
executeAction( idHd, desc4113, DialogModes.NO );
}

var L_NameList = ['棕色正面', '杏色正面', '驼色正面', '木炭灰正面', '抹茶绿正面', '黑色正面', '薄荷色正面', '白色正面'];

forEach(L_NameList,function(name){HideLyr(name)})