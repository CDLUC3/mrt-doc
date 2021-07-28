# Deprecated Functionality

## Database Fields that are no longer actively used

### inv_nodes
- media_type - DL not used
- media_connectivity - DL everything cloud
- node_form? - DL virtual nodes dropped
- node_protocol? - DL not used
- external_provider? - DL used to identify cloud
- verify_on_read? - DL set at server
- source_node? - DL Virtual nodes dropped
- target_node? - DL virtual nodes dropped
- 
### inv_objects
- aggregate_role (some values) - DL used

### inv_versions
- note - DL not used

### inv_collections
- read_privilege - DL issue of public/archive
- write_privilege - DL issue of public/archive
- download_privilege
- storage_tier - DL handled at node, 

DL Note: not clear what the original intentent of the privileges. Could be used by UI or as an indicatator that the content should be archive vs public

### Database Tables, Limited use
- inv_duas
- inv_dublinekernels - DL used in sha_dublinkernals for word access by UI, also used for localid verification
- inv_metadatas - DO not clear current use possibily by UI but handy for broader description of object

### Database Fields, Limited use
- inv_objects.role - DL should keep until an alternative description is available
- inv_objects.aggregate_role  - DL should keep until an alternative description is available

### Database Enums, Limited use
- inv_files.source (consumer) - DL distinguish user generation and ingest generation
- inv_nodes.access_mode (some values) - DL required
- inv_nodes.access_protocol (some values) - DL currently all protocols are S3 but might change

## Merritt Admin Objects
- Collection: only used to partially populate inv_collections
- Owner: only used to minimally populate inv_owners
- SLA: not used

## Merritt System Files
- mrt-object-map.ttl - DL used for relational DB access, currently not used
- mrt-mom.txt 

## Microservices
- [Merritt Express](https://github.com/CDLUC3/mrt-doc/wiki/Merritt-Express-(Archived))

## Microservice Functionality
- Storage
  - Cloudhost (remote) storage - DL like to keep but not critical
- UI 
  - File download (now presigned retrieval) 
  - Object download (now presigned retrieval)
  - Large object (email) delivery (now presigned retrieval)
- Ingest
  - HandlerDataupHack (Used to support DataUP)
  - HandlerFixity (Deprecated by Audit service)
  - HandlerCharacterize (Currently not used.  Initially, JHOVE2 was used)
  - HandlerCallback (Currently, not used)
