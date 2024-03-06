# State Transition Details

- [Design](README.md)

## Conventions

- BID: Zookeeper will manage the incrementing id numbers for batches
- JID: Zookeeper will manage the incrementing id numbers for jobs

### Job Creation

> [!NOTE]
> A new job id will be written in 3 places
> - To the list of jobs `/jobs/JID`
> - To the batch's job queue `/batches/BID/states/STATE/JID`
>   - this queue is used to determine when a batch is complete
> - To the actual job queue `/jobs/states/STATE/XX-JID`
>   - XX is the job's initial priority
>   - This is the only place where the priority appears in the path name
>
> When applying a change to the job queue, the following sequence should be used
> - Update job data `/jobs/JID`
> - Delete old job queue entry `/jobs/states/OLD_STATE/XX-JID`
> - Create new job queue entry `/jobs/states/NEW_STATE/XX-JID`
> - Update the batch queue state (if applicable)
>   - Delete old batch queue state `/batches/BID/states/OLD_STATE/JID`
>   - Create new batch queue state `/batches/BID/states/NEW_STATE/JID`

### Locking Batches and Jobs

Locks on Jobs and Batches should be implemented with a [Zookeeper ephemeral lock](https://zookeeper.apache.org/doc/r3.4.5/zookeeperOver.html#Nodes+and+ephemeral+nodes).  If a zookeeper client process terminates, ephemeral locks are released. 

- [ ] TODO: Review this with Mark

### Acquiring a Batch
```yml
/batches/BID/lock: #ephemeral node to be held by a consumer daemon
```

### Acquiring a Job
```yml
/jobs/JID/lock: #ephemeral node to be held by a consumer daemon
```

## Consumer Daemons to Create

- Batch Pending
- Batch Reporting
- Batch Update Reporting
- Job Pending
- Job Estimating
- Job Provisioning (when work is held in this state, sleep between cycles)
- Job Downloading
- Job Processing
- Job Recording (implemented by Merritt Inventory)
- Job Notify

## Batch: API Call Triggers the Creation and Queuing of a Batch

User submits a submission payload.  
A batch is created using the payload url.
Regardless of the type of submission, the payload should be represented as a URL.
This step should be as lightweight as possible.

### Input
```yml
submitter: submitter
type: file # container or file in the case of a zip deposit
profile: profile
payload_url: payload_url
manifest: 
- file1.checkm loc001
- file2.checkm loc002 
- file3.checkm loc003 ark123
```

### ZK Nodes

```yml
/batches/bid0001/submission:
  profile_name: profile_name
  submitter: submitter
  payload_url: payload_url
  erc_what: title
  erc_who: author
  erc_when: date
  erc_where:
  type: file
  submission_mode: add
/batches/bid0001/status:
  status: pending
  last_modified: now
```

## Batch: Acquire Pending Batch

### Identifying Pending Batches
- A "pending batch" can be identified by the absence of a "/states" child
- If a batch has a "/states" child, the queue will ignore it

### Create Lock
```yml
/batches/bid001/lock: #ephemeral
```

### State Description
If a Collection Hold is in place, change status to Held and stop processing.

The differences in batch submission types (single file, object manifest, manifest of manifests, manifest of containers) should be handled at this phase.
One job will be spawned for each object that needs to be created for the payload.

If configured in the profile, a summary email should be sent to the depositor confirming the queueing of the batch of jobs.

### Batch: Pending to Held

If the collection is in a held state, the batch should move to a held status.
An administrative action is necessary to release the hold.

```yml
/batches/bid0001/status:
  status: held 
  last_modified: now
# DELETE /batches/bid001/lock
```

### Batch: Pending --> Processing

```yml
/batches/bid0001/status:
  status: processing
  last_modified: now
# DELETE /batches/bid001/lock
```### Output

#### Job Details
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
/jobs/jid0001/identifiers: 
  primary: 
  local_id: [loc001]
/jobs/jid0001/status: 
  status: pending
  last_successful_status: #nil
  last_modification_date: now
  retry_count: 0
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
/jobs/jid0002/identifiers: 
  primary: 
  local_id: [loc002]
/jobs/jid0002/status: status: 
  status: pending
  last_successful_status: #nil
  last_modification_date: now
  retry_count: 0
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
/jobs/jid0003/identifiers: 
  primary: ark123
  local_id: [loc003]
/jobs/jid0003/status: status: 
  status: pending
  last_successful_status: #nil
  last_modification_date: now
  retry_count: 0
/jobs/jid0003/priority: 5
```

#### Place jobs in job queue, allowing sorting by priority
```yml
/jobs/states/pending/05-jid0001: #no data - acts as a reference
/jobs/states/pending/05-jid0002: #no data - acts as a reference
/jobs/states/pending/05-jid0003: #no data - acts as a reference
```

#### Place jobs references in batch queue
```yml
/batches/bid0001/states/batch-processing/jid0001: #no data - acts as a reference
/batches/bid0001/states/batch-processing/jid0002: #no data - acts as a reference
/batches/bid0001/states/batch-processing/jid0003: #no data - acts as a reference
```

## Batch: Held --> Pending (Admin Action)

An administrative action is performed to release a "Held" batch.  
After confirming that the target collection is no longer "Held", proceed to the Processing step.

```yml
/batches/bid0001/status:
  status: pending 
  last_modified: now
```

## The Job Queue

The Job Queue runs independently from the Batch Queue 
- The keys in the job queue thread are sorted by job priority which ensures that higher priority jobs will be initiated first
- If a collection hold has been set since the job was created, set the job state to Held
- Otherwise, set the job state to Processing

## Job: Acquire Pending Job

### Create Lock
```yml
/jobs/jid0001/lock: #ephemeral
```

### Job: Pending --> Failed

A job will immediately fail under the following conditions
- if payload digest does not match depositor digest
- if manifest is corrupt

Recovery is not possible under these conditions.  A new submission will be required.

```yml
/jobs/jid0001/status: 
  status: failed
  last_successful_status: #nil
  last_modification_date: now
  retry_count: 0 # no change
# DELETE /jobs/states/pending/05-jid0001:
/jobs/states/failed/05-jid0001: #no data - acts as a reference
# DELETE /batches/bid0001/states/batch-processing/jid0001:
/batches/bid0001/states/batch-failed/jid0001: #no data - acts as a reference
# DELETE /jobs/jid0001/lock
```

### Job: Pending --> Held

The job will be kept in a Held state until an administrative action releases the job.

```yml
/jobs/jid0002/status: 
  status: held
  last_successful_status: #nil
  last_modification_date: now
  retry_count: 0 # no change
# DELETE /jobs/states/pending/05-jid0001:
/jobs/states/held/05-jid0001: #no data - acts as a reference
# DELETE /jobs/jid0001/lock
```

### Job: Pending --> Estimating

Once a job is acquired, it will move to an Estimating step.

### Status 
```yml
/jobs/jid0002/status: 
  status: estimating
  last_successful_status: #nil
  last_modification_date: now
  retry_count: 0 # no change
# DELETE /jobs/states/pending/05-jid0001:
/jobs/states/estimating/05-jid0001: #no data - acts as a reference
# DELETE /jobs/jid0001/lock
```

## Job: Held --> Pending (Admin Action)

Job is administratively released back to a Pending status.

### Status 
```yml
/jobs/jid0002/status: 
  status: pending
  last_successful_status: #nil
  last_modification_date: now
  retry_count: 0 # no change
# DELETE /jobs/states/held/05-jid0001:
/jobs/states/pending/05-jid0001: #no data - acts as a reference
```

## Job: Acquire Estimating Job

### Create Lock
```yml
/jobs/jid0001/lock: #ephemeral
```

### State Description

The first step of a job is to estimate the resources that will be needed to process the job.
This will be accomplished by running HEAD reqeusts for content to be ingested and calculating a size estimate for the object.
If a job is excessively large , the job priority may be adjusted.

The estimating step does not fail. If a proper size calculation cannot be made for a job, the space_needed should be set to 0 and job priority may be adjusted.

### Output

```yml
/jobs/jid0002/space_needed: 1000000000
/jobs/jid0002/priority: 10
```

### Job: Estimating --> Provisioning

```yml
/jobs/jid0002/status: 
  status: provisioning
  last_successful_status: estimating
  last_modification_date: now
  retry_count: 0 # no change
# DELETE /jobs/states/estimating/05-jid0001:
/jobs/states/provisioning/10-jid0001: #no data - acts as a reference
# DELETE /jobs/jid0001/lock
```

## Job: Acquire Provisioning Job

### Create Lock
```yml
/jobs/jid0001/lock: #ephemeral
```

### State Description

The Provisioning state will be used to determine if there are sufficient system resources for a job to procede.
At the simplest level, this state would allow us to throttle all subsequent ingests if our ZFS capacity is insufficient to support a specific download.
Unestimated jobs should be held in this state if the ZFS capacity is below a specific threshold.

Additionally, this state could be used to hold a job while resources are dynamically provisioned from AWS.  This will not be a feature of the initial release.

Jobs that fail the provisioning test will remain in this state, so it is important that ALL jobs in this state get evaluated.  If some jobs are retained in the provisioning state, it might make sense for the provisioning thread to sleep between tests.

### Job: Provisioning --> Downloading

```yml
/jobs/jid0002/status: 
  status: downloading
  last_successful_status: provisioning
  last_modification_date: now
  retry_count: 0 # no change
# DELETE /jobs/states/provisioning/10-jid0001:
/jobs/states/downloading/10-jid0001: #no data - acts as a reference
# DELETE /jobs/jid0001/lock
```

## Job: Acquire Downloading Job

### Create Lock
```yml
/jobs/jid0001/lock: #ephemeral
```

### State Description

The Downloading step performs the following actions
- Performs a GET request on every download (multi-threaded), with a finite number of retries
- Saves files to working folder
- Recalculate space_needed (in case estimate was inaccurate)
- Perform digest validation (if user-supplied in manifest)

### Ouptut (if changes detected)

```yml
/jobs/jid0001/space_needed: 1000000000
/jobs/jid0001/priority: 10
```

### Job: Downloading --> Processing

```yml
/jobs/jid0001/status: 
  status: processing
  last_successful_status: downloading
  last_modification_date: now
  retry_count: 0 # no change
# DELETE /jobs/states/downloading/10-jid0001:
/jobs/states/processing/10-jid0001: #no data - acts as a reference
# DELETE /jobs/jid0001/lock
```

### Job: Downloading --> Failed (downloading)

If any individual download does not succeed (after a set number of retries), the job will go to a failed state. 

```yml
/jobs/jid0002/status: 
  status: failed
  last_successful_status: provisioning # retain_prior_value
  last_modification_date: now
  retry_count: 0 # no change
# DELETE /jobs/states/provisioning/10-jid0001:
/jobs/states/failed/10-jid0001: #no data - acts as a reference
# DELETE /batches/bid0001/states/batch-processing/jid0001:
/batches/bid0001/states/batch-failed/jid0001: #no data - acts as a reference
# DELETE /jobs/jid0001/lock
```

## Job: Acquire Processing Job

### Create Lock
```yml
/jobs/jid0001/lock: #ephemeral
```

### State Description

The processing step is where the bulk of Merritt Ingest processing takes place

- Local_id lookup
- Mint ark using EZID if needed
- Write ark out to zookeeper immediately
  - If the job is restarted, a new id will not need to be minted
- if local_id does not match user-supplied ark, fail
- Write ERC file
- Write dublin_core file
- Check digest for each file if needed (HandlerDigest)
- Create storage manifest (HandlerDigest)
- Request storage worker for handling request (very low risk of failure)
- Call storage enpoint to pass storage manifest
- Check return status from storage

### Output

```yml
/jobs/jid0002/identifier: 
  primary: 555
  local_id: [loc002]
```

### Job: Processing --> Recording

```yml
/jobs/jid0002/status: 
  status: recording
  last_successful_status: processing
  last_modification_date: now
  retry_count: 0 # no change
# DELETE /jobs/states/processing/10-jid0001:
/jobs/states/recording/10-jid0001: #no data - acts as a reference
# DELETE /jobs/jid0001/lock
```

### Job: Processing --> Failed (processing)

Jobs may fail processing due to minting failure or storage failures.

```yml
/jobs/jid0002/status: 
  status: failed
  last_successful_status: downloading # retain_prior_value
  last_modification_date: now
  retry_count: 0 # no change
# DELETE /jobs/states/processing/10-jid0001:
/jobs/states/failed/10-jid0001: #no data - acts as a reference
# DELETE /batches/bid0001/states/batch-processing/jid0001:
/batches/bid0001/states/batch-failed/jid0001: #no data - acts as a reference
# DELETE /jobs/jid0001/lock
```

## Job: Acquire Recording Job

### Create Lock
```yml
/jobs/jid0001/lock: #ephemeral
```

### State Description

This step will be processed by the Merritt Inventory service.
- Inventory will read the storage manifest
- Inventory will update the Merritt INV database

This will satisfy one of the key motivations for the queue redesign effort.  
By processing the inventory step from the ingest queue, the depositor notification process will ensure that content is immediately accessible from Merritt.
Previously, it was possible that depositors were notified of a successful ingest BEFORE content had been recorded in inventory.

### Job: Recording --> Notify

```yml
/jobs/jid0002/status: 
  status: notify
  last_successful_status: recording
  last_modification_date: now
  retry_count: 0 # no change
# DELETE /jobs/states/recording/10-jid0001:
/jobs/states/notify/10-jid0001: #no data - acts as a reference
# DELETE /jobs/jid0001/lock
```

### Job: Recording --> Failed (recording)

This status change indicates that an error occurred while recording an object change in the inventory database.

```yml
/jobs/jid0002/status: 
  status: failed
  last_successful_status: processing # retain_prior_value
  last_modification_date: now
  retry_count: 0 # no change
# DELETE /jobs/states/recording/10-jid0001:
/jobs/states/failed/10-jid0001: #no data - acts as a reference
# DELETE /batches/bid0001/states/batch-processing/jid0001:
/batches/bid0001/states/batch-failed/jid0001: #no data - acts as a reference
# DELETE /jobs/jid0001/lock
```

## Job: Acquire Notify Job

### Create Lock
```yml
/jobs/jid0001/lock: #ephemeral
```

### State Description

If a callback has been configured in a collection profile, the callback will be invoked for the job.
As the status of the job is changed to "completed", the batch object for the job will be notified of the update (potentially via a Zookeeper "Watcher").
This will allow the batch to determine if the entire job has been completed.

### Job: Notify --> Completed

```yml
/jobs/jid0002/status: 
  status: completed
  last_successful_status: notify
  last_modification_date: now
  retry_count: 0 # no change
# DELETE /jobs/states/notify/10-jid0001:
/jobs/states/completed/10-jid0001: #no data - acts as a reference
# DELETE /batches/bid0001/states/batch-processing/jid0001:
/batches/bid0001/states/batch-completed/jid0001: #no data - acts as a reference
# DELETE /jobs/jid0001/lock
```

### Job: Notify --> Failed 

If the event of a callback failure, the job will go to a Failed state.

```yml
/jobs/jid0002/status: 
  status: failed
  last_successful_status: recording # retain_prior_value
  last_modification_date: now
  retry_count: 0 # no change
# DELETE /jobs/states/notify/10-jid0001:
/jobs/states/failed/10-jid0001: #no data - acts as a reference
# DELETE /batches/bid0001/states/batch-processing/jid0001:
/batches/bid0001/states/batch-failed/jid0001: #no data - acts as a reference
# DELETE /jobs/jid0001/lock
```

## Resuming failed jobs

The failed job will be resumed via an admin action. 
The resumed job will restart at an appropriate state based on the "last_successful_state".

### Job: Failed --> Downloading (Admin Action)

```yml
/jobs/jid0002/status: 
  status: downloading
  last_successful_status: provisioning # no change
  last_modification_date: now
  retry_count: 1 # increment by 1
# DELETE /jobs/states/failed/10-jid0001:
/jobs/states/downloading/10-jid0001: #no data - acts as a reference
# DELETE /batches/bid0001/states/batch-failed/jid0001:
/batches/bid0001/states/batch-processing/jid0001: #no data - acts as a reference
```

### Job: Failed --> Processing (Admin Action)

```yml
/jobs/jid0002/status: 
  status: processing
  last_successful_status: downloading # no change
  last_modification_date: now
  retry_count: 1 # increment by 1
# DELETE /jobs/states/failed/10-jid0001:
/jobs/states/processing/10-jid0001: #no data - acts as a reference
# DELETE /batches/bid0001/states/batch-failed/jid0001:
/batches/bid0001/states/batch-processing/jid0001: #no data - acts as a reference
```

### Job: Failed --> Recording (Admin Action)

```yml
/jobs/jid0002/status: 
  status: recording
  last_successful_status: processing # no change
  last_modification_date: now
  retry_count: 1 # increment by 1
# DELETE /jobs/states/failed/10-jid0001:
/jobs/states/recording/10-jid0001: #no data - acts as a reference
# DELETE /batches/bid0001/states/batch-failed/jid0001:
/batches/bid0001/states/batch-processing/jid0001: #no data - acts as a reference
```

### Job: Failed --> Notify (Admin Action)

```yml
/jobs/jid0002/status: 
  status: notify
  last_successful_status: processing # no change
  last_modification_date: now
  retry_count: 1 # increment by 1
# DELETE /jobs/states/failed/10-jid0001:
/jobs/states/notify/10-jid0001: #no data - acts as a reference
# DELETE /batches/bid0001/states/batch-failed/jid0001:
/batches/bid0001/states/batch-processing/jid0001: #no data - acts as a reference
```

## Job: Completed --> DELETED (Automated Task)

Upon completion of the job, the job's ZFS working directory (producer AND system) can be deleted.

Other job-related data will be retained in zookeeper to facilitate reporting.

```yml
# DELETE /jobs/states/completed/10-jid0001:
```

## Job: Failed --> DELETED (Admin Action)

If the batch is not yet completed, confirm that the user understands that job deletion will prevent notification of job-related information.

Upon deletion of a failed job, the job's zookeeper nodes and the ZFS working directory can be deleted.

```yml
# DELETE /jobs/jid0001/configuration:
# DELETE /jobs/jid0001/status: 
# DELETE /jobs/jid0001/priority: 
# DELETE /jobs/jid0001/ark: 
# DELETE /jobs/states/failed/10-jid0001:
# DELETE /batches/bid0001/states/batch-failed/jid0001:
```

## Job: Held --> DELETED (Admin Action)

If the batch is not yet completed, confirm tha tthe user understands that job deletion will prevent notification of job-related information.

Upon completion of a held job, the job's zookeeper nodes and the ZFS working directory can be deleted.

```yml
# DELETE /jobs/jid0001/configuration:
# DELETE /jobs/jid0001/status: 
# DELETE /jobs/jid0001/priority: 
# DELETE /jobs/jid0001/ark: 
# DELETE /jobs/states/held/10-jid0001:
# DELETE /batches/bid0001/states/batch-processing/jid0001:
```

## Batch: Processing --> Reporting (Automated by event)

Once the last job for a batch has either failed or completed, the batch will move to a reporting step.

```yml
# NOTE the absence of /batches/bid0001/states/batch-processing/*:
# NOTE check for the presence of /batches/bid0001/states/batch-failed/*:
# NOTE check for the presence of /batches/bid0001/states/batch-completed/*:
/batches/bid0001/status: 
  status: reporting
  last_modified: now
```

## Batch: Acquire Reporting Batch

### Create Lock
```yml
/batches/bid0001/lock: #ephemeral
```

### State Description

The reporting phase will gather a list of completed jobs for a batch and failed jobs for a batch.  
This will be compiled into a report for the depositor.

The list of failed jobs should be saved to a zookeeper node so their status can be re-evaluated for a subsequent report.

### Output

```yml
/batches/bid0001/status-report: 
  last_modified: now
  failed_jobs: 
  # array of jids
  successful_jobs:
  # array of jids
```

### Batch: Reporting --> Completed

```yml
/batches/bid0001/status: 
  status: completed
  last_modified: now
# DELETE /batches/bid0001/lock
```

### Batch: Reporting --> Failed

The reporting phase will gather a list of completed jobs for a batch and failed jobs for a batch.  
This will be compiled into a report for the depositor.

```yml
/batches/bid0001/status: 
  status: failed
  last_modified: now
# DELETE /batches/bid0001/lock
```

## Batch: Failed --> UpdateReporting (Admin Action)

This status change will be triggered by an administrative action.  This action indicates that attempts to troubleshoot failed jobs for a batch have concluded.

```yml
/batches/bid0001/status: 
  status: update-reporting
  last_modified: now
```

## Batch: Acquire Update Reporting Batch

### Create Lock
```yml
/batches/bid0001/lock: #ephemeral
```

### State Description

A subsequent report will be sent to the depositor indicating jobs that succeeded since the last report was sent.

It _might_ make sense to also indicate the jobs that were not resolved since the prior report was sent.

### Output

```yml
/batches/bid0001/status-report: 
  last_modified: now
  failed_jobs:
  # array of jids
  successful_jobs: 
  # array of jids
```

### Batch: UpdateReporting --> Completed

A subsequent report will be sent to the depositor indicating jobs that succeeded since the last report was sent.

```yml
/batches/bid0001/status: 
  status: completed
  last_modified: now
# DELETE /batches/bid0001/lock
```

### Batch: UpdateReporting --> Failed

```yml
/batches/bid0001/status: 
  status: failed
  last_modified: now
# DELETE /batches/bid0001/lock
```

## Batch: Failed --> DELETED (Admin Action)

An administrative action will trigger the delete of a failed batch (and any outstanding jobs for that batch).

This action should only be taken once all attempts at job recovery have been exhausted.

```yml
# DELETE /batches/bid0001/status: 
# DELETE /batches/bid0001/status-report: 
# DELETE /batches/bid0001/submission:
# for every JID in /batches/bid0001/states/batch-*/*:
#   DELETE /batches/bid0001/states/batch-completed/JID:
#   DELETE /jobs/states/STATE/*-JID if present
#   DELETE /jobs/JID/configuration:
#   DELETE /jobs/JID/status: 
#   DELETE /jobs/JID/priority: 
#   DELETE /jobs/JID/ark: 
```

## Batch: Held --> Deleted (Admin Action) 

An administrative action will trigger the delete of a held batch.

_Execute this step with caution since the depositor will not be notified of this action._

```yml
# DELETE /batches/bid0001/status: 
# DELETE /batches/bid0001/status-report: 
# DELETE /batches/bid0001/submission:
# for every JID in /batches/bid0001/states/batch-*/*:
#   DELETE /batches/bid0001/states/batch-completed/JID:
#   DELETE /jobs/states/STATE/*-JID if present
#   DELETE /jobs/JID/configuration:
#   DELETE /jobs/JID/status: 
#   DELETE /jobs/JID/priority: 
#   DELETE /jobs/JID/ark: 
```

## Batch: Completed --> Automatic Cleanup

Clean up the remnants of a properly completed batch.

```yml
# DELETE /batches/bid0001/status: 
# DELETE /batches/bid0001/status-report: 
# DELETE /batches/bid0001/submission:
# for every JID in /batches/bid0001/states/batch-completed/*:
#   DELETE /batches/bid0001/states/batch-completed/JID:
#   DELETE /jobs/states/STATE/*-JID if present
#   DELETE /jobs/JID/configuration:
#   DELETE /jobs/JID/status: 
#   DELETE /jobs/JID/priority: 
#   DELETE /jobs/JID/ark: 
```
