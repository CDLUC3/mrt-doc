# ui: GET /api/presign-obj/:object/:version

## Positional Paramaters
- :object - ark
  - must be url encoded
- :version - version number (or ? for latest version)

## URL Parameters
- format: (full|producer) default is full

## Request Headers

- [ ] Is any session/user information needed?

## Actions

Check user authorization to collection
- Check if embargo applies to object
- Check if user is required to accept terms and conditions
- Call [inventory: GET presign-obj/:object/:version](../inventory/presign-obj.md) to obtain storage key for object
- Parse return object to formulate storage request
- Call [storage: POST presign-obj/:node/:key?format=:format&timeout=:timeout](../storage/presign-obj.md) to obtain a token for an object to be assembled
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

Success 200
```
{
  status: 200,
  token: 'uuid',
  approximate-size-bytes: 12345,
  anticipated-availability-time: '2019-11-05T08:15:30-08:00',
  message: 'Request queued, use token to check status'
}
```

Not found 404
```
{
  status: 404,
  message: 'Object not found'
}
```

Processing Error 500
```
{
  status: 500,
  message: 'error message'
}
```
