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

### Java Code
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
  Pipeline -.-> S3_Private
  S3_Private -.-> Build
  ECR
  ECR -.-> |docker pull| EC2_Dev
  ECR -.-> |docker pull| Build
  subgraph CodeArtifact
    JarFiles
    WarFiles
  end
  EC2[EC2 Stage/Prod]
  EC2_Dev[EC2 Dev Docker Stack]
  WarFiles --> |deploy| EC2
  WarFiles -.-> |docker build| Build
  JarFiles -.-> Build
  subgraph CloudFront
    Javadocs
  end
```

### Ruby Code
```mermaid
graph TD
  GitHub --> Pipeline
  Cron --> Pipeline
  Pipeline(Code Pipeline)
  Pipeline --> Build
  Build(Code Build)
  S3_Private
  S3_Public
  Build --> |copy| S3_Public
  S3_Public --> |publish| CloudFront
  Build --> |docker push| ECR
  Pipeline -.-> S3_Private
  S3_Private -.-> Build
  ECR
  ECR --> |deploy| Lambda
  ECR -.-> |docker pull| EC2_Dev
  ECR -.-> |docker pull| Build
  EC2[EC2 Stage/Prod]
  EC2_Dev[EC2 Dev Docker Stack]
  Lambda[Lambda Stage/Prod]
  Gems[Ruby Code include by Git Tag]
  Gems -.-> Build
  Gems --> EC2
  subgraph CloudFront
    Rubydocs
  end
```

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

---

## Artifact Build Dependencies

### Stage/Production Deployments
```mermaid
graph TD
  DOCKIT[Docker Maven IT Images]
  JAR[Jar: Merritt Libraries]
  WAR[War: Merritt Services]
  GEM[Gem: Merritt Libraries]
  LAMBDA(Docker Merritt Lambda)
  RUBY[Ruby App Code]
  RUBYDEPLOY(Merritt Ruby App - Bundled on Deploy)
  JAVADEPLOY(Merritt Tomcat App)
  DOCKIT -.-> |IT test| JAR
  JAR --> WAR
  DOCKIT -.-> |IT test| WAR
  WAR --> JAVADEPLOY
  GEM --> RUBY
  RUBY --> RUBYDEPLOY
  RUBY --> LAMBDA
```

### Development Testing
```mermaid
graph TD
  DOCKIT[Docker Maven IT Images]
  DOCKSTACK[Docker Stack Generic Services]
  DOCKSERVICE[Docker Stack Merritt Services]
  JAR[Jar: Merritt Libraries]
  WAR[War: Merritt Services]
  GEM[Gem: Merritt Libraries]
  RUBY[Ruby App Code]
  DOCKTEST(Docker Development Stack)
  DOCKIT -.-> |IT test| JAR
  JAR --> WAR
  DOCKIT -.-> |IT test| WAR
  WAR --> DOCKSERVICE
  GEM --> RUBY
  RUBY --> DOCKSERVICE
  DOCKSERVICE --> DOCKTEST
  DOCKSTACK -->DOCKTEST
```


### Build Sequence
1. Build Docker Maven IT Images --> ECR
2. Build Docker Stack Generic Services --> ECR
3. Build JAR files --> Code Artifact
4. Ruby libraries and gems - build from github tag rather than from a gem
5. Build WAR files --> Code Artifact
6. Build Docker Stack Merritt Services (Tomcat and Rails) --> ECR
7. Build Lambda Docker Images --> ECR


## Anticipated Outputs
- https://merritt.uc3dev.cdlib.org/index.html
  - [html source](https://github.com/CDLUC3/merritt-tinker/blob/main/aws/uc3-mrt-devresources/index.html)

## Permission Needs

### Maven settings.xml file

The following settings.xml file allows a maven task to utilize assets from a CodeArtifact repo.  

This file is stored in `~/.m2/settings.xml` by defualt.

```
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd">
  <localRepository/>
  <interactiveMode/>
  <offline/>
  <pluginGroups/>
  <servers>
    <server>
      <id>cdlib-uc3-mrt-uc3-mrt-java</id>
      <username>aws</username>
      <password>${env.CODEARTIFACT_AUTH_TOKEN}</password>
    </server>
  </servers>
  <mirrors/>
  <proxies/>
  <profiles>
    <profile>
      <id>cdlib-uc3-mrt-uc3-mrt-java</id>
      <activation>
        <activeByDefault>true</activeByDefault>
      </activation>
      <repositories>
        <repository>
          <id>cdlib-uc3-mrt-uc3-mrt-java</id>
          <url>https://cdlib-uc3-mrt-${env.AWS_ACCOUNT_ID}.d.codeartifact.us-west-2.amazonaws.com/maven/uc3-mrt-java/</url>
        </repository>
      </repositories>
    </profile>
  </profiles>
  <activeProfiles/>
