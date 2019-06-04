# Merritt / Neo4J / Cursive 2016-07-06

(Stephen, Perry, David)

> **DECIDED:** This fall, we should develop a realistic Neo4J-based
> inventory database [prototype](#graph-database-prototype), to determine
> whether it will give us the improvements we hope for and help us decide
> where to go next.

- [Graph databases](#graph-databases)
  - [Graph databases, in general](#graph-databases-in-general)
  - [Neo4J](#neo4j)
  - [Thoughts](#thoughts)
- [Merritt](#merritt)
  - [Migration plan for Neo4J or other graph database](#migration-plan-for-neo4j-or-other-graph-database)
- [Graph database prototype](#graph-database-prototype)
- [Other open technology questions](#other-open-technology-questions)

## Graph databases

### Graph databases, in general

Advantages:

- graph database should be fast at relationship lookups, close to linear
  for most cases (vs. quadratic complexity in a traditional RDBMS
  self-join)
- schemaless design should mean design changes are relatively cheap

Caveats:

- still need to be careful how you architect your graph DB, to play well
  with layout in memory/on disk
- lack of a schema means more freedom but also more management in application
  code, have to be more careful not to screw things up, & to keep track of
  design changes

### Neo4J

Technical:

- mature technology
- known to scale to very large data (billions of nodes) with relatively
  few servers
- community edition doesn't have clustering; we'd probably want professional
  if only for failover
- professional also apaprently includes various other features like hot
  backups and better caching
  - if you post a question in any online forum about how to do anything
    enterprise-y in community edition, expect Neo4J reps to jump in and
    try to convince you it can't be done

Business:

- probably the most well-established graph database company, lots of
  big/well-known clients, recently received large VC investment

Legal:

- community and professional versions are both open-source
- community version is
  [GPL v3](https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3))
  (if you distribute a modified version of the application, the source for
  those modifications must be open-sourced under the same license)
- enterprise version is
  [AGPL](https://tldrlegal.com/license/gnu-affero-general-public-license-v3-(agpl-3.0))
  (basically the GPL, but deploying a public-facing web application or
  service counts as "distributing")
  - Neo4J [seems to try to obfuscate](https://neo4j.com/licensing/) the
    requirements of the AGPL, implying that any application that _uses_ the
    AGPL enterprise version must be distributed under the AGPL; my
    understanding (DM) is that this would only apply to code that
    incorporates / compiles directly against Neo4J, not applications that
    only access it through a web API, but if we go that route we should
    make sure UCOP legal is comfortable

### Thoughts

Neo4J is probably a good choice, but we should try to keep it somewhat at
arms length via APIs like [Apache Tinkerpop](http://tinkerpop.apache.org/)
unless/until we find an important reason not to, and we shoudl probably try
to find at least one other graph database to develop against in parallel.
Even if we go with Neo4J Enterprise (commercial license or AGPL), while
we'd obviously need to bake the enterprise features into ops, we should
avoid baking them into our application.

This also means trying to avoid Neo4J-specific features like
[implementing REST APIs through a Neo4J extension](https://neo4j.com/docs/java-reference/current/#server-unmanaged-extensions)
in favor of a more loosely coupled architecture (which is probably a good
idea for other reasons anyway).

## Merritt

MySQL issues:

- calculating versions, numbers of files, etc.
- also used for metadata text search, which it's not good at
- for collections w/large numbers of objects, first-page display is slow;
  can't just click through collections
- SQL design makes collections more fundamental than they need to be --
  different roles all mashed together:
  - intellectual structure
  - contributor
  - access control
  - billing
  - replication strategy
- design changes are expensive
- ingest and storage aren't bottlenecked by the DB so much as by copying
  around lots of bits

Thoughts:

- if we thought it was the best use of our time, there's a lot we could do
  to optimize the existing application
  - modernize UI code
  - cache numbers of files etc.
  - use Solr or ElasticSearch for metadata text search, possibly even full-text

### Migration plan for Neo4J or other graph database

1. develop graph database replacement for inventory DB
2. sketch out new comprehensive API(s):
   - REST, ¿GraphQL?
3. determine API MVP / what order we need to develop/roll out the APIs in
   - MVP would be enough to:
     1. drive a UI that doesn't lose any user-facing functionality
     2. drive a legacy API compatibility layer that supports existing UIs
        mediated by the Merritt UI
     3. drive a legacy compatibility layer to replace any direct access
        to the inventory DB by other Merritt services (if any)
4. write new UI, legacy API compatibility layer on top of new APIs

## Graph database prototype

Questions for initial prototype to answer:

- performance vs. MySQL:
  - identify & benchmark typical queries
  - **TO DO:** figure out some metrics
- scalability:
  - how many Neo4J servers do we need, & how big? can we run Merritt-scale
     data on a laptop, or are we looking at a cluster of half a dozen AWS
     large instances?
- developer usability:
  - Tinkerpop / Gremlin
    - is there a significant performance penalty vs. Cypher, Neo4J binary driver?
  - can we code against an in-memory Tinkerpop DB?
  - change management tools: any options besides Neo4J-specific
    [Liquigraph](http://www.liquigraph.org/)?

Realistic experiment:

- define a graph data model for Merritt inventory
  - which information in current inventory database do we really need/use?
  - figure out how we want to model versions (consider trying multiple
    approaches)
- migrate Merritt production data into it
- see how it performs

Follow-on prototype ideas:

- breaking "collection" into multiple dimensions (access, billing, etc.)
  - **TO DO:** think through "collection" vs. "profile"
- metadata access copies (DC etc.) as graph nodes w/properties
- additional metadata, e.g. maintaining JHOVE etc. information on files
- cross-object or cross-file relationships (e.g. derived copy provenance)

## Other open technology questions

AWS services: what can we leverage?

- load balancing, administrative metrics 
- AWS Lambda, API gateway 
  - how do we mitigate danger of lock-in?

REST API server technologies:

- we probably want to run on the JDK, since that's where Neo4J and
  Tinkerpop live
- we probably don't want the overhead of Tomcat or another servlet 
  container; there are more modern "containerless" technologies that
  leverage Java 7+ non-blocking IO and don't introduce another layer
  of administration overhead
- whatever it is, it doesn't need to run a UI, just an API, & it doesn't
  ever need to do more than that -- the actual web service part should be
  small enough to replace cheaply, and the application logic (mostly POJOs)
  and database management layers should be separate modules, that don't
  care what's in front of them
- things I'm personally prejudiced against (DM), not that I'm necessarily
  right:
  - Rails-style invisible magic
  - explosions of XML configuration files
  - annotation shenanigans
  - Spring
- some frameworks to investigate:
  - [Finagle](https://twitter.github.io/finagle/) /
    [Finatra](https://twitter.github.io/finatra/) /
    [Finch](https://github.com/finagle/finch)
  - [Play](https://www.playframework.com/)
  - [RestExpress](https://github.com/RestExpress/RestExpress)
  - [Vert.x](http://vertx.io/)

UI technologies: time to get off Rails? What will play best with the UX team?

- Javascript:
  - [React](https://facebook.github.io/react/)
  - [Ember.js](https://www.emberjs.com/)
  - [Vue.js](https://github.com/vuejs/vue)
- Python:
  - [Django](https://www.djangoproject.com/)
- Ruby:
  - [Sinatra](http://www.sinatrarb.com/)
