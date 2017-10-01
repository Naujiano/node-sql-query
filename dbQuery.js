const sql = require('mssql')
		sql.on('error', err => {
		    // ... error handler 
			console.log(err);
		})

module.exports = function() { 
	var connections = [], connected = false, connecting = false
	this.request = function (sqlSyntax,connConfig,cb) {
		const connection = connWithConfig (connConfig)
		if ( connection.connected ) {
			getData (sqlSyntax,connection,cb)
		} else if ( connection.connecting ) {
			setTimeout ( function(){request ( sqlSyntax,connConfig,cb)}, 50 )
		} else {
			//console.log('new conn')
		  connect ( connConfig, function (connection,err) {
		  	if (!err) {
		  	  request ( sqlSyntax,connConfig,cb)
		  	}
		  	else {
			  console.log(err)
		  	  cb(err);
		  	}
		  } )
		}

	}
	function connect (connConfig,cb) {
		/*
		const _connected = connection ? connection._connected : connection
		_connecting = connection ? connection._connecting : connection
		*/
		const connection = connWithConfig (connConfig)
		if ( connection.connected ) { cb(connection,false); return }
		if ( connection.pool ) { console.log('connection.pool');connection.pool.close() }
		connection.connected = false
		connection.connecting = true
		connection.pool = new sql.ConnectionPool(connConfig, err => {
		    // ... error checks 
			if ( err ) {
				console.log(err)
				cb(false,err);
				return;
			}
			connection.connected = true
			connection.connecting = false
			cb(connection,false)
		})
	}
	function connWithConfig (connConfig) {
		const connFiltered = connections.filter ( connection => connection.config == connConfig )
		if ( connFiltered.length ) return connFiltered[0] 
		const connection = {connected: false,connecting: false, config: connConfig}
		connections.push ( connection )
		return connections[connections.length-1]
	}
	function getData (sqlSyntax,connection,cb) {
			new sql.Request(connection.pool).query(sqlSyntax, (err, result) => {
			//sql.close()
			    // ... error checks 
			if ( err ) {
				console.log(err)
				cb([{Error:err.	originalError.info.message,SQL:sqlSyntax}]);
				return;
			}
				//cb([{Error:'err.originalError.info.message',SQL:'sqlSyntax'}]);
			    cb(result.recordset)
			})

			// Stored Procedure 
			 /*
			new sql.Request()
			.input('input_parameter', sql.Int, value)
			.output('output_parameter', sql.VarChar(50))
			.execute('procedure_name', (err, result) => {
			    // ... error checks 
			
			    console.dir(result)
			})
			*/
	}
}
