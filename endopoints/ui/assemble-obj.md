# ui: GET /api/assemble-obj/:object
# ui: GET /api/assemble-version/:object/:version

## Positional Paramaters
- :object - ark
  - must be url encoded
- :version - version number (optional - if absent return full object)

## URL Parameters
- format: (zip|tar|targz) default is zip
- content: (producer|full) default is full
  - Dryad uses "producer"
  
## Actions

Check user authorization to collection
- Check if embargo applies to object
- Check if user is required to accept terms and conditions
- Get node_number for the ark from the database
- Call [storage: POST assemble-obj/:node/:object/:version?format=:format&content=:content](../storage/presign-obj.md) to obtain a token for an object to be assembled
- If 200
  - Return payload containing the object token

## Return status codes
- 200 (payload contains token info)
- 404
  - object is not found
- 500
  - processing error

## Return headers

## Return payload

__Success 200__
```
{
  status: 200,
  token: 'uuid',
  cloud-content-byte: 12345,
  anticipated-availability-time: '2019-11-05T08:15:30-08:00',
  message: 'Request queued, use token to check status'
}
```

__Not found 404__
```
{
  status: 404,
  message: 'Object not found'
}
```

__Not supported (Glacier) 403__
```
{
  status: 403,
  message: 'Not supported'
}
```

__Processing Error 500__
```
{
  status: 500,
  message: 'error message'
}
```
