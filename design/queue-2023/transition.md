# State Transition Details

- [Design](README.md)

## Batch Queue State Transitions

### Queue Batch

#### Input
```yml
submitter: submitter
profile: profile
payload_url: payload_url
manifest: 
- file1.checkm loc001
- file2.checkm loc002
- file3.checkm loc003
```

#### ZK Nodes

```yml
/batches/bid0001/submission:
  profile_name: profile_name
  submitter: submitter
  payload_url: payload_url
  manifest_type: manifest_of_manifests #Question: should we decide this at queue time?
  response_type: ?? # Should we drop support for this
  submission_mode: add
/batches/bid0001/status:
  status: pending
  last_modified: now
```

### Pending to Held

If the collection is in a held state, the batch should move to held.

#### ZK Nodes

```yml
/batches/bid0001/submission:
  profile_name: profile_name
  submitter: submitter
  payload_url: payload_url
  manifest_type: manifest_of_manifests 
  response_type: ?? 
  submission_mode: add
/batches/bid0001/status:
  status: held # <-----------------------------------------------
  last_modified: now
```

### Pending to Processing or Held to Processing

#### ZK Nodes

```yml
/batches/bid0001/submission:
  profile_name: profile_name
  submitter: submitter
  payload_url: payload_url
  manifest_type: manifest_of_manifests 
  response_type: ?? 
  submission_mode: add
/batches/bid0001/status:
  status: processing
  last_modified: now
```

Create Jobs
```yml
/jobs/jid0001/configuration:
  batch_id: bid0001
  profile_name: profile_name
  submitter: submitter
  payload_url: file1.checkm
  payload_type: object_manifest
  response_type: response_type
  response_type: ?? 
  submission_mode: add
  working_dir: /zfs/queue/bid0001/jid0001
  local_id: loc001
/jobs/jid0001/status: pending
/jobs/jid0001/priority: 5
/jobs/jid0002/configuration:
  batch_id: bid0001
  profile_name: profile_name
  submitter: submitter
  payload_url: file2.checkm
  payload_type: object_manifest
  response_type: response_type
  response_type: ?? 
  submission_mode: add
  working_dir: /zfs/queue/bid0001/jid0002
  local_id: loc002
/jobs/jid0002/status: pending
/jobs/jid0002/priority: 5
/jobs/jid0003/configuration:
  batch_id: bid0001
  profile_name: profile_name
  submitter: submitter
  payload_url: file2.checkm
  payload_type: object_manifest
  response_type: response_type
  response_type: ?? 
  submission_mode: add
  working_dir: /zfs/queue/bid0001/jid0003
  local_id: loc003
/jobs/jid0003/status: pending
/jobs/jid0003/priority: 5
```

Place jobs in job queue
```yml
/batches/bid0001/states/processing/jid0001:
/batches/bid0001/states/processing/jid0002:
/batches/bid0001/states/processing/jid0003:
/jobs/states/processing/05-jid0001:
/jobs/states/processing/05-jid0002:
/jobs/states/processing/05-jid0003:
```


### Start --> Pending
- generate batch_id
  - create batch folder
  - write payload to batch folder
  - TODO: we should re-evaluate the maximum payload size without a manifest (currently 30G)
- set profile_name
- set submitter
- determine manifest_type
- set file_name 
- examine the payload
  - single - 1 job batch
  - object manifest - 1 job batch
  - manifest of manifest - N jobs
  - manifest of zips - N jobs
  - manifest of jobs - N jobs
  - future json manifest (inline manifest of detailed object manifests)
- status = Pending 
### Pending --> Held
- check if collection is held
- status = Held 
### Pending --> Processing
- status = Processing 
### Held --> Processing (admin function)
- status = Processing 
### Processing --> Failed
- status = Failed
- set error_message 
### Processing --> Reporting
- based on the payload
  - single - we start a 1 job batch
  - object manifest - we start a 1 job batch
  - manifest of manifest - create N job entries and create the array of jobids in the batch object
  - manifest of zips - create N job entries and create the array of jobids in the batch object
