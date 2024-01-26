# Queue States

- [Design](README.md)

## Use Cases

### Successful Batch
- User submits manifest with 3 items
- Batch downloads manifest and creates 3 jobs
  - Batch: Processing
  - Job 1: Pending
  - Job 2: Pending
  - Job 3: Pending
- Job 2 completes  
  - Batch: Processing
  - Job 1: Pending
  - Job 2: Complete
  - Job 3: Pending
- Job 3 completes  
  - Batch: Processing
  - Job 1: Pending
  - Job 2: Complete
  - Job 3: Complete
- Job 1 completes  
  - Batch: Processing
  - Job 1: Complete
  - Job 2: Complete
  - Job 3: Complete
- Batch goes to Reporting State
  - Batch: Reporting
  - success email sent to depositor
- Batch goes to Completed State   

- document key use cases
- esp retry logic

### Failed Batch
- User submits manifest with 3 items
- Batch downloads manifest and creates 3 jobs
  - Batch: Processing
  - Job 1: Pending
  - Job 2: Pending
  - Job 3: Pending
- Job 2 completes  
  - Batch: Processing
  - Job 1: Pending
  - Job 2: Complete
  - Job 3: Pending
- Job 3 fails  
  - Batch: Processing
  - Job 1: Pending
  - Job 2: Complete
  - Job 3: Failed
- Job 1 completed  
  - Batch: Processing
  - Job 1: Complete
  - Job 2: Complete
  - Job 3: Failed
- Batch goes to Reporting State
  - Batch: Reporting
  - failed email sent to depositor
- Batch goes to Failed State   

### Failed Batch with Retry
- User submits manifest with 3 items
- Batch downloads manifest and creates 3 jobs
  - Batch: Processing
  - Job 1: Pending
  - Job 2: Pending
  - Job 3: Pending
- Job 2 completes  
  - Batch: Processing
  - Job 1: Pending
  - Job 2: Complete
  - Job 3: Pending
- Job 3 fails  
  - Batch: Processing
  - Job 1: Pending
  - Job 2: Complete
  - Job 3: Failed
- Job 1 completed  
  - Batch: Processing
  - Job 1: Complete
  - Job 2: Complete
  - Job 3: Failed
- Batch goes to Reporting State
  - Batch: Reporting
  - failed email sent to depositor
- Batch goes to Failed State
  - Batch: Failed 
  - Job 1: Complete
  - Job 2: Complete
  - Job 3: Failed
- Job 3 restarted
  - Batch: Failed 
  - Job 1: Complete
  - Job 2: Complete
  - Job 3: Processing*
- Job 3 completes
  - Batch: Failed 
  - Job 1: Complete
  - Job 2: Complete
  - Job 3: Complete*
- Batch set to UpdateReporting
  - Batch: UpdateReporting
  - email update to depositor to reflect change in Job 3 status
- Batch set to Complete
  - Complete   
