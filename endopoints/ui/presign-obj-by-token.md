# ui: GET /api/presign-obj-by-token/:token

## Positional Paramaters
- :token - uuid

## URL Parameters

- no_redirect
  - if "true", the presigned url will be sent in a json payload rather than in a redirect header
- filename
  - name to assign to downloaded file

## Request Headers

- [ ] Is any session/user information needed?

## Actions

- Call [storage: GET presign-obj-by-token/:token](../storage/presign-obj-by-token.md) to determine if object is available
- Parse token object

## Return status codes
- 202 (payload contains token info)
  - not ready
- 303 (with redirect header)
- 404
  - url is not found
- 410 (payload contains token info)
  - url is expired

## Return headers
- Set Location Header if 303 is returned

## Return payload
No payload if 303 is returned

If not ready (202)
```
{
  status: 202,
  token: 'uuid',
  anticipated-size: 12345,
  anticipated-availability-time: '2009-06-15T13:45:30',
  message: 'object is not ready'
}
```

If expired (410)
```
{
  status: 410,
  token: 'uuid',
  anticipated-size: 12345,
  expiration-time: '2009-06-15T13:45:30',
  message: 'signed url has expired'
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
