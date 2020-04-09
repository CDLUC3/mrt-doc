# storage: POST assemble-obj/:node/:object/:version

## Positional Paramaters
- :node - storage node id
- :object (ark)
- :version - optional

## URL Parameters
- format: (zip|tar|targz) default is zip
  - not exposed Merritt or Dryad UI
- content: (producer|full) default is full
  - not exposed in Merritt UI
  - Dryad defaults to producer
  - The producer option is only supported for version requests.  This parameter is ignored for object requests. 
- full-version: (yes|no) default is yes
  - if no, then only diffs are returned between versions
  - not exposed Merritt or Dryad UI
- assemble-node: node to use for object assembly (if other than default)
  - this would allow Dryad to have a unique retention policy
  - 7001 is our presumed default value
  - The storage service will determine if the node is allowable as an assemble-node
    - does it support presigned urls?
    - does it support content expiration policies?  (Note that Minio may not)

## Actions

- Generate token (uuid)
- Determine assembly node/bucket
- Create object assembly metadata
  - size-bytes
  - timeout
  - key
  - format
- If S3 compatible?
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
- 403
  - forbidden operation
- 500
  - processing error

## Return headers

## Return payload

Success 200
```
{
  status: 200,
  token: 'uuid',
  cloud-content-bytes: 12345,
  anticipated-availability-time: '2019-11-05T08:15:30-08:00',
  message: 'Request queued, use token to check status'
}
```

Not found 404
```
{
  status: 404,
  message: 'Object content is not found'
}
```

Forbidden 403 (Content on Glacier)
```
{
  status: 403,
   message: 'Object content is in offline storage, request is not supported'
}
```

Forbidden 403 (Illegal assembly node)
```
{
  status: 403,
   message: 'Invalid assembly node for presigned delivery'
}
```

Processing Error 500
```
{
  status: 500,
  message: 'error message'
}
```
