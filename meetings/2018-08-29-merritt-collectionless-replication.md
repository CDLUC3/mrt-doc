# Merritt collectionless replication 2018-08-29

(Mark, Stephen, David M., Perry, Jim, John C., David L., Marisa)

## Documents

- "[Merritt Collectionless Replication](https://docs.google.com/document/d/1A-O7wuHMVBhrhlPaXlvc-gEQzMQiNSjyOABRpEQuubU/edit)", Stephen Abrams
  - proposes separation of current "collection" context into several
    orthogonal contexts:
    1. intellectual/curatorial collection
    2. access/permissions context
    3. replication/storage policy context
  - documents database layout
  - leaves open questions:
    - triggering of replication
    - tracking replication process / workflow

## Context

### Goals

- simplify / clarify replication
- finer control of replication
- allow separate independent groupings:
  - intellectual
  - replication
  - billing
  - access control
- support new UC3 policy that all Merritt content should have at least
  three replicas, on whatever free storage we can scrounge up

### Use cases

- public → private, private → public
- transfer ownership for billing purposes
- membership in multiple collections
  - Q: why?
- hierarchical collections
  - Q: why?

Future:

- large number of Dash/Dryad collections potentially w/different replication
  rules & storage destinations

Conceptual separation:

- public ≈ Dash: different replication rules, but all public & flat
- private: individual (library) users want lots of
  (intellectual/curatorial) collections, possibly hierarchical, w/same
  replication rules

### collection vs. ingest profile

- new deposits are made:
  1. in the context of a collection, 
  2. which (via LDAP) has an associated ingest profile, 
  3. which (in the profile properties file) has a collection,
  4. which we hope is the same collection as (i)
- ingest profiles parameterize:
  - ARK minting
  - ownership (owning object)
  - collection
  - contact info
  - ingest processing

## Open questions in the "orthogonal context" model

- (from Stephen's document) how do we schedule / track / manage replication?
- given a new deposit, how does Merritt
  know what contexts to assign it?
  - for services like Dash/Dryad?
  - for self-service (dark) deposits?

## Other open questions

- are our current ingest profiles / collections / LDAP groups consistent?
- how much info in ingest profiles is redundant? where did we design/build
  for flexibility that we don't actually use in practice?
- what redundancies / potentials for inconsistency do we have in the
  database and how can we get rid of them?

## Other problems orthogonal to collections

- management overhead of large numbers of storage destinations
- unreliability of non-S3, non-SDSC, non-UC3-managed storage
- more than 2 copies (more than 1 secondary)
  - should be technically supported by current system, we just
    don't make use of it
- balancing across a pool of storage destinations
- migrating content between storage destinations
- temporarily swapping primary and secondary
- overhead cost of:
  - adding collection (medium)
  - moving objects (high)
    - conceptional problems of versioning
  - deleting objects (low)
- semantics of "billable size"
- complexity and administrative overhead of Merritt services / servers

## Action items

- (Pivotal
  [#160177213](https://www.pivotaltracker.com/story/show/160177213)) David
  M. to:
  - come up with straw-man answers to open questions
  - map Stephen's access classes / replication contexts / etc. to Dryad use
    cases
- (Pivotal
  [#160178901](https://www.pivotaltracker.com/story/show/160178901)) Mark
  to write a tool to verify consistency of ingest profile / collection
  relationships

