function Select(Name){
    var idslct = charIDToTypeID( "slct" );
    var desc4134 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref369 = new ActionReference();
        var idLyr = charIDToTypeID( "Lyr " );
        ref369.putName( idLyr, Name);
    desc4134.putReference( idnull, ref369 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc4134.putBoolean( idMkVs, false );
    var idLyrI = charIDToTypeID( "LyrI" );
        var list210 = new ActionList();
        list210.putInteger( 5 );
    desc4134.putList( idLyrI, list210 );
executeAction( idslct, desc4134, DialogModes.NO );

}