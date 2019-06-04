# JDK Roadmap

## OpenJDK

- “[Moving Java Forward Faster](https://mreinhold.org/blog/forward-faster)” proposal (2017-09-06)
  - allow delivery of small features in between big features
  - compete w/faster-evolving platforms
  
    > Deferring a feature from one release to the next should be a tactical
    > decision with minor inconveniences rather than a strategic decision
    > with major consequences.

- “[JEP 322: Time-Based Release
  Versioning](http://openjdk.java.net/jeps/322)” (2018-06-13)
  - New version numbering scheme: `$FEATURE.$INTERIM.$UPDATE.$PATCH`
  - `$FEATURE` releases (JDK 10, 11, etc.) every 6 months
  - `$INTERIM` always `.0` for now
  - `$UPDATE` `.1` 1 month after `$FEATURE`, then every 3 months

## Oracle

- “[New Java SE Release Cadence](https://blogs.oracle.com/java-platform-group/update-and-faq-on-the-java-se-release-cadence)” (2018-05-03)
  - feature releases every 6 months
  - feature releases should not be considered “major”: “Going from Java
    9->10->11 is closer to going from 8->8u20->8u40 than from 7->8->9”
  - Oracle (not OpenJDK) to make long-term support (LTS) releases every
    three years
    - starting w/Java 11 in September 2018
    - “Java 11 will have **commercial** support from Oracle” -- emphasis
      added -- “for at least eight additional years”
  - “Oracle plans to continue to lead and contribute to the JDK 8 Updates
    project until January 2019, before which a call for new maintainers
    will be made”

- “[Oracle Java SE Support Roadmap](http://www.oracle.com/technetwork/es/java/javase/documentation/eol-135779.html)” (2018-06-28)
  - beginning with JDK 11, Oracle JDK and OpenJDK should be interchangeable
  - Oracle JDK will be free for development / testing only
  - “OpenJDK builds from Oracle” will be available (as now) from
    [jdk.java.net](http://jdk.java.net/), under the [GPL w/classpath
    exception](http://openjdk.java.net/legal/gplv2+ce.html), “for those who
    do not want commercial support or enterprise management tools”

- [jdk-updates-dev](http://mail.openjdk.java.net/mailman/listinfo/jdk-updates-dev)
  mailing list
  - Oracle announced intent to stop maintaining JDK 9 and 10 update
    projects; no one stepped up

## Third parties

- RedHat: “[OpenJDK Life Cycle and Support Policy](https://access.redhat.com/articles/1299013)” (2018-08-13)
  - “A major version of OpenJDK is supported for at minimum a period of six
    years from the time that it is first introduced in any version of RHEL,
    or until the retirement date of the underlying RHEL platform,
    whichever is earlier.”
  - OpenJDK 7: till 2020-06
  - OpenJDK 8: till 2023-06

- Azul Systems: 

  - “[Eliminating Java Update
    Confusion](https://www.azul.com/eliminating-java-update-confusion/)”
    (2018-07-16)
    - “Because there are no LTS releases of OpenJDK, every release will only
      receive updates for six months, until the release of the next JDK
      version“
    - “Public updates of JDK 8 will end in January of 2019”
    
      > Commercial users who want to continue to get security patches and
      > bug fixes for JDK 8 or subsequent LTS releases after public updates
      > have ended will have three options:
      >
      > 1. Purchase a commercial support contract from Oracle. 
      > 
      > 2. Use a different binary distribution of the OpenJDK, which has
      >    security patches and bug fixes backported to it. The [Zulu
      >    OpenJDK
      >    binary](https://www.azul.com/products/zulu-and-zulu-enterprise/)
      >    is an example of this.
      >
      > 3. Create their own binary distribution from the OpenJDK source
      >    code and backport updates themselves.
      >
      > A Java community-led project,
      > [AdoptOpenJDK](https://adoptopenjdk.net/), has been started to
      > produce free OpenJDK binaries. At the time of writing, this project
      > is able to build binaries directly from OpenJDK source but has not
      > determined who will undertake the (potentially complex) task of
      > backporting updates from the current release to older versions.

  - “[What Comes After JDK
    8?](https://www.azul.com/what-comes-after-jdk-8/)” (2018-07-31)

    > Many people had assumed that they would move from JDK 8 to JDK 11
    > because it’s an LTS. However, the Oracle JDK 11 binary, the one with
    > LTS, is not going to be free for use in production. If people want to
    > use Oracle JDK 11 in production and get updates, they will need a
    > commercial support contract.
