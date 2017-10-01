# A Node.js query interface for Microsoft SQL Server

This repository contains a Node.js interface that can query and paginate results from Microsoft SQL Server databases.

# Installation

```
npm install node-sql-query
```

# Usage

```
import {dbq,request} from 'node-sql-query'
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

Executes a parametrized SELECT or Stored Procedure.

For this to work you must have a JSON file named `services.json`.

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