</settings>
```

### Set Up: CodeBuild Job
The following Environment variables will be set.
```
        EnvironmentVariables:
          - Name: 'S3CFBUCKET'
            Value: !Ref S3CFBucketId
          - Name: 'S3PRIVBUCKET'
            Value: !Ref S3MrtPrvId
          - Name: 'CFDISTRIBUTIONID'
            Value: !Ref CloudfrontDistroId
          - Name: 'AWS_ACCOUNT_ID'
            Value: !Sub '${AWS::AccountId}'
          - Name: 'AWS_REGION'
            Value: !Sub '${AWS::Region}'
          - Name: 'ECR_REGISTRY'
            Value: !Sub '${AWS::AccountId}.dkr.ecr.${AWS::Region}.amazonaws.com'
          - Name: 'CODEARTIFACT_URL'
            Value: !Sub 'https://cdlib-uc3-mrt-${AWS::AccountId}.d.codeartifact.${AWS::Region}.amazonaws.com/maven/uc3-mrt-java/'
```

Each buildspec.yml file will contain the following
```
      - cp settings.xml ~/.m2/
      - export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain cdlib-uc3-mrt --domain-owner $AWS_ACCOUNT_ID --region us-west-2 --query authorizationToken --output text`
      - aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin ${ECR_REGISTRY}
```

### Set Up: Main Account Jobs

- Create a ~/.m2/settings.xml file with the UC3 DEV account number hard-coded
- Set CODEARTIFACT_AUTH_TOKEN using the UC3 DEV account number (see above)
- Set ECR_REGISTRY using the UC3 DEV account number (see above)
- Run `aws ecr get-login-password ...`

## Code Artifact

### Push to CodeArtifact

The following is added to pom.xml files.

```
<distributionManagement>
      <repository>
        <id>cdlib-uc3-mrt-uc3-mrt-java</id>
        <name>cdlib-uc3-mrt-uc3-mrt-java</name>
       <url>https://cdlib-uc3-mrt-${env.AWS_ACCOUNT_ID}.d.codeartifact.us-west-2.amazonaws.com/maven/uc3-mrt-java/</url>
      </repository>
    </distributionManagement>
```

#### CodeBuild Job
- `mvn deploy` will be supported

#### Main Account Sessions
- `mvn deploy` will NOT be supported

### Read from CodeArtifact

#### CodeBuild Job
- mvn tasks should use CodeArtifact resources

#### Main Account Sessions
- mvn tasks should use CodeArtifact resources
- delete ~/.m2/settings.xml to ignore CodeArtifact

## ECR
- Merritt images should live exclusively in EITHER Main Account ECR or UC3 DEV ECR.
- Individual Images should not reside in both.
- Production and Stage Lambda code should initially remain in the Main Account ECR.  Migration can be considered later.

### Push to ECR (UC3 Account)

#### Build Jobs
- Enabled

#### Main Account Session
- Perhaps we should only PULL

### Pull from ECR (UC3 Account)

#### CodeBuild Job
- Enabled

#### Main Account
- Enabled (see setup instructions above)
