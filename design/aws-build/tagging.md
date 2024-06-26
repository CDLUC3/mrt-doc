# CodeArtifact Tagging for Merritt

- [Design](README.md)

## Merritt JAR Versioning

- Non-breaking changes SHOULD NOT update snapshot versions.
- Breaking changes SHOULD update snapshot versions.
  - This will necessitate update of SNAPSHOT references in our 5 java services.
  - Consider registring Merritt JAR versions in the BOM files.
 
## Update JAR Version

```
bash-4.2$ pwd
/apps/dpr2/merritt-workspace/tbrady/merritt-docker/mrt-services/dep_zk/mrt-zk
bash-4.2$ mvn release:update-versions
[INFO] Scanning for projects...
[INFO] 
[INFO] ---------------------< org.cdlib.mrt.zk:MerrittZK >---------------------
[INFO] Building Test 1.0
[INFO] --------------------------------[ jar ]---------------------------------
[INFO] 
[INFO] --- maven-release-plugin:2.5.3:update-versions (default-cli) @ MerrittZK ---
What is the new development version for "Test"? (org.cdlib.mrt.zk:MerrittZK) 1.1-SNAPSHOT: : 
```

Check in POM change to github.

## Update WAR Version

WAR file snapshot changes can be updated as listed above.

## WAR File Tagged Release

In `buildspec.yml`, change

```
      - mvn deploy:deploy-file -Durl=${CODEARTIFACT_URL} -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java -Dfile=audit-it/target/mrt-audit-it-1.0-SNAPSHOT.war
      - mvn deploy:deploy-file -Durl=${CODEARTIFACT_URL} -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java -Dfile=audit-war/target/mrt-auditwarpub-1.0-SNAPSHOT.war
```

TO

```
      - mvn deploy:deploy-file -Durl=${CODEARTIFACT_URL} -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java -Dfile=audit-it/target/mrt-audit-it-1.0-SNAPSHOT.war -Dversion=2.0.0
      - mvn deploy:deploy-file -Durl=${CODEARTIFACT_URL} -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java -Dfile=audit-war/target/mrt-auditwarpub-1.0-SNAPSHOT.war -Dversion=2.0.0
```

TODO: can we trigger the insertion of the version if a new tag is created?

https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html

See `CODEBUILD_WEBHOOK_TRIGGER`

### V2 Pipeline Needed for Tag Tracking

<img width="1269" alt="image" src="https://github.com/CDLUC3/mrt-doc/assets/1111057/02a72896-9309-41ab-a0d5-f8d38fdcbcb1">
