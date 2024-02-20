# Queue Administration

- [Design](README.md)

## Purpose
Migrate Queue Administration Tasks from Ingest to the Merritt Admin Tool

## Potential Enhancements to Enable Shift of Admin Functionality

### Read from Zookeeper from Admin Tool

- This is very do-able.
- Current ingest queue uses java property serialization.  This may be difficult for ruby code to read.
- Proposal: modify the Ingest Queue Item to be serialized as JSON instead

### Write to Zookeeper from Admin Tool

- This is very do-able.
- Assumes binary data can be written back as-is from ruby
- Proposal: modify the Ingest Queue Item to be serialized as JSON instead

### Publish Ingest Profiles as an Artifact

- Ingest service will pull profiles from a deployed artifact (zip file) rather than cloning git
- Admin tool code will pull profiles from a deployed artifact (zip file) rather than requesting data from ingest
- See https://github.com/CDLUC3/mrt-doc-private/issues/80

### ~Mount ZFS to Lambda~

- This is not recommended
- Conceptually, this could allow the remaining set of admin functions to be performed entirely from Lambda

## Existing Ingest Admin Endpoints

|service|admin endpoint|future loc|feature needed | comment|
|-|-|-|-|-| 
|ingest|/state| NA | |  /admin/state duplicates /state |
|ingest|/help| NA | | /admin/help duplicates /state |
|ingest|POST reset| ?? | | |
|ingest|/locks| admin| read zookeeper from admin| |
|ingest|/queues| admin | read zookeeper from admin | |
|ingest|/queues-acc| admin | read zookeeper from admin | |
|ingest|/queues-inv| admin | read zookeeper from admin | |
|ingest|/queue| admin | read zookeeper from admin| |
|ingest|/queue/{queue}| admin | read zookeeper from admin | diffult with current java property serialization |
|ingest|/queue-acc/{queue}| admin | read zookeeper from admin | |
|ingest|/queue-inv/{queue}| admin | read zookeeper from admin | |
|ingest|/lock/{lock}| admin |read  zookeeper from admin | |
|ingest|POST /requeue/{queue}/{id}/{fromState}| admin | write zookeeper from admin | |
|ingest|POST /deleteq/{queue}/{id}/{fromState}| admin | write zookeeper from admin  | |
|ingest|POST /cleanupq/{queue}| admin | write zookeeper from admin  | |
|ingest|POST /{action: hold or release}/{queue}/{id}| admin | write zookeeper from admin  | |
|ingest|POST /release-all/{queue}/{profile}| admin | write zookeeper from admin  | |
|ingest|{profilePath}| admin | profiles as artifact | |
|ingest|/profiles-full| admin| profiles as artifact | |
|ingest|/profile/{profile}| admin | profiles as artifact| |
|ingest|/profile/admin/{env}/{type}/{profile}| admin| profiles as artifact | |
|ingest|/bids/{batchAge}| ingest | mount zfs to lambda | keep in ingest |
|ingest|/bid/{batchID}| ingest | mount zfs to lambda | keep in ingest|
|ingest|/bid/{batchID}/{batchAge}| ingest | mount zfs to lamda | keep in ingest|
|ingest|/jid-erc/{batchID}/{jobID}| ingest| mount zfs to lambda | keep in ingest|
|ingest|/jid-file/{batchID}/{jobID}| ingest | mount zfs to lambda| keep in ingest|
|ingest|/jid-manifest/{batchID}/{jobID}| ingest | mount zfs to lambda|  keep in ingest|
|ingest|POST /submission/{request: freeze or thaw}/{collection}| admin | implement hold/freeze in ZK | |
|ingest|POST /submissions/{request: freeze or thaw}| admin | implement hold/freeze in ZK | |
|ingest|POST /profile/{type}| admin? | | Is this simply a template edit?  If so, could the admin tool do this?|
|access|POST /flag/set/access/#{qobj}|admin|write zookeeper from admin |Access Queue freeze/thaw|
|access|POST /flag/clear/access/#{qobj}|admin|write zookeeper from admin |Access Queue freeze/thaw|
