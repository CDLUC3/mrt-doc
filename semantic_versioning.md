# Semantic Versioning Rules

```
Major.Minor.Patch
```

## Java Services

### Numbering Scheme
- Major - update after significant system changes
  - Updated to 1.0.0 at the introduction of the BOM in the mrt-core pom files. 
- Minor
  - Should be updated any time a routine set of changes are updated to teh mrt-core BOM
- Patch
  - Application level Changes

### Numbering Rules
- Any deployment to production must be based off of a new semantic tag for the repository
- Generally, changeds to stage are based off a semantic tag for the repository
  - When testing changes to a core library, our Jenkins build process can build all Java services at one time and can produce new versions of all war files with the same stage tag.  

<img width="1625" alt="image" src="https://user-images.githubusercontent.com/1111057/231583794-80669ac4-7d89-4b4e-ab28-51997f224e6b.png">

## Ruby Services     
- Any deployment to production must be based off of a new semantic tag for the repository
- Generally, changeds to stage are based off a semantic tag for the repository
  - stage tags may also utilize a suffix for development builds: Major.Minor.Patch-build
