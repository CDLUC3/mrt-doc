# Merritt ZK API

## Ruby API

### States

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

### ZK API

```rb
```

## Java API
