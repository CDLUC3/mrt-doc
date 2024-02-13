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
- [Batch and Queue State Enums](https://github.com/CDLUC3/merritt-tinker/tree/main/state-transition)
  - How is the queue item id number conveyed?
  - How does priority work int the queue item sort? 

## Zookeeper provides a "Watcher" object.  Could this be helpful for the Batch Queue?
- https://zookeeper.apache.org/doc/r3.3.3/zookeeperProgrammers.html#ch_zkWatches

## Links
- https://github.com/CDLUC3/mrt-doc/issues/1062 - Background issue that led tot hsi design
- https://github.com/CDLUC3/mrt-doc/issues/1753 - Admin Manager
