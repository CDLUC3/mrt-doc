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

> [!NOTE]
> Some Merritt Java Libraries and Services have integration tests as part of their code.
> These integration tests run against mocked services that are implemented as docker images.
> These Docker Images must be build first.
>
> #### Build Trigger
> - Triggered by commit to merritt-docker
> - Triggered on demand

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

> [!NOTE]
> Merritt Java libraries are compiled and packaged as Jar files.
> These Jar files are saved to AWS CodeArtifact.
> 
> Merritt libraries will always be written to CodeArtifact as a *maven snapshot* `-SNAPSHOT.jar`.
> Snapshots can be over-written in CodeArtifact.
>
> Going forward, the Merritt Team will bump up the snapshot version number for a jar file when making a breaking change to the JAR file.
> The updated snapshot number will then need to be registered in the bom file.
>
> Javadocs will be generated for Merritt library code.
> 
> #### Build Trigger
> - Triggered by commit to repo
> - Triggered on demand
> 
> #### Development Note
> - A developer can build Jar files files locally with maven to test local code changes.
> - Only the CodeBuild process should have permssion to push to CodeArtifact.

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

> [!NOTE]
> Merritt Java services are compiled and packaged as War files.
> These War files are saved to AWS CodeArtifact.
> 
> Development artifacts may be written to CodeArtifact as a *maven snapshot* `-SNAPSHOT.war`.
> Snapshots can be over-written in CodeArtifact.
>
> Release candidates for an artifact must be generated with a unique semantic tag.
> Artifacts with a semantic tag (non-snapshots) may not be over-written.
>
> ### Future enhancements
> - The Merritt team could experiment with Javadoc generation for Merritt services.
> - The Merritt team could generate swagger documentation for Merritt services.
> - The Merritt team should explore if there are any other mechanisms for generating API docs from a Jersey service.
> 
> #### Build Trigger
> - Triggered by commit to repo (snapshot update)
> - Triggered on demand (snapshot update)
> - Triggered by the tagging of a repo (semantically tagged artifact)
> 
> #### Development Note
> - A developer can build Jar files and War files locally with maven to test local code changes.
> - Only the CodeBuild process should have permssion to push to CodeArtifact.

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

> [!NOTE]
> The Merritt code deployment process will pull WAR files from CodeArtifact.
> Because CodeArtifact will manage a historical repository of deployed artifacts, Capistrano will no longer be needed for deployments.
> 
> By convention, a production deployment should always use a semantically tagged artifact.
>
> Stage deployments may pull a WAR file snapshot for development testing.
> Stage deployments should pull a semantically tagged artifact when performing pre-release testing.
> 
> #### Deployment Trigger
> - Triggered on demand

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
  style EC2 fill:pink
  WarFiles --> |deploy| EC2
```

---

### Ruby Library Build

> [!NOTE]
> Merritt Ruby libraries are implemented in pure ruby code (no C code binaries).
> Therefore, the code has not been packaged into gems.
> AWS CodeArtifact could be utilized as a gem store if needed.
> In practice, the team has found it simpler to just provide a github tag reference within the Gemfile rather than explicity packaging the code as a gem.
>
> The "build" process is minimal for Ruby code.
> 
> Rubydocs are generated for Merritt Ruby libraries.
>
> ### Future enhancements
> - invoke rubocop in CodeBuild (currently invoked with GitHub actions)
> - invoke rspec tests in CodeBuild (currently invoked with GitHub actions)
> 
> #### Build Trigger
> - Triggered by commit to repo
> - Triggered on demand

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

---

### Ruby Service Build Image

> [!NOTE]
> A docker image will bundled and generated for a Merritt service
>
> ### Future enhancements
> - invoke rubocop in CodeBuild (currently invoked with GitHub actions)
> - invoke rspec tests in CodeBuild (currently invoked with GitHub actions)
> 
> #### Build Trigger
> - Triggered by commit to repo
> - Triggered on demand

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

### Ruby Service Deploy

> [!NOTE]
> Capistrano will pull and build Ruby code when performing a deployment.
> 
> By convention, a production deployment should always use a semantically tagged version of the repo.
> 
> #### Deployment Trigger
> - Triggered on demand

```mermaid
graph TD
  Build(Capistrano Build)
  Gems[Ruby Code include by Git Tag]
  Gems -.-> Build
  Build --> EC2
  EC2[EC2 Stage/Prod - MAIN ACCOUNT]
  style EC2 fill:pink
```

---

### Run Docker Stack

> [!NOTE]
> A Merritt Development stack could be intiated from ECR images at any time.
> 
> Using local code copies, a developer can build development copies of docker images for development testing.
> 
> #### Deployment Trigger
> - Triggered on demand 
> 
> #### Development Note
> - A developer can build docker images locally to test local code changes.
> - The CodeBuild process will be the only mechanism for pushing an image to ECR.

```mermaid
graph TD
  ECR -.-> |docker pull| EC2_Dev
  EC2_Dev[EC2 Dev Docker Stack - MAIN ACCOUNT]
  style EC2_Dev fill:pink
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

> [!IMPORTANT]
> This code must be deployed in the main account.  
>
> ### Future enhancements
> - explore deploying a main account lambda from UC3 ECR.
> - build with CodeBuild
> - enable development branches to be deployed to stage and prod
> - report an alert when a branch other than main is deployed to lambda

```mermaid
graph TD
  subgraph GitHub
    Repos[["`
      mrt-admin-lambda
    `"]]
  end
  GitHub --> Build
  Build(Code Build?)
  Build --> |docker push| ECR
  ECR --> |deploy| Lambda
  ECR -.-> |docker pull| Build
  Lambda[Lambda Stage/Prod - MAIN ACCOUNT]
  style Lambda fill:pink
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
  style ECR fill:pink
```

---

### Documentation and Web Assets

> [!NOTE]
> Re-publish documentation assets based on a change to a repo.
>
> #### Build Trigger
> - Triggered by commit to repo
> - Triggered on demand

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

> [!IMPORTANT]
> This work has not yet started


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
  style EC2 fill:pink
  style EC2_Dev fill:pink
  style Lambda fill:pink

```


## Anticipated Outputs
- https://merritt.uc3dev.cdlib.org/index.html
  - [html source](https://github.com/CDLUC3/merritt-tinker/blob/main/aws/uc3-mrt-devresources/index.html)


