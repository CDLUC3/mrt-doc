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
