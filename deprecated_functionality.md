# Deprecated Functionality

Functionality deprecated by the [Merritt Preservation System](https://github.com/CDLUC3/mrt-doc).

## Database Fields that are no longer actively used

### inv_nodes
- media_type 
- node_form
- node_protocol
- verify_on_read and verify_on_write
  - now controlled via the node table yaml
- source_node
- target_node

### inv_versions
- note 

### inv_collections
- read_privilege 
  - LDAP now controls this
- write_privilege 
  - LDAP now controls this
- download_privilege
  - LDAP now controls this
- storage_tier 
  - Not used.  Node table yaml is definitive.
- These values were likely intended to help choose the nodes in use

### Database Tables, Limited use
- inv_duas
- inv_dublinkernels - limited support in the Merritt UI, but this is part of the intended system design

### Database Enums, Limited use
- inv_nodes.media_connectivity only cloud is supported
- inv_files.source (consumer) - only system and producer are used
- inv_nodes.access_mode (some values) - off-line not currently used
- inv_nodes.access_protocol (some values) - currently all protocols are S3 but might change
- inv_nodes.external_provider - in reality, everything is using an S3 cloud api

## Merritt Admin Objects
- Collection: only used to partially populate inv_collections
- Owner: only used to minimally populate inv_owners
- SLA: not used

## Merritt System Files
- mrt-object-map.ttl 

## Microservices
- [Merritt Express](https://github.com/CDLUC3/mrt-doc/wiki/Merritt-Express-(Archived))
- [OAI](https://github.com/CDLUC3/mrt-oai)
- [Sword](https://github.com/CDLUC3/mrt-sword)
- [ETD - Electronic Theses and Dissertations](https://github.com/CDLUC3/uc3-etds)
- [Admin Tool - Main Account](https://github.com/CDLUC3/mrt-admin-lambda)

## Libraries
- [Zoo](https://github.com/CDLUC3/mrt-zoo)
- [ZK Queue](https://github.com/CDLUC3/cdl-zk-queue)

## Other retired repositories
- [tomcat8_catalina_base](https://github.com/CDLUC3/tomcat8_catalina_base)
- [mrt-store-admin](https://github.com/CDLUC3/mrt-store-admin)
- [merritt-manifest](https://github.com/CDLUC3/merritt-manifest)
- [Jenkins Functions](https://github.com/CDLUC3/mrt-jenkins)
- [Merritt LDAP Permission Tools](https://github.com/CDLUC3/merritt_ldap_tools)
- [Merritt Crons Jobs](https://github.com/CDLUC3/mrt-cron)
  - Merritt Consistency reports 
  - Merritt OpenSearch Visualizations
  - Merritt Object Health analysis
- [Merritt Locust Testing](https://github.com/CDLUC3/mrt-locust)


## Microservice Functionality
- Storage
  - Cloudhost Remote Storage (Pairtree)
    - Not actively used, but it can be useful
  - DFLAT storage no longer used (UNM) 
  - Virtual Node Support
  - Support for non-S3 remote storage (open stack at SDSC)
  - Remote storage servers (not under CDL control)
  - RDF/turtle file support in Merritt System files
- UI 
  - File download (now presigned retrieval) 
  - Object download (now presigned retrieval)
  - Large object (email) delivery (now presigned retrieval)
- Ingest
  - HandlerDataupHack (Used to support DataUP)
  - HandlerFixity (Deprecated by Audit service)
  - HandlerCharacterize (Currently not used.  Initially, JHOVE2 was used)
  - HandlerCallback (Currently, not used)
  - RDF/turtle file support in Merritt System files
  - Submission of "Admin" objects for Collection and Owner Creation
  - Ingest "admin" api calls in support of collection creation
