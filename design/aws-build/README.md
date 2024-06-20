# AWS Build of Merritt Assets
- CloudFront: https://github.com/CDLUC3/mrt-doc/issues/1850
- CodeArtifact: https://github.com/CDLUC3/mrt-doc/issues/1931
- ECR: https://github.com/CDLUC3/mrt-doc/issues/1945
- Private Bucket:
  - https://github.com/CDLUC3/mrt-doc/issues/1923
  - https://github.com/CDLUC3/mrt-doc/issues/1924

## Workflow

```mermaid
graph TD
  GitHub --> Pipeline
  Cron --> Pipeline
  Pipeline(Code Pipeline)
  Pipeline --> Build
  Build(Code Build)
  S3_Private
  S3_Public
  Build --> CodeArtifact
  Build --> |copy| S3_Public
  S3_Public --> |publish| CloudFront
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

## Artifact Build Order

```mermaid
graph TD
  DOC
  CONFIG
  DOCKIT[Docker Maven IT Images]
  DOCKSTACK[Docker Stack Generic Services]
  DOCKSERVICE[Docker Stack Merritt Services]
  JAR[Jar: Merritt Libraries]
  WAR[War: Merritt Services]
  GEM[Gem: Merritt Libraries]
  LAMBDA(Docker Merritt Lambda)
  RUBY[Ruby App Code]
  RUBYDEPLOY(Merritt Ruby App - Bundled on Deploy)
  JAVADEPLOY(Merritt Tomcat App)
  DOCKTEST(Docker Development Stack)
  DOCKIT -.-> |IT test| JAR
  JAR --> WAR
  DOCKIT -.-> |IT test| WAR
  WAR --> JAVADEPLOY
  WAR --> DOCKSERVICE
  GEM --> RUBY
  RUBY --> RUBYDEPLOY
  RUBY --> LAMBDA
  RUBY --> DOCKSERVICE
  DOCKSERVICE --> DOCKTEST
  DOCKSTACK -->DOCKTEST
```

### Anticipated Outputs
- https://merritt.uc3dev.cdlib.org/index.html
  - [html source](https://github.com/CDLUC3/merritt-tinker/blob/main/aws/uc3-mrt-devresources/index.html)

