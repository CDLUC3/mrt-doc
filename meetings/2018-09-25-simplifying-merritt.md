# 2018-09-25: Simplifying Merritt

See:

- [preparatory notes](2018-09-24-simplifying-merritt-prep.md)
- [whiteboard / meeting notes](https://docs.google.com/document/d/1-45bYKxiyDlJx5LrJIbMdPzPYXX8ALon6sQDVspIJLM/edit) (Google Docs)

## Issues

### Reactive process

We want to be able to concentrate on tasks rather than be constantly
reacting to crises & service problems.

We also have a problem with jumping onto tasks prematurely because
they happen to be a topic of conversation, or because some outside
stakeholder is suddenly ready for us or suddenly taking an interest.

#### Action items / questions to answer

1. crises
   - what can we learn from past crises?
   - what can we do to reduce the frequency of crises?
   - do we have a clear sense of what's a crisis and what's not?
   - what can we do to handle crises better when they arise, to minimize
     impact on the team?
2. lack of focus
   - are we setting priorities clearly?
   - what causes us to jump on new tasks out of order?
   - who should be managing the schedule / gatekeeping outside requests?
   - are there bigger questions we need to answer about how we decide what
     to work on?

### Service management

#### Deployment

We want to be able to add/remove/redeploy any instance of any service at
will. Obstacles to that include:

- complexity of deployment/configuration
  - configuration of individual servers (e.g. repository/node directories on storage)
  - configuration of communication between services (mostly load-balanced, sometimes server-locked)
    - what's server-locked (in configuration) besides UNM? UCSB?
    - note that we can probably remove UNM storage early next year
  - per-server Capistrano environment configurations
- complexity of managing load balancers (ALB, ELB, Apache)
- complexity of startup process
  - order dependence of services (everything depends on storage)
- fragility of long-running processes
- difficulty of determining current state of the system
- lack of orderly shutdown process (no "closing" state that can finish
  existing work without accepting new work)

Note that these same issues also make it difficult or impossible for us to
move to automatic patching / restarts.

##### Action items / questions to answer

Some long-term goals:

- [blue/green deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html)
- [continuous delivery](https://martinfowler.com/bliki/ContinuousDelivery.html)

Short- to medium-term action items (as much as possible before move to Linux 2):

1. for each service, figure out what's involved in setting up a new instance
   & make a checklist (to some extent these may already exist)
   - system configuration, packages, etc.
   - additional software installation (Tomcat?)
   - Merritt software
     - build
     - deployment
     - configuration
   - Apache and/or ALB
2. figure out *how* we want to add/remove/redeploy services (ideally)
   - some combination of Puppet and Capistrano?
   - target audience: Jim? Mark? Perry?
3. identify places where we assume a certain fixed set of servers
   - load balancers
   - Capistrano environments
   - UNM storage nodes (note: we can probably remove these early next year)
   - ???
4. for each service and server, make sure all (production) configuration is
   under source control
5. for each service:
   - identify obstacles to fully automated setup
   - make a plan to remove those obstacles

(One idea, per Jim: a small 'bootstrap' instance with one of every service)

Longer term action items:

- introduce "closing" state for orderly shutdown
  - may require coordination between services & load balancers?
- when services are unavailable, time out & retry gracefully
- simplify state determination
- figure out how not to lock ingest jobs to servers (more on that below)

Q: Do we need a 'starting' state as well as a 'closing' state?

(Note: we should figure out which of these are either lowest-hanging fruit or most
bang for the buck, and prioritize those)

#### Complexity

Apache

- 65 distinct rewrite rules
- multiple roles: load balancer, front end, URL munger...?
- leads to double or triple encoding/unencoding

LDAP

- authentication (username/password)
- authorization (user permissions by collection)
- user profile metadata (name, phone, etc.)
- UI (`mrt-dashboard`) code is inconsistent in its use of LDAP vs. database for collections

##### Action items / questions to answer

Apache:

- are there any rewrite rules we can already remove?
- is anything going through Apache that doesn't need to?
- what are the obstacles to eliminating Apache entirely?

LDAP:

- is there an auth/auth solution that:
  1. can be based on the inv database
  2. can work with Rails (ideally with Devise, cf. DMPTool)
  3. can replace LDAP auth/auth in `mrt-sword` and `mrtexpress`?
- if `mrt-sword` and `mrtexpress` already talk to the inv database,
  maybe we can move the authorization piece and keep LDAP just for
  authentication, as a first step

### Local copies

Making local copies limits the size of objects we can handle, introduces
complexity (e.g. locking ingest jobs to servers), probably increases costs
(storage on each server), and may reduce performance (at least in some
scenarios).

#### Action items / questions to answer

Questions:

- In the past we've said we have to make local copies because services / the network are
  unreliable.
  - just how unreliable are they? can we quantify that?
  - where can we mitigate w/retries etc., and where is that not possible?

Straw proposal:

- Ingest
  - stream uploads directly to S3 (even for collections where S3 is not primary)
  - return S3 URLs instead of ingest server URLs
- Storage
  - uploads:
    - abstract move/copy/store operation across different combinations of storage:
      - S3 -> same S3 bucket: no-op
      - S3 -> different S3 bucket: use s3 sync, verify, delete
      - S3 -> OpenStack: stream instead of making local copy
        - maybe use [rclone](https://rclone.org/)?
      - S3 -> Cloudhost: stream instead of making local copy
        - create [pre-signed URL](https://docs.aws.amazon.com/AmazonS3/latest/dev/ShareObjectPreSignedURL.html)
          & pull from Cloudhost side?
    - downloads:
      - Use `ZipOutputStream` to stream large zip files directly to network
- Audit
  - stream directly from storage
- Replication
  - from S3: see above under storage/uploads
  - OpenStack -> S3: stream instead of making local copy
    - maybe use [rclone](https://rclone.org/)?
  - Cloudhost -> S3: just don't support it?

Alternatives / other areas to explore:

- use [s3fs-fuse](https://github.com/s3fs-fuse/s3fs-fuse/wiki/Fuse-Over-Amazon)
  to provide an S3-backed "local" filesystem
- look at [Dat](http://datproject.org/) and/or other alternatives to straight HTTP
  for large file transfers

Are there other issues unique to each service that need to be addressed?

### Scale

We want to be able to handle very very large objects -- currently > 500 GB
is hard, > 1 TB can't be downloaded; > 10 TB is nearly impossible.

Issues include:

- factors out of our control on the submitter's side
- local copies for ingest, storage, audit & replication
- ????

#### Action items / questions to answer

- don't make local copies
- look at [Dat](http://datproject.org/) and/or other alternatives to straight HTTP
  for large file transfers
- other issues?

