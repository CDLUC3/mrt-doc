# storage: GET presign-obj-by-token/:token

## Positional Paramaters
- :token - uuid

## URL Parameters

- None

## Request Headers

- [ ] Is any session/user information needed?

## Actions

- Locate object
- Read Metadata
- If object is ready, the following fields should be available
  - url
  - expiration
- if expired, return expired token object
- if ready, return token object with url
- if not ready, return token object
  - if the anticipated ready date is in the past, update the anticipated date

## Return status codes
- 200 (payload contains token info with signed url)
- 202 (payload contains token info)
  - not ready
- 404
  - url is not found
- 410 (payload contains token info)
  - url is expired

## Return headers

## Return payload

If ready (200)
```
{
  token: 'uuid',
  anticipated-size: 12345,
  url: 'https://...',
}
```

If not ready  (202)
```
{
  token: 'uuid',
  anticipated-size: 12345,
  anticipated-availability-time: '2009-06-15T13:45:30'
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
