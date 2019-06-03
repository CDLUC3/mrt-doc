# David Moles: Transition (2019-06-03)

Contact: [dmoles@dmoles.net](mailto:dmoles@dmoles.net) (UCB email address TBD)

## Schedule

- Separation date / last day in office: 2019-06-07 (Friday) 
- First day at UCB: 2019-06-10 (Monday)

## Current projects

### UCB/TIND

- kickoff meeting 2019-03-22
  - [David M's
  notes](https://github.com/CDLUC3/mrt-doc/blob/master/meetings/2019-03-22-Berkeley-DAMS.md)
  - [David Triebwasser's
  notes](https://docs.google.com/document/d/18J34v_fKEj_9MJiC9hEssbyFLeCHyIvqk_qI8DsNlXY/edit)
  (official, much more detailed)
- code: [mrt-tind-harvester](#mrt-tind-harvester)

## GitHub repositories

- [Active](#active)
   - [mrt-dashboard](#mrt-dashboard)
   - [mrt-doc](#mrt-doc)
   - [mrt-ingest-ruby](#mrt-ingest-ruby)
   - [mrt-jenkins-docker](#mrt-jenkins-docker)
   - [mrt-tind-harvester](#mrt-tind-harvester)
   - [uc3-tools](#uc3-tools)
      - [minio-concurrency-test](#minio-concurrency-test)
      - [uc3-build-info](#uc3-build-info)
      - [uc3-system-info](#uc3-system-info)
   - [cos](#cos)
   - [mrt-bits](#mrt-bits)
   - [mrt-core2 (branch: mrt-release-plugin)](#mrt-core2-branch-mrt-release-plugin)
- [Archived](#archived)
   - [eoth-tools](#eoth-tools)
   - [merritt-aws](#merritt-aws)

### Active

#### mrt-dashboard

- Repository: https://github.com/CDLUC3/mrt-dashboard
- Language: Ruby

Merritt UI.

#### mrt-doc

- Repository: https://github.com/CDLUC3/mrt-doc

Merritt documentation repository. In addition to the
[wiki](https://github.com/CDLUC3/mrt-doc/wiki), includes:

- [meetings](https://github.com/CDLUC3/mrt-doc/tree/master/meetings)
  - documentation of / conclusions from (various, non-recurring) Merritt
  meetings
- [reports](https://github.com/CDLUC3/mrt-doc/tree/master/reports)
  - reports of various Merritt-related investigations

This project also includes a number of GitHub issues taken from the
[2019-09-05 "Simplifying Merritt"
meeting](https://github.com/CDLUC3/mrt-doc/blob/master/meetings/2018-09-25-simplifying-merritt.md)
(see link for list).

#### mrt-ingest-ruby

- Repository: https://github.com/CDLUC3/mrt-ingest-ruby
- Language: Ruby

Ruby gem for submitting objects to Merritt Ingest. Note that
[mrt-tind-harvester](#mrt-tind-harvester) uses the current release, while
[mrt-dashboard](#mrt-dashboard) is still on an older version.

#### mrt-jenkins-docker

- Repository: https://github.com/CDLUC3/mrt-jenkins-docker
- Languages: Docker, Python

Dockerfile for a Jenkins continuous integration server using Jenkins
[Configuration as Code](https://jenkins.io/projects/jcasc/). Prototype.
Involves a certain amount of hackery around Docker volume permissions that
an experienced Docker administrator could probably avoid.

Some pieces that might be useful regardless of whether we use Docker for
Jenkins in the future:

-
  [get-openjdk-url.py](https://github.com/CDLUC3/mrt-jenkins-docker/blob/master/bin/get-openjdk-url.py):
  Python script for locating latest OpenJDK tarballs from the
  [AdoptOpenJDK](https://github.com/AdoptOpenJDK) project
-
  [jenkins.yaml](https://github.com/CDLUC3/mrt-jenkins-docker/blob/master/casc_configs/jenkins.yaml)
  file
  including a parameterized build of [mrt-core2](#mrt-core2) for both JDK 8
  and JDK 11

#### mrt-tind-harvester

- Repository: https://github.com/CDLUC3/mrt-tind-harvester
- Language: Ruby

Gem / standalone application for harvesting from the [UCB TIND
DAMS](#ucb-tind).

#### uc3-tools

- Repository: https://github.com/CDLUC3/uc3-tools

##### minio-concurrency-test

- Repository: https://github.com/CDLUC3/uc3-tools/tree/master/minio-concurrency-test
- Language: Python

Test script developed in the hope of replicating Minio consistency issue
observed in Merritt storage testing. Wraps the AWS command line tools in
order to rapidly upload files to Minio (or any S3 endpoint) from one client
and, using SSH, download and verify them from a different client. (The
issue could not be replicated.)

##### uc3-build-info

- Repository: https://github.com/CDLUC3/uc3-tools/tree/master/uc3-build-info
- Language: Go

Utility that uses the GitHub and Jenkins APIs to gather information about
Merritt builds and dependencies. Probably somewhat sensitively dependent on
just how we've set up our Jenkins jobs and Maven builds, and would probably
require some rework if, e.g., we introduced
[Jenkinsfiles](https://jenkins.io/doc/book/pipeline/jenkinsfile/).

Used to generate the ["Merritt Maven/Jenkins
builds"](https://confluence.ucop.edu/pages/viewpage.action?pageId=214958788) 
Confluence page.

##### uc3-system-info

- Repository: https://github.com/CDLUC3/uc3-tools/tree/master/uc3-system-info
- Language: Go

Utility that reads (a local copy of) the
[mrt-conf-prv](https://github.com/cdlib/mrt-conf-prv) private configuration
repository and/or a snapshot
[uc3-inventory.txt](https://github.com/CDLUC3/uc3-tools/blob/master/uc3-system-info/tests/testdata/uc3-inventory.txt)
file to generate information about UC3 hosts and Merritt cloud
configurations.

Used to generate the ["Merritt Hostnames and CNAMES in
AWS"](https://confluence.ucop.edu/display/UC3/Merritt+Hostnames+and+CNAMES+in+AWS)
Confluence page.

Can be used to
[locate](#https://github.com/CDLUC3/uc3-tools/tree/master/uc3-system-info#locate)
a Merritt object in AWS, Minio, or OpenStack/Swift based on an ARK and
storage node number.

#### cos

- Repository: https://github.com/dmolesUC/cos
- Language: Go

A tool for testing and validating cloud object storage. Could be a model
for a streaming audit or replication service requiring no local storage.

#### mrt-bits

- Repository: https://github.com/dmolesUC/mrt-bits
- Language: Go

An experimental tool for streaming access to stored Merritt content.
Includes [proof of concept
code](https://github.com/dmolesUC/mrt-bits/blob/master/operations/archive.go)
for streaming entire objects as an uncompressed ZIP file, including
precalculating the expected size of the ZIP archive. Could be a model for
an improved Merritt Express.

#### mrt-core2 (branch: mrt-release-plugin)

- Repository: https://github.com/CDLUC3/mrt-core2/tree/mrt-release-plugin

Updates [mrt-core2](https://github.com/CDLUC3/mrt-core2/) to:

- explicitly import JAXB (no longer part of JDK distribution; needed for
  JDK 11)
- inherit properties from the [parent
  POM](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html#Project_Inheritance)
- add a [Jenkinsfile](https://jenkins.io/doc/book/pipeline/jenkinsfile/)
- support the [Maven release
  plugin](https://github.com/CDLUC3/mrt-doc/blob/master/reports/2019-04-09-mvn-release-plugin.md)

### Archived

#### eoth-tools

- Repository: https://github.com/CDLUC3/eoth-tools
- Language: Scala

Tools for mucking around with [eothxtf](https://github.com/CDLUC3/eothxtf).
Mostly used for identifying systematic problems in and differences between
2012 and 2008 EOTH crawls.

#### merritt-aws

- Repository: https://github.com/CDLUC3/merritt-aws
- Language: Python (Jupyter)

[Jupyter Notebook](https://jupyter.org/) environment for analyzing Merritt
AWS expenditures, based on data from April 2018. Could probably be updated
by adding CSV files to the
[data](https://github.com/CDLUC3/merritt-aws/tree/master/data) directory
and modifying the
[`__read_costs`](https://github.com/CDLUC3/merritt-aws/blob/master/src/costs.py)
function to read the new files.