- construct JOB object(s)
- construct job folder(s)
  - folder creation could be defererred to the job step 
- create jobs in job queue
- we create status array
- status = Reporting
### Reporting --> Completed
- send summary email
- status = Completed
### Reporting --> Failed
- this occurs when at least one job has occurred
- status =  Failed
- or is a batch done after it reports
  - if jobs are re-run do they report on their own?
  - do we create a "re-run batch"?
  - or is this a question for the end users? 
### Failed --> UpdateReporting
- manually triggered if some or all of the jobs have been re-run 
- status = UpdateReporting 
### UpdateReporting --> Completed
- detect any updated statuses and report them
- status = Completed
### UpdateReporting --> Failed
- detect any updated statuses and report them
- status = Completed
### Failed --> DELETED (admin function)
- delete any running jobs (and folders)
- delete batch folder
- status = Deleted 
### Held --> Deleted (admin function) 
- delete any running jobs (and folders)
- delete batch folder
- status = DELETED

## Job Queue State Transitions

### START --> Pending
- if payload is a single file and the depositor supplied a digest, perform checksum validation 
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
- payload_url - constructor
- submitter - constructor
- update_status - constructor
- digest_type - constructor (optional)
- digest_value - constructor (optional)
- space_needed = 0
- resource_to_provision - constructor
- local_id - constructor (read from ERC, from form parameter, or from manifest)
- ark - constructor (if supplied at ingest time, otherwise it will be minted)

### START --> Failed
- if payload digest does not match depositor digest
- if manifest is corrupt
- status = Failed (no recovery is possible)
### Pending --> Held
- evaluate if a collection hold is in place 
- status = Held 
### Pending --> Estimating
- status = Estimating 
### Held --> Estimating (admin function) 
- evaluate if collection hold has been removed
- status Estimating   
### Estimating --> Provisioning
- HEAD request on every download that is needed (multi-thread)
- sum value into space_needed
- last_successful_state = Estimating
- status = Provisioning
### Provisioning --> Downloading
- if last_successful_state is not Estimating, total may be inaccurate
- determine if file system is available
- determine if there is adequate storage to proceed (throttle at 70% full disk)
- if space is sufficent state=Downloading  
### Downloading --> Processing
- GET request on every download (multi-threaded), with a finite number of retries
- save files to working folder
- recalculate space_needed (in case estimate was inaccurate)
- perform digest validation (if user-supplied in manifest)
- last_successful_state = Downloading
- status = Processing
### Downloading --> Failed (downloading)
- status = Failed
- last_successful_state remains Estimating
- error_message = details the file that could not be downloaded 
### Processing --> Recording
- Local_id lookup
- Mint ark using EZID if needed
- if local_id does not match user-supplied ark, fail
- Set ark
- Question: should we break Minting into a separate state
  - small risk of wasting an ark if the minting process is rerun (only applicable if no localid is provided) 
- Write ERC file
- Write dublin_core file
- Check digest for each file if needed (HandlerDigest)
- Create storage manifest (HandlerDigest)
- Request storage worker for handling request (very low risk of failure)
- Call storage enpoint to pass storage manifest
- Check return status from storage
- last_sucessful_state = Processing
- status = Recording
### Processing --> Failed (processing)
- due to minting failure or storage failure
- update error_message 
- status = Failed   
### Recording --> Notify
- Inventory will read and update THIS queue
- Save data to INV database
- status = Notify
- last_sucessful_state = Recording
### Recording --> Failed (recording)
- update error_message 
- status = Failed
### Notify --> Completed
- Invoke callback (if defined)
- Notify batch queue that job is complete
- Status = Completed  
- last_sucessful_state = Notify
- delete job folder
### Notify --> Failed 
- status = Failed
### Failed --> Downloading
- reset status 
### Failed --> Processing
- reset status 
### Failed --> Recording
- reset status
### Failed --> DELETED
- delete job folder
### Held --> DELETED
- delete job folder
