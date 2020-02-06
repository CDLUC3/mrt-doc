# storage: GET presign-obj-by-token/:token

## Positional Paramaters
- :token - uuid

## URL Parameters

## Request Headers

## Actions

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
