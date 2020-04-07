# storage: POST assemble-obj/:node/:object/:version

## Positional Paramaters
- :node - storage node id
- :object (ark)
- :version - optional

## URL Parameters
- format: (zip|tar|targz) default is zip
  - not exposed Merritt or Dryad UI
- content: (producer|full) default is all
  - not exposed in Merritt UI
  - Dryad defaults to producer
- full-version: (yes|no) default is yes
  - if no, then only diffs are returned between versions
  - not exposed Merritt or Dryad UI
- assemble-node: node to use for object assembly (if other than default)
  - this would allow Dryad to have a unique retention policy

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
## Questions/Discussions
Instead of using the assemble-node let the UI control the input :node

Since an invalid version number may be used - a specific version may not be available - this covers both object and version.

- 404 - Change _obj is not found_ to _Object content is not found_ 

Add back in the presign errors
- 403
  - Content is in offline storage, request is not supported
- 409
  - Signed URL not supported
  
I'm thinking that maybe _approximate-size-bytes_ should instead be _cloud-content-bytes_
This could give an accurate value and avoid questions of efficiancy of zip and gunzip compression etc. _cloud-content-bytes_ should be accurate and hopefully on the upper end of what would be returned for a container file.
