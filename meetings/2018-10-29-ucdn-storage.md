# 2018-10-29 UCDN storage

- [2018-10-29 UCDN storage](#2018-10-29-ucdn-storage)
   - [Definitions](#definitions)
      - [Cloudhost](#cloudhost)
      - ["UCDN"](#ucdn)
   - [Questions, answers, concerns, discussions](#questions-answers-concerns-discussions)
   - [Action items](#action-items)

## Definitions

### Cloudhost 

The software we're running at UCSB. Provides an
[mrt-cloud](https://github.com/CDLUC3/mrt-doc/wiki/Cloud-API) HTTP API over
a Pairtree filesystem, allowing Merritt to use a remote filesystem as if it
were cloud storage.

### "UCDN"

1. A Merritt technical project to replicate campuses' Dash/Dryad
   collections to storage on those campuses, via an additional Merritt
   secondary storage node. All campuses will have primary storage in
   Dryad's S3 and secondary storage at SDSC, but campuses can optionally
   provide their own storage for a third replica. 

   (On this understanding, UCSB is a participant in "UCDN", at least for
   Merritt internal purposes.)

2. A UC/CDL project in which campuses each commit to providing 1 PB of
   storage for to-be-determined research-data-related purposes.

   (On this understanding, UCSB is _not_ a participant in UCDN.)

## Questions, answers, concerns, discussions

1. **Do campuses want direct access to their content?**

   Not as discussed so far. We can and should set the terms. Certainly
   if they want write access, we can't guarantee integrity.

2. **It was a mistake at UNM for us to get access to the servers and
   therefore take responsibility (although responsibility without access
   would admittedly be even worse.) We can't be pulled into doing
   maintenance at the campuses.**

   Agreed. We believe we have a better relationship with the campuses and more
   commitment from them than we have had with/from UNM. However, we have to
   set out our roles and responsibilities clearly, and we absolutely need to
   keep ourselves at arm's length when it comes to maintenance of the storage
   systems on the campuses. We don't have the personnel or the budget, and
   we already have enough on our plates.

   If the campus storage gets corrupted, we can restore it from the primary
   copy in S3 or the first secondary at SDSC -- either on a file-by-file basis,
   or if it gets sufficiently corrupted, as a wholesale re-migration.

   There's no getting around the fact that this adds work for us. We're
   trying to minimize that work.

   We can't troubleshoot the campuses' systems for them. This has to be a
   collaboration, not just the campuses providing us with some hardware.

3. **We need a general suite of tests that can validate that whatver the 
   campuses decide to use is working.**

   The state check covers a basic read/write scenario but doesn't cover all
   use cases such as large objects, encodings, etc.


4. **Is [Minio](https://minio.io/) our recommendation?**

   At this point, yes. It's moderately well established, it's open source,
   it's backed by a (startup) company that can provide paid support. We
   haven't investigated it ourselves in any depth yet, but Qumulo
   recommended it to SDSC, SDSC has some experience with it (which they
   hopefully will share with us) and will have more.

   Architecturally it's fairly simple, insofar as it's an object storage
   API on top of a plain filesystem, and the filesystem structure is identical
   to the bucket / key-path structure of the object store.

   It claims to support the S3 API, but we don't know if it supports all
   features we expect to be there. (E.g. until last year Minio [didn't
   support creating empty
   directories](https://github.com/minio/minio/pull/5049).) We'll need to
   do some testing and may end up having to modify some code. But we
   already plan to work through any Merritt ⇔ Minio issues as part of the
   Minio+QF2 pilot with SDSC.

   [OpenStack Object Storage (swift)](https://docs.openstack.org/security-guide/object-storage.html)
   would be another option -- we already know we can integrate with it, at
   least as deployed at SDSC. However, it's a heavyweight solution and SDSC
   at least is finding it expensive to operate, which is why we're looking
   at Minio+QF2. 

   Campuses should talk to SDSC about their experiences.

5. **We need an MoU with the UCDN campuses like we had for UNM.**

   This should include whatever decisions we make about their responsibilities.
   (And not take on as much responsbility ourselves as we took on with UNM.)

   (Link: [UNM MoU](https://drive.google.com/file/d/1RDiM30Mzu4Q8QeHIS2WBxLCcZTGZoE1A/view) (pdf))

6. **How do we deal with the fact that we're introducing storage systems with
   varying reliability, or at least varying maintenance schedules?**

   Replication and audit need more robust ways of dealing with failures, since
   we know there are going to be more of them -- e.g., don't just mark a
   replication failed, put it back on a queue with a timeout

7. **Can these secondary storage nodes at the campuses theoretically be used as
   primary nodes?**

   Yes, but it would take manual intervention on the ingest server and/or in the
   inventory database.

8. **Can we replicate to multiple secondary nodes?**

   In principle, yes, but some scenarios are untested:

   - replication to first secondary succeeds, but not to second -- this
     will probably be common, if the first secondary is S3 and the second
     is at a campus
   - the "replicated" datestamp for the primary-node record in the inventory
     database object-to-node table is currently all-or-nothing

## Action items

- [Determine test suite needs for campus remote storage](https://www.pivotaltracker.com/story/show/161599940) (David L.)

- [Set up Minio+Docker experimental environment](https://www.pivotaltracker.com/story/show/161570217) (David M.)
