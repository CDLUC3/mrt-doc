# ui: GET /api/presign-file/:object/:version/:file

## Positional Paramaters
- :object - ark
  - must be url encoded
- :version - version number (or ? for latest version)
- :file - file name
  - the file name should include the prefix "producer/" or "system/".
  - the file path should be urlencoded

## URL Parameters

- no_redirect
  - if "true", the presigned url will be sent in a json payload rather than in a redirect header
- :contentDisposition=attachement (optional)

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
- If 403, 404, 500, return


## Return status codes

- 200 if a signed URL is available and ?no_redirect=true
- 303 if a signed URL is available
- 403 if request cannot be satisfied
- 404 if file is not found
- 500 if a processing error occurred

## Return headers

- Set Location Header if 303 is returned
- [ ] Include Expires header to tell client when the link will expire?

## Return payload

- if ?no_redirect=true
```
{
  'url': 'https://s3_minio_or_wasabi_presigned_url'
}
```

Otherwise, return error page

- Redirect to 403 error page
- Redirect to 404 error page
- Redirect to 500 error page
