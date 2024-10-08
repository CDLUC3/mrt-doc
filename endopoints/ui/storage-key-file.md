# ui: GET /api/get-storage-key-file/:object/:version/:file

The purpose of this action is to keep the resolution of keys within an api layer rather than placing a complex query in the client/UI code.

Note: this is similar to the "versions" endpoint that currently resides in the inventory service.

## Positional Paramaters
- :object - ark
- :version - version number (or ? for latest version)
- :file - file name

## URL Parameters

- None

## Request Headers

- [ ] Are any headers needed?

## Actions

- [ ] Are there any other useful actions that could be pulled from the UI into this action?
- Query database to map object/ark/version to node_id/key.

```
if (version > 0) {
  versionsql = " AND v.number <= " + version;
}

SELECT
  n.NUMBER AS node,
  n.logical_volume,
  o.version_number,
  o.md5_3,
  f.billable_size,
  v.ark,
  v.NUMBER AS key_version,
  f.pathname
FROM
  inv_versions AS v,
  inv_nodes_inv_objects AS NO,
  inv_nodes AS n,
  inv_files AS f,
  inv_objects AS o
WHERE
  v.ark='%arkS%'
  %versionsql%
  AND f.pathname='%fileName%'
  AND o.id=v.inv_object_id
  AND NO.role='primary'
  AND f.inv_version_id=v.id
  AND NO.inv_object_id=v.inv_object_id
  AND n.id=NO.inv_node_id
  AND f.billable_size > 0"
```

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
