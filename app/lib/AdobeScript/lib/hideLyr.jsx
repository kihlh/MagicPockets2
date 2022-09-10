


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