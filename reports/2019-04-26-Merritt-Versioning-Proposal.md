# 2019-04-26 Merritt Versioning Proposal

## Calendar Versioning

Last year we adopted [calendar versioning](https://calver.org/) for the
Merritt UI ([mrt-dashboard](https://github.com/CDLUC3/mrt-dashboard)). Each
version consists of a year, a more-or-less arbitrary version number, and in
some cases a "modifier" such as `alpha` or `rc.1`.

```
mrt-dashboard $ git tag
2018.2
2018.2.1
2018.2.2
2018.2.2.prod
2018.2.2.stage
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
2018.4
2018.4.1
2018.4.2.alpha
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
2018.5
2018.5.1.alpha
2018.5.2
2018.5.2.alpha
2018.5.3.alpha
2018.5.alpha
2018.5.alpha.2
2018.6
2018.6.alpha
2018.6.rc.1
2018.6.rc.2
2018.6.rc.3
2019.1
2019.1.alpha
2019.1.alpha.2
```

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
at a glance. There's some precedent for this: several of the "case study"
projects [identified by CalVer.org](https://calver.org/#case-studies) use
only some combination of date + `MICRO` version.

### Arguments for other versioning schemes

#### Semantic versioning

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

##### Arguments against using semantic versioning for Merritt

First, Merritt is not a library or an API. The only users of Merritt code
are internal to CDL. There's no outside audience that needs the
compatibility information published in a semantic version.

<!--
## Tagging a release with the Maven release plugin

```
mvn release:prepare --batch-mode -Dtag=2019.1 -DreleaseVersion=2019.1 -DdevelopmentVersion=2019.2-SNAPSHOT
```
-->
