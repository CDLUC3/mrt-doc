## Phase 1

- ui: GET [presign-file/:object/:version/:file](ui/presign-file.md)
  - replaces express: dv/:version/:object/:file
  - replaces express dl/:object/:file
  - limits ui d/:object/:version/:file to non S3 objects
- inventory: GET [presign-file/:object/:version/:file](inventory/presign-file.md)
  - permit the UI to connect to inventory
  - question: could this endpoint perform any authorization tasks on behalf of the UI?
- storage: POST [presign-file/:node/:key?timeout=:timeout](storage/presign-file.md)

## Phase 2

- ui: GET [presign-obj/:object/:version/:file?format=:format](ui/presign-obj.md)
  - replaces GET async/:object
  - replaces GET async/:object/:version
  - replaces GET asyncd/:object
  - replaces GET asyncd/:object/:version
  - replaces GET d/:object
  - replaces GET d/:object/:version
  - replaces GET d/:object/:version/\*file
  - replaces GET u/:object
  - replaces GET u/:object/:version
- inventory: GET [presign-obj/:object/:version/:file](inventory/presign-obj.md)
- storage: POST [presign-obj/:node/:key?format=:format&timeout=:timeout](storage/presign-obj.md)
- ui: GET [presign-obj-by-token/:token](ui/presign-obj-by-token.md)
- storage: GET [presign-obj-by-token/:token](storage/presign-obj-by-token.md)

## Phase 3

- On user request, storage posts object assembly request + token to zookeeper
- As capacity permits, storage reads object assembly request + token from zookeeper and processes request

## Phase 4

- api: presign-file/:object/:version/:file
  - replaces ui: [presign-file/:object/:version/:file]
- api download-file/:object/:version/:file
  - replaces ui: d/:object/:version/:file  
- api presign-obj/:object/:version/:file?format=:format
  - replaces ui: presign-obj/:object/:version/:file?format=:format  



-
