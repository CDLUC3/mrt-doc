# 2019-03-25 Minio/Qumulo at SDSC: Next Steps

## Background

Propositions:

1. Copying ~110 TB of content into Minio/Qumulo will take some time.
   - some **very** rough numbers:
     - copying from AWS S3 to Minio is limited by the AWS S3 download rate
       of about 45 M/s (Minio upload rate from EC2 is > 60 M/s)
     - verifying content in Minio is limited by the Minio download rate
       of about 15 M/s (worst observed on EC2)
     - ⇒ 110 TB @ ~26h/TB = ~120 days or 4 months
   - using the existing replication system to do the copy will be even slower,
     and may run into disk space issues
   - possible speedups:
     1. parallelize across multiple EC2 servers
     2. run at SDSC compute cluster instead of on EC2
        - copy from OpenStack instead of AWS?
   -  Apart from the raw content migration, we need some time to update the
     inventory database etc. to get everything in sync.

2. We haven't seen any problems so far with the Minio/Qumulo system. However,
   the only way to be sure of its long-term reliability with large volumes of
   content is to have large volumes of content on it over a long term.
   - David L. suggests 6 months, but this is fundamentally a business
     question about how much preservation risk we're willing to accept.

Conclusions:

1. It is very unlikely we will have all our content migrated by the end of
   the fiscal year.
2. Even if we take an aggressive approach to moving off OpenStack, we are
   likely to have content in both systems for some months.
3. John C. confirms we are OK to absorb the charges as an infrastructure
   cost during the migration/validation

### Open question: Dryad

- When Dryad content is in Minio/Qumulo: Dryad pay SDSC directly, or do we
  recharge them?
