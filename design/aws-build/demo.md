# Tagging Demo

## Tag Repo

```bash
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote: This repository moved. Please use the new location:
remote:   git@github.com:CDLUC3/mrt-ingest.git
To github.com:cdluc3/mrt-ingest
 * [new tag]         demo-1.3.0 -> demo-1.3.0
```

## GitHub

<img width="1321" alt="image" src="https://github.com/user-attachments/assets/a017539b-9feb-4ef4-9dbc-d06acf7cebd2">


## CodePipeline

<img width="1363" alt="image" src="https://github.com/user-attachments/assets/24e03d1d-dd80-49c8-b07f-0fb937652a4d">

### CodePipeline will be triggered by the "tag" action.  Build will be initiated with the tagged commit

<img width="1417" alt="image" src="https://github.com/user-attachments/assets/d37c81f8-f729-4d42-861f-e2798d359e7c">

## CodeBuild

<img width="1365" alt="image" src="https://github.com/user-attachments/assets/2a02ef4d-b782-458d-9d92-4ca5787de425">

### Build Script resides in the code repo

> [!NOTE]
> TODO: build script needs to use the tag when pushing to ECR

https://github.com/CDLUC3/mrt-ingest/blob/queue_LIB/buildspec.yml

### Maven Deploy to Code Artifact
```
[Container] 2024/08/09 22:51:44.063313 Running command echo "Semver [${SEMVER}]"
Semver [-Dversion=demo-1.3.0]

[Container] 2024/08/09 22:51:44.071339 Running command mvn -ntp deploy:deploy-file -Durl=${CODEARTIFACT_URL} -DrepositoryId=cdlib-uc3-mrt-uc3-mrt-java -Dfile=$(ls ingest-war/target/mrt-ingestwar-*.war) ${SEMVER}
```

### Docker Push to ECR
```
docker push 99999999.dkr.ecr.us-west-2.amazonaws.com/mrt-ingest:demo-1.3.0
The push refers to repository [99999999.dkr.ecr.us-west-2.amazonaws.com/mrt-ingest]
```

## CodeArtifact

<img width="1453" alt="image" src="https://github.com/user-attachments/assets/e1fc89d0-6cbe-41b9-96c4-5328e05a5703">

<img width="1414" alt="image" src="https://github.com/user-attachments/assets/6456e47c-31ea-431b-9d48-9e8fc7759e84">

## Elastic Container Registry

<img width="1441" alt="image" src="https://github.com/user-attachments/assets/7ccb7d05-e1cb-47be-93d8-ac000117705a">

