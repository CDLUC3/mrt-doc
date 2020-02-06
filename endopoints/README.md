# Merritt Endpoints

## [mrt_replic](https://github.com/CDLUC3/mrt-replic/blob/master/replication-src/src/main/java/org/cdlib/mrt/replic/basic/app/jersey/replic/JerseyReplication.java)

- GET state
  - Get state information about a specific node
- GET status
  - Get state information about a specific node
- GET content/{objectid}/{versionid}/{fileid}
- GET manifest/{objectid}
- POST service/{setType}
  - Start, Shutown, Pause
- DELETE invdelete/{nodeS}/{objectIDS}
- DELETE deletesecondary/{objectIDS}
- POST add/{objectIDS}
- POST addinv/{objectIDS}
- POST replace/{nodeS}/{objectIDS}
- POST cleanup
- POST addmap/{collectionIDS}/{nodeS}
- GET match/{sourceNode}/{targetNode}/{objectid}
- GET match/{sourceNode}/{objectid}

#### No longer applicable
- DELETE delete/{nodeS}/{objectIDS}
  - Commented out

## [mrt_store](https://github.com/CDLUC3/mrt-store/blob/master/store-src/src/main/java/org/cdlib/mrt/store/app/jersey/store/JerseyStorage.java)

- GET state
- GET ping
- GET state/{nodeid}
- GET node/{objectid}
- GET state/{nodeids}/{objectid}
- GET state/{nodeid}/{objectid}/{versionid}
- GET state/{nodeid}/{objectid}/{versionid}/{fileid}
- GET fixity/{nodeid}/{objectid}/{versionid}/{fileid}
- GET fixity/{nodeid}/{objectid}
- GET content/{nodeid}/{objectid}/{versionid}/{fileid}
- GET cloudcontainer/{containername}
- POST add/{nodeid}/{objectid}
- POST addold/{nodeid}/{objectid}
- POST add/{nodeid}/{objectid}
- POST copy/{node}/{objectid}
- POST copy/{sourceNode}/{targetNode}/{objectid}
- POST update/{nodeid}/{objectid}
- POST update/{nodeid}/{objectid}
- DELETE content/{nodeid}/{objectid}/{versionid}
- DELETE content/{nodeid}/{objectid}
- GET content/{nodeid}/{objectid}/{versionid}
- GET stream/{nodeid}/{objectid}/{versionid}
- GET producer/{nodeid}/{objectid}/{versionid}
- GET producer/{nodeid}/{objectid}
- GET content/{nodeid}/{objectid}
- GET stream/{nodeid}/{objectid}
- GET manifest/{nodeid}/{objectid}
- POST async/{nodeid}/{objectid}
- POST async/{nodeid}/{objectid}/{versionid}
- POST producerasync/{nodeid}/{objectid}/{versionid}
- POST producerasync/{nodeid}/{objectid}

## [mrt_audit](https://github.com/CDLUC3/mrt-audit/blob/master/audit-src/src/main/java/org/cdlib/mrt/audit/app/jersey/fixity/JerseyFixity.java)

- GET /state
- GET /status
- GET url/{url}
- POST service/{setType}
- POST update/{auditid}
- POST cleanup
- PUT service
- GET report
- POST test
- POST queue
- POST update
- POST report

## [mrt_ingest](https://github.com/CDLUC3/mrt-ingest/blob/master/ingest-src/src/main/java/org/cdlib/mrt/ingest/app/jersey/ingest/JerseyIngest.java)
- GET state
- GET help
- POST update-object
- POST update-object/{scheme}/{shoulder}/{objectid}
- POST submit-object
- POST submit-object/{scheme}/{shoulder}/{objectid}
- POST request-identifier

### [mrt-ingest async](https://github.com/CDLUC3/mrt-ingest/blob/master/ingest-src/src/main/java/org/cdlib/mrt/ingest/app/jersey/post/JerseyPost.java)

- GET state
- GET help
- GET status
- GET queue
- POST {request: update}
- POST {request: update}/{scheme}/{shoulder}/{objectid}
- POST {request: submit|add}
- POST {request: submit|add}/{scheme}/{shoulder}/{objectid}

## [mrt_inventory](https://github.com/CDLUC3/mrt-inventory/blob/master/inv-src/src/main/java/org/cdlib/mrt/inv/app/jersey/inv/JerseyInv.java)

- GET state
- POST service/{setType}
- POST filenode/{nodeNum}
- GET select/{sql}
- DELETE object/{objectIDS}
- GET manurl/{objectIDS}
- GET versions/{objectIDS}
- GET versions/{objectIDS}/{versionS}
- POST primary/{objectIDS}/{ownerIDS}/{localIDs}
- POST primary
- POST localafterto/{afterS}/{toS}
- DELETE primary/{objectIDS}
- GET primary/{ownerIDS}/{localID}
- GET local/{objectIDS}
- POST process
- POST add
- POST addzoo

[mrt-dashboard](https://github.com/CDLUC3/mrt-dashboard/blob/master/config/routes.rb)

- GET object/recent(.:format)
  - object#recent
- GET feeds/recent
  - feeds#recent
- GET show/view/\*id
  - show#view
- GET show/\*id
  - show#show
- GET /
  - home#index
- GET login
  - user_sessions#login
- POST login
  - user_sessions#login_post
- GET logout
  - user_sessions#logout
- GET guest_login
  - user_sessions#guest_login
- GET m/:group
  - collection#index
- GET s/:group
  - collection#search_results
- GET async/:object
  - object#async
- GET async/:object/:version
  - version#async
- GET asyncd/:object
  - lostorage#direct
- GET asyncd/:object/:version
  - lostorage#direct
- GET m/:object
  - object#index
- GET m/:object/:version
  - version#index
- GET d/:object
  - object#download
- GET d/:object/:version
  - version#download
- GET d/:object/:version/\*file
  - file#download
- GET u/:object
  - object#download_user (producer files only)
- GET u/:object/:version
  - version#download_user (producer files only)
- GET dm/:object
  - object#download_manifest
- GET s/:group
  - collection#search_results
- GET a/:group
  - object#add
- POST object/upload
  - This is not in routes.rb, how does the mapping occur?

## [mrt-sword](https://github.com/CDLUC3/mrt-sword/blob/master/sword-src/src/main/webapp/WEB-INF/web.xml#L115-L138)

- /servicedocument/*
- /collection/*
- /edit-media/*
- /edit/*
- /statement/*

## [mrt-oai](https://github.com/CDLUC3/mrt-oai/blob/master/oai-src/src/main/java/org/cdlib/mrt/oai/app/jersey/oai/JerseyOAIMrt.java)

- GET /oai/v2?verb={verb}
  - Identify, ListIdentifiers, ListSets, ListRecords, ListMetadataFormats
- GET state

## mrt-express

- dl/{ark}/{file}
- dv/{ver}/{ark}/{file}

#### Signed URL proof of concept
- pdl/{ark}/{file}
- pdv/{ver}/{ark}/{file}

## Dryad Use of Merritt API's
- sword
- oai
- express
  - /dl/{ark}/{file}
  - /dv/{ver}/{ark}/{file}
- dashboard
  - /d/{object}
  - /d/{object}/{version}
  - /u/{object}
  - /u/{object}/{version}
