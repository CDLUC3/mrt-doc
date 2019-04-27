# 2019-04-26 Merritt Versioning Proposal

## Table of Contents

- [Calendar Versioning](#calendar-versioning)
- [What about semantic versioning?](#what-about-semantic-versioning)
   - [Arguments against using semantic versioning for Merritt](#arguments-against-using-semantic-versioning-for-merritt)
- [Calendar versioning with Maven](#calendar-versioning-with-maven)
- [Transitioning Maven projects to stable version numbers](#transitioning-maven-projects-to-stable-version-numbers)

## Calendar Versioning

Last year we adopted [calendar versioning](https://calver.org/) for the
Merritt UI ([mrt-dashboard](https://github.com/CDLUC3/mrt-dashboard)). Each
version consists of a year, a more-or-less arbitrary version number, and in
some cases a "modifier" such as `alpha` or `rc.1`.

```
mrt-dashboard $ git tag
2018.2
2018.2.1
2018.2.2.prod
2018.2.2.stage
2018.2.2
2018.2.3
2018.2.4
2018.3
2018.3.1
2018.3.2
2018.3.3
2018.3.4
2018.3.4.1
2018.3.5
2018.3.5.1
2018.4.alpha
2018.4.beta
2018.4.beta.2
2018.4.beta.3
2018.4.rc.1
2018.4.rc.2
2018.4.rc.3
2018.4.rc.4
2018.4.rc.5
2018.4.rc.6
2018.4.rc.7
2018.4.rc.8
2018.4
2018.4.1
2018.4.2.alpha
2018.5.alpha
2018.5.alpha.2
2018.5
2018.5.1.alpha
2018.5.2.alpha
2018.5.2
2018.5.3.alpha
2018.6.alpha
2018.6.rc.1
2018.6.rc.2
2018.6.rc.3
2018.6
2019.1.alpha
2019.1.alpha.2
2019.1
```

(Note that `git tag` reports results in strictly lexicographic order; in
fact `2018.6.rc.[1-3]` preceded the actual `2018.6` release, and so on.)

In [CalVer.org](https://calver.org/) terminology, the `mrt-dashboard`
project version scheme would be:

```
YYYY.MAJOR.MINOR.MICRO.MODIFIER
```

I submit that this is probably overcomplicated for our purposes, and it
would be simpler just to go with 

```
YYYY.MICRO
```

or possibly

```
YYYY.MICRO.MODIFIER
```

if we think it's important to distinguish release and pre-release versions
at a glance. The above versions would then collapse down to:

```
2018.1
2018.2
2018.3.prod
2018.3.stage
2018.3
2018.4
2018.5
2018.6
2018.7
2018.8
2018.9
2018.10
2018.11
2018.12
2018.13
2018.14.alpha
2018.14.beta
2018.14.beta.2
2018.14.beta.3
2018.14.rc.1
2018.14.rc.2
2018.14.rc.3
2018.14.rc.4
2018.14.rc.5
2018.14.rc.6
2018.14.rc.7
2018.14.rc.8
2018.14
2018.15
2018.16.alpha
2018.16.alpha
2018.16.beta
2018.16.beta.2
2018.16.beta.3
2018.16.rc.1
2018.16.rc.2
2018.16.rc.3
2018.16.rc.4
2018.16.rc.5
2018.16.rc.6
2018.16.rc.7
2018.16.rc.8
2018.16
2018.17.alpha
2018.17.alpha.2
2018.17
2018.18.alpha
2018.18.alpha
2018.18
2018.19.alpha
2018.19.alpha.2
2018.19
2019.1.alpha    # 2018.5.3.alpha was tagged on 2019-01-09,
2019.1.alpha.2  # so properly, 2019.x should start here
2019.1.rc.1
2019.1.rc.2
2019.1.rc.3
2019.1
2019.2.alpha
2019.2.alpha.2
2019.2
```

(Did you know we had 19 production releases last year? Me neither!)

There's some precedent for this: several of the "case study" projects
[identified by CalVer.org](https://calver.org/#case-studies) use only some
combination of date + `MICRO` version.

## What about semantic versioning?

[Semantic versioning](https://semver.org) is probably the most popular
versioning scheme in the open-source world, or at least the one projects,
especially small projects, most often claim to follow.

> Given a version number MAJOR.MINOR.PATCH, increment the:
>
> 1. MAJOR version when you make incompatible API changes,
>
> 2. MINOR version when you add functionality in a backwards-compatible
>    manner, and
>
> 3. PATCH version when you make backwards-compatible bug fixes.
>
> Additional labels for pre-release and build metadata are available as
> extensions to the MAJOR.MINOR.PATCH format.

Semantic versioning is baked into the syntax of dependency declarations in
[RubyGems](https://guides.rubygems.org/patterns/#pessimistic-version-constraint),
[npm](https://docs.npmjs.com/about-semantic-versioning), and [Go
modules](https://github.com/golang/go/wiki/Modules#semantic-import-versioning);
and something like it is at least implied by
[Ivy's](https://ant.apache.org/ivy/history/2.1.0/ivyfile/dependency.html)
dynamic revision syntax (also used by [Gradle](https://gradle.org/), which
is rapidly overtaking Maven as the Java build tool of choice, partly on its
merits and partly thanks to Google's choice to adopt it for Android).

It's not perfect (see, for instance, complaints
[here](https://gist.github.com/jashkenas/cbd2b088e20279ae2c8e) and
[here](https://blog.scottlogic.com/2016/12/15/semantic-versioning-is-not-enough.html)
about the context-dependent nature and general difficulty of distinguishing
breaking and non-breaking changes, the debatable advisability of automagic
upgrades, and so on), but it does make it easier for library or API users to
guess when it is and isn't safe or desirable to upgrade.

### Arguments against using semantic versioning for Merritt

First, Merritt is not a library or an API. The only users of Merritt code
are internal to CDL. There's no outside audience that needs the
compatibility information published in a semantic version.

Second, internally, we lack the necessary test infrastructure to
empirically identify breaking changes, and our guesswork track record is
at best mixed. Most likely, we would end up incrementing the major version
all the time anyway, out of an abundance of caution.

## Calendar versioning with Maven

Maven doesn't, out of the box, know anything about calendar versioning, nor
is there any particular third-party support for it. Luckily, Maven correctly
parses calendar versioning out of the box.

```
$ java -jar ${MAVEN_HOME}/lib/maven-artifact-3.5.4.jar 2018.1 2018.2 2018.10 2019.1.alpha 2019.1 2019.2
Display parameters as parsed by Maven (in canonical form) and comparison result:
1. 2018.1 == 2018.1
   2018.1 < 2018.2
2. 2018.2 == 2018.2
   2018.2 < 2018.10
3. 2018.10 == 2018.10
   2018.10 < 2019.1.alpha
4. 2019.1.alpha == 2019.1.alpha
   2019.1.alpha < 2019.1
5. 2019.1 == 2019.1
   2019.1 < 2019.2
6. 2019.2 == 2019.2
```

For Maven purposes, however, I wouldn't bother with the `.MODIFIER` part of
the version (`.alpha`, `.rc`, etc.). Instead, a Maven version would either be

```
YYYY.MICRO-SNAPSHOT
```

or 

```
YYYY.MICRO
```

depending on whether it was tagged for release. `SNAPSHOT` versions would
never be tagged. To tag, we'd use the [Maven release
plugin](https://github.com/CDLUC3/mrt-doc/blob/master/reports/2019-04-09-mvn-release-plugin.md),
something like:

```
mvn release:prepare --batch-mode -Dtag=2019.1 -DreleaseVersion=2019.1 -DdevelopmentVersion=2019.2-SNAPSHOT
```

-- although there are still some details we'd want to work out as to
exactly how it's invoked, exactly which commits end up in the history of
the master branch, and so on. ([There's a ticket for
that](https://www.pivotaltracker.com/story/show/165260832).)

## Transitioning Maven projects to stable version numbers

> See: [Merritt Maven/Jenkins builds](https://confluence.ucop.edu/pages/viewpage.action?pageId=214958788)

We would introduce stable `2019.1` versions starting with the lowest-level
projects (i.e., those with no internal dependencies, such as the
configuration projects). As we build those up, we modify the projects that
depend on them to depend on the stable version rather than whatever
`x.0-SNAPSHOT` version they're currently using.

As we tag each stable version, we would also increment the `SNAPSHOT`
version for new development, so e.g. `mrt-core-2.0-SNAPSHOT` would be
tagged and released as `mrt-core-2019.1`, and the new master branch
version would be `mrt-core-2019.2-SNAPSHOT`.

When it's necessary to work on more than one related project at a time --
e.g. if a new version of `mrt-inventorysrc` depends on code changes in a
new version of `mrt-core` -- then, during development, the SNAPSHOT version
of the downstream project can be changed to depend on the SNAPSHOT version
of the upstream project. To release, one would first stabilize, tag, and
release the upstream project, then change the downstream project to use the
new stable release of the downstream project, then tag and release that.

| State                                              | `mrt-core`      | `mrt-inventorysrc` | depends on `mrt-core` |
| ---                                                | ---             | ---                | ---                   |
| initial                                            | 2.0-SNAPSHOT    | 1.0-SNAPSHOT       | 2.0-SNAPSHOT          |
| tag/release `mrt-core`                             | 2019.1          | 1.0-SNAPSHOT       | 2.0-SNAPSHOT          |
| continue `mrt-core` development                    | 2019.2-SNAPSHOT |                    |                       |
| tag/release `mrt-inventorysrc`                     |                 | 2019.1             | 2019.1                |
| continue `mrt-inventorysrc` development            |                 | 2019.2-SNAPSHOT    | 2019.1                |
| co-develop `mrt-core` and `mrt-inventorysrc`       |                 | 2019.2-SNAPSHOT    | 2019.2-SNAPSHOT       |
| tag/release `mrt-core`                             | 2019.2          |                    |                       |
| continue `mrt-core` development                    | 2019.3-SNAPSHOT |                    |                       |
| update `mrt-inventorysrc` to use stable `mrt-core` |                 | 2019.2-SNAPSHOT    | 2019-2                |
| tag/release `mrt-inventorysrc`                     |                 | 2019.2             | 2019.2                |
| continue `mrt-inventorysrc` development            |                 | 2019.3             | 2019.2                |

Note that there are various Maven tools available for things like making
sure you don't release anything that depends on a SNAPSHOT version, and for
updating dependencies from SNAPSHOTs to stable versions.


