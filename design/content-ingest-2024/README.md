# Content Ingest Workspace Design

## Workspace Domain
- Workspace should be considered a DEV environment.
- Content may be ingested into either Stage or Prod.

## File System

ZFS file systems should be mounted and unmounted as projects are started and completed.
All content should be accessible to CDL servers by URL.

- Merritt Box process should write to the workspace
- Any hard drives that are sent to Merritt should be copied to this workspace

If no active content projects are in process, the environment should scale down to minimal costs.

Consider a .5-1TB workspace, separate from the shared ZFS to upload incoming content to.
- Determine associated cost and if this could be maintained over time
- Or would we reduce the existing ZFS allocation to 4TB and establish a separate file system of 1TB for use

## Cloud Storage

Dedicated cloud buckets should be accessible to this environment.  These should be separate from Merritt buckets.

- Snowcone content can be loaded to these buckets
- Other types or replication to these bucket could be implemented
- New tools supporting bulk presigned upload could use these buckets.

All cloud content should be accessible to CDL servers by URL using the tools that Ashley built (for Jepson and PalMu).  
The PalMu ingest code might also be informative.

## Workspace Code

### Ingest Tools
A generic library of code should be written to facilitate the creation of ingest manifests within this environment.

Because any file created in this environment will be web accessible, it should be be relatively easy to create manifests of manifests.

Perhaps some of these tools could eventually be packaged as depositor tools.

### QA Tools
A generic set of QA tools should be written to ensure that 100% of content has been loaded.

These tools should purge content from the enviroment as ingestion is completed.

## Developer Practices

Tools should be written so that any Merritt team member can execute them.  

Tools should be written to be modified by multiple team members.

Following conventions, tools should be written in Ruby

## Depositor Guidelines

Guidelines should be written for depositors to encourage common file and folder hierarchies that in turn dovetail with Ingest Tool expectations.

These should also document recommended practices for naming conventions and use of Local IDs.

## Reporting

Reporting tools should be written to estimate the costs of content waiting to be ingested 
into Merritt and to ensure that content efforts do not languish.
