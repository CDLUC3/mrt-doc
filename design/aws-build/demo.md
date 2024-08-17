# Merritt AWS Build - Tagging Demo

- [Merritt AWS Build Design](https://github.com/CDLUC3/mrt-doc/blob/main/design/aws-build/README.md)

---

## Purpose
This is an illustration of the concepts defined in [Merritt Tagging Ideas](https://github.com/CDLUC3/mrt-doc/blob/main/design/aws-build/tagging.md).

----

## Code Artifact
- AWS implmentation of 
  - a Maven artifact repository (Java)
  - a gem store (Ruby)
  - other languages such as Node
- You can enforce access rights

----

## Java Libraries: JAR files

- [JAR Build Design](https://github.com/CDLUC3/mrt-doc/blob/main/design/aws-build/README.md#java-libraries)
- Versioning is controlled in **source code**
- Commit to BRANCH `main`:
  - `*-SNAPSHOT.jar` in CodeArtifact
- "Snapshots" can be re-written

----

## Java Services: WAR files

- [WAR Build Design](https://github.com/CDLUC3/mrt-doc/blob/main/design/aws-build/README.md#java-services-war)

----

## Java Services: WAR files
- Commit to BRANCH `main`:
  - `3.0-SNAPSHOT.war` in CodeArtifact
  - `image:dev` in ECR
  - rebuild daily

----

## Java Services: WAR files
- Commit to other feature BRANCH:
  - `BRANCH-SNAPSHOT.war` in CodeArtifact
  - `image:BRANCH` in ECR

----

## Java Services: WAR files
- TAG commit (other than `sprint-*)`
  - `TAG.war` in CodeArtifact
    - will be used for Prod/Stage deployments
  - `image:TAG` in ECR

----

## Rails Service
- [Rails Build Design](https://github.com/CDLUC3/mrt-doc/blob/main/design/aws-build/README.md#ruby-service-build-image)

----

## Rails Service
- Commit to BRANCH `main`:
  - `image:dev` in ECR
  - rebuild daily

----

## Rails Service
- Commit to other feature BRANCH:
  - `image:BRANCH` in ECR

----

## Rails Service 
- TAG commit (other than `sprint-*)`
  - `image:TAG` in ECR
  - Prod and Stage deployments always pull a tag from github

----

## Lambda Apps 
- Merritt Lambdas are packaged as docker images
- [Lambda Build Design](https://github.com/CDLUC3/mrt-doc/blob/main/design/aws-build/README.md#ruby-lambda-build-and-deploy)
----

## Lambda Apps 
- Commit to BRANCH `main`:
  - `image:latest` in ECR for base images  
  - `image:main` in ECR for lambda images
  - rebuild daily

----

## Lambda Apps 
- Commit to feature BRANCH
  - `image:latest` in ECR for base images  
  - `image:BRANCH` in ECR for lambda images

----

## Lambda Apps 
- TAG commit (other than `sprint-*)`
  - `image:latest` in ECR for base images  
  - `image:TAG` in ECR for lambda images 
  - will be used for Prod/Stage deployments

----

## Other Docker Apps (not deployed to Stage or Prod)
- Commit to BRANCH `main`:
  - `image:dev` in ECR
  - rebuild daily    

----

## Other Code
- regardless of BRANCH/TAG
  - since neither ECR nor CodeArtifact are involved, the tagging is not copied to a repository

---


## Tag Repo

```bash
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote: This repository moved. Please use the new location:
remote:   git@github.com:CDLUC3/mrt-ingest.git
To github.com:cdluc3/mrt-ingest
 * [new tag]         demo-1.3.0 -> demo-1.3.0
```

----

## GitHub

<img alt="image" src="https://github.com/user-attachments/assets/a017539b-9feb-4ef4-9dbc-d06acf7cebd2">

----

## AWS Connector for GitHub

<img alt="image" src="https://github.com/user-attachments/assets/17d73256-fea2-4368-9e3a-5d165274d175">

----

## AWS Connector for GitHub
- enables the tracking of commits and tags
- This allows AWS CodePipeline to clone selected private repos
- Some AWS screens call this an *AWS CodeConnection*

---

## CodePipeline

<img alt="image" src="https://github.com/user-attachments/assets/24e03d1d-dd80-49c8-b07f-0fb937652a4d">

----

### CodePipeline 
- will be triggered by the "tag" action.  
- build will be initiated with the tagged commit

----

<img alt="image" src="https://github.com/user-attachments/assets/d37c81f8-f729-4d42-861f-e2798d359e7c">

---

## CodeBuild

<img alt="image" src="https://github.com/user-attachments/assets/2a02ef4d-b782-458d-9d92-4ca5787de425">

----

### Build Script resides in the code repo

- [Repo Build Script](https://github.com/CDLUC3/mrt-ingest/blob/queue_LIB/buildspec.yml)
- 15 Merritt repos currently have buildspec.yml files

----

```yaml
  build:
    commands:
    - mvn -ntp clean install
    - mvn -ntp deploy:deploy-file -Durl=${CODEARTIFACT_URL} -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java -Dfile=$(ls ingest-war/target/mrt-ingestwar-*.war) ${SEMVER}
    - |
        docker build --push --quiet \
        --build-arg ECR_REGISTRY=${ECR_REGISTRY} \
        --build-arg COMMITDATE="${COMMITDATE}" \
        -t ${ECR_REGISTRY}/mrt-ingest:${DOCKTAG} .
```

----

### Maven Deploy FROM Code Artifact

- Download semantically tagged WAR files from CodeArtifact 
- Deploy to our Stage and Production EC2 instances

```
aws codeartifact get-package-version-asset 
  --domain=cdlib-uc3-mrt --repository=uc3-mrt-java 
  --package=mrt-storewar --package-version=demo-1.1.1 
  --format=maven --namespace=org.cdlib.mrt 
  --asset=mrt-storewar-demo-1.1.1.war 
  --domain-owner $AWS_ACCOUNT_ID store.war
```

----

```
[Container] 2024/08/09 22:51:44.063313 Running command echo "Semver [${SEMVER}]"
Semver [-Dversion=demo-1.3.0]

[Container] 2024/08/09 22:51:44.071339 Running command mvn -ntp deploy:deploy-file -Durl=${CODEARTIFACT_URL} -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java -Dfile=$(ls ingest-war/target/mrt-ingestwar-*.war) ${SEMVER}
```

----

### Docker Push to ECR

Eventually, Merritt services will migrate to ECS.  Semantically tagged images will be used in the ECS stack.

```
docker push 99999999.dkr.ecr.us-west-2.amazonaws.com/mrt-ingest:demo-1.3.0
The push refers to repository [99999999.dkr.ecr.us-west-2.amazonaws.com/mrt-ingest]
```

---

## CodeArtifact

<img alt="image" src="https://github.com/user-attachments/assets/e1fc89d0-6cbe-41b9-96c4-5328e05a5703">

----

<img alt="image" src="https://github.com/user-attachments/assets/6456e47c-31ea-431b-9d48-9e8fc7759e84">

---

## Elastic Container Registry

<img alt="image" src="https://github.com/user-attachments/assets/7ccb7d05-e1cb-47be-93d8-ac000117705a">

---

## Main Branch Daily Build

- push an updated image to ECR each day 
  - to enable up-to-date docker image scanning.
- image `mrt-ingest:dev` can be used for development testing.

----

<img alt="image" src="https://github.com/user-attachments/assets/f6f60ed3-e43d-437a-ae5f-c1b67c8a750c">

---

## Infrastructure as code

- Our build infrastructure is created with sceptre templates
- https://github.com/CDLUC3/mrt-sceptre 
  - private repo

---

## Resource Cleanup
- Docker Images
- Java Artifacts

----

## Resource Cleanup: Docker Images

- Untagged Images 
  - Lifecycle Policy will delete
- Feature Branch/Tag Images
  - Older than 30 days (report)
- Semantic Tag Imags
  - No more than 10 (report)
  - No more than 5 older than 30 days (report)

----

## Resource Cleanup: Docker Images

- Unpublished Artifacts 
  - No lifecycle policy available
  - Delete all (code)
- Feature Branch/Tag Images
  - Older than 30 days (report)
- Semantic Tag Imags
  - No more than 10 (report)
  - No more than 5 older than 30 days (report)

----

## Question
- how do we differentiate a deployment tag from a development tag?
  - I posted this question in Slack #dev

---

## Reach out if you have questions!
