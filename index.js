require ( './dbQuery.js' )()

module.exports = function () {
	const that = this
	this.request = request
	this.dbq = function (
		params
		, cb
	) {
		try {
			const { 
			  operation
			  , columns
			  , schemaSyntax
			  , whereSyntax
			  , orderbyColumns
			  , values
			  , offset
			  , pageSize
			  , dbConnConfig
			  , language
			  , sp_name
			} = params
			/*
			, dbConnConfig = services.databases[dbID]
			if ( typeof dbConnConfig == "undefined" ) {
				cb ( `'dbId' ${dbID} not valid.` )
				return
			}
			*/
			if ( !operation || operation == "select" ) {
				let sqlSyntax = ` SELECT `
				if ( orderbyColumns ) sqlSyntax += `ROW_NUMBER() OVER(ORDER BY ${orderbyColumns}) AS _ROW_NUMBER,`
				sqlSyntax += `${columns} FROM ${schemaSyntax}`
				if ( whereSyntax ) sqlSyntax += ` WHERE ${whereSyntax}`
				//if ( orderbyColumns ) sqlSyntax += ` ORDER BY ${orderbyColumns}`
				if ( orderbyColumns && pageSize && ( typeof offset != 'undefined' ) && orderbyColumns.length ) {
					//if (isNaN(offset)) offset=0
					sqlSyntax = `SELECT * FROM (${sqlSyntax}) as tbl WHERE _ROW_NUMBER BETWEEN ${offset+1}  AND ${offset+pageSize} ORDER BY _ROW_NUMBER`
					/*
					sqlSyntax += ` OFFSET ${offset} ROWS `
					if ( pageSize ) {
						sqlSyntax += ` FETCH NEXT ${pageSize} ROWS ONLY `
						console.log('paging')
					}
					*/
				}
				//console.log(sqlSyntax)
				sqlSyntax = `${language?"SET LANGUAGE "+language:""} ${sqlSyntax}`
				request ( sqlSyntax ,dbConnConfig, (recordset) => {
					recordset.forEach ( rec => {
						delete rec['_ROW_NUMBER']
					})
					cb (recordset)
				})
			} else if ( operation == "sp" ) {
				let sqlSyntax = `${language?"SET LANGUAGE "+language:""} EXEC ${sp_name}`
				request ( sqlSyntax ,dbConnConfig,  cb )
			} else if ( operation == "insert" ) {
				const vals = values.map ( val => `'${val.replace(/\'/gi,"''")}'` )
				let sqlSyntax = `${language?"SET LANGUAGE "+language:""} INSERT INTO ${schemaSyntax} (${columns}) VALUES (${vals})`
				request ( sqlSyntax ,dbConnConfig, (recordset) => {
					//cb (recordset)
					cb (recordset)
				})
			} else if ( operation == "update" ) {
				const vals = values.map ( val => `'${val.replace(/\'/gi,"''")}'` )
				, assigns = columns.map ( (column,i) => `${column} = ${vals[i]}` )
				let sqlSyntax = `${language?"SET LANGUAGE "+language:""} UPDATE ${schemaSyntax} SET ${assigns} WHERE ${whereSyntax}`
				request ( sqlSyntax ,dbConnConfig, (recordset) => {
					//cb (recordset)
					cb (recordset)
				})
			} else if ( operation == "delete" ) {
				let sqlSyntax = `${language?"SET LANGUAGE "+language:""} DELETE ${schemaSyntax} WHERE ${whereSyntax}`
				request ( sqlSyntax ,dbConnConfig, (recordset) => {
					//cb (recordset)
					cb (recordset)
				})
			} else {
				cb ( "'operation' not valid.")
				return
			}
		} catch(err) {
			cb ( err )
			return
		}
	}
	this.ping = function ( dbConnConfig, cb ) {
		const sqlSyntax = "SELECT '1'"
		if ( typeof dbConnConfig == "undefined" ) {
			cb ( `'dbId' ${dbID} not valid.` )
			return
		}
		request ( sqlSyntax ,dbConnConfig, (recordset) => {
			cb (recordset)
		})
	}
	return this
}
