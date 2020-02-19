# ui: GET /api/presign-file/:object/:version/:file

## Positional Paramaters
- :object - ark
  - must be url encoded
- :version - version number (or ? for latest version)
- :file - file name
  - must be url encoded

## URL Parameters

- None

## Request Headers

- [ ] Is any session/user information needed?

## Actions

- Check user authorization to collection
- Check if embargo applies to object
- Check if user is required to accept terms and conditions
- Call [inventory: GET presign-file/:object/:version/:file](../inventory/presign-file.md) to obtain storage key for object
- Parse return object to formulate storage request
- Call [storage: POST presign-file/:node/:key?timeout=:timeout](../storage/presign-file.md) to obtain a presigned URL for an existing object
- If 200
  - Parse response object to obtain the signed URL
- If 409 (UNM or Pairtree/Docker)
  - Construct a download URL to return as a simulated pre-signed url
  - [ ] Note: this download URL will never expire, is this a problem?


## Return status codes

- 303 if a signed URL is available
- 404 if file is not found

## Return headers

- Set Location Header if 303 is returned
- [ ] Include Expires header to tell client when the link will expire?

## Return payload

- No payload
