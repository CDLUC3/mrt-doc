# Merritt Queue Redesign 2023

## Objectives
- Match ingest workload to available resources (compute, memory, working storage)
  - dynamically provision resources to match demand
  - dynamically manage running thread count based on processing load
- Hold jobs based on temporary holds (collection lock, storage node lock, queue hold)
- Graceful resumption of processing in progress
  - allow processing to be resumed on a different ingest host
- Accurate notification of ingest completion (including inventory recording)
  - send accurate summary email on completion of a batch regardless of any interruption that occurred while processing

## Design Details
- [Queue State Transitions](states.md)
- [Queue Entry Data Storage](data.md)
- [Underlying Queue Service](service.md)
- [Queue Manager](manager.md)

## Links
- https://github.com/CDLUC3/mrt-doc/issues/1062