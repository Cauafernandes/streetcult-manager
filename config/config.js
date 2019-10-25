exports.mysqlOptions = {
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '',
    database : 'sc-manager',
    socketPath: false,
    connectionLimit: 5,
    typeCast: function castField( field, useDefaultTypeCasting ) {
        if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {
            var bytes = field.buffer();
            return( bytes[ 0 ] === 1 );
        } return( useDefaultTypeCasting() );
    }
};

exports.secretApiKey = "HailOdinAllFather";