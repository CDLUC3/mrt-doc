# By Facet

## Big picture

### Want

- concentrate on tasks w/o reacting to crises

### Don’t want

- react to service problems

## Architecture/Ops

### Service management

#### Want

- painlessly add/remove instances from load balancer
- query current state of any service
- put services in “closing” state (finish existing jobs, don’t accept new ones)
- distinguish “state” from “status” from whatever
- add/remove/redeploy any instance of any service at will

#### Don’t want

- unnecessary backups
- manual reboots
- care whether there’s activity when doing maintenance
- care which services come up in which order (“Storage is the problem child”)
- manage Apache rewrite rules
- double & triple encode/decode URLs and ARKs
- run an LDAP server
- write stupid little Perl scripts

### Deployment

#### Want

- separate “service” from “server”
- hot-swap production environments (blue/green deployment)
- autoscale Merritt (up & down) / have services respond to demand

### Testing

#### Want

- realistic test environments & workloads, incl. heterogeneous storage
- test against production content (for scale)

## Administration

### Want

- trace jobs through workflow
- make it easy for customers to detect problems
- dashboard

### Don’t Want

- monitor the Ingest pipeline

## Services/Integrations

### Want

- ingest multiple versions of same object concurrently
- stop making local copies
- modernize logging

### Don’t Want

- tie other people’s environments to our QA environment
- support different access paths for Dash & eScholarship
- lock Ingest jobs to servers
- deal with the complexity of multiple storage technologies
- be constrained by the differing capabilities of multiple storage technologies
- have to re-ingest to move content
- spend six-month periods migrating services/content (Solaris→SUSE→AWS→Linux 2, local storage→SDSC→+NFS→S3→S3 RR→…)

## Collection management

### Want

- move objects between collections
- support large numbers of collections / hierarchical collections

### Don’t Want

- tie objects to collections
- duplicate info between database, LDAP, Ingest profiles
- manually manage collections / ingest profiles

## Scale

### Want

- handle very very large objects (&gt; 500 GB is hard; &gt; 1 TB can’t be downloaded; &gt; 10 TB is nearly impossible)
- handle the scale we’d get if storage was free

### Don’t Want

## Cost

### Want

- stop charging for storage (esp. stop charging libraries for dark archive)

### Don’t Want

- see people make bad preservation decisions due to cost
- see libraries & campuses afraid to use our services due to cost fears

# Action items

## Architecture/Ops

### Consolidate dev & stage environments

- proposal: shut down dev environment, keep stage, move dash-demo to production
- note: not everything with -dev is part of the “dev environment”
- need to coordinate with Dash

### Eliminate unnecessary backups

- See Pivotal ticket: https://www.pivotaltracker.com/story/show/160775775

