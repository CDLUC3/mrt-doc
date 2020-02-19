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

## Return headers

## Return payload

```
{
  token: 'uuid',
  anticipated-size: 12345,
  anticipated-availability-time: '2009-06-15T13:45:30'
}
```
