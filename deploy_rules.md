# Deployment Rules

_This is still a draft document.  The team has not yet reviewed this._

## General Guidelines
- Avoid releases on Thursday or Friday
  - Be especially careful before a holiday weekened or curtailment
- Post a note in #uc3-maint one day prior to the release
- Avoid releases before the responsible developer goes on vacation
- Activity that impacts Dryad should be scheduled between 4p - 6p
- We need to avoid being overly scrupulous about this window since it impacts our release velocity

| Service    | Coordinate with Dryad to Pause?       | Window     | Notes        |
| -----------| ------------------ | ---------- |----------------|
| Ingest     | No Pause           | 9-5p, M-W   |              |
| Store      | No Pause           | 9-5p, M-W   |              |
| Access     | Post FYI to #uc3-maint   | 9-5p, M-W   |              |
| Access Large     | N/A          | 9-5p, M-W   | Large Access Pause to be Introduced |
| Inventory  | No Pause           | 9-5p, M-W   | Local ID service |
| Replic     | No Pause           | 9-5p, M-Th AM   |              |          
| Audit      | No Pause           | 9-5p, M-Th AM   | Low risk     |          
| OAI        | Post FYI to #uc3-maint   | 9-5p, M-W   | No high avail option |          
| Sword      | Dryad Pause required     | 3-5p, M-W   | No high avail option |          
| UI         | Generally no       | 9-5p, M-W   |              |          
| Admin      | No Pause           | 9-5p, M-F   | Low risk     |
| mrt-cron   | No Pause           | 9-5p, M-F   |              | 
| EZID downtime |                 | 5-6a, Th    | Used when needed, Merritt Ingest is Paused |
| ZFS downtime |                  | 5-6a, Th.   | Used when needed, Merritt Ingest is Paused | 

## Supported Services

### Tomcat
- stop tomcat
- peform deploy of war (and current) in tomcat
- restart tomcat

### Ingest 
- Called from Sword and from Merritt UI 
- Current: uses Apache load balancer
- Soon: uses ALB
##### Deployment process
 - Check current ingest queue activity to make sure that a release is OK
    - Schedule an early pause of ingest if needed to ensure availability 
  - Pause ingest processing (queue)
    - Timing - should be permissible anytime
  - Optionally ask Dryad to pause ingests
    - If yes, perform release between 3pm - 5pm weekdays
  - Remove instances from laod balancer unless both Ingest and Dryad are paused
  - Confirm that processing is complete for instance
  - Stop instance
  - Deploy code
  - Restart instance
  - Re-add to load balancer if needed
  - Release hold on ingest queue / dryad 

### Storage
- Note: code changes deployed for Access or Storage should be kept in sync as quickly as possible since the code base is identical
- Called from Ingest 
- Current: uses Apache "RLB"
- Soon: uses ALB
##### Deployment process
 - Check current ingest queue activity to make sure that a release is OK
    - Schedule an early pause of ingest if needed to ensure availability 
  - Optionally pause ingest processing (queue)
    - Timing - should be permissible anytime
    - Is it feasible to do a high availability release with only 2 storage instances?
  - Optionally ask Dryad to pause ingests
    - If yes, perform release between 3pm - 5pm weekdays
  - Remove instances from laod balancer unless both Ingest and Dryad are paused
  - Confirm that processing is complete for instance
    - New ticket to be created to establish a mechanism for this
  - Stop instance
  - Deploy code
  - Restart instance
  - Re-add to load balancer if needed
  - Release hold on ingest queue / dryad 

### Access
- Note: code changes deployed for Access or Storage should be kept in sync as quickly as possible since the code base is identical
- Regular instances are called from Merritt UI
- Regular instances Use ALB
##### Deployment process
  - Timing: is there any reason to restrict timing to 3p - 5p window? 
  - Pause processing queue with a hold file
    - Currently, this must be done manually from the server.  No endpoint exists to control this from the admin tool.
    - The hold file only applies to assembly requests.  Pre-signed requests are processed immediately. 
    - For large requests, it is challenging to schedule this far in advance.  A separate hold file could be useful.
      - Hold file is applied host by host.  There is no shared disk.
  - Check current  queue activity to make sure that a release is OK
  - Remove regular instances from laod balancer before deployment
    - Confirm that processing is complete for instance
    - Stop instance
    - Deploy code
    - Restart instance
    - Re-add to load balancer
  - Large instance
    - Confirm that most process is complete for instance within reason.  It may be impossible to complete all tasks.
    - Stop instance
    - Deploy code
    - Restart instance
  - Release hold on queues 

### Inventory
- Load balancer exists for localid processing
- Endpoint exists to pause processing before deployment
- Must remove instances from zookeeper before deployment
- Must remove instances from the load balancer before deployment unless Ingest Queue and Dryad ingests are held
##### Deployment process
- stop zookeeper handling for server to be deployed
~~~
curl -X POST http://uc3-mrtsandbox2-stg:36121/mrtinv/service/stopzoo?t=xml
~~~
- deregister server in ALB
- confirm no activity using catalina.out/inv log
- stop and deploy and restart
- register server in ALB

### Replication
- No load balancer exists
  - The admin tool could make use of this if it existed 
- Endpoint exists to pause processing before deployment
##### Deployment process
- See Ashley Puppet deploy

### Audit
- No load balancer exists
  - The admin tool could make use of this if it existed 
- Endpoint exists to pause processing before deployment
##### Deployment process
- See Ashley Puppet deploy

### UI
- ALB exists
- The puppet deploy process makes an instance unavailable for 2-3 sec during deployment, so an ALB rotation is not done
  - The ALB removal could be implemented in the future
- Note that for now the Nuxeo processing depends on a UI instance 

### Admin Tool

### Database Schema Changes

### Mrt Cron

## Deprecated Services
- OAI
  - Not highly available
  - Impacts Dryad verification of deposit
- Sword
  - Not highly available
  - Requires Dryad to pause ingests
  - Beware of issues with the cert store 

---

## Enhancements to improve these processes
- Eliminate Apache RLB
- Automate load balancer removal with deployment process (maybe)?
- Control Access Server hold file via admin tool
- Introspect storage instances to detect work in progress
- Size-based controls of ingest processing
- Separate hold file for large access instance
- Disassociate Nuxeo processing from the Merritt UI
- Migrate local id processing from inventory to a lambda

## Related
- https://confluence.ucop.edu/pages/viewpage.action?spaceKey=UC3&title=Scheduled+Maintenance
