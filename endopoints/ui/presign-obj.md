# ui: GET presign-obj/:object/:version

## Positional Paramaters
- :object - ark
  - must be url encoded
- :version - version number (or ? for latest version)
- :file - file name
  - must be url encoded

## URL Parameters
- format: (full|producer) default is full

## Request Headers

- [ ] Is any session/user information needed?

## Actions

Check user authorization to collection
- Check if embargo applies to object
- Check if user is required to accept terms and conditions
- Call [inventory: GET presign-obj/:object/:version](../inventory/presign-obj.md) to obtain storage key for object
- Parse return object to formulate storage request
- Call [storage: POST presign-obj/:node/:key?format=:format&timeout=:timeout](../storage/presign-obj.md) to obtain a presigned URL for an existing object
- If 200
 - Parse response object to obtain the signed URL
- If 409 (UNM or Pairtree/Docker)
 - Construct a download URL to return as a simulated pre-signed url
 - [ ] Note: this download URL will never expire, is this a problem?

## Return status codes
- 200 (payload contains token info)
- 404
  - object is not found

## Return headers

## Return payload
