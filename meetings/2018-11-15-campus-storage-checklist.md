# Setting up storage nodes:

- IAS gets us access to campus storage (or S3) from our servers
  - open certain ports to certain servers (or provide bucket access from certain servers)
  - TODO: revisit API Gateway etc.
- Campus gives us URL + credentials, or S3 bucket name
- David adds/edit config files in 
   [`mrt-conf-prv/s3-conf`](https://github.com/cdlib/mrt-conf-prv/tree/master/s3-conf/src/main/resources/nodes)
- Rebuild config JAR
- Redploy services
- David edits can-info.txt on server(s)
  - TODO: get those into source control
- storage nodes don't exist in inventory DB until something's been ingested;
  then Inventory service creates records in:
  - `inv_nodes`
  - `inv_collections_inv_nodes` (primary)
  - TODO: David L to walk us through that

# Setting up collection & ingest profiles

- collections (in DB)
  - mint an ARK
  - owner
  - admin objects
- ingest profile
  - incl. ARK, collection ID, primary storage node ID
- collections (in LDAP)
  - ? Perry
- secondary storage node(s) in DB
  - `inv_collections_inv_nodes` (secondary)

# TODO: define test suite

- database queries to figure out ballpark replication queue?
- add as application metric?

# Draft checklist

- contact info for when something goes wrong on campus end
- access control
  - S3 etc.
    - Merritt sends credentials?
    - Merritt IP addresses whitelisted?
  - campus servers
    - campus storage open to merritt services: storage, replication, audit
      - stage
      - production
    - campus storage HTTPS/TLS connection from Merritt services works
      - tell campus it's an option if they want it
- storage node
  - credentials from the campus (if any)
    - stage
    - production
  - endpoint URL or S3 bucket name from the campus
    - stage
    - production
  - storage node added to inventory
    - stage
    - production
- nagios monitors
  - set up and test:
    - storage: state check for node
      - stage
      - production
    - remote cloudhost (if any): state check
      - stage
      - production
      - include campus contact on failure notifications?
    - remote minio (if any) (S3 list command or similar)?
      - stage
      - production
      - include campus contact on failure notifications?

