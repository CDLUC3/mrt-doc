# 2019-06-06 Miscellaneous Research

Collected links with potential relevance to Merritt.

## Digital preservation

- [“From Hydras to TACOs: Evolving the Stanford Digital
  Repository”](https://docs.google.com/presentation/d/11wBga9WbN0JBZ0Ke1k-MLHFbMhSDnz-j9jEU5aQScOo/edit#slide=id.g3ba884e179_0_3)

  > Stanford Digital Repository Metrics
  > 
  > - Manages roughly 1.6 million distinct resources currently
  > - Has about half a petabyte (455 TB) of digital assets in our preservation layer
  > - ~426 TB of digital assets in our repository staging systems
  > - 455 TB of digital assets & 59.1 GB of metadata in our access system(s)

- [“Invisible Defaults and Perceived Limitations: Processing the Juan Gelman Files”](https://medium.com/on-archivy/invisible-defaults-and-perceived-limitations-processing-the-juan-gelman-files-4187fdd36759)

  > This is all to say that keeping the linguistic integrity of these file
  > and folder names shouldn’t be a “compromise on an ideal” — it is the
  > very practical responsibility of processing archivists and other
  > digital curation laborers to preserve as much of the original content
  > and context of the collections we’ve been entrusted to preserve and
  > provide access to. Diacritic glyphs are an inherent part of the content
  > that distinguishes certain words from others; ridding the file and
  > folder names of them will misrepresent the collections they are meant
  > to describe and misinform the users who are researching them.

- [Portland Common Data Model](https://github.com/duraspace/pcdm/wiki)

  > The Portland Common Data Model (PCDM) is a flexible, extensible domain
  > model that is intended to underlie a wide array of repository and DAMS
  > applications. The primary objective of this model is to establish a
  > framework that developers of tools (e.g., Samvera-based engines, such
  > as Hyrax, Hyku, Sufia, and Avalon; Islandora; custom Fedora sites) can
  > use for working with models in a general way, allowing adopters to
  > easily use custom models with any tool.

- [Cursive Data Model](https://docs.google.com/document/d/1ZkwoRjEETaceu2OvlZ8w1qYmunoLlhAUSnmPHBjPzFs/edit#heading=h.cuv4lubqjk0k)

  (Stephen's proposal for a Merritt follow-on data model)

- [“Principles for curation infrastructure”](https://docs.google.com/spreadsheets/d/1o1f1EjxCmgBOa7okJafp7a5jJvzLaRPW30ETQ10RX54/edit#gid=2142084961)

  (Stephen's spreadsheet “to make explicit associations between fundamental
  assumptions and the consequent goals implied by those assumptions,
  strategies for meeting those goals, and (ultimately) technologies that
  embody or enable those strategies.“)

- [Oxford Common File System Layout](https://ocfl.io/)

  > This Oxford Common File Layout (OCFL) specification describes an
  > application-independent approach to the storage of digital information
  > in a structured, transparent, and predictable manner. It is designed to
  > promote long-term object management best practices within digital
  > repositories.

- [Full draft of “Theory & Craft of Digital Preservation”](http://www.trevorowens.org/2017/06/full-draft-of-theory-craft-of-digital-preservation/)

  > This book serves as both a basic introduction to the issues and
  > practices of digital preservation and a theoretical framework for
  > deliberately and intentionally approaching digital preservation as a
  > field with multiple lineages. The intended audience is current and
  > emerging library, archive, and museum professionals as well as the
  > scholars and researchers who interface with these fields.

- [“But that's not preservation!” Notes on preservation's divergent lineages](http://www.trevorowens.org/2016/07/but-thats-not-preservation-notes-on-preservations-divergent-lineages/)

  > Preservation means a lot of different things in different contexts.
  > Each of those contexts has its own history. Those histories are tied up
  > in the changing nature of the mediums and objects for which each
  > conception of preservation and conservation was developed. All too
  > often, discussions of digital preservation start by contrasting digital
  > media to analog media. This contrast forces a series of false
  > dichotomies.

- [Merritt future feature list](https://docs.google.com/spreadsheets/d/1Tb9Cp7juqXbhzNPj8SJl9pFTCgNVS41Qx64IC7QZEH0/edit#gid=0)

  (Based on [“Merritt future
  brainstorming”](https://github.com/CDLUC3/mrt-doc/blob/master/meetings/2016-07-06-merritt-future-brainstorming.md)
  meeting)

## Web archiving

- [Technical documentation for the UK Web Archive](https://github.com/ukwa/ukwa-documentation/blob/master/README.md)

  > We enable curators and collaborators to define what we should collect,
  > and how often. We attempt to visit every UK website at least once a
  > year, and for the sites the curators have identified we can visit much
  > more frequently. For example, we collect news sites at least once per
  > day.
  >
  > We capture the websites using web crawling software, and converting the
  > live sites into static records we can preserve for the future.
  >
  > We use these records to reconstruct an imperfect facsimile of the
  > original live site, allowing our readers and researchers to browse the
  > UK web as it was in the past. We can also analyse these historical
  > records as data, to extract historical trends, or to build access
  > tools.

## Process

- [“Dark Scrum”](https://ronjeffries.com/articles/016-09ff/defense/)

  > Too often, at least in software, Scrum seems to oppress people. Too
  > often, Scrum does not deliver as rapidly, as reliably, as steadily as
  > it should. As a result, everyone suffers. Most often, the developers
  > suffer more than anyone.

- [“The State of Agile Software in 2018”](https://martinfowler.com/articles/agile-aus-2018.html)

  > On the surface, the world of agile software development is bright,
  > since it is now mainstream. But the reality is troubling, because much
  > of what is done is faux-agile, disregarding agile's values and
  > principles. The three main challenges we should focus on are: fighting
  > the Agile Industrial Complex and its habit of imposing process upon
  > teams, raising the importance of technical excellence, and organizing
  > our teams around products (rather than projects).

## Architecture

- [“How do you cut a monolith in half?”](https://programmingisterrible.com/post/162346490883/how-do-you-cut-a-monolith-in-half)

  > When you cut a larger service apart, where you cut depends on latency,
  > resources, and access to state, but it also depends on error handling,
  > availably and recovery processes. It depends, but you probably don’t
  > want to depend on a message broker. …
  >
  > In practice, a message broker is a service that transforms network
  > errors and machine failures into filled disks. Then you add more disks.
  > …
  >
  > Be warned: A distributed system is something you can draw on a
  > whiteboard pretty quickly, but it’ll take hours to explain how all the
  > pieces interact.

- [“Blockchain as the infrastructure for science?”](https://blog.dshr.org/2017/05/blockchain-as-infrastructure-for-science.html?m=1)

  > I understand the theoretical advantages of peer-to-peer (P2P)
  > technology. But after nearly two decades researching, designing,
  > building, deploying and operating P2P systems I have learned a lot
  > about how hard it is for these theoretical advantages actually to be
  > obtained at scale, in the real world, for the long term.


## Useful technologies

- [“AWS tips I wish I'd known before I started”](https://wblinks.com/notes/aws-tips-i-wish-id-known-before-i-started/)

  > Store no application state on your servers. … 
  >
  > Store extra information in your logs. …
  >
  > Disable SSH access to all servers. … If you have to SSH into your
  > servers, then your automation has failed. …
  >
  > Servers are ephemeral, you don't care about them. You only care about
  > the service as a whole.

- [Containerizing Continuous Delivery in
  Java](https://proquest.safaribooksonline.com/book/programming/java/9781491986851)

  > Using containers to package and deploy applications is causing a
  > seismic shift in the way software is developed, and you may wonder how,
  > or if, Java works with this new paradigm. In fact, combining Java with
  > container technology can bring out the best in both. With this report,
  > you’ll learn valuable techniques, methodologies, and advice for
  > continuously delivering Java applications with containers, from both an
  > architectural and operational perspective.

- [“The Log: What every software engineer should know about real-time data's unifying abstraction“](https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying)

  > One of the most useful things I learned in all this was that many of
  > the things we were building had a very simple concept at their heart:
  > the log. Sometimes called write-ahead logs or commit logs or
  > transaction logs, logs have been around almost as long as computers and
  > are at the heart of many distributed data systems and real-time
  > application architectures.
  >
  > You can't fully understand databases, NoSQL stores, key value stores,
  > replication, paxos, hadoop, version control, or almost any software
  > system without understanding logs; and yet, most software engineers are
  > not familiar with them. I'd like to change that. In this post, I'll
  > walk you through everything you need to know about logs, including what
  > is log and how to use logs for data integration, real time processing,
  > and system building.

- [Redis Streams](https://redis.io/topics/streams-intro)

  > The Stream is a new data type introduced with Redis 5.0, which models a
  > log data structure in a more abstract way, however the essence of the
  > log is still intact: like a log file, often implemented as a file open
  > in append only mode, Redis streams are primarily an append only data
  > structure. At least conceptually, because being Redis Streams an
  > abstract data type represented in memory, they implement more powerful
  > operations, to overcome the limits of the log file itself.
  >
  > What makes Redis streams the most complex type of Redis, despite the
  > data structure itself being quite simple, is the fact that it
  > implements additional, non mandatory features: a set of blocking
  > operations allowing consumers to wait for new data added to a stream by
  > producers, and in addition to that a concept called Consumer Groups.
  >
  > Consumer groups were initially introduced by the popular messaging
  > system called Kafka (TM). Redis reimplements a similar idea in
  > completely different terms, but the goal is the same: to allow a group
  > of clients to cooperate consuming a different portion of the same
  > stream of messages.

- [“The interesting ideas in Datasette”](https://simonwillison.net/2018/Oct/4/datasette-ideas/)

  > Datasette provides a read-only API to your data. ... Since the data is
  > read-only and is encapsulated in a single binary SQLite database file,
  > we can bundle the data as part of the app. This means we can trivially
  > create and publish Docker images that provide both the data and the API
  > and UI for accessing it. We can also publish to any hosting provider
  > that will allow us to run a Python application, without also needing to
  > provision a mutable database.

- [“Fast autocomplete search for your website”](https://24ways.org/2018/fast-autocomplete-search-for-your-website/)

  > It's kind of nuts that thanks to the sqlite3 standard library module
  > and SQLite's FTS features Python ships with an extremely robust, highly
  > performant search engine out of the box and hardly anyone knows it's
  > there

- [Resilience4J](https://github.com/resilience4j/resilience4j)

  > Resilience4j is a lightweight fault tolerance library inspired by
  > Netflix Hystrix, but designed for Java 8 and functional programming.
  > ... Resilience4j provides higher-order functions (decorators) to
  > enhance any functional interface, lambda expression or method reference
  > with a Circuit Breaker, Rate Limiter, Retry or Bulkhead.


