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
    BaseImages[["`**Base Images**
      merritt-tomcat
      merritt-maven
    `"]]

    IntegrationTestImages[["`**Integration Test Images**
      mock-merritt-it
      mrt-it-database
      mrt-it-database-audit-replic
      mrt-minio-it
      mrt-minio-it-with-content
    `"]]

    DockerStackSupportImages[["`**Docker Stack Support Images**
      callback
      mrt-opendj
      mrt-init
      mrt-database
    `"]]
  end
```

---

### Java Libraries
- Triggered by commit to repo
- Triggered on demand

```mermaid
graph TD
  subgraph GitHub
    Repos[["`
      mrt-core2
      mrt-cloud
      mrt-zk
    `"]]
  end
  GitHub --> Pipeline
  Cron --> Pipeline
  Pipeline(Code Pipeline)
  Pipeline --> Build
  Build(Code Build)
  S3_Public
  Build --> JarFiles
  Build --> |copy| S3_Public
  S3_Public --> |publish| CloudFront
  subgraph ECR
    Img[["`**Integration Test Images**
      mock-merritt-it
      mrt-it-database
      mrt-it-database-audit-replic
      mrt-minio-it
      mrt-minio-it-with-content
    `"]]
  end
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

---

### Java Services (WAR)
```mermaid
graph TD
  subgraph GitHub
    Repos[["`
      mrt-ingest
      mrt-store
      mrt-inventory
      mrt-audit
      mrt-replic
    `"]]
  end
  GitHub --> Pipeline
  Cron --> Pipeline
  Pipeline(Code Pipeline)
  Pipeline --> Build
  Build(Code Build)
  Img --> Build
  Build --> WarFiles
  WarFiles --> DockerBuild
  DockerBuild --> |docker push| ImgSrv
  subgraph ECR
    Img[["`**Integration Test Images**
      mock-merritt-it
      mrt-it-database
      mrt-it-database-audit-replic
      mrt-minio-it
      mrt-minio-it-with-content
    `"]]
    ImgSrv[["`**Service Images**
      mrt-ingest-image
      mrt-store-image
      mrt-inventory-image
      mrt-audit-image
      mrt-replic-image
    `"]]
  end
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
```

---

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
  EC2[EC2 Stage/Prod - MAIN ACCOUNT]
  WarFiles --> |deploy| EC2
```

---

### Ruby Library Build
```mermaid
graph TD
  subgraph GitHub
    Repos[["`
      mrt-zk
      uc3-ssm
    `"]]
  end
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
  EC2[EC2 Stage/Prod - MAIN ACCOUNT]
```

---

### Ruby Service Build Image
```mermaid
graph TD
  GitHub --> Pipeline
  subgraph GitHub
    Repos[["`
      mrt-dashboard
    `"]]
  end
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
  EC2_Dev[EC2 Dev Docker Stack - MAIN ACCOUNT]
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
  subgraph GitHub
    Repos[["`
      mrt-admin-lambda
    `"]]
  end
  GitHub --> Build
  Build(Code Build?)
  ECR[ECR MAIN ACCOUNT]
  Build --> |docker push| ECR
  ECR --> |deploy| Lambda
  ECR -.-> |docker pull| Build
  Lambda[Lambda Stage/Prod - MAIN ACCOUNT]
  Gems[Ruby Code include by Git Tag]
  Gems -.-> Build
  subgraph ECR[ECR - MAIN ACCOUNT]
    Img[["`
      mysql-ruby-lambda
      src-common
      src-admintool
      src-colladmin
      cognito-lambda-nonvpc
    `"]]
  end
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
  EC2[EC2 Stage/Prod - MAIN ACCOUNT]
  EC2_Dev[EC2 Dev Docker Stack - MAIN ACCOUNT]
  Lambda[Lambda Stage/Prod - MAIN ACCOUNT]
  S3_Private -.-> EC2
  S3_Private -.-> EC2_Dev
  S3_Private -.-> Lambda
```


## Anticipated Outputs
- https://merritt.uc3dev.cdlib.org/index.html
  - [html source](https://github.com/CDLUC3/merritt-tinker/blob/main/aws/uc3-mrt-devresources/index.html)


