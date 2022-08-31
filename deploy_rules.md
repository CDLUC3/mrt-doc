# Deployment Rules

_This is still a draft document.  The team has not yet reviewed this._

## General Guidelines
- Avoid releases on Thursday or Friday
  - Be especially careful before a holiday weekened or curtailment
- Avoid releases before the responsible developer goes on vacation
- Activity that impacts Dryad should be scheduled between 4p - 6p
- We need to avoid being overly scrupulous about this window since it impacts our release velocity

## Supported Services

### Ingest 
- Called from Sword and from Merritt UI 
- Current: uses Apache load balancer
- Soon: uses ALB
- Deployment process
 - Check current ingest queue activity to make sure that a release is OK
    - Schedule an early pause of ingest if needed to ensure availability 
  - Pause ingest processing (queue)
    - Timing - should be permissible anytime
  - Optionally ask Dryad to pause ingests
    - If yes, perform release between 4pm - 6pm weekdays
  - Remove instances from laod balancer unless both Ingest and Dryad are paused
  - Confirm that processing is complete for instance
  - Stop instance
  - Deploy code
  - Restart instance
  - Re-add to laod balancer if needed
  - Release hold on ingest queue / dryad 

### Storage
- Note: code changes deployed for Access or Storage should be kept in sync as quickly as possible since the code base is identical
- Called from Ingest 
- Current: uses Apache "RLB"
- Soon: uses ALB
- Deployment process
 - Check current ingest queue activity to make sure that a release is OK
    - Schedule an early pause of ingest if needed to ensure availability 
  - Optionally pause ingest processing (queue)
    - Timing - should be permissible anytime
    - Is it feasible to do a high availability release with only 2 storage instances?
  - Optionally ask Dryad to pause ingests
    - If yes, perform release between 4pm - 6pm weekdays
  - Remove instances from laod balancer unless both Ingest and Dryad are paused
  - Confirm that processing is complete for instance
    - New ticket to be created to establish a mechanism for this
  - Stop instance
  - Deploy code
  - Restart instance
  - Re-add to laod balancer if needed
  - Release hold on ingest queue / dryad 

### Access
- Note: code changes deployed for Access or Storage should be kept in sync as quickly as possible since the code base is identical
- Regular instances are called from Merritt UI
- Regular instances Use ALB
- Deployment process
  - Timing: is there any reason to restrict timing to 4p - 6p window? 
  - Pause processing queue with a hold file
    - Currently, this must be done manually from the server.  No endpoint exists to control this from the admin tool.
    - The hold file only applies to assembly requests.  Pre-signed requests are processed immediately. 
    - For large requests, it is challenging to schedule this far in advance.  A separate hold file could be useful.
  - Check current  queue activity to make sure that a release is OK
  - Remove regular instances from laod balancer before deployment
    - Confirm that processing is complete for instance
    - Stop instance
    - Deploy code
    - Restart instance
    - Re-add to laod balancer
  - Large instance
    - Confirm that most process is complete for instance within reason.  It may be impossible to complete all tasks.
    - Stop instance
    - Deploy code
    - Restart instance
  - Release hold on queues 

### Inventory

### Replication

### UI

### Admin Tool

### Database Schema Changes

## Deprecated Services
- OAI
  - Not highly available
  - Impacts Dryad verification of deposit
- Sword
  - Not highly available
  - Requires Dryad to pause ingests
  - Beware of issues with the cert store 
 
