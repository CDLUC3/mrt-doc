# ui: GET presign-obj/:object/:version/:file

## Positional Paramaters
- :object - ark
  - must be url encoded
- :version - version number (or ? for latest version)
- :file - file name
  - must be url encoded

## URL Parameters
- format: (full|producer) default is full

## Request Headers

## Actions

## Return status codes
- 200 (payload contains token info)
- 404
  - object is not found

## Return headers

## Return payload
