# storage: POST presign-obj/:node/:key

## Positional Paramaters
- :node - storage node id
- :key - s3 object key

## URL Parameters
- :timeout
- format: (zip|tar|tag.gz) default is ???
- content: (producer|all) default is all
- scope: (object|version)
- assembly: (embed|link)
  - this is to capture our idea of a container of links
- :size-bytes - used to estimate the time required to assemble the object
  - [ ] David, if this is not provided, what would need to happen to make this calculation?

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

## Return headers

## Return payload

```
{
  token: 'uuid',
  approximate-size-bytes: 12345,
  anticipated-availability-time: '2019-11-05T08:15:30-08:00'
}
```
