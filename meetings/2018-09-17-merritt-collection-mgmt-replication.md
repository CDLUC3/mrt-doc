# Merritt Collection Management & Replication

- [Context](#context)
  - [Objects &amp; collections](#objects--collections)
  - [Access control](#access-control)
  - [Storage types](#storage-types)
  - [Replication](#replication)
  - [Ingest profiles](#ingest-profiles)
    - [Ingest configuration](#ingest-configuration)
    - [Ingest handling](#ingest-handling)
- [Future storage options](#future-storage-options)
  - [Near future](#near-future)
  - [Less near future](#less-near-future)
- [Challenges](#challenges)
- [Proposal: Collection management](#proposal-collection-management)
- [Straw proposals: Pooled storage](#straw-proposals-pooled-storage)
  - ["storage pool"](#storage-pool)
  - ["pooled storage node"](#pooled-storage-node)

## Context

### Objects & collections

Merritt: 2.75 million objects in ~300 collections

Public: ~1 million objects:

| Objects | Collections |
| --- | --- |
| 975,079 | UCB Open Context (1 collection) |
| 16,804 | UC Davis Source Water Assessment Program (1 collection) |
| 2,653 | UCB Transportation Studies (1 collection) |
| 269 | UC Dash (12 collections, including UC Press) |
| 197 | DataONE Dash (2 collections) |
| 172 | CDL UC3 (2 collections) |
| 63 | accidental duplicates of Dash objects |
| 56 | miscellaneous (9 collections) |

Private: ~1.75 million objects:

| Objects | Collections |
| --- | --- |
| 1.1 million | UCB (93 collections) |
| 300,000 | Online Archive of California (1 collection) |
| 190,000 | eScholarship (1 collection) |
| 37,000 | LSTA (94 collections) |
| 35,000 | UCLA (4 collections) |
| 17,000 | UCI (7 collections) |
| 14,000 | UCD (4 collections) |
| 9,000 | UCSB (4 collections) |
| 8,000 | UCSD (1 collection) |
| 7,000 | UCSC (4 collections) |
| 5,500 | UCR (6 collections) |
| 2,549 | UCM (8 collections) |
| 2400 | UCSF (9 collections) |

### Access control

Use cases:

1. truly public 
   - access copies 
   - available from Merritt on the open web
   - examples:
     - UCB Open Context
2. externally managed
   - access copies
   - managed by external services;
   - primary access from non-Merritt URL
   - some content should _not_ be available on the open web (embargo etc.)
   - examples:
     - eScholarship
     - Dash
3. dark archive
   - preservation copies
   - should not be available on the open web

### Storage types

By access mode:

- on-line: AWS, SDSC, UNM Cloudhost
- near-line: Glacier

By usage:

- general: AWS, SDSC, Glacier
- dedicated: UNM Cloudhost

### Replication

- Public: AWS (primary) → SDSC (secondary), w/minor exceptions
- Private: SDSC (primary) → Glacier (secondary) _or_ AWS → SDSC as public

| Visibility | Qualifier | Primary | Secondary | Notes |
| --- | --- | --- | --- | --- |
| public | (nearly all collections) | AWS | SDSC | |
| public | DataONE Dash | UNM Cloudhost | (none) | |
| public | UCSF "miscellaneous" | SDSC | Glacier | misconfigured? |
| private | dark archive | SDSC | Glacier | |
| private | eScholarship, campus ETD collections | AWS | SDSC | |

### Ingest profiles

- collection → LDAP group → ingest profile → (the same) collection

#### Ingest configuration

Discounting redundant parameters (identical for all profiles) and handlers (below),
the ingest profile includes:

- ARK shoulder ("`Identifier namespace`"): always one of:
  - 13030 (335 profiles)
  - 28722 (19 profiles, all UCB)
  - 90135 (1 profile: `oneshare_ark_only`)
- Notification email addresses
- Storage node (4 possibilities)
- ARK minter URL (7 possibilities)
- Descriptive fields: `ProfileID`, `ProfileDescription`, `Context` (?)

#### Ingest handling

- [355 ingest profiles](https://github.com/cdlib/mrt-ingest-profile/tree/production)
  - 345 [appear](https://docs.google.com/spreadsheets/d/1J7IvosmiMO2o6mRbCrhKc-D99yJi4ujWKF-kHnzH54s/edit#gid=0)  to have identical handling
  - other 10 appear to cover only 3 different use cases:
    - disable HandlerCleanup
    - disable HandlerCleanup and enable HandlerDataONE
    - disable HandlerCleanup, enable HandlerDataONE and HandlerDataupHack

## Future storage options

### Near future

Dryad:

- externally managed
- on-line (S3), dedicated (Dryad collections only)
- replication:
  - none (most collections), or
  - to dedicated storage (UCSB; possibly DataONE)

UCSB:

- externally managed
- on-line (Cloudhost), dedicated (UCSB Dash/Dryad only)
- replication
  - primary: S3 (initially CDL, then Dryad)
  - secondary: UCSB dedicated storate

### Less near future

Dryad:

- other dedicated storage providers (cf. UCSB)

UCDN:

- public, externally managed, _or_ dark archive
- on-line (S3, Cloudhost, …?), general use
- pooled replication

Other pooled storage providers:

- Zenodo?
- ???

## Challenges

- cost/complexity of adding/managing new storage
- cost/complexity of adding/managing/reconfiguring collections
- mismatched access control model
- no support for pooled storage

## Proposal: Collection management

1. make the circular collection → LDAP group → ingest profile → collection
   mapping one-way (no possibility of inconsistency)
2. extract redundant information from the current collection and ingest
   profile to create the following new entities:
   1. access control context
      - access type (public, external, private)
      - user authorizations / privileges
   2. storage configuration / replication rules
      - primary storage destination
      - secondary storage destination(s)
   3. ARK minting configuration
   4. ingest handler configuration
3. modify ingest to take some of this information as input, instead of
   reading it from a (redundant / potentially inconsistent) profile

Note that the primary unit of organization would still be the collection,
and all objects in a given collection would still share a configuration.
However, objects in the same collection could be stored in / replicated to
different storage locations in the same _storage pool_ (see below).

## Straw proposals: Pooled storage

### "storage pool"

1. introduce a new "storage pool" abstraction above the "storage node"
   - put each existing storage node, and new dedicated storage node, into its
     own "pool" of one node
   - group UCDN or similar storage nodes into shared pools
2. continue to use storage nodes directly from most services
3. define replication rules, but not other services, in terms of storage
   pools instead of storage nodes
4. add replication logic to balance among nodes in a pool
5. ???

### "pooled storage node"

1. treat each pool of storage as a single storage node for the purposes of
   the storage, replication, and audit services, pushing all complexity
   down into the node implementation.
2. enhance storage, replication, and audit to support:
   - multiple copies per node
   - multiple retrieval URLs per node
   - replication to/from the same node
   - ???

