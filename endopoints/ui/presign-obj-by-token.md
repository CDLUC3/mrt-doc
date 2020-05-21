# ui: GET /api/presign-obj-by-token/:token

## Positional Paramaters
- :token - uuid

## URL Parameters

- no_redirect
  - if "true", the presigned url will be sent in a json payload rather than in a redirect header
  - Note that both the Merritt UI and Dryad UI set this to true
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

__If ready (200) and no_redirect=true__
```
{
  status: 200,
  message: "Payload contains token info",
  token: 'uuid',
  cloud-content-byte: 12345,
  url: _presigned url_
}
```

__If not ready (202)__
```
{
  status: 202,
  token: 'uuid',
  anticipated-size: 12345,
  anticipated-availability-time: '2009-06-15T13:45:30',
  message: 'object is not ready'
}
```

__If expired (410)__
```
{
  status: 410,
  token: 'uuid',
  anticipated-size: 12345,
  expiration-time: '2009-06-15T13:45:30',
  message: 'signed url has expired'
}
```

__Not found 404__
```
{
  status: 404,
  message: 'Object not found'
}
```

__Processing Error 500__
```
{
  status: 500,
  message: 'error message'
}
```
