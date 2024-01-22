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
- last successful state (for restart)
- response_type?

### State Transitions
- (None) --> Pending
- Pending --> Held
- Pending --> Processing
- Held --> Processing (admin function)
- Processing --> Failed
- Processing --> Reporting
- Reporting --> Failed (Reporting)
- Reporting --> Completed
- Failed --> Processing
- Failed --> Deleted (admin function)
- Held --> Deleted (admin function) 

## Job Queue

### States
- pending
- held - can jobs and batches be HELD? Yes
- estimating - HEAD requests to calculate size
- provisioning - once dynamic provisioning is implemented (ie zfs provisioning)
  - if working storage is more than 80% full, then wait 
  - otherwise, use default working storage 
- downloading - one or more downloads is in progress
- processing - all downloads complete, checksum check, mint identifiers, notify storage
- recording - storage is complete, notify inventory
- completed - storage and inventory are complete, cleanup job folder
- failed
  - resume downloading
  - resume processing
  - resume recording

### Data Elements
- String payload_version
- String profile_name
- int status
- int last_successful_state (for restart from failed state)
- date status_updated - time of last status change
- String batch_id
- String job_id
- String workding_directory - full path to content
  - this could allow us to temporarily provision file systems (zfs) for exceptionally large ingest projects
  - if space is tight, a null value indicates using the default working file system
- int retry_count
  - meaning of retry varies based on state - this values implies a deliberate requeue (not retry logic in code)
- String local_id
- String ark
- int priority
- int payload_type (object_manifest, file)
- String filename (payload)
- String submitter
- boolean update_status (false - add, true - updated)
- String digest_type
- String digest_value
- long space_needed (for a single object)
- String resource_to_provision (null allowed)
- ? response_type? - only if needed for callback operation
- String error_message

### State Transitions
- (None) --> Pending
  - if payload is a single file and the depositor supplied a digest, perform checksum validation 
  - payload_version (hard coded)
  - profile_name - constructor
  - status = Pending
  - batch_id - constructor
  - job_id - generated
  - workding_directory - derived from batch & job (evenually more flexible options)
  - retry_count = 0
  - priority - derived from
    - profile
    - size of the batch (constructor)
  - payload_type - constructor
  - filename - constructor
  - submitter - constructor
  - update_status - constructor
  - digest_type - constructor (optional)
  - digest_value - constructor (optional)
  - space_needed = 0
  - resource_to_provision - constructor
  - local_id - constructor (read from ERC, from form parameter, or from manifest)
  - ark - constructor (if supplied at ingest time, otherwise it will be minted)
- (None) --> Failed
  - if payload digest does not match depositor digest
  - if manifest is corrupt
  - status = Failed (no recovery is possible)
- Pending --> Held
  - evaluate if a collection hold is in place 
  - status = Held 
- Pending --> Estimating
  - status = Estimating 
- Held --> Estimating (admin function) 
  - evaluate if collection hold has been removed
  - status Estimating   
- Estimating --> Provisioning
  - HEAD request on every download that is needed (multi-thread)
  - sum value into space_needed
  - last_successful_state = Estimating
  - status = Provisioning
- Provisioning --> Downloading
  - if last_successful_state is not Estimating, total may be inaccurate
  - determine if file system is available
  - determine if there is adequate storage to proceed (throttle at 70% full disk)
  - if space is sufficent state=Downloading  
- Downloading --> Processing
  - GET request on every download (multi-threaded), with a finite number of retries
  - save files to working folder
  - recalculate space_needed (in case estimate was inaccurate)
  - perform digest validation (if user-supplied in manifest)
  - last_successful_state = Downloading
  - status = Processing
- Downloading --> Failed (downloading)
  - status = Failed
  - last_successful_state remains Estimating
  - error_message = details the file that could not be downloaded 
- Processing --> Recording
  - Local_id lookup
  - Mint ark using EZID if needed
  - if local_id does not match user-supplied ark, fail
  - Set ark
  - Write ERC file
  - Write dublin_core file
  - Check digest for each file if needed (HandlerDigest)
  - Create storage manifest (HandlerDigest)
  - Request storage worker for handling request
  - Call storage enpoint to pass storage manifest
  - Check return status from storage
- Processing --> Failed (processing)
- Recording  --> Completed
- Recording --> Failed (recording)
- Failed --> Estimating
- Failed --> Provisioning
- Failed --> Downloading
- Failed --> Processing
- Failed --> Recording
- Failed --> Deleted (admin function)
