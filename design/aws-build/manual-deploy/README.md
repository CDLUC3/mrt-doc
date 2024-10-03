# Manual Deployment of WAR files

- [Merritt AWS Build Design](../README.md)

## Sample Deployment Commands

### Pre-requisites
- Sign into AWS SSO
- Set Code Artifact Token
```
export AWS_ACCOUNT_ID=...
export CODEARTIFACT_URL=https://cdlib-uc3-mrt-${AWS_ACCOUNT_ID}.d.codeartifact.us-west-2.amazonaws.com/maven/uc3-mrt-java/
export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain cdlib-uc3-mrt --domain-owner $AWS_ACCOUNT_ID --region $AWS_REGION --query authorizationToken --output text`
```
- Place resources in this directory

### Updating Build Info
- Download war file
- `jar xf WARFILE static/build.content.txt`
- `vi static/build.content.txt`
- `jar uf WARFILE static/build.content.txt`
- rename WARFILE to match desired artifact name

### Inventory Deploy

```bash
mvn -ntp deploy:deploy-file \
 -Durl=${CODEARTIFACT_URL} \
 -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java \
 -DartifactId=mrt-invwar \
 -DgroupId=org.cdlib.mrt \
 -Dversion=1.8.3 \
 -Dfile=mrt-inventory-1.8.3.war
```

### Ingest Deploy

```bash
mvn -ntp deploy:deploy-file \
 -Durl=${CODEARTIFACT_URL} \
 -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java \
 -DartifactId=mrt-ingestwar \
 -DgroupId=org.cdlib.mrt \
 -Dversion=1.0.26 \
 -Dfile=mrt-ingestwar-1.0.26.war
```