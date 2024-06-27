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

```bash
mvn deploy:deploy-file -Durl=${CODEARTIFACT_URL} -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java -Dfile=$(ls audit-it/target/mrt-audit-it-*.war)
mvn deploy:deploy-file -Durl=${CODEARTIFACT_URL} -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java -Dfile=$(ls audit-war/target/mrt-auditwarpub-*.war)
```

TO

```bash
mvn deploy:deploy-file -Durl=${CODEARTIFACT_URL} -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java -Dfile=$(ls audit-it/target/mrt-audit-it-*.war) -Dversion=2.0.0
mvn deploy:deploy-file -Durl=${CODEARTIFACT_URL} -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java -Dfile=$(ls audit-war/target/mrt-auditwarpub-*.war) -Dversion=2.0.0
```

## Identifying the Tag/Branch for a build

https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html

Note that we are not using webhooks, so the following cannot be used. `CODEBUILD_WEBHOOK_TRIGGER`

If we perform a `full clone`, we can use git commands to identify branch and tag names.
yaml
```
              Configuration:
                BranchName: main
                ConnectionArn: !Ref CodeStarConnectionArn
                FullRepositoryId: !Ref RepositoryName
                OutputArtifactFormat: CODEBUILD_CLONE_REF
```

## Git Commands to extract branch and tag

```bash
BRANCHTAG=`git describe --tags --exact-match 2> /dev/null || git symbolic-ref -q --short HEAD || git name-rev $(git rev-parse --short HEAD) | cut -d' ' -f2 || git rev-parse --short HEAD`
```

## Publish with tag

```bash
mvn -ntp clean install
if [[ "${BRANCHTAG}" == "main" ]]
then
  SEMVER=''
elif [[ "${BRANCHTAG}" == "codebuild" ]]
then
  SEMVER=''
else
  SEMVER="-Dversion=${BRANCHTAG}"
fi
echo "Semver $SEMVER"
mvn -ntp deploy:deploy-file -Durl=${CODEARTIFACT_URL} -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java -Dfile=$(ls audit-it/target/mrt-audit-it-*.war) ${SEMVER}
mvn -ntp deploy:deploy-file -Durl=${CODEARTIFACT_URL} -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java -Dfile=$(ls audit-war/target/mrt-auditwarpub-*.war) ${SEMVER}
```

### V2 Pipeline Needed for Tag Tracking

<img width="1269" alt="image" src="https://github.com/CDLUC3/mrt-doc/assets/1111057/02a72896-9309-41ab-a0d5-f8d38fdcbcb1">
