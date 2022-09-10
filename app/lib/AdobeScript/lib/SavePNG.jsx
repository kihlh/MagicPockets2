function Save_PNG(_FilePath){

var idsave = charIDToTypeID( "save" );
    var desc4328 = new ActionDescriptor();
    var idAs = charIDToTypeID( "As  " );
        var desc4329 = new ActionDescriptor();
        var idMthd = charIDToTypeID( "Mthd" );
        var idPNGMethod = stringIDToTypeID( "PNGMethod" );
        var idquick = stringIDToTypeID( "quick" );
        desc4329.putEnumerated( idMthd, idPNGMethod, idquick );
        var idPGIT = charIDToTypeID( "PGIT" );
        var idPGIT = charIDToTypeID( "PGIT" );
        var idPGIN = charIDToTypeID( "PGIN" );
        desc4329.putEnumerated( idPGIT, idPGIT, idPGIN );
        var idPNGf = charIDToTypeID( "PNGf" );
        var idPNGf = charIDToTypeID( "PNGf" );
        var idPGAd = charIDToTypeID( "PGAd" );
        desc4329.putEnumerated( idPNGf, idPNGf, idPGAd );
        var idCmpr = charIDToTypeID( "Cmpr" );
        desc4329.putInteger( idCmpr, 6 );
    var idPNGF = charIDToTypeID( "PNGF" );
    desc4328.putObject( idAs, idPNGF, desc4329 );
    var idIn = charIDToTypeID( "In  " );
    desc4328.putPath( idIn, new File( _FilePath) );
    var idDocI = charIDToTypeID( "DocI" );
    desc4328.putInteger( idDocI, 1552 );
    var idCpy = charIDToTypeID( "Cpy " );
    desc4328.putBoolean( idCpy, true );
    var idsaveStage = stringIDToTypeID( "saveStage" );
    var idsaveStageType = stringIDToTypeID( "saveStageType" );
    var idsaveSucceeded = stringIDToTypeID( "saveSucceeded" );
    desc4328.putEnumerated( idsaveStage, idsaveStageType, idsaveSucceeded );
executeAction( idsave, desc4328, DialogModes.NO );

}