# Presigned URL Phased Implementation
- Phase 1 - Provide signed URL delivery for file objects
  - Retain the endpoint for direct object download.
  - Open Context would likely need to continue with this interface.
  - Dryad and Merritt UI always ask for signed URL for files.
  - When unsupported (Pairtree, UNM), redirect to the direct download URL.
  - Identify remaining Merritt Express clients to determine if signed URL's could substitute
- Phase 2 Question: Rather than assembling objects for download, deliver a reverse manifest object that permits client-side object assembly. See https://github.com/CDLUC3/mrt-doc/issues/233
- Phase 2 - Provide signed URL delivery for objects/versions
  - This makes all object/version downloads effectively async.
  - Deprecate email notification for objects/versions in Dryad.
  - Determine the need for email notification in the Merritt UI.
  - Client applications will poll the storage service to determine when a signed URL is ready.
  - Question: should a client application be able to register a callback to trigger when an object assembly is complete?
- Phase 3 - Queue all object/version requests in the storage service to make the service more resilient if bombarded with retrieval requests.
  - Requests to assemble and deliver objects/versions will be satisfied based on the capacity of the storage service.
- Phase 4 - Create a Merritt Retrieval API that is unbundled from the Merritt UI
  - If not already retired, migrate any remaining Express clients to this API.
  - Migrate other clients of the Merritt UI (such as Open Context) to this API
- Phase 5 - Extend Merritt API to convey ingest status information
  - While this is unrelated to the pre-signed work, this API could become a home to satisfy some of the API type requests that have been mentioned.

## Questions/TODO's

- [ ] Review the embargo processs.  Understand the actors affected by embargo(author, admin)
- [ ] Determine if the user acceptance step is still applicable and which actors are impacted.
- [ ] As the UI replaces actions formerly performed by Express, how is authorization passed into the UI?
- [ ] When redirecting to a non S3 compatible file URL, should that be a function of the UI/api, or should that be handled within the storage service?

## Phase 1

- [ui: GET presign-file/:object/:version/:file](ui/presign-file.md)
  - replaces express: dv/:version/:object/:file
  - replaces express dl/:object/:file
  - limits ui d/:object/:version/:file to non S3 objects
- [inventory: GET presign-file/:object/:version/:file](inventory/presign-file.md)
  - permit the UI to connect to inventory
  - question: could this endpoint perform any authorization tasks on behalf of the UI?
- [storage: POST presign-file/:node/:key?timeout=:timeout](storage/presign-file.md)

## Phase 2

- [ui: GET presign-obj/:object/:version?format=:format](ui/presign-obj.md)
  - replaces GET async/:object
  - replaces GET async/:object/:version
  - replaces GET asyncd/:object
  - replaces GET asyncd/:object/:version
  - replaces GET d/:object
  - replaces GET d/:object/:version
  - replaces GET d/:object/:version/\*file
  - replaces GET u/:object
  - replaces GET u/:object/:version
- [inventory: GET presign-obj/:object/:version](inventory/presign-obj.md)
- [storage: POST presign-obj/:node/:key?format=:format&timeout=:timeout](storage/presign-obj.md)
- [ui: GET presign-obj-by-token/:token](ui/presign-obj-by-token.md)
- [storage: GET presign-obj-by-token/:token](storage/presign-obj-by-token.md)

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
- api presign-obj-by-token/:token
  - replaces ui: presign-obj-by-token/:token

## Phase 5

## Documentation Note

As each phase is completed, the relevant endpoint items should be migrated to [README.md](README.md).  
