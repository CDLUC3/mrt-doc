# Merritt storage access 2018-09-11

(Stephen, David L., David M., Mark, Jim, Perry)

- [Background](#background)
- [The issue](#the-issue)
- [Questions](#questions)
- [Options](#options)
- [Opinions](#opinions)
- [Action items](#action-items)

## Background

Current storage back-ends:

1. CDL’s S3 bucket
   - access control by Amazon IAM roles
   - open to all servers in CDL EC2 group
2. SDSC Swift/OpenStack
   - access by key and secret
   - public: open to any server configured w/credentials
3. UNM Cloudhost
   - access control by firewall / IP address
   - open only to Merritt storage hosts

In progress:

1. UCSB Cloudhost
   - access control by firewall / IP address
   - open only to Merritt storage hosts
2. Dryad's S3 bucket
   - access control by IP range/list
   - open only to Merritt storage hosts

Long term:

- other S3 buckets
- other cloud storage providers
- other Cloudhost installations
- esoterica: Dat, LOCKSS, Zenodo

## The issue

Storage is not the only service that needs access to stored content — Audit
and Replication also need access. (The Inventory service, at least currently,
always goes through the Storage service, so it's not as much of an issue.)

Files at UNM are not replicated, but they are audited. For those files, the
Audit service has to access them via the Storage service.

Our official direction is toward more copies preserved on more free storage
provided by more external partners -- the problem is only going to get
worse.

## Questions

1. What are the different options we have available for facilitating access
   to different storage backends?
2. What are the tradeoffs, both:
   1. technically (performance, scalability, etc.) and
   2. operationally (complexity, management overhead, dealing w/IT
      departments, etc.)?
3. How can we get closest to turnkey solutions both 
   1. for external partners asking about security and
   2. for ourselves managing services?

## Options

1. [Open back\-ends up to more IPs](#open-back-ends-up-to-more-ips)
1. [Use Storage service to retrieve content](#use-storage-service-to-retrieve-content)
1. [Add audit &amp; replication functionality to Storage service](#add-audit--replication-functionality-to-storage-service)
1. [Run a web proxy](#run-a-web-proxy)
1. [Use an Amazon web proxy service](#use-an-amazon-web-proxy-service)
1. [Open outside S3 buckets to entire EC2 group](#open-outside-s3-buckets-to-entire-ec2-group)
1. [Run a network\-level proxy or gateway](#run-a-network-level-proxy-or-gateway)
1. [Use a network\-level Amazon proxy or gateway service](#use-a-network-level-amazon-proxy-or-gateway-service)

### Open back-ends up to more IPs

Pros:

- just works
- no code/configuration changes
- direct access = minimize load & latency

Cons:

- more administrative overhead
- makes partner IT unhappy (cf. UNM)
- limits our flexibility (hard to add/remove/change servers)
- "success is a problem" -- overhead gets worse the more partners we bring
  on board

### Use Storage service to retrieve content

(as Audit at UNM)

Pros:

- already proven at UNM
- original Merritt design, still used by inventory
- shorter IP list since it's only storage

Cons:

- load on storage servers
- up to 2x latency
- 2x local temporary copies (& associated disk space)
- storage becomes a bottleneck
- still a fixed list of IPs
- overhead still scales linearly w/number of partners

### Add audit & replication functionality to Storage service

Pros:

- data still only has to be downloaded/copied once
- storage already has replication functionality
- shorter IP list since it's only storage

Cons:

- code changes on storage, audit, & replication
- storage still a bottleneck
- still a fixed list of IPs
- overhead still scales linearly w/number of partners
- may need to add storage servers, in which case IP list grows again

### Run a web proxy

(e.g.
Apache+[mod_proxy](http://httpd.apache.org/docs/current/mod/mod_proxy.html),
Apache [Traffic Server](https://trafficserver.apache.org/),
[nginx](https://nginx.org/en/), on an EC2 instance with a single IP)

Pros:

- single IP
- no code/configuration changes in services
- no duplicate local copies
- could run other services on same box (w/same IP) if necessary

Cons:

- single point of failure / potential bottleneck
- admin / management of proxy server
- learning curve
- some network configuration for services
- HTTP(S) only

### Use an Amazon web proxy service

(assuming one exists)

Pros:

- single IP
- no code/configuration changes in services
- no duplicate local copies

Cons:

- cost
- dependent on Amazon
- black box
- admin / management of proxy server
- learning curve
- some network configuration for services
- HTTP(S) only

### Open outside S3 buckets to entire EC2 group

Pros:

- proven: works like our existing S3 bucket

Cons:

- too open (partner IT unlikely to be happy)
- only works for S3
- IAS may not approve

### Run a network-level proxy or gateway

Pros:

- single IP
- no code/configuration changes in services
- no duplicate local copies
- not limited to HTTP(S)

Cons:

- single point of failure / potential bottleneck
- admin / management of proxy server
- learning curve
- some network configuration for services

### Use a network-level Amazon proxy or gateway service

(assuming one exists)

Pros:

- single IP
- no code/configuration changes in services
- no duplicate local copies
- not limited to HTTP(S)

Cons:

- cost
- dependent on Amazon
- black box
- admin / management of proxy server
- learning curve
- some network configuration for services

## Opinions

Stephen:

- proxy options are the only ones that achieve the goal of minimizing the
  number of IPs & outside administrative overhead, & don't get worse w/scale

David L.:

- need more info on AWS solutions & on proxy servers / gateways

David M.:

- proxy servers / gateways seem like the right solution / right level of
  the stack to handle this at
- nervous about depending on AWS & about managing AWS configuration

Mark:

- a single IP is a much better story -- long lists of IPs make it look
  like we haven't done our homework
- minimize the number of IPs

Jim:

- "plan for success"
- proxy servers/gateways seem like the way to go

Perry:

- we need a solution that works
- whatever we pick, we need test environments that better reflect
  production both in configuration and scale

## Action items

1. target end of year or earlier for long-term solution
2. short term plans:
  - UCSB:
    - have audit and replication use storage for access (as with audit at UNM)
    - make it clear this is short term
  - Dryad:
    - long-term solution should be ready before Dryad goes into production
    - audit and replication don't need to be on line for current Dryad development
3. this sprint:
   - talk to IAS & investigate Amazon options
   - investigate proxy & gateway software

