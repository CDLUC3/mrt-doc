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

### Repos

- Documentation
  - mrt-doc
    - Outputs: Cloudfront Webapp (Manifest Tool)
  - mrt-doc-private
  - merritt_ldap_tools
  - mrt-ansible-service-restart
  - mrt-box
  - mrt-maint
  - mrt-jenkins
- Configuration
  - mrt-ingest-profiles
    - Private S3 bucket
  - mrt-dashboard-config
    - Private S3 bucket
  - mrt-tomcat
- Docker Maven IT Images
  - merritt-docker_inttest
    - Outputs: ECR Image
- Docker Stack Generic Services
  - zookeeper
  - mysql
  - minio
  - ldap
  - smtp_mock
  - ezid_mock
  - merritt_init
  - callback
  - mrt-integ-tests
- Docker Stack Merritt Services
  - store
  - ingest
  - audit
  - replic
  - inventory
  - ui
- Jar: Merritt Libraries
  - Outputs: Code Artifact and Javadoc
  - mrt-zk_java
  - mrt-core2
  - mrt-cloud
- War: Merritt Services
  - Outputs: Code Artifact and ECR Image
  - mrt-store
  - mrt-ingest
  - mrt-audit
  - mrt-replic
  - mrt-inventory
- Gem: Merritt Libraries
  - Outputs: Code Artifact and Rubydocs
  - uc3-ssm
  - mrt-zk_ruby
- Ruby App Code
  - mrt-dashboard
    - Outputs: ECR Image, Cloudfront: Swagger Docs
  - mrt-admin-lambda
    - Outputs: ECR Image, Cloudfront: Generated Documentation
  - mrt-cron
    - Outputs: Cloudfront: RevealJS presentation
  - mrt-atom
- Deprecated Libraries
  - cdl-zk-queue
  - mrt-zoo

