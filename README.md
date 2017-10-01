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

#### Parameters

* **query**

  (*object*) (Required)

  An object with the following keys:

  - `operation`: (*string*) Can take the following values: `select` for SELECT statements or `sp` for stored procedures.

* **cb**

  (*function*) (Required)

  Callback function that will be called at the end of the request. The recorset (object) or the error will be passed as parameter.


