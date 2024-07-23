# AWS Build of Merritt Assets
- CloudFront: https://github.com/CDLUC3/mrt-doc/issues/1850
- CodeArtifact: https://github.com/CDLUC3/mrt-doc/issues/1931
- ECR: https://github.com/CDLUC3/mrt-doc/issues/1945
- Private Bucket:
  - https://github.com/CDLUC3/mrt-doc/issues/1923
  - https://github.com/CDLUC3/mrt-doc/issues/1924
 
## Tagging Ideas
- [Tagging Ideas](tagging.md)

## Using CodeArtifact Resources in a Docker Build
- https://stackoverflow.com/questions/67426509/how-to-use-aws-codeartifact-within-a-dockerfile-in-awscodebuild

## Workflow

### Build Integration Test Images

- Triggered by commit to merritt-docker
- Triggered on demand

```mermaid
graph TD
  subgraph GitHub
    merritt-docker
  end
  GitHub --> Pipeline
  Cron --> Pipeline
  Pipeline(Code Pipeline)
  Pipeline --> Build
  Build(Code Build)
  Build --> |docker push| ECR
  subgraph ECR
    BaseImages[["`
      merritt-tomcat
      merritt-maven
    `"]]

    IntegrationTestImages[["`
      mock-merritt-it
      mrt-it-database
      mrt-it-database-audit-replic
      mrt-minio-it
      mrt-minio-it-with-content
    `"]]

    DockerStackSupportImages[["`
      callback
      mrt-opendj
      mrt-init
      mrt-database
    `"]]
  end
```

### Java Libraries
- Triggered by commit to repo
- Triggered on demand

```mermaid
graph TD
  GitHub[["`
    mrt-core2
    mrt-cloud
    mrt-zk
  `"]]
  GitHub --> Pipeline
  Cron --> Pipeline
  Pipeline(Code Pipeline)
  Pipeline --> Build
  Build(Code Build)
  S3_Public
  Build --> JarFiles
  Build --> |copy| S3_Public
  S3_Public --> |publish| CloudFront
  ECR
  ECR -.-> |docker pull| Build
  subgraph CodeArtifact
    JarFiles[["`
      merritt-parprops
      merritt-bom
      mrt-core2.jars
      mrt-cloud.jar
      mrt-zk.jar
    `"]]
  end
  JarFiles -.-> Build
  subgraph CloudFront
    Javadocs
  end
```

### Java Services (WAR)
```mermaid
graph TD
  GitHub[["`
    mrt-ingest
    mrt-store
    mrt-inventory
    mrt-audit
    mrt-replic
  `"]]
  GitHub --> Pipeline
  Cron --> Pipeline
  Pipeline(Code Pipeline)
  Pipeline --> Build
  Build(Code Build)
  Build --> WarFiles
  WarFiles --> DockerBuild
  DockerBuild --> |docker push| ECR
  ECR
  subgraph CodeArtifact
    JarFiles
    WarFilesArtifact[["`
      ingest.war
      store.war
      inventory.war
      audit.war
      replic.war
    `"]]
  end
  WarFiles --> WarFilesArtifact
  JarFiles -.-> Build
  subgraph ECR
    IntegrationTestImages[["`
      mrt-ingest-image
      mrt-store-image
      mrt-inventory-image
      mrt-audit-image
      mrt-replic-image
    `"]]
  end
```

### Java Service Deployment
```mermaid
graph TD
  subgraph CodeArtifact
    JarFiles
    WarFiles
  end
  WarFiles[["`
    ingest.war
    store.war
    inventory.war
    audit.war
    replic.war
  `"]]
  EC2[EC2 Stage/Prod]
  WarFiles --> |deploy| EC2
```

### Ruby Library Build
```mermaid
graph TD
  GitHub --> Pipeline
  Cron --> Pipeline
  Pipeline(Code Pipeline)
  Pipeline --> Build
  Build(Code Build)
  S3_Public
  Build --> |copy| S3_Public
  S3_Public --> |publish| CloudFront
  Gems[Ruby Code include by Git Tag]
  Gems -.-> Build
  subgraph CloudFront
    Rubydocs
  end
```

### Ruby Service Deploy
```mermaid
graph TD
  Build(Capistrano Build)
  Gems[Ruby Code include by Git Tag]
  Gems -.-> Build
  Build --> EC2
  EC2[EC2 Stage/Prod]
```

### Ruby Service Build Image
```mermaid
graph TD
  GitHub --> Pipeline
  Cron --> Pipeline
  Pipeline(Code Pipeline)
  Pipeline --> Build
  Build(Code Build)
  Build --> |docker push| ECR
  subgraph ECR
    mrt-dashboard-image
  end
  Gems[Ruby Code include by Git Tag]
  Gems -.-> Build
```

---

### Run Docker Stack
```mermaid
graph TD
  ECR -.-> |docker pull| EC2_Dev
  EC2_Dev[EC2 Dev Docker Stack]
  subgraph ECR
    MerrittServiceImages[["`
      mrt-dashboard-image
      mrt-ingest-image
      mrt-store-image
      mrt-inventory-image
      mrt-audit-image
      mrt-replic-image
    `"]]

    DockerStackSupportImages[["`
      callback
      mrt-opendj
      mrt-init
      mrt-database
    `"]]
  end
```

---

### Ruby Lambda Build and Deploy
```mermaid
graph TD
  Build(Code Build?)
  Build --> |docker push| ECR
  ECR --> |deploy| Lambda
  ECR -.-> |docker pull| Build
  Lambda[Lambda Stage/Prod]
  Gems[Ruby Code include by Git Tag]
  Gems -.-> Build
  ECR[["`
    mysql-ruby-lambda
    src-common
    src-admintool
    src-colladmin
    cognito-lambda-nonvpc
  `"]]
```

---

### Documentation and Web Assets
```mermaid
graph TD
  GitHub --> Pipeline
  Cron --> Pipeline
  Pipeline(Code Pipeline)
  Pipeline --> Build
  Pipeline -.-> S3_Private
  S3_Private -.-> Build
  Build(Code Build)
  S3_Private
  S3_Public
  Build --> |copy| S3_Public
  S3_Public --> |publish| CloudFront
  subgraph CloudFront
    Swagger
    RevealJsSlideshow
    Webapp
    Documentation
  end
```

---

### Private Config Data - Evolve From File System Copy
```mermaid
graph TD
  GitHub --> Pipeline
  Cron --> Pipeline
  Pipeline(Code Pipeline)
  Pipeline --> Build
  Build(Code Build)
  S3_Private
  Build --> |copy| S3_Private
  EC2[EC2 Stage/Prod]
  EC2_Dev[EC2 Dev Docker Stack]
  Lambda[Lambda Stage/Prod]
  S3_Private -.-> EC2
  S3_Private -.-> EC2_Dev
  S3_Private -.-> Lambda
```


## Anticipated Outputs
- https://merritt.uc3dev.cdlib.org/index.html
  - [html source](https://github.com/CDLUC3/merritt-tinker/blob/main/aws/uc3-mrt-devresources/index.html)


