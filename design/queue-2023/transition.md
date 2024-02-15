# State Transition Details

- [Design](README.md)

## Batch Queue State Transitions

### Batch: Queue Batch

#### Input
```yml
submitter: submitter
profile: profile
payload_url: payload_url
manifest: 
- file1.checkm loc001
- file2.checkm loc002 
- file3.checkm loc003 ark123
```

#### ZK Nodes

```yml
/batches/bid0001/submission:
  profile_name: profile_name
  submitter: submitter
  payload_url: payload_url
  manifest_type: manifest_of_manifests #Question: should we decide this at queue time?
  response_type: tbd # Should we drop support for this
  submission_mode: add
/batches/bid0001/status:
  status: pending
  last_modified: now
```

### Batch: Pending to Held

If the collection is in a held state, the batch should move to held.

#### ZK Nodes

```yml
/batches/bid0001/submission:
  profile_name: profile_name
  submitter: submitter
  payload_url: payload_url
  manifest_type: manifest_of_manifests 
  response_type: tbd
  submission_mode: add
/batches/bid0001/status:
  status: held # <-----------------------------------------------
  last_modified: now
```

### Batch: Pending to Processing or Held to Processing

#### ZK Nodes

```yml
/batches/bid0001/submission:
  profile_name: profile_name
  submitter: submitter
  payload_url: payload_url
  manifest_type: manifest_of_manifests 
  response_type: tbd 
  submission_mode: add
/batches/bid0001/status:
  status: processing
  last_modified: now
```

> [!NOTE]
> A new job id will be written in 3 places
> - To the list of jobs `/jobs/JID`
> - To the batch's job queue `/batches/bid0001/states/pending/JID:`
>   - this queue is used to determine when a batch is complete
> - To the actual job queue `/jobs/states/pending/XX-JID:`
>   - XX is the job's initial priority


Create Jobs
```yml
/jobs/jid0001/configuration:
  batch_id: bid0001
  profile_name: profile_name
  submitter: submitter
  payload_url: file1.checkm
  payload_type: object_manifest
  response_type: response_type
  response_type: tbd 
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
  response_type: tbd
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
  response_type: tbd 
  submission_mode: add
  working_dir: /zfs/queue/bid0001/jid0003
  local_id: loc003
/jobs/jid0003/ark: ark123
/jobs/jid0003/status: pending
/jobs/jid0003/priority: 5
```

Place jobs references in batch queue
```yml
/batches/bid0001/states/pending/jid0001:
/batches/bid0001/states/pending/jid0002:
/batches/bid0001/states/pending/jid0003:
```

Place jobs in job queue, allowing sorting by priority
```yml
/jobs/states/pending/05-jid0001:
/jobs/states/pending/05-jid0002:
/jobs/states/pending/05-jid0003:
```



## Job Queue State Transitions

### Job: Pending --> Failed
- if payload digest does not match depositor digest
- if manifest is corrupt
- status = Failed (no recovery is possible)

```yml
/jobs/jid0002/status: failed
/jobs/states/failed/05-jid0001:
/batches/bid0001/states/failed/jid0001:
```

### Job: Pending --> Held
- evaluate if a collection hold is in place 
- status = Held 

```yml
/jobs/jid0002/status: held
/jobs/states/held/05-jid0001:
```

### Job: Pending --> Estimating, Held --> Estimating
- status = Estimating 

```yml
/jobs/jid0002/status: estimating
/jobs/states/estimating/05-jid0001:
```

### Job: Estimating --> Provisioning
- HEAD request on every download that is needed (multi-thread)
- sum value into space_needed
- last_successful_state = Estimating
- status = Provisioning

```yml
/jobs/jid0002/space_needed: 1000000000
/jobs/jid0002/priority: 10
/jobs/jid0002/status: provisioning
/jobs/states/provisioning/10-jid0001:
```

### Job: Provisioning --> Downloading
- if last_successful_state is not Estimating, total may be inaccurate
- determine if file system is available
- determine if there is adequate storage to proceed (throttle at 70% full disk)
- if space is sufficent state=Downloading  

```yml
/jobs/jid0002/status: downloading
/jobs/states/downloading/10-jid0001:
```

