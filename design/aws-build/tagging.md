# CodeArtifact Tagging for Merritt

- [Merritt AWS Build Design](README.md)

## General Guidelines

- Non-breaking changes SHOULD NOT update snapshot versions.
- Breaking changes SHOULD update snapshot versions.


## Use Cases

1. Non-breaking change to Merritt Service
2. Non-breaking change to Merritt Library
3. Breaking/significant change to Merritt Service
4. Breaking/significant change to Merritt Library

## Non-breaking change to Merritt Service
- Update Merritt Service repo code
- Tag Merritt Service in github with semantic version (2.3.4)
- Deploy service using semantic tag

## Non-breaking change to Merritt Library
- Update Merritt Service library code
- Tag each Merritt Service that depends on the library in order to trigger a new release
  - ingest 2.3.5
  - store 2.0.2
- Deploy each service using the semantic tag  

## Breaking/significant change to Merritt Service
- Run `mvn release:update-versions` to update the snapshot(s) for the service.
- Committ the change to pom.xml
- Update Merritt Service repo code.
- TODO: reduce the number of artifact for each service.
- Tag Merritt Service in github with semantic version (2.3.4)
- Deploy service using semantic tag

## Breaking/significant change to Merritt Library
This is the most complicated scenario.  This will also make it easier to keep services consistent with the appropriate version of a jar file.


### Update the appropriate library/libraries
- Run `mvn release:update-versions` to update the snapshot(s) for the library/libraries being modified.
- Commit the change to pom.xml

### Update BOM
> [!IMPORTANT]
> You must create a new version of the BOM in order to register your new snapshot

- cd to mrt-core2/reflect
- Run `mvn release:update-versions` to force a new version of the BOM
- Modify the version number for you library/libraries in the BOM's pom.xml
- Commit the change to pom.xml

### Update BOM version number in ALL dependent libaries and Merritt Services
```
<dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>org.cdlib.mrt</groupId>
        <artifactId>mrt-reflectoring-bom</artifactId>
        <version>1.0.0</version>
        <type>pom</type>
        <scope>import</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>
```

- Update all the dependent pom.files
- Tag new versions for each service
