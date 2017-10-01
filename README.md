# A Node.js query interface for Microsoft SQL Server databases

This repository contains a Node.js interface that can query and paginate results from Microsoft SQL Server databases.

# Installation

```
npm install node-sql-query
```

# Usage

```
import {dbq,ping,request} from 'node-sql-query'
```

# Methods

### .dbq(**query**,**cb**)

Adds/resets the query and parses it

#### Parameters

* **query**

  (*object*) (Required)

* **cb**

  (*function*) (Required)

  Callback function that will be called at the end of the request. The recorset (object) or the error will be passed as parameter.


### .request(**sqlSyntax**,**connConfig**,**cb**)

Adds/resets the query and parses it

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

