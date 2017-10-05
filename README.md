# A Node.js query interface for Microsoft SQL Server

This repository contains a Node.js interface that can query and paginate results from Microsoft SQL Server databases.

It internally handles the **connection establishment** and the **connection pools** so that many queries can be executed simultaneously.

# Installation

```
npm install node-sql-query
```

# Usage

```
const nsq = require ( 'node-sql-query' )()
, connConfig = {
    "user": "sa",
    "password": "Sqlserver0",
    "server": "localhost\\SQLEXPRESS",
    "database": "vsegbas",
    "port": 55857,
    "requestTimeout": 600000
}

nsq.request ( 
  "SELECT getdate() FROM sys.tables"
  , connConfig
  , function ( recorset ) { console.log(recorset) }
)

nsq.dbq ({
      "columns": [
        "clientes.cli_id",
        "cli_apellido1",
        "cli_apellido2"
      ],
      "schemaSyntax": "polizas inner join clientes on polizas.cli_id=clientes.cli_id",
      "dbConnConfig": connConfig,
      "orderbyColumns": [
        "clientes.cli_id"
      ],
      "offset": 4,
      "pageSize": 4,
      "language": "spanish"
}, function ( recorset ) { 
    console.log(recorset) 
})
```

# Methods

### .request(**sqlSyntax**,**connConfig**,**cb**)

Executes a SQL command.

#### Parameters

* **sqlSyntax**

  (*string*) (Required)

  The SQL command to pass to the database.

* **connConfig**

  (*object*) (Required)

  An object with the connection parameters. Refer to [`node-mssql` general configuration](https://github.com/patriksimek/node-mssql#general-same-for-all-drivers)

* **cb**

  (*function*) (Required)

  Callback function that will be called at the end of the request. The recorset (object) or the error will be passed as parameter.


### .dbq(**query**,**cb**)

Executes a parametrized SELECT or INSERT or UPDATE or DELETE or Stored Procedure statement.

#### Parameters

* **query**

  (*object*) (Required)

  An object with the following keys:

  - `operation`: (*string*) Posible values are: `select`, `insert`, `update`, `delete`, `sp`.
  - `language`: (*string*) Refer to SQL Server `SET LANGUAGE` command for the available options.
  - `dbConnConfig`: (*object*)(Required) An object with the connection parameters. Refer to [`node-mssql` general configuration](https://github.com/patriksimek/node-mssql#general-same-for-all-drivers)
  - `columns`: (*array*)(Required) An Array with the names of the columns.
  - `schemaSyntax`: (*string*)(Required)
  - `whereSyntax`: (*string*)

  Only available for `select` operation:

  - `orderbyColumns`: (*array*)
  - `pageSize`: (*string*)
  - `offset`: (*string*)

  Only available for `insert` or `update` operations:

  - `values`: (*array*) Must have the same length as `columns`. Values that will be assigned to each column.
  
  Only available for `sp` operation:

  - `sp_name`: (*string*) The name of the Stored Procedure followed by the parameters.


  #### The resultant SQL queries will be composed like this:

  **SELECT**

  `SET LANGUAGE [language] SELECT [columns] FROM [schemaSyntax] WHERE [whereSyntax] ORDER BY [orderbyColumns]`

  The `pageSize` (number of records per page) and `offset` (number of records to skip) parameters allows for paging the results.

  **INSERT**

  `SET LANGUAGE [language] INSERT INTO [schemaSyntax] ( [columns] ) VALUES ( [values] )`

  **UPDATE**

  `SET LANGUAGE [language] UPDATE [schemaSyntax] SET ( [columns[0]] = [values[0]], [columns[1]] = [values[1]], ... ) WHERE [whereSyntax]`

  **DELETE**

  `SET LANGUAGE [language] DELETE [schemaSyntax] WHERE [whereSyntax]`

  **SP**

  `SET LANGUAGE [language] EXEC [sp_name]`


* **cb**

  (*function*) (Required)

  Callback function that will be called at the end of the request. The recorset (object) or the error will be passed as parameter.


