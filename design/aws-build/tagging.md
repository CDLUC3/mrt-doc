# CodeArtifact Tagging for Merritt

- [Merritt AWS Build Design](README.md)

## General Guidelines

- Non-breaking changes SHOULD NOT update snapshot versions.
- Breaking changes SHOULD update snapshot versions.


## Use Cases

1. Non-breaking change to Merritt Service
2. Non-breaking change to Merritt Library
3. Breaking/significant change to Merritt Service
4. Breaking/significant change to Merritt Library

## Non-breaking change to Merritt Service
- Update Merritt Service repo code
- Tag Merritt Service in github with semantic version (2.3.4)
- Deploy service using semantic tag

## Non-breaking change to Merritt Library
- Update Merritt Service library code
- Tag each Merritt Service that depends on the library in order to trigger a new release
  - ingest 2.3.5
  - store 2.0.2
- Deploy each service using the semantic tag  

## Breaking/significant change to Merritt Service
- Run `mvn release:update-versions` to update the snapshot(s) for the service.
- Committ the change to pom.xml
- Update Merritt Service repo code.
- TODO: reduce the number of artifact for each service.
- Tag Merritt Service in github with semantic version (2.3.4)
- Deploy service using semantic tag

## Breaking/significant change to Merritt Library
This is the most complicated scenario.  This will also make it easier to keep services consistent with the appropriate version of a jar file.

- TODO: document the purpose intention of each snapshot somewhere?

### Update the appropriate library/libraries
- Run `mvn release:update-versions` to update the snapshot(s) for the library/libraries being modified.
- Commit the change to pom.xml

### Update Merritt snapshot version number in ALL dependent libaries and Merritt Services
- Update all the dependent pom.files

### Tag new versions for each service
- Tag new versions for each service
- Deploy each service using semantic tag

## Commits and Trigges

### JAR file repos (mrt-core2, mrt-cloud, mrt-zk)
- Commit to BRANCH `main`:
  - 3.0-SNAPSHOT.jar in CodeArtifact
- Commit to other BRANCH:
- TAG commit (other than `sprint-*)`
### WAR file repos (mrt-audit, mrt-ingest, mrt-inventory, mrt-store, mrt-replic)
- Commit to BRANCH `main`:
  - 3.0-SNAPSHOT.war in CodeArtifact
  - image:dev in ECR
- Commit to other BRANCH:
- TAG commit (other than `sprint-*)`
### Rails (mrt-dashboard)
- Commit to BRANCH `main`:
  - image:dev in ECR
- Commit to other BRANCH:
- TAG commit (other than `sprint-*)`
### Lambda (mrt-admin-lambda)
- Commit to BRANCH `main`:
  - image:latest for base images  
  - image:main for lambda images (admintool, colladmin, cognito)
- Commit to other BRANCH:
- TAG commit (other than `sprint-*)`
### Other Docker (merritt-docker, mrt-integ-tests)
- Commit to BRANCH `main`:
  - image:dev in ECR    
- Commit to other BRANCH:
- TAG commit (other than `sprint-*)`
