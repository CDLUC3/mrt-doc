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
|Repo|Type|Unit|Integ|Notes|
|-|-|-|-|-|
|mrt-inventory|type|unit|integ|notes|
|mrt-ingest|type|unit|integ|notes|
|mrt-audit|type|unit|integ|notes|
|mrt-replic|type|unit|integ|notes|
|mrt-store|type|unit|integ|notes|
|mrt-cloud|type|unit|integ|notes|
|mrt-core2|type|unit|integ|notes|
|mrt-zk (Java)|type|unit|integ|notes|
|mrt-zk (Ruby)|type|unit|integ|notes|
|mrt-dashboard|type|unit|integ|notes|
|mrt-admin-lambda|type|unit|integ|notes|
|uc3-ssm|type|unit|integ|notes|
|mrt-atom|type|unit|integ|notes|
|mrt-cron|type|unit|integ|notes|
|mrt-ingest-ruby|type|unit|integ|notes|
|mrt-admin-sinatra|type|unit|integ|notes|
|s3-sinatra|type|unit|integ|notes|
|uc3-etds|type|unit|integ|notes|
|mrt-locust|type|unit|integ|notes|
|mrt-integ-tests|type|unit|integ|notes|

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
- merritt-docker
- mrt-repo-tagger
