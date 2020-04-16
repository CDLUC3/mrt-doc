# storage: GET presign-obj-by-token/:token

## Positional Paramaters
- :token - uuid

## URL Parameters

- timeout=:timeout
- assemble-node: node to use for object assembly (if other than default)
  - this would allow Dryad to have a unique retention policy
  - 7001 is our presumed default value

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
- 500 error occurred

## Return headers

## Return payload

If ready (200)
```
{
  status: 200,
  token: 'uuid',
  anticipated-size: 12345,
  url: 'https://...',
  message: 'Object is available'
}
```

If not ready  (202)
```
{
  status: 202
  token: 'uuid',
  anticipated-size: 12345,
  anticipated-availability-time: '2009-06-15T13:45:30',
  message: 'Object is not ready'
}
```

If not found (404)
```
{
  status: 404,
  message: 'Object not found'
}
```

Processing error (500)
```
{
  status: 500,
  message: 'error message'
}
```

Archive creation Processing error (500) 
```
{
  status: 500,
  token: 'uuid',
  message: 'error message'
}
```
