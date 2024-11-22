# Testing in Merritt

[Merritt Documentation Home](README.md)

## Types of Testing
- Data Consistency Testing
  - Data validation checks run on a daily basis.  The status of each check is reported to a dashboard. 
- Unit Tests
  - Automated tests bundled within a code base.  May be run as a part of the build. 
- Integration Tests
  - Automated tests bundled within a code base that rely on the start/stop of an external service (database, cloud, queue).  May be run as a part of the build. 
- End to End Testing
  - Automated tests that initiate actions across a Merritt microservice stack (stage or production).  All tests are initiated and validated through the Merritt UI.
- Performance Testing
  - Automated tests that send traffic to a specific service in stage or production.  Response times are evaluated against a pre-set standard.
- Load Testing
  - Automated tests that initate a predictable load against Merritt back-end services.  Test results are manually verified OR are verified through data consistency checks.
- Continuous Deployment
  - TODO: will be implemented for microservices once they are migrated to the UC3 account.  
 
## Scheduled Tests
- Data Consistency Tests are initiated by cron on the Merritt batch server.
- Scheduled Builds (via AWS Event Bridge Schedules)
  - Several Merritt repositories are re-built on a daily basis.  Each build may trigger unit tests and integration tests.
  - End to End Tests are executed as a scheduled build
  - Performance Tests are executed as a secheduled build
 
## Triggered Tests
- GitHub actions test
  - Tests executed by GitHub actions that provide immediate feedback to the committer
- Code Pipeline Triggers
  - OnPush tests: executed when a commit is made
  - OnTag tests: executed when a git tag is pushed
 
## Manual Tests
- Tests that are executed by manual action
- These tests may require the initiation of specific services in order to perform the test

## Types of Tests by Repository

### Production Code
|Repo|Type|Unit|Integ|Notes|Todo|
|-|-|-|-|-|-|
|mrt-inventory|java service|limited tests|docker maven tests|rebuilt daily and on push||
|mrt-ingest|java service|tests exist|docker maven tests|rebuilt daily and on push||
|mrt-audit|java service|tests exist|docker maven tests|rebuilt daily and on push||
|mrt-replic|java service|na|docker maven tests|rebuilt daily and on push||
|mrt-store|java service|limited tests|docker maven tests|rebuilt daily and on push||
|mrt-cloud|java library|tests exist|docker maven tests|rebuilt on push||
|mrt-core2|java library|tests exist|n/a|rebuilt on push||
|mrt-zk (Java)|java library|limited tests|extensive tests - java and ruby parity|rebuilt on push||
|mrt-zk (Ruby)|ruby library|limited tests|extensive tests - java and ruby parity|manually tested|automate ruby tests|
|mrt-dashboard|ruby service|unit|integ|tests on push (GitHub); image rebuilt daily||
|mrt-admin-lambda|ruby lambda||run manually against stage|daily consistency checks||
|uc3-ssm|ruby library||integ|notes||
|mrt-atom|standalone app||integ|notes|migration needed|
|mrt-cron|standalone app|unit|integ|notes|migrate to AWS batch|
|mrt-ingest-ruby|ruby library|unit|integ|notes||
|mrt-admin-sinatra|ruby lambda|||not yet deployed||
|s3-sinatra|ruby lambda|||run on demand||
|uc3-etds|standalone system|unit|integ|notes|deprecated|
|mrt-locust|test driver|||tests run daily||
|mrt-integ-tests|test driver|||docker images rebuilt daily; tests run daily||
|merritt-docker|test docker images|||docker images rebuilt daily||

### Support Code and Documentation
- mrt-doc
- mrt-doc-private
- File-Analyzer
- mrt-box
- mrt-maint
- mrt-tomcat
- mrt-ingest-profile
- merritt_ldap_tools
- mrt-ansible-service-restart
- mrt-sceptre
- mrt-tomcat-deploy
- mrt-service-release-manifest
- mrt-repo-tagger
