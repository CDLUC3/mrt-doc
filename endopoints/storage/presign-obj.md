# storage: POST assemble-obj/:node/:object/:version

## Positional Paramaters
- :node - storage node id
- :object 
- :version - optional

## URL Parameters
- format: (zip|tar|taggz) default is zip
- content: (producer|full) default is all

## Request Headers

- [ ] Is any session/user information needed?

## Actions

- Generate token (uuid)
- Is assembly area S3 or cloudhost (Pairtree in Docker)?
- Create object assembly metadata
  - size-bytes
  - timeout
  - key
  - format
- If S3?
  - Create empty object using token
  - Set Object Metadata fields
- If Cloudhost?
  - Create empty object using the token
  - Find a mechanism to set metadata fields
- Construct token object
- Start a new thread to process the request
  - In Phase 3, this will be done by adding the request to Zookeeper
- Return token object

## Return status codes
- 200 (payload contains token info)
- 404
  - obj is not found
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
