# AWS Build of Merritt Assets
- CloudFront: https://github.com/CDLUC3/mrt-doc/issues/1850
- CodeArtifact: https://github.com/CDLUC3/mrt-doc/issues/1931
- ECR: https://github.com/CDLUC3/mrt-doc/issues/1945
- Private Bucket:
  - https://github.com/CDLUC3/mrt-doc/issues/1923
  - https://github.com/CDLUC3/mrt-doc/issues/1924

## Workflow

```mermaid
graph LR
  GitHub --> Pipeline
  Cron --> Pipeline
  Pipeline(Code Pipeline)
  Pipeline --> Build
  Build(Code Build)
  Build --> CodeArtifact
  Build --> |publish| CloudFront
  Build --> |docker push| ECR
  Build --> |copy| S3_Private
  ECR
  ECR --> |deploy| Lambda
  ECR -.-> |docker pull| EC2_Dev
  ECR -.-> |docker pull| Build
  subgraph CodeArtifact
    Gems
    JarFiles
    WarFiles
  end
  EC2[EC2 Stage/Prod]
  WarFiles --> |deploy| EC2
  Gems -.-> Build
  JarFiles -.-> Build
  subgraph CloudFront
    Javadocs
    Rubydocs
    Swagger
    RevealJsSlideshow
    Webapp
    Documentation
  end
```

---

## Library Repo Outputs

```mermaid
graph LR
  ECR(ECR)
  Gems(Gems)
  JarFiles(JarFiles)
  Javadocs(Javadocs)
  Rubydocs(Rubydocs)

  mrt-cloud --> JarFiles
  mrt-cloud --> Javadocs
  mrt-cloud --> ECR
  mrt-core2 --> JarFiles
  mrt-core2 --> Javadocs
  mrt-core2 --> ECR
  mrt-zk --> JarFiles
  mrt-zk --> Javadocs
  mrt-zk --> Rubydocs
  mrt-zk --> ECR
  mrt-zk --> Gems
  mrt-ingest-ruby --> Gems
  uc3-ssm --> Gems
  uc3-ssm --> Rubydocs
```

## Service Repo Outputs

```mermaid
graph LR
  ECR(ECR)
  WarFiles(WarFiles)
  Swagger(Swagger)

  mrt-inventory --> JarFiles
  mrt-inventory --> WarFiles
  mrt-inventory --> ECR
  mrt-ingest --> WarFiles
  mrt-ingest --> ECR
  mrt-audit --> WarFiles
  mrt-audit --> ECR
  mrt-replic --> WarFiles
  mrt-replic --> ECR
  mrt-store --> WarFiles
  mrt-store --> ECR
  mrt-dashboard --> Swagger
  mrt-dashboard --> ECR
```

## Docker Repo Outputs

```mermaid
graph LR
  ECR(ECR)
  Documentation(Generated Documentation)

  mrt-admin-lambda --> ECR
  mrt-admin-lambda --> Documentation
  mrt-integ-tests --> ECR
  merritt-docker --> ECR
```

## Misc Repo Outputs

```mermaid
graph LR
  RevealJsSlideshow(RevealJsSlideshow)
  Webapp(Webapp)

  mrt-doc --> |manifest tool| Webapp
  mrt-cron --> RevealJsSlideshow
  mrt-ingest-profile --> S3_Private
  mrt-dashboard-config --> S3_Private
```

## No Repo Outputs

```mermaid
graph LR
  mrt-doc-private
  mrt-box
  mrt-maint
  mrt-atom
  mrt-jenkins
  mrt-tomcat
  merritt_ldap_tools
  mrt-ansible-service-restart
```

## Deprecated Repo Outputs

```mermaid
graph LR
  cdl-zk-queue
  mrt-zoo
```