### Job: Downloading --> Processing
- GET request on every download (multi-threaded), with a finite number of retries
- save files to working folder
- recalculate space_needed (in case estimate was inaccurate)
- perform digest validation (if user-supplied in manifest)
- last_successful_state = Downloading
- status = Processing

```yml
/jobs/jid0002/status: processing
/jobs/states/processing/10-jid0001:
```

### Job: Downloading --> Failed (downloading)
- status = Failed
- last_successful_state remains Estimating
- error_message = details the file that could not be downloaded 

```yml
/jobs/jid0002/status: failed
/jobs/states/failed/10-jid0001:
/batches/bid0001/states/failed/jid0001:
```

### Job: Processing --> Recording
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

```yml
/jobs/jid0002/ark: 555
/jobs/jid0002/status: recording
/jobs/states/recording/10-jid0001:
```

### Job: Processing --> Failed (processing)
- due to minting failure or storage failure
- update error_message 
- status = Failed   

```yml
/jobs/jid0002/status: failed
/jobs/states/failed/10-jid0001:
/batches/bid0001/states/failed/jid0001:
```

### Job: Recording --> Notify
- Inventory will read and update THIS queue
- Save data to INV database
- status = Notify
- last_sucessful_state = Recording

```yml
/jobs/jid0002/status: notify
/jobs/states/notify/10-jid0001:
```

### Job: Recording --> Failed (recording)
- update error_message 
- status = Failed

```yml
/jobs/jid0002/status: failed
/jobs/states/failed/10-jid0001:
/batches/bid0001/states/failed/jid0001:
```

### Job: Notify --> Completed
- Invoke callback (if defined)
- Notify batch queue that job is complete
- Status = Completed  
- last_sucessful_state = Notify
- delete job folder

```yml
/jobs/jid0002/status: completed
/jobs/states/completed/10-jid0001:
/batches/bid0001/states/completed/jid0001:
```

### Job: Notify --> Failed 
- status = Failed

```yml
/jobs/jid0002/status: failed
/jobs/states/failed/10-jid0001:
/batches/bid0001/states/failed/jid0001:
```

### Job: Failed --> Downloading
- reset status 

```yml
/jobs/jid0002/status: downloading
/jobs/states/downloading/10-jid0001:
/batches/bid0001/states/processing/jid0001:
```

### Job: Failed --> Processing
- reset status 

```yml
/jobs/jid0002/status: processing
/jobs/states/processing/10-jid0001:
/batches/bid0001/states/processing/jid0001:
```

### Job: Failed --> Recording
- reset status

```yml
/jobs/jid0002/status: recording
/jobs/states/recording/10-jid0001:
/batches/bid0001/states/processing/jid0001:
```

### Job: Failed --> DELETED
- delete job folder

```yml
TBD
```

### Job: Held --> DELETED
- delete job folder

```yml
TBD
```

### Batch: Processing --> Failed
- status = Failed
- set error_message 

```yml
/jobs/jid0002/status: failed
/jobs/states/failed/10-jid0001:
/batches/bid0001/states/failed/jid0001:
```

### Batch: Processing --> Reporting
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

```yml
/jobs/jid0002/status: reporting
/jobs/states/reporting/10-jid0001:
```

### Batch: Reporting --> Completed
- send summary email
- status = Completed

```yml
/jobs/jid0002/status: completed
/jobs/states/completed/10-jid0001:
/batches/bid0001/states/completed/jid0001:
```

### Batch: Reporting --> Failed
- this occurs when at least one job has occurred
- status =  Failed
- or is a batch done after it reports
  - if jobs are re-run do they report on their own?
  - do we create a "re-run batch"?
  - or is this a question for the end users? 

### Batch: Failed --> UpdateReporting
- manually triggered if some or all of the jobs have been re-run 
- status = UpdateReporting 

### Batch: UpdateReporting --> Completed
- detect any updated statuses and report them
- status = Completed

### Batch: UpdateReporting --> Failed
- detect any updated statuses and report them
- status = Completed

### Batch: Failed --> DELETED (admin function)
- delete any running jobs (and folders)
- delete batch folder
- status = Deleted 

### Batch: Held --> Deleted (admin function) 
- delete any running jobs (and folders)
- delete batch folder
- status = DELETED
a
