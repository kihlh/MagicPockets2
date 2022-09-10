function ShowLyr(Name){
    var idShw = charIDToTypeID( "Shw " );
    var desc4034 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var list178 = new ActionList();
            var ref332 = new ActionReference();
            var idLyr = charIDToTypeID( "Lyr " );
            ref332.putName( idLyr, Name );
        list178.putReference( ref332 );
    desc4034.putList( idnull, list178 );
executeAction( idShw, desc4034, DialogModes.NO );
}
