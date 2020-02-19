# ui: GET /api/presign-obj-by-token/:token

## Positional Paramaters
- :token - uuid

## URL Parameters

- None

## Request Headers

- [ ] Is any session/user information needed?

## Actions

- Call [inventory: GET presign-obj-by-token/:token](../inventory/presign-obj-by-token.md) to determine if object is available
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

## Return payload

If not ready (202)
```
{
  token: 'uuid',
  anticipated-size: 12345,
  anticipated-availability-time: '2009-06-15T13:45:30',
}
```

If expired (410)
```
{
  token: 'uuid',
  anticipated-size: 12345,
  expiration-time: '2009-06-15T13:45:30'
}
```
