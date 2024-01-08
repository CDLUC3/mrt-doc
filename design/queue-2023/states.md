# Queue States

- [Design](README.md)

## Batch Queue

### States
- pending
- held - if hold is in place jobs will not be created until it is released
- processing - at least one job is still running
- reporting - all jobs complete, notification in process
  - callback calls (possible retry)
  - email (probably no retry)
- completed
- failed

### Data Elements
- Array of job ids + Status (pending, running, complete, failed)
- Profile name
  - Notification behavior is detailed in profile
- submitter 
- manifest type
- filename (ie checkm file)

## Job Queue

### States
- pending
- held - can jobs and batches be HELD? Yes
- estimating - HEAD requests to calculate size
- provisioning - once dynamic provisioning is implemented (ie zfs provisioning)
  - if working storage is more than 80% full, then wait 
  - otherwise, use default working storage 
- downloading - one or more downloads is in progress
- processing - all downloads complete, notify storage
- recording - storage is complete, notify inventory
- completed - storage and inventory are complete
- failed
  - resume estimating
  - resume downloading
  - resume processing
  - resume recording

### Data Elements
- Profile name
- Status
- Batch id
- Job id
- workding directory
- retry count (maybe)
- ark
- priority
- manifest type
- filename (ie checkm file)
- submitter
- update status (boolean)
- evaluate the following
  - digest type
  - digest value
- space needed (estimating)
- resource needed (once we introduce dynamic provisioning) 
