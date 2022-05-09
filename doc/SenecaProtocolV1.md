# Seneca Protocol (version 1) <br/> Applications Microservice

Applications microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    connection: {
        type: 'tcp', // Microservice seneca protocol
        localhost: '0.0.0.0', // Microservice localhost
        port: 9002, // Microservice seneca port
    }
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'applications',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [ApplicationV1 class](#class1)
* [DataPage<ApplicationV1> class](#class2)
* [cmd: 'get_applications'](#operation1)
* [cmd: 'get_application_by_id'](#operation2)
* [cmd: 'create_application'](#operation3)
* [cmd: 'update_application'](#operation4)
* [cmd: 'delete_application_by_id'](#operation5)

## Data types

### <a name="class1"></a> ApplicationV1 class

Represents an application

**Properties:**
- id: string - unique application id
- name: string - application name
- description: string - application description
- product: string - product name
- copyrights: string - copyrights
- min_ver: number - minimum version
- max_ver: number - maximum version

### <a name="class2"></a> DataPage<ApplicationV1> class

Represents a paged result with subset of requested applications

**Properties:**
- data: [ApplicationV1] - array of retrieved Application page
- count: int - total number of objects in retrieved resultset

## Operations

### <a name="operation1"></a> Cmd: 'get_applications'

Retrieves a collection of applications according to specified criteria

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- filter: object - filter parameters
  - tags: [string] - (optional) list tags with topic names
  - status: string - (optional) application editing status
  - author: string - (optional) author name in any language 
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<ApplicationV1> - retrieved applications in page format

### <a name="operation2"></a> Cmd: 'get\_application\_by\_id'

Retrieves a single application specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- application_id: string - unique Application object id

**Returns:**
- err: Error - occured error or null for success
- result: ApplicationV1 - retrieved application, null if object wasn't found 

### <a name="operation3"></a> Cmd: 'create_application'

Creates a new application

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- application: ApplicationV1 - Application object to be created. If object id is not defined it is assigned automatically.

**Returns:**
- err: Error - occured error or null for success
- result: ApplicationV1 - created application object

### <a name="operation4"></a> Cmd: 'update_application'

Updates application specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- application_id: string - unique application id
- application: ApplicationV1 - application object with new values. Partial updates are supported

**Returns:**
- err: Error - occured error or null for success
- result: ApplicationV1 - updated application object 
 
### <a name="operation5"></a> Cmd: 'delete\_application\_by_id'

Deletes application specified by its unique id

**Arguments:** 
- correlation_id: string - (optional) unique id that identifies distributed transaction
- application_id: string - unique application id

**Returns:**
- err: Error - occured error or null for success

 