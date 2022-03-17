---
title: "Storage Admin UI Mockup"
description: "Storage Admin UI Mockup"
nextpage: store-admin-pause-ing-for-coll
---

{% include nav.html %}

# Proposed Database Changes

[https://github.com/CDLUC3/mrt-doc/issues/827](https://github.com/CDLUC3/mrt-doc/issues/827)

## Task Status

### Completed
- Requeue audit for an object/node
- Requeue replic for an object
- Requeue audit batches in progress (not described below)
- Start Scan
- Show Scan progress
- Cancel Scan
- Review Scan Results
- CSV update of review status
  - Evaluate tools in stage
  - Evaluate actions to perform in prod
  - Enable delete in prod
- Add Secondary Storage Node for a Collection
  - Reset replication for all objects in the collection 
- Enhance replication status reporting
  - https://github.com/CDLUC3/mrt-doc/issues/865

### In Progress
- [ ] Remove Secondary Storage Node for a Collection
- [ ] Obtain a batch of ids to process
- [ ] Invoke Replic.delete(node, obj)

### TODO: Public Collection Migration
- Pause Ingest for a Collection
- Pause Replication for a Collection (still needed?)
- Change the Primary Node for a Collection
```
ALTER TABLE inv_collections 
  add replication_paused boolean
```
- Change the Primary Node for a Collection
  - Batch Invocation of Inventory::changePrimaryNode(node, object)

### TODO: Delete Object Support in Admin Tool / Tombstone in database
- [ ] Delete Object
  - Create new table to record the reason for a delete
  - Create a placeholder to track other exceptional system interventions
```
create table inv_object_maints(
  id int,
  inv_object_id int,
  ark varchar(255),
  object_type enum('MRT-curatorial','MRT-system'),
  role enum('MRT-class','MRT-content'),
  aggregate_role enum('MRT-collection','MRT-owner','MRT-service-level-agreement','MRT-submission-agreement','MRT-none')
  version_number smallint,
  erc_who mediumtext,
  erc_what mediumtext,
  erc_when mediumtext,
  erc_where mediumtext,
  created timestamp,
  action enum('removed', 'recreated', 'modified-by-merritt', 'maintenance-note')
  modified timestamp,
  removed timestamp,
  note mediumtext
)
```
- Record Maintenance Node about an Object

### TODO: Stage Environment Collection Management Tools
- Purge unneeded objects
- Reduce storage costs
- Make database and storage consistent

### Future: Not in scope
- Change the Primary UI Node for a Collection

---
# In progress Use Case Details

### Use Case: Remove Secondary Storage Node for a Collection
- Remove node from inv_collections_inv_nodes
- Determine if any work is needed
```
SELECT
  icio.inv_object_id
from 
  inv_collections_inv_objects icio
WHERE
  icio.inv_collection_id = ?
AND exists (
    select
      1
    from
      inv_nodes_inv_objects inio 
    WHERE
      inio.inv_node_id= ?
    and
      inio.inv_object_id = icio.inv_object_id
    and
      inio.role = 'secondary'
)
limit 50
;
``` 
- Peform Action:
  - Admin Queue Lambda:
    - Batch invocation of REPLIC endpoint for every object in the collection
      - Replication::delete(node, object)
  - Delete node from inv_collections_inv_nodes
- After completion
  - Manually unpause replication
  - Manually unpause ingest
- Components: Database, Ingest, Replic, Admin, Admin Queue Lambda



---
# TODO Use Case Detailss

### Use Case: Change the Primary Node for a Collection
- Prerequistes Step 1
  - Pause ingest for the collection (use filesystem)
  - Target node must be 100% replicated
  - Pause replication for all nodes in the collection 
    - set inv_collections.replciation_paused = true
- Prerequisites Step 2    
  - Manually Change the primary node for the collection in the ingest profile
- Perform Action
  - Admin Queue Lambda:
    - Batch invocation of INV endpoint for every object in the collection
      - Inventory::changePrimaryNode(node, object)
- After completion
  - Manually unpause replication
  - Manually unpause ingest
- Components: Databse, Inventory, Admin, Admin Queue Lambda

### Use Case: Delete Object

- Admin notifies the following components about the delete
  - Replic
  - Store
  - Inventory
  - EZID?
- Record the action in the inv_storage_maints table
- Components: Database, Admin

