# Deprecated Functionality

## Database Fields that are no longer actively used

### inv_nodes
- media_type
- media_connectivity
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

### Database Fields, Limited use
- inv_objects.role
- inv_objects.aggregate_role

### Database Enums, Limited use
- inv_files.source (consumer)
- inv_nodes.access_mode (some values)
- inv_nodes.access_protocol (some values)

## Merritt Admin Objects
- Collection: only used to partially populate inv_collections
- Owner: only used to minimally populate inv_owners
- SLA: not used

## Merritt System Files
- mrt-object-map.ttl	
- mrt-mom.txt

## Microservices
- [Merritt Express](https://github.com/CDLUC3/mrt-doc/wiki/Merritt-Express-(Archived))

## Microservice Functionality
- Storage
  - Cloudhost (remote) storage
- UI 
  - File download (now presigned retrieval)
  - Object download (now presigned retrieval)
  - Large object (email) delivery (now presigned retrieval)
