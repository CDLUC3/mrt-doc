# 2019-04-09: Maven release plugin notes

Traditionally, a Maven release consists of two phases, **preparing** the
release and **performing** the release. Preparing the release builds, sets
version numbers, and commits to source control. Performing the release
pushes artifacts to a repository.

In addition, the release plugin allows you to **roll back** a release, with
some caveats. See ["Rolling back a release"](#rolling-back-a-release) below for
details.

- [Preparing the release](#preparing-the-release)
- [Performing the release](#performing-the-release)
- [Rolling back a release](#rolling-back-a-release)

(For full documentation, see the [plugin site](http://maven.apache.org/maven-release/maven-release-plugin/).)

> **Note:** This document covers the Maven release plugin, but the Maven
> release plugin may not be the best way to achieve these goals. See these
> blog posts:
> 
> - Stephen Connolly, [A New Way to Do Continuous Delivery with Maven and Jenkins Pipeline](https://www.cloudbees.com/blog/new-way-do-continuous-delivery-maven-and-jenkins-pipeline), CloudBees blog, 2016-05-04
> - Stephen Connolly, [Apache Maven & Continuous Delivery/Deployment - The DevOptics team's approach](https://www.cloudbees.com/blog/apache-maven-continuous-deliverydeployment-devoptics-teams-approach), CloudBees blog, 2019-03-26

## Preparing the release

Preparing a release consists of the following steps:

1. build the project
1. update POM files from development versions (e.g. 2.0-SNAPSHOT) to
   release versions (e.g. 2.0)
1. commit/push this POM file change to source control
1. tag the commit
1. update POM files from release versions to next development version
   (e.g. 2.1-SNAPSHOT)
1. commit/push this POM file change to source control

The end result is two new commits, and a tag. E.g., if we start with a 2.0-SNAPSHOT repository with the following history:

```sh
$ git log --oneline -n 3
fcab8a7 (HEAD -> master, origin/master, origin/HEAD) Finalize last feature
761dbf1 Fix something or other
e0c9ef3 Start last feature
```

and run the command:

```sh
mvn release:prepare \
  --batch-mode \
  -Dtag=2.0 \
  -DreleaseVersion=2.0 \
  -DdevelopmentVersion=2.1-SNAPSHOT
```

we then have:

```
$ git log --oneline -n 5
cba4a2b (HEAD -> master, origin/master, origin/HEAD) [maven-release-plugin] prepare for next development iteration
c9bf130 (tag: 2.0) [maven-release-plugin] prepare release 2.0
fcab8a7 Finalize last feature
761dbf1 Fix something or other
e0c9ef3 Start last feature
```

If we `git diff` the last "manual" commit and the tagged version, we'll see something
like this, as the version in the POM file gets bumped from 2.0-SNAPSHOT to 2.0:

```diff
$ git diff fcab8a7 2.0
diff --git a/core/pom.xml b/core/pom.xml
index cef7592..b21728f 100644
--- a/core/pom.xml
+++ b/core/pom.xml
@@ -3,11 +3,11 @@
     <parent>
         <artifactId>mrt-core-util</artifactId>
         <groupId>org.cdlib.mrt</groupId>
-        <version>2.0-SNAPSHOT</version>
+        <version>2.0</version>
     </parent>
     <artifactId>mrt-core</artifactId>
     <packaging>jar</packaging>
-    <version>2.0-SNAPSHOT</version>
+    <version>2.0</version>
     <name>UC3-mrtcore</name>
     <url>http://uc3.cdlib.org</url>
```

Likewise, if we diff the release tag with the new HEAD, we get something like:

```diff
$ git diff 2.0 HEAD
diff --git a/core-util-init/pom.xml b/core-util-init/pom.xml
index 239afdf..8044af2 100644
--- a/core-util-init/pom.xml
+++ b/core-util-init/pom.xml
@@ -3,11 +3,11 @@
   <parent>
     <artifactId>mrt-core-util</artifactId>
     <groupId>org.cdlib.mrt</groupId>
-    <version>2.0</version>
+    <version>2.1-SNAPSHOT</version>
   </parent>
   <artifactId>mrt-core-utilinit</artifactId>
   <packaging>pom</packaging>
-  <version>2.0</version>
+  <version>2.1-SNAPSHOT</version>
   <name>UC3-mrtCoreUtilInit</name>
   <url>http://uc3.cdlib.org</url>
```

### Notes

- If you have uncommitted local changes, `mvn release:prepare` will fail with
  a warning, `Cannot prepare the release because you have local modifications`.
- If you want to try the release without committing any changes locally or
  pushing to GitHub, you can pass `-DdryRun=true` on the `mvn release:prepare`
  command line.

## Performing the release

Performing a release uses `mvn deploy` to push artifacts to a repository
(in our case Nexus). (By default, it also uses `site-deploy` to build and
deploy a standard Maven documentation site, which we don't need or want,
so we'd need to disable that).

Note that only some of our projects currently include a deploy step, and
some of those are handled by Jenkins rather than by Maven. We would want to
make this consistent.

## Rolling back a release

The `mvn release:rollback` command will undo a prepared release, up to a
point. Given the following state after `mvn release:prepare`:

```sh
$ git log --oneline -n 5
cba4a2b (HEAD -> master, origin/master, origin/HEAD) [maven-release-plugin] prepare for next development iteration
c9bf130 (tag: 2.0) [maven-release-plugin] prepare release 2.0
fcab8a7 Finalize last feature
761dbf1 Fix something or other
e0c9ef3 Start last feature
```

If we then run `mvn release:rollback`, we get:

```sh
$ git log --oneline -n 5
78420fa (HEAD -> master, origin/master, origin/HEAD) [maven-release-plugin] rollback the release of 2.0
cba4a2b [maven-release-plugin] prepare for next development iteration
c9bf130 (tag: 2.0) [maven-release-plugin] prepare release 2.0
fcab8a7 Finalize last feature
761dbf1 Fix something or other
```

Note that this still includes the history of the rolled-back release, and more importantly, that
the tag we created still exists. If we try to re-run `mvn:prepare` with the same arguments, it will
(eventually) fail with something like:

```
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-release-plugin:2.5.3:prepare (default-cli) on project mrt-core-util: Unable to tag SCM
[ERROR] Provider message:
[ERROR] The git-tag command failed.
[ERROR] Command output:
[ERROR] fatal: tag '2.0' already exists
```

-- but only _after_ commiting the 2.0-SNAPSHOT ⇒ 2.0 POM changes, and _before_ setting the new
2.1-SNAPSHOT version:

```sh
$ git log --oneline -n 5
1dc618d (HEAD -> master, origin/master, origin/HEAD) [maven-release-plugin] prepare release 2.0
78420fa [maven-release-plugin] rollback the release of 2.0
cba4a2b [maven-release-plugin] prepare for next development iteration
c9bf130 (tag: 2.0) [maven-release-plugin] prepare release 2.0
fcab8a7 Finalize last feature
```

At this point, there are a couple of options: 

1. If we want to get back to where we were after the rollback, we can use

   ```sh
   git reset --hard 78420fa  # reset to the rollback commit
   git push --force          # push the reset to GitHub
   ```

   -- although this will still leave the 2.0 tag in place.

2. If we want to pretend the original `release:prepare` never happened, we
   need to not only reset to the commit _before_ the prepare, we need to delete
   the tag, both locally and on GitHub:

   ```sh
   git reset --hard fcab8a7      # reset to last commit before release:prepare
   git push --force              # push the reset to GitHub
   git tag --delete 2.0          # delete tag '2.0' locally
   git push --delete origin 2.0  # delete tag '2.0' on GitHub
   ```
