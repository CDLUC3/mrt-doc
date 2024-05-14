## Merritt Runtime Platforms

### Current Platforms
- EC2
  - EC2 
    - General Purpose EC2 
      - Inventory (Tomcat)
      - UI (Puma)
    - Nework Optimized EC2 
      - Ingest (Tomcat)
      - Audit (Tomcat)
    - IO Optimized EC2
      - Storage (Tomcat)
        - Would this beneift from the Network optimized instead? 
      - Access (Tomcat)
      - Replication (Tomcat)
  - EC2 Misc
    - LDAP
    - Zookeeper
    - Batch Server
      - Nuxeo Process (formerly part of UI) 
- RDS
  - MySQL      
- Lambda
  -  Admin Tool
  -  Collection Tool

### Future Platforms

Assumptions based on May 2024 conversation with IAS
- For containers, prefer Fargate.  It may be more costly than EC2, but it requires less administrative support.
- If a specialized instance type is needed, use ECS.  This would then require us to manage the underlying EC2 instances.  These should be re-created as needed via Auto Scaling Groups.

- ECS
  - Auto Scaling Group - Network Optmized 
    - Ingest (ZFS needed)
    - Audit
  - Auto Scaling Group - IO optimized 
    - Storage (ZFS needed)
    - Access Assembly
    - Replication
- Fargate
  - Zookeeper (maybe, but hostnames need to be known)
  - LDAP
  - UI - Rails
  - Inventory Tomcat
- EC2 (not a containerized service)
  - Batch server
  - Jenkins 
- RDS
  - MySQL      
- Lambda
  -  Admin Tool
  -  Collection Tool
- Lambda + API Gateway candidates
  - _Microservice functionality that could be extracted from a primary microservice container_
  - Merritt API (currently part of UI)   
  - Access File Requests and Assembly Queuing
  - Inventory - Local ID Service
