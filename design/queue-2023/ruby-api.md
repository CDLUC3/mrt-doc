# Merritt ZK Ruby API

- [Design](README.md) / [API](api.md)

## States

```rb
module MerrittZK
  class IngestState
    # clients should not need this method
    def initialize(status, next_status)

    # returns the status object
    def status
    # returns the name of the status
    def name
    # returns a hash of the next allowable status values
    def next_status
    # indicates if deletion is permitted from the current status (no next status values)
    def deletable?
    # returns the next successful state object
    def success
    # returns the name of the next successful state
    def fail
    # returns the name of the next failure state
    def state_change_allowed(state)
    # perform a state change
    def state_change(state)
    def to_s
  end

  class JobState < IngestState
    # Get hash of states
    def self.states
    # Get initial state object
    def self.init

    def state_change(state)
    def success
    def fail

    # Singleton Enum-like objects
    def self.Pending
    def self.Held
    def self.Estimating
    def self.Provisioning
    def self.Downloading
    def self.Processing
    def self.Recording
    def self.Notify
    def self.Failed
    def self.Deleted
    def self.Completed
  end

  class BatchState < IngestState
    # Get hash of states
    def self.states
    # Get initial state object
    def self.init

    def state_change(state)
    def success
    def fail

    # Singleton Enum-like objects
    def self.Pending
    def self.Held
    def self.Processing
    def self.Reporting
    def self.UpdateReporting
    def self.Failed
    def self.Deleted
    def self.Completed
  end

end
```

## ZK API

```rb
module MerrittZK
  class MerrittZKNodeInvalid < StandardError
    def initialize(message)
  end

  class MerrittStateError < StandardError
    def initialize(message)
  end

  class QueueItem
    # initialize a new queue item
    def initialize(id, data: nil)
    attr_reader :id, :status
    def states
    # load a queue item from zookeeper
    def load(zk)
    # load properties associated with a queue item
    def load_properties(zk)
    # retrieve a string property from zk
    def string_property(zk, key)
    # retrieve a json property from zk
    def json_property(zk, key)
    # retrieve an integer property from zk
    def int_property(zk, key)
    # set data for a zookeeper node
    def set_data(zk, key, data)
    # path for a queue item
    def path
    # path to the status object for a queue item 
    def status_path
    # serialize an object as a string
    def self.serialize(v)
    # create a sequential queue node which will generate a unique id
    def self.create_id(zk, prefix)
    # generate the status object for a queue item
    def status_object(status)
    # save/update the status for a queue item
    def set_status(zk, status)
    # lock a queue item with an ephemeral lock
    def lock(zk)
    # release the lock on a queue item
    def unlock(zk)
  end

  class Batch < QueueItem
    def states
    def self.dir
    def self.prefix_path
    def path
    def delete(zk)
    def self.create_batch(zk, submission)
    def self.acquire_pending_batch(zk)  
    def self.acquire_completed_batch(zk)  
  end

  class Job < QueueItem
    def initialize(id, bid: nil, data: nil)
    def load_properties(zk)
    attr_reader :bid, :priority, :space_needed, :jobstate
    def set_priority(zk, priority)
    def set_space_needed(zk, space_needed)
    def set_status(zk, status)
    def batch_state_subpath
    def set_batch_state_path(zk)
    def set_job_state_path(zk)
    def states
    def self.prefix_path
    def path
    def delete(zk)
    def self.create_job(zk, bid, data)
    def status_object(status)
    def self.acquire_job(zk, state)
  end
end
```
