# storage: GET presign-file/:node/:key

## Positional Paramaters
- :node - storage node id
- :key - s3 object key

## URL Parameters
- :timeout
- :contentType
- :contentDisposition=attachement (optional)
  - set Content-Disposition: attachment

## Request Headers

- [ ] Is any session/user information needed?

## Actions

- Locate object in storage
- Is storage note is S3 compatible?
  - Set the ContentType for the CloudObject to :contentType 
  - Create presigned URL
  - Construct return object
- Otherwise
  - Return 409 Conflict


## Return status codes
- 200 (payload contains signed url)
- 403
  - action not supported - stored in offline storage
- 404
  - obj is not found
- 409 (UNM or Pairtree/Docker)

## Return headers

## Return payload

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires

Return signed URL
```
{
  status: 200,
  url: 'https://...',
  expires: '2019-11-05T08:15:30-08:00',
  message: 'Presigned URL created'
}
```

Time format (set to PT):

Complete date plus hours and minutes:
   YYYY-MM-DDThh:mmTZD (eg 1997-07-16T19:20+01:00)

Redirect to download URL
```
{
  status: 409,
  message: 'Signed URL not supported, redirect to download URL'
}
```


403 Offline storage
```
{
   status: 403,
   message: 'file is in offline storage, request is not supported'
 }
```

404 Not found
```
{
   status: 404,
   message: 'file not found'
 }
```

500 Processing error
```
{
   status: 500,
   message: 'error details'
 }
```
