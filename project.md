## Category

| Category | Description | 
| -------- | ----------- |
| Operations | Items needing attention and monitoring|
| Maintenance Issues | Misc enhancement requests not associated with a larger effort|
| Content Project | Create collections, Nuxeo Feeds, Bulk Ingest efforts |
| Build Refactor | Iterative improvement of Java services, patch dependencies, Java version upgrades |
| Storage Admin | Storage node management and automation |
| Ingest Priority and Nuxeo | Improve ingest queue priortization and management of unpredictable workload sizes |
| Dryad - Normal Depositor | Enable Dryad to migrate from Sword deposit and OAI feed |
| Modernizing Deployments | Embrace devops practices to auto scale services - migrate from "running servers" to more modern concepts|
| Merritt API and Depositor Tools | Improve use of Merritt by depositors|
| Devops, Security, System Management | Adopt systems best practices|
| Preservation Practices | Adopt digital preservation best practices, support research/experimentation with digital preservation practices |
| Stage Cleanup | Eliminate obsolete stage objects, create well-understood stage content, improve automated testing in stage environment |
| Archive Notes | Capture old meeting notes - could the "archive" feature be used instead?|

## Build Refactor

- Cycle through mrt-core library eliminating out of date dependencies
  - Requires another pass at all services -- hopefully faster
- Eliminate unnecessary aws API's (core, ingest, cloud pull in ALL API's)
- Upgrade logging libraries for all java services --> Ashley's Open Search work
  - Write all logs to a common location (for queries)
  - Need to structure log entries with key data fields (collection, ark, storage node)
  - Enable searches across services and service instances
- ### Refine build process to match devops best practices
  - Ashley has lots of ideas, need time to define the future build
    - Consider Build on AWS rather than on Jenkins
    - Need to replace/rebuild our build server -- build to our current specifications
    - Utilize a published artifact repository
  - Automate the build of docker images as well as java artifacts
  - Refactor/simplify our maven build definitions to utilize these new workflows
  - Automatically build and test on a daily basis
- MySql version update - 2023 deadline
- Java 11 upgrade (and tomcat)
- Fast forward to Java 17

## Storage Admin (remaining work)

- Intended use of tools already built
  - Replicate to new dryad glacier node
- Delete object from admin tool
- Change primary storage node -- normalize "public" collections
- Misc enhancements to refine work from prior efforts

## Ingest Priority and Nuxeo

- Migrate Nuxeo from a brittle setup to a configuration that Eric can manage
- Allow ingest jobs to move from server to server
  - Large UCB ingests overwhelm and block jobs on a single server
- Use S3 rather than a shared file system (unless ZFS is viable) 
  - IAS and AWS rep seemed to suggest S3 as the recommended direction
- Size-based ingest queue prioritization 

## Dryad - Normal Depositor

- OAI functionality should be obsolete already -- Object Information Page
  - Waiting for confirmation from UCB that they have migrated to new mechanism 
- Migrate from Sword - make sure that Dryad deposits will not get starved in the Merritt Queue
  - Some work from "Ingest Priority and Nuxeo"
- Improve Ingest Callback to notify clients that inventory work is complete
  - UCB will likely like this as well   
- Eliminate OAI and Sword! 
- Replicate Dryad
  - Redploy services with new node
    - [ ] Replication: 6/14
    - [ ] Storage and Access:
    - [ ] Audit
    - [ ] Inventory
  - Start replication to Glacier   
  - Delete content from Wasabi

## Modernizing Deployments

- Replace Merritt services with AWS Lambda/Serverless where possible 
  - Pull some functions from Merritt UI, Merritt Inventory, Merritt Access
- Replace Merritt Servers with Merritt Docker containers where applicable (ingest, UI, storage)
- Retain "server" type deployment where it is still essential (audit, replic, access: assembly of object)
- Auto-scale to meet demands

## Merritt API

- No longer being treated as a priority.
- This would be a nice-to-have item for UCB, but we have been prioritizing the handling and control of large deposits over this work

## Devops, Security, System Management

- Good for informational review
- Any of these items could bubble higher in priority based on evolution of AWS account or guidance from IAS

## Preservation Practices

- It would be exciting to have bandwidth to focus on this.  Not as high of a priority as other items.

## Stage Cleanup

- Eliminate unneeded stage objects (modest savings)
- Automate regular traffic through stage to better identify software/configuration bugs
- Auto-purge of stage content to keep the environment fresh and relevant
