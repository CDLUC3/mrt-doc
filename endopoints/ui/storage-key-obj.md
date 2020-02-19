# ui: GET /api/get-storage-key-obj/:object/:version

## Positional Paramaters
- :object - ark
- :version - version number (or ? for latest version)

## URL Parameters

- None

## Request Headers

- [ ] Are any headers needed?

## Actions

- [ ] Are there any other useful actions that could be pulled from the UI into this action?
- Query database to map object/ark/version to node_id/key.
- [ ] The size of the object should be computed to set an anticipated availability date.  Would it be helpful to pass this on to storage?
  - David, if we do not compute the size at this time, how will storage perform this calculation without access to the database?

## Return status codes
- 200 (payload contains node id and key)
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
  node_id: 1111,
  key: "abcdefghijklmnop",
  approximate-size-bytes: 12345,
  message: ''
}
```

Not found 404
```
{
  status: 404,
  message: 'File not found'
}
```

Processing error (500)
```
{
  status: 500,
  message: 'error message'
}
```
