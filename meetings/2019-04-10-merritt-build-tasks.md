# 2019-04-10 Merritt build/deployment/cleanup tasks (proposed)

1. figure out how we want to install/manage third-party software (Jenkins,
   Maven, OpenJDK, Tomcat, LDAP, ZK...)
2. modernize Jenkins
   - add Jenkinsfiles to all Jenkins-built projects
   - set up dependent builds
     - determine all Jenkins job interdependencies
     - add/update Jenkins job interdependencies
3. introduce stable versions
   - determine versioning scheme
   - determine release process / tooling
   - in order from lowest-level project (no dependencies) to highest:
     - set any dependencies to stable versions, even in snapshot (e.g.
       mrt-ingest 1.0-SNAPSHOT depends on mrt-core 2.0, not 2.0-SNAPSHOT)
     - release stable version & bump snapshot version
4. third-party dependencies:
   - something something [Versions Maven Plugin](https://www.baeldung.com/maven-dependency-latest-version)

