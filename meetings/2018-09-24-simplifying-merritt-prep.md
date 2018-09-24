# Simplifying Merritt: Preparatory notes

- [Framing questions](#framing-questions)
- [Amazon / IT resource footprint](#amazon--it-resource-footprint)
  - [AWS Costs](#aws-costs)
  - [Thoughts on AWS costs](#thoughts-on-aws-costs)
- [Effort / workload](#effort--workload)
  - [Best practices](#best-practices)
    - [Thoughts on best practices](#thoughts-on-best-practices)
  - [Environments](#environments)
    - [Thoughts on environments](#thoughts-on-environments)
  - [Big picture: Architecture](#big-picture-architecture)
    - [Thoughts on architecture](#thoughts-on-architecture)

## Framing questions

1.	What (with regard to Merritt) would you rather not have to do? Why do
    you have to do it?
2.	What would you like to do that you can't? Why not?

## Amazon / IT resource footprint

### AWS Costs

Largest [costs](https://github.com/dmolesUC3/merritt-aws/blob/master/Costs.ipynb)
by usage type:

1. disk space ('EBS')
   1. live usage (~$1850/mo)
   2. backups (~$1800/mo)
2. machines ('BoxUsage')
   1. c4.xlarge (~$900/mo)
   2. t2 & m4 (~$1000/mo)

By service:

1. storage (~$1800/mo)
2. replic, ingest, audit (~$900-$1000/mo ea.)
3. ui ($500/mo)
4. all misc. ($1000/mo)

### Thoughts on AWS costs

- what can we stop backing up _immediately?_
  - largest volumes / most expensive backups are usually `/dev/sdb`, whatever
    that is; presumably this is just working space, i.e. not configuration etc.?
- do all our boxes need to be as big as they are? (yes is a valid answer)
- how can we reduce our dependence on fixed storage?
  - pilot [EFS](https://aws.amazon.com/efs/) project for DPN: what metrics would we
    need in order to gather data from that, that would allow us to decide where EFS
    could fit into our regular workflow?
  - local copies / local storage
    - how often do uploads to S3 fail? to SDSC?
    - how often do downloads from S3 fail? from SDSC?
    - are there any other reasons we need local storage other than unreliability
      of cloud storage?
      - ZIP packaging of objects/versions for download
      - anything else?
    - what would we need to do to make cloud storage sufficiently reliable
      for audit, replication, ingest?

## Effort / workload

### Best practices

(**Note:** I'm leaning heavily on links to Martin Fowler because I know he's
not a crank, a snake oil salesman, or some random plagiarist on DZone. Other
people have also covered these topics well and may have somewhat different
definitions and recommendations -- contributions welcome.)

- [continuous integration](https://martinfowler.com/articles/continuousIntegration.html):
  - developers check in early and often
  - every checkin triggers a build
- [continuous delivery](https://martinfowler.com/bliki/ContinuousDelivery.html)
  - every service is always in a deployable state
  - tests prove every service to be production-ready
  - any developer can deploy any version of any service to any environment on demand
    (note that this includes rolling back on demand to previous versions)
- [DevOps culture](https://martinfowler.com/bliki/DevOpsCulture.html)
  - responsibility shared between development & opeations
  - development team shares the operations staff's pain & is responsible
    for helping reduce it
  - testing, configuration, and deployment as automated as possible

#### Thoughts on best practices

1. do we agree with these?
   - if/where we disagree, which concerns are about desirability, & which
     concerns are about feasibility?
2. where are we falling short?
3. where can we most quickly make progress?
4. where are we falling short even without automation?
   - no clear workflow for dev -> test -> production
   - no clear responsibility for testing
   - others?

### Environments

- what do we use our dev and stage environments for?
- how is dev different from stage?
- do we have the right mix of servers for each service and environment?
- are there ways we can simplify configuration and (hopefully) at the
  same time make our environments more consistent with production?

#### Thoughts on environments

- cost is overwhelmingly for production environments, but dev/stage add
  complexity
- if we were setting up dev and stage from scratch, what would we want/need?

### Big picture: Architecture

- promise of microservices ([Abrams et al.
  2010](https://services.phaidra.univie.ac.at/api/object/o:294039/diss/Content/get)):
  has it been fulfilled?

  > Since each of the services is small, they are collectively easier to
  > develop, deploy, maintain, and enhance. …
  >
  > Since the level of investment in and commitment to any given service
  > is small, they are more easily replaced when they have outlived their
  > usefulness.

- is Merritt a [distributed
  monolith](https://www.simplethread.com/youre-not-actually-building-microservices/)?
  - Spoiler: probably, in some ways, e.g. shared data store; less so in
    other ways, e.g. services can still mostly be redeployed independently
- Fowler on the "[microservice
  premium](https://martinfowler.com/bliki/MicroservicePremium.html)":

  > The microservices approach is all about handling a complex system, but
  > in order to do so the approach introduces its own set of complexities.
  > When you use microservices you have to work on automated deployment,
  > monitoring, dealing with failure, eventual consistency, and other
  > factors that a distributed system introduces. There are well-known ways
  > to cope with all this, but it's extra effort, and nobody I know in
  > software development seems to have acres of free time.

- Fowler on "[microservice
  tradeoffs](https://martinfowler.com/articles/microservice-trade-offs.html)",
  specifically ops:

  > While continuous delivery is a valuable skill for monoliths, one that's
  > almost always worth the effort to get, it becomes essential for a
  > serious microservices setup. There's just no way to handle dozens of
  > services without the automation and collaboration that continuous
  > delivery fosters. Operational complexity is also increased due to the
  > increased demands on managing these services and monitoring. Again a
  > level of maturity that is useful for monolithic applications becomes
  > necessary if microservices are in the mix.

- Fowler on "[microservice
  prerequisites](https://martinfowler.com/bliki/MicroservicePrerequisites.html)":
  - rapid provisioning (we don't have this)
  - basic monitoring (we probably have this)
  - rapid application deployment (yes and no)

#### Thoughts on architecture

1. what would we do differently, now that we have several years of experience?
2. what would our ideal Merritt architecture look like now?
3. how can we get closer to that?
