# 2019-04-08: Merritt build/deployment objectives

## Goals

1. horizontal scalability -- easily spin up more servers or more containers
2. automatic builds (build on commit, build all dependent projects on success)
3. up-to-date (e.g. nightly) build environment for manual testing / automated
   integration testing
4. unit tests, style checks, etc.

## Problems

1. complexity of setting up new server

   current process:

   1. IAS sets up server
   2. Jim installs third-party software under role account (e.g. Tomcat)
   3. server-specific Tomcat config added as branch of
      [tomcat8_catalina_base](https://hg.cdlib.org/tomcat8_catalina_base)
   3. server hostname added as Capistrano "environment" under
      [mrt-tomcat/config/deploy](https://hg.cdlib.org/mrt-tomcat/files/default/config/deploy)
   4. Mark logs into server, clones repo, runs `cap <server-env> deploy`;
      Capistrano:
      - pulls Tomcat config from `tomcat8_catalina_base`
      - pulls WAR from Jenkins
   5. Mark or Jim figures out what type of load balancing mechanism we're
      using for this service, adds the server to it

2. lack of visibility into what's deployed where and what's not /
   traceability

   goal: from server:

   - trace WAR to specific Jenkins build & git commit
   - trace each JAR in the war to specific Jenkins build & git commit
   - include info such as:
     - JDK version used
     - JRE version targeted
     - 3rd-party dependency versions

3. stale third-party dependencies

4. purely manual build ⇒ no incentive to write unit tests

## Outline of release process

- See [Maven release plugin notes](../reports/2019-04-09-mvn-release-plugin.md)
