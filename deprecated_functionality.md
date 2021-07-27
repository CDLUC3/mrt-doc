# Deprecated Functionality

## Database Fields that are no longer actively used

### inv_nodes
- media_type
- media_connectivity
- access_mode (some values obsolete)
- access_protocol (other than s3)
- node_form?
- node_protocol?
- external_provider?
- verify_on_read?
- source_node?
- target_node?
- 
### inv_objects
- aggregate_role (some values) 

### inv_versions
- note

### inv_collections
- read_privilege
- write_privilege
- download_privilege
- storage_tier

### Database Tables, Limited use
- inv_duas
- inv_dublinekernels
- inv_metadatas


## Microservices
- [Merritt Express](https://github.com/CDLUC3/mrt-doc/wiki/Merritt-Express-(Archived))

## Microservice Functionality
- Storage
  - Cloudhost (remote) storage
- UI 
  - File download (now presigned retrieval)
  - Object download (now presigned retrieval)
  - Large object (email) delivery (now presigned retrieval)
