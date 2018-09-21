# 2018-09-18: Merritt Collection Management & Replication

(see [preparatory notes](2018-09-17-merritt-collection-mgmt-replication-prep.md))

- [Context](#context)
  - [Storage landscape](#storage-landscape)
    - [UCDN](#ucdn)
    - [Zenodo](#zenodo)
    - [SDSC/QF2](#sdscqf2)
  - [Dryad](#dryad)
- [Merritt replication](#merritt-replication)
  - [Immediate plans](#immediate-plans)
  - [Longer\-term plans](#longer-term-plans)

## Context

### Storage landscape

#### UCDN

- idea was that participating campuses would commit to providing a petabyte
  of storage, and then the campuses and CDL would jointly figure out how
  best to use it
- campuses handed off "provide a petabyte" part to their IT departments;
  "figure out how to use it" part up in the air
- now SDSC also wants to be involved; John C to talk to Christine Kirkpatrick there
  about new pitch to the campuses to get them interested again, possibly involving
  the [National Data Service](http://www.nationaldataservice.org/)
- might end up being something completely unrelated to Merritt
- we shouldn't worry about it becoming anything concrete for Merritt until
  if / when it happens.

#### Zenodo

John & Daniella have had **very preliminary** discussions w/Zenodo about
using it for Dryad backup/secondary storage

- pros: 
  - in Europe -> good story for EU users/institutions
  - marginally cheaper than DANS (see below) at ~ $390/TB, much easier to
    integrate
- cons: not an object store
  - [REST API](http://developers.zenodo.org/)
  - models a "deposition" as a group of files, but not
    [directories](https://github.com/zenodo/zenodo/issues/1089) so we'd
    need to do some munging/unmunging (although Dash/Dryad objects are all
    flat right now)

(We could consider implementing this at the Merritt level, but let's
not jump to it -- figure out pros/cons, Zenodo relationship, whether
we'd ever want to do this for anything other than Dash/Dryad)

#### SDSC/QF2

SDSC is hoping to roll out a cheaper (& possibly faster) storage option
using [Qumulo QF2](https://qumulo.com/discover/qf2-overview/) with an
S3-compatible [Minio](https://www.minio.io/) front-end.

- targeted at $70/TB/yr (4-5 times cheaper than current SDSC/OpenStack
  offering; compare Amazon at $250-$280/TB?)
- CDL (Merritt) would be one of the first test users
- open questions: 
  - reliability
  - performance
  - S3 compatibility / ease of integration
  - level of redundancy
  - service levels in general
- Brian Balderston at SDSC to contact Kurt when they're ready for us to do
  a pilot

### Dryad

Dryad's current replication strategy:

1. primary: Dryad S3 bucket
2. backup: copy deposited to
   [DANS](https://dans.knaw.nl/en/front-page?set_language=en) via SWORD
   - **not a replica** in our sense (deposit-only, not integrated for retrieval, no fixity checking)
   - hard to work with, esp. for larger objects
   - expensive: ~ $460/TB

Future plans/ideas:

1. primary: Dryad S3 bucket (new bucket configured for Merritt)
2. secondary:
   - stop depositing to DANS
   - secondary storage at Zenodo (or other inexpensive European option)
   - secondary storage at S3/QF2 (assuming that works out)
3. institutional copies:
   - for institutions that have legal or policy reasons to want their own copies
   - not a replica in our sense (no fixity checking, can't be used as access copy)
   - shouldn't be implemented at the Merritt level if it's only for Dash/Dryad
   - could just be some kind of harvester integration

## Merritt replication

### Immediate plans

1. existing collections (except Dash) will continue to be stored and replicated
   **as they are now**
   1. primary storage:
     - CDL S3 bucket (public)
     - SDSC/OpenStack (private)
   2. secondary storage:
     - SDSC/OpenStack (public)
     - Glacier (private)
2. Dash content, including ONEShare, will be **migrated** to Dash/Dryad
   - shut down storage at UNM
   - ONEShare DataONE member node future TBD, but certainly won't involve
     copying all Dryad content to New Mexico
3. General Dryad collection will have:
   1. primary storage: Dryad's S3 bucket
   2. secondary storage: TBD (probably none, pro tem)
      - future: S3/QF2 via Merritt?
4. UC Dryad collections will have:
   1. primary storage: Dryad's S3 bucket
   2. secondary storage: TBD
      - ⚠️ UCSB will use Cloudhost pro tem, but **probably not long term**
      - ⚠️ storage node for every campus is **not** something we want to support

### Longer-term plans

- ⚠️ **no** plans for pooled storage
- prove out SDSC/QF2, possibly migrate off SDSC/OpenStack
- simplify storage management / administration
- look for strategies to get to free storage



