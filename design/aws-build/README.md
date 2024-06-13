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

## Artifact Build Order

```mermaid
graph TD
  subgraph DOC
    mrt-doc
    mrt-doc-private
    merritt_ldap_tools
    mrt-ansible-service-restart
    mrt-box
    mrt-maint
    mrt-jenkins
  end
  subgraph CONFIG
    mrt-ingest-profiles
    mrt-tomcat
  end
  subgraph DOCKIT[Docker Maven IT Images]
    merritt-docker_inttest
  end
  subgraph DOCKSTACK[Docker Stack Generic Services]
    zookeeper
    mysql
    minio
    ldap
    smtp_mock
    ezid_mock
    merritt_init
    callback
    mrt-integ-tests
  end
  subgraph DOCKSERVICE[Docker Stack Merritt Services]
    store
    ingest
    audit
    replic
    inventory
    ui
  end
  subgraph JAR[Jar: Merritt Libraries]
    mrt-zk_java
    mrt-core2
    mrt-cloud
  end
  subgraph WAR[War: Merritt Services]
    mrt-store
    mrt-ingest
    mrt-audit
    mrt-replic
    mrt-inventory
  end
  subgraph GEM[Gem: Merritt Libraries]
    uc3-ssm
    mrt-zk_ruby
  end
  LAMBDA(Docker Merritt Lambda)
  subgraph RUBY[Ruby App Code]
    mrt-dashboard
    mrt-admin-lambda
    mrt-cron
    mrt-atom
  end
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
