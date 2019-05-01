# 2019-05-01 Minio consistency problem walkthrough & next steps

## Situation

David L. has a regression test script that submits thirteen consecutive
versions of a single object. Running this script against the new Minio
storage node:

1. When the script runs against a single Merritt storage server directly,
   no problems are observed.

2. When the script runs against the RLB (random redirection between storage
   servers):

   - server 1 successfully submits a version
   - server 2 tries to retrieve the manifest for that version, before
     submitting the next
   - the manifest file, which is always the last file submitted, is
     incomplete

3. Note that the server that submitted the version always sees the version as
   complete immediately (when requesting the manifest it's just submitted)

4. Adding an 0.75s sleep between versions fixes the problem.

5. SDSC setting their load balancer to "hash on URL" (presumably, always use
   the same target for a given URL) also fixes the problem.

## Questions

1. Is their load balancer using our IP to lock us to a Minio node? Or are
   we keeping a connection open? Or are we getting some sort of session
   cookie?

2. Do we only observe this problem with large files, or large numbers of
   files (⇒ large manifest file), or large numbers of large files?

## Mitigation

We can have the server always retry, with a delay, on receiving an incomplete
manifest.

## Test case

To provide SDSC with a reproducible test case, write a script that uses the AWS
command line to:

1. rapidly submit and retrieve a (large?) file

   - explicitly holding a connection open
   - explicitly opening a new connection
   - with cookies
   - without cookies

   Assuming no problems are seen in (1):

2. as above, but have the retrieve happen on a different server, e.g. via ssh

## Whiteboard

![whiteboard][whiteboard]

[whiteboard]: /CDLUC3/mrt-doc/blob/master/meetings/2019-05-01-minio-consistency-problem.jpg
