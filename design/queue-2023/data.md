# Queue Data

- [Design](README.md)

## Queue Data

### Record Keys
The ingest service currently packs a priority value into the path name for the zookeeper record.
- /ingest/mrtQ-02100000000003
- (document the component parts here)
- Question: priority may become a more dynamic property in the future
  - We could have a baseline priority in the pathname (for sorting) and an actual priority in the payload
  - We could also explore renaming a path dynamically when a priority change is appropriate

### Record Sorting

#### Current Implementation
In Merritt's current zookeeper implementation, record headers contain binary data.
- Status: 1 byte status field with each byte representing a different queue state
- Time: 8 byte long representing the number of seconds since 1970

#### Recommended Implementation
A fixed header may continue to be utilized for sorting records.  This headers should use character data rather than binary data. Header data should only use ASCII characters.
- Status: 2 character (hex, decimal or base64) to represent the status.  Decimal should be sufficient.
- DateTime: 25-28 characters
  - YYYY-MM-DD HH:MM:SS.MMM -ZZZZ
  - YYYY-MM-DD HH:MM:SS -ZZZZ
 
### Queue Data

#### Current Implementaion
- Ingest currently serializes java properties
- Inventory currently serializes XML data

#### Recommended Implementation
- Store payload data as JSON
- Use a standard JSON library (not the Merritt Core library)
- A JSON schema should exist to validate the payload
- Schema validation should only be applied during system testing

#### Space Considerations
> ZooKeeper was not designed to be a general database or large object store. Instead, it manages coordination data. This data can come in the form of configuration, status information, rendezvous, etc. A common property of the various forms of coordination data is that they are relatively small: measured in kilobytes. The ZooKeeper client and the server implementations have sanity checks to ensure that znodes have less than 1M of data, but the data should be much less than that on average. [^1]
[^1]: https://zookeeper.apache.org/doc/r3.3.3/zookeeperProgrammers.html#Data+Access

#### Final vs Volatile data fields
- As we write to zookeeper, should be distinguish our static fields (submitter, file name) from the volatile fields (status, space_needed, last update)?

## Design Ideas

| Path | Data Type | Fields | Created By | Modified By | Comment |
| - | - | - | - | - | - |
| /batches/BID/submission | json | profile_name<br/>submitter<br/>manifest_type<br/>payload_filename<br/>response_type<br/>submission_mode | creation | none | |
| /batches/BID/status | json | status<br/>last_modified | creation | all jobs done | | 
| /batches/BID/status-report | json | failed_jobs | failure | failure | last status report sent to user | 
| /batches/BID/states/STATE/JID | none | - | | | STATE = pending / held / processing / failed / completed<br/>Create watcher to watch for states/processing to be empty| 
| /jobs/JID/configuration | json | batch_id<br/>profile_name<br/>submitter<br/>payload_url<br/>payload_type<br/>response_type<br/>working_dir<br/>local_id | creation | none | |
| /jobs/JID/status | json | status<br/>last_successful_status<br/>last_modification_date<br/>retry_count | creation | none | |
| /jobs/JID/priority | int | - | creation | estimating | |
| /jobs/JID/space_needed | long | - | creation | estimating | |
| /jobs/JID/ark | string | - | creation | processing | |
| /jobs/states/STATE/PP-JID | none | - | | | PP = priority <br/>STATE = pending / held / estimating / provisioning / downloading / processing / recording / notify / failed / completed |

### Job Transition

- Processing /jobs/states/StateX/PP-JID
- Job finishes StateX
- Update /jobs/JID/status data
  - last_successful_status = StateX
  - status = StateY
  - last_modification_date = now
- Delete /jobs/states/StateX/PP-JID
- Create /jobs/states/StateY/PP-JID
- If StateY == Completed
  - Delete /batches/BID/states/processing/JID
  - Create /batches/BID/states/completed/JID
- If StateY == Failed
  - Delete /batches/BID/states/processing/JID
  - Create /batches/BID/states/failed/JID
- If /batches/BID/states/processing is empty, watcher will trigger batch notification