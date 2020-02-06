# storage: POST presign-obj/:node/:key

## Positional Paramaters
- :node - storage node id
- :key - s3 object key

## URL Parameters
- :timeout
- format: (full|producer) default is full

## Request Headers

## Actions

## Return status codes
- 200 (payload contains token info)
- 404
  - obj is not found

## Return headers

## Return payload
