# 2019-03-22: Merritt & UCB plans

Major use cases:

- TIFF (digitized images)
- ZIP files (JIS - Japanese internment, Bancroft)
- Tried METS and all derivatives, but it was too much

Existing system (WebGenDB (sp.?))

- Manual file list constructed when projects are finished or quiescent
- Merritt is the master copy after files are loaded

- prev year: 30,000 images
- next year: 1.35 million images

New system ([TIND](https://tind.io)) to go live fall 2019

- Stores JPEGs; TIFFs are in Merritt
  - Base filename used as key
- Would like something more automated: what are the options?

Finding aids are going into ArchiveSpace

----

## Options, needs, etc.

1. Imaging services or vendor creates files
2. Files to to local storage
   - originals 
   - derivatives -> TIND
   - metadata -> TIND

Ideal:

1. send spreadsheet to Merritt
2. get ARKs for each back from Merritt
   - would put these into TIND

- better error messages from ingest - don't fail entire ingest for single bad file
- "we're not looking at Merritt for disaster recovery - it is really our
  preservation respository"

## Low-hanging fruit

- don't batch-process batches
  - need less storage
  - fewer timeouts
- dedicated ingest server?

## Longer-term solution

- TIND has OAI-PMH; harvest that?
  - use filename (w/some uniqueness prefix, based on collection?) as local ID?
  - be sure we can tell old from new content (b/c all old content will go into TIND)
  - figure out how to give back ARK for each file (so they can delete, and also find)

## Later

- Better search

