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
- If you do not have a `~/.m2/settings.xml` file
```
curl -o ~/.m2/settings.xml https://github.com/CDLUC3/mrt-core2/blob/main/settings.xml
```
- Place the WAR files you wish to deploy in this directory


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

#### List versions
```
aws codeartifact list-package-versions \
  --domain=cdlib-uc3-mrt --repository=uc3-mrt-java \
  --domain-owner $AWS_ACCOUNT_ID \
  --format=maven --namespace=org.cdlib.mrt \
  --package=mrt-invwar \
  --output=text 
```

#### Get version

```
aws codeartifact get-package-version-asset \
  --domain=cdlib-uc3-mrt --repository=uc3-mrt-java \
  --package=mrt-invwar --package-version=1.8.3 \
  --format=maven --namespace=org.cdlib.mrt \
  --asset=mrt-invwar-1.8.3.war \
  --domain-owner $AWS_ACCOUNT_ID mrt-invwar.war
```

#### Get version - maven
Alternatively, using maven.  Note that this downloads to your local maven repo (~/.m2/repository)

```
mvn dependency:get \
  -DgroupId=org.cdlib.mrt \
  -DartifactId=mrt-invwar \
  -Dversion=1.8.3 \
  -Dpackaging=war -U

ls -lart ~/.m2/repository/org/cdlib/mrt/mrt-invwar/
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

#### List versions
```
aws codeartifact list-package-versions \
  --domain=cdlib-uc3-mrt --repository=uc3-mrt-java \
  --domain-owner $AWS_ACCOUNT_ID \
  --format=maven --namespace=org.cdlib.mrt \
  --package=mrt-ingestwar \
  --output=text 
```

#### Get version

```
aws codeartifact get-package-version-asset \
  --domain=cdlib-uc3-mrt --repository=uc3-mrt-java \
  --package=mrt-ingestwar --package-version=1.0.26 \
  --format=maven --namespace=org.cdlib.mrt \
  --asset=mrt-ingestwar-1.0.26.war \
  --domain-owner $AWS_ACCOUNT_ID mrt-ingest.war
```

#### Get version - maven
Alternatively, using maven.  Note that this downloads to your local maven repo (~/.m2/repository)

```
mvn dependency:get \
  -DgroupId=org.cdlib.mrt \
  -DartifactId=mrt-ingestwar \
  -Dversion=1.0.26 \
  -Dpackaging=war -U

ls -lart ~/.m2/repository/org/cdlib/mrt/mrt-ingestwar/
```

#### Verify versions
```
aws codeartifact list-package-versions \
  --domain=cdlib-uc3-mrt --repository=uc3-mrt-java \
  --domain-owner $AWS_ACCOUNT_ID \
  --format=maven --namespace=org.cdlib.mrt \
  --package=mrt-ingestwar \
  --output=text 
```

### Store Deploy

```bash
mvn -ntp deploy:deploy-file \
 -Durl=${CODEARTIFACT_URL} \
 -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java \
 -DartifactId=mrt-storewar \
 -DgroupId=org.cdlib.mrt \
 -Dversion=1.8.19 \
 -Dfile=mrt-storewar-1.8.19.war
```

#### List versions
```
aws codeartifact list-package-versions \
  --domain=cdlib-uc3-mrt --repository=uc3-mrt-java \
  --domain-owner $AWS_ACCOUNT_ID \
  --format=maven --namespace=org.cdlib.mrt \
  --package=mrt-storewar \
  --output=text 
```

#### Get version

```
aws codeartifact get-package-version-asset \
  --domain=cdlib-uc3-mrt --repository=uc3-mrt-java \
  --package=mrt-storewar --package-version=1.8.19 \
  --format=maven --namespace=org.cdlib.mrt \
  --asset=mrt-storewar-1.8.19.war \
  --domain-owner $AWS_ACCOUNT_ID mrt-store.war
```

#### Get version - maven
Alternatively, using maven.  Note that this downloads to your local maven repo (~/.m2/repository)

```
mvn dependency:get \
  -DgroupId=org.cdlib.mrt \
  -DartifactId=mrt-storewar \
  -Dversion=1.8.19 \
  -Dpackaging=war -U

ls -lart ~/.m2/repository/org/cdlib/mrt/mrt-storewar/
```

### Replic Deploy

```bash
mvn -ntp deploy:deploy-file \
 -Durl=${CODEARTIFACT_URL} \
 -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java \
 -DartifactId=mrt-replicationwar \
 -DgroupId=org.cdlib.mrt \
 -Dversion=1.8.7 \
 -Dfile=mrt-replicationwar-1.8.7.war
```

#### List versions
```
aws codeartifact list-package-versions \
  --domain=cdlib-uc3-mrt --repository=uc3-mrt-java \
  --domain-owner $AWS_ACCOUNT_ID \
  --format=maven --namespace=org.cdlib.mrt \
  --package=mrt-replicationwar \
  --output=text 
```

#### Get version

```
aws codeartifact get-package-version-asset \
  --domain=cdlib-uc3-mrt --repository=uc3-mrt-java \
  --package=mrt-replicationwar --package-version=1.8.7 \
  --format=maven --namespace=org.cdlib.mrt \
  --asset=mrt-replicationwar-1.8.7.war \
  --domain-owner $AWS_ACCOUNT_ID mrt-replicationwar.war
```

#### Get version - maven
Alternatively, using maven.  Note that this downloads to your local maven repo (~/.m2/repository)

```
mvn dependency:get \
  -DgroupId=org.cdlib.mrt \
  -DartifactId=mrt-replicationwar \
  -Dversion=1.8.7 \
  -Dpackaging=war -U

ls -lart ~/.m2/repository/org/cdlib/mrt/mrt-replicationwar/
```

### Audit Deploy

```bash
mvn -ntp deploy:deploy-file \
 -Durl=${CODEARTIFACT_URL} \
 -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java \
 -DartifactId=mrt-auditwarpub \
 -DgroupId=org.cdlib.mrt \
 -Dversion=1.8.19 \
 -Dfile=mrt-auditwarpub-1.8.19.war
```

#### List versions
```
aws codeartifact list-package-versions \
  --domain=cdlib-uc3-mrt --repository=uc3-mrt-java \
  --domain-owner $AWS_ACCOUNT_ID \
  --format=maven --namespace=org.cdlib.mrt \
  --package=mrt-auditwarpub \
  --output=text 
```

#### Get version

```
aws codeartifact get-package-version-asset \
  --domain=cdlib-uc3-mrt --repository=uc3-mrt-java \
  --package=mrt-auditwarpub --package-version=1.8.19 \
  --format=maven --namespace=org.cdlib.mrt \
  --asset=mrt-auditwarpub-1.8.19.war \
  --domain-owner $AWS_ACCOUNT_ID mrt-auditwarpub.war
```

#### Get version - maven
Alternatively, using maven.  Note that this downloads to your local maven repo (~/.m2/repository)

```
mvn dependency:get \
  -DgroupId=org.cdlib.mrt \
  -DartifactId=mrt-auditwarpub \
  -Dversion=1.8.19 \
  -Dpackaging=war -U

ls -lart ~/.m2/repository/org/cdlib/mrt/mrt-auditwarpub/
```

