# Minio+QF2 Test Results

SDSC provided an installation of the [Minio](https://minio.io/) object
storage server backed by 200 TB of [Qumulo](https://qumulo.com/) QF2 fast
storage (server `https://cdl.qs3.sdsc.edu:443`, bucket `cdl.sdsc.test`).

Tests were performed using [cos](https://github.com/dmolesUC3/cos), a
cloud object storage test tool developed in house, based on Amazon's 
[AWS SDK for Go](https://docs.aws.amazon.com/sdk-for-go/api/service/s3/).

## Performance

### Files per prefix

Merritt stores files as objects using the key format
`<ark>|<version>|<file>`, where `<ark>` is of the form`ark:/<NAAN>/<name>`,
(`NAAN`: [Name Assigning Number
Authority](https://www.cdlib.org/uc3/naan_table.html)), `<version>` is a
positive integer, and `<file>` is a `/`-separated relative path from the
notional object root.

Many object storage systems, including those currently used by Merritt,
[Amazon S3](https://aws.amazon.com/s3/) and [OpenStack
Swift](https://docs.openstack.org/swift/latest/), despite storing objects
in a conceptually flat key space with no intrinisic hierarchy, support
filtering keys by a prefix and delimiter, giving the object store the
appearance of a directory structure. However, they generally do not support
filesystem-style wildcard filtering below that level.

With `/` as the delimiter, the Merritt key structure is not particularly
effective for filtering at the object level, as while the number of NAANs
found in Merritt ARKs is small, the number of objects for a given NAAN may
be large. Merritt has (currently) about 2.76 million objects, almost 99%
of which are under either the NAAN 13030 (CDL's own NAAN, comprising
about 1.44 million objects) or the NAAN 28722 (Berkeley's, comprising
about 1.28 million objects).

With Swift, we've seen performance issues with storing more than a few
thousand keys per prefix, requring us to divide Swift objects into multiple
buckets based on a partial hash of the object ARK. 

Historically, filesystems have had hard maximum numbers of files per
directory, or else have shown [significantly degraded
performance](https://trent.utfs.org/p/benchmarks/sid/2009-03-26/di-b.log.txt)
beyond a few thousand files. Given that Minio, despite presenting a
key-value object storage interface, is backed by a filesystem, we wanted to
make SDSC's Minio+QF2 storage it could handle these scenarios.

We tested up to ~1 million small files per prefix and found that the time
to create and retrieve a single file was effectively constant at about
370ms:

```
cos suite 's3://cdl.sdsc.test/' --endpoint  'https://cdl.qs3.sdsc.edu/' -v --count-only --count-max=1M

✅ 1. create 512 files under single prefix: successful (3m 17s)
first: 415ms, last: 341ms, fastest: 229ms, slowest: 467ms, median: 360ms
✅ 2. create 1024 files under single prefix: successful (6m 35s)
first: 146ms, last: 320ms, fastest: 146ms, slowest: 1s, median: 359ms
✅ 3. create 2048 files under single prefix: successful (13m 15s)
first: 139ms, last: 313ms, fastest: 139ms, slowest: 594ms, median: 362ms
✅ 4. create 4096 files under single prefix: successful (26m 50s)
first: 165ms, last: 358ms, fastest: 128ms, slowest: 1s, median: 365ms
✅ 5. create 8192 files under single prefix: successful (54m 46s)
first: 141ms, last: 353ms, fastest: 141ms, slowest: 1s, median: 374ms
✅ 6. create 16384 files under single prefix: successful (1h 49m 58s)
first: 143ms, last: 363ms, fastest: 143ms, slowest: 1s, median: 375ms
✅ 7. create 32768 files under single prefix: successful (3h 40m 58s)
first: 134ms, last: 417ms, fastest: 134ms, slowest: 1s, median: 375ms
✅ 8. create 65536 files under single prefix: successful (7h 22m 39s)
first: 138ms, last: 329ms, fastest: 138ms, slowest: 1s, median: 375ms
✅ 9. create 131072 files under single prefix: successful (14h 44m 6s)
first: 139ms, last: 275ms, fastest: 139ms, slowest: 1s, median: 375ms
✅ 10. create 262144 files under single prefix: successful (29h 50m 21s)
first: 139ms, last: 308ms, fastest: 139ms, slowest: 1s, median: 375ms
✅ 11. create 524288 files under single prefix: successful (59h 28m 38s)
first: 130ms, last: 351ms, fastest: 127ms, slowest: 1m 1s, median: 373ms
✅ 12. create 1048576 files under single prefix: successful (118h 53m 43s)
first: 165ms, last: 413ms, fastest: 147ms, slowest: 3s, median: 373ms
```

Delete time was not measured directly, but is included in the overall time
for each set and also appears to be effectively flat. 

The time to list a large number of files was not tested systematically, but
a spot check at around 290,000 files suggests that it does increase with the
number of files, to the point where it was necessary to configure the AWS
client never to time out while making the request. However, this is not an
operation used by Merritt.

### Large files

While 90% of files in Merritt are less than about 36 KiB in size, the
largest single file currently in Merritt is roughly 270 GiB, and large
deposits are only expected to grow in the future.

We found that while throughput to the Minio+QF2 system was variable, 
performance was in general very good, and even for large files was within
about a factor of two of Amazon S3 performance (roughly 10 hours to
create/retrieve/verify/delete a 1 TiB file).

```
cos suite 's3://cdl.sdsc.test/' --endpoint  'https://cdl.qs3.sdsc.edu/' -v --size-only --size-max=1T

✅ 1. create/retrieve/verify/delete 0B file: successful (112ms)
✅ 2. create/retrieve/verify/delete 1B file: successful (206ms)
✅ 3. create/retrieve/verify/delete 16B file: successful (254ms)
✅ 4. create/retrieve/verify/delete 256B file: successful (294ms)
✅ 5. create/retrieve/verify/delete 1K file: successful (320ms)
✅ 6. create/retrieve/verify/delete 16K file: successful (292ms)
✅ 7. create/retrieve/verify/delete 256K file: successful (534ms)
✅ 8. create/retrieve/verify/delete 1M file: successful (477ms)
✅ 9. create/retrieve/verify/delete 16M file: successful (1s)
✅ 10. create/retrieve/verify/delete 256M file: successful (13s)
✅ 11. create/retrieve/verify/delete 1G file: successful (51s)
✅ 12. create/retrieve/verify/delete 16G file: successful (32m 19s)
✅ 13. create/retrieve/verify/delete 256G file: successful (8h 29m 31s)
✅ 14. create/retrieve/verify/delete 1T file: successful (19h 31m 12s)
```

A separate test 1-TiB test using `cos crvd` to distinguish upload and
download times showed about 7h 7m upload, 12h 41m download, for a total of
19h 48m.

