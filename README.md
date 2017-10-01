# A Node.js query interface for Microsoft SQL Server

This repository contains a Node.js interface that can query and paginate results from Microsoft SQL Server databases.

It internally handles the **connection establishment** to the database and the **connection pools** so that many queries can be executed simultaneously.

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

Be careful when implementing this method in your public Node.js because any SQL sentence can be excuted through this totally exposing your DB.

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

Executes a parametrized SELECT statement.

Given that this method only executes SELECT statements, you can stay reassured that clients will only be able to read data from the DB and not modify it as with the previous method.

#### Parameters

* **query**

  (*object*) (Required)

  An object with the following keys:

  - `columns`: (*array*)(Required) An Array with the names of the columns.
  - `schemaSyntax`: (*string*)(Required)
  - `whereSyntax`: (*string*)
  - `orderbyColumns`: (*array*)
  - `language`: (*string*) Refer to SQL Server `SET LANGUAGE` command for the available options.
  - `dbConnConfig`: (*object*)(Required) An object with the connection parameters. Refer to [`node-mssql` general configuration](https://github.com/patriksimek/node-mssql#general-same-for-all-drivers)
  - `pageSize`: (*string*)
  - `offset`: (*string*)


  The resultant SQL query will be composed like this:

  `SET LANGUAGE [language] SELECT [columns] FROM [schemaSyntax] WHERE [whereSyntax] ORDER BY [orderbyColumns]`

  The `pageSize` (number of records per page) and `offset` (number of records to skip) parameters allows for paging the results.

* **cb**

  (*function*) (Required)

  Callback function that will be called at the end of the request. The recorset (object) or the error will be passed as parameter.


