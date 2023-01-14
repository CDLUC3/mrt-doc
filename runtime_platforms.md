## Merritt Runtime Platforms

### Current Platforms
- EC2
  - EC2 
    - General Purpose EC2 
      - Inventory (Tomcat)
      - Sword (Tomcat, to be deprecated)
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
*This presumes that our general purpose EC2 apps can go to ECS and that our Instance Type optimized platforms will need to go to a specialized Auto Scaling Group.  Perhaps we can have a consult with Kevin at some time.*
- Auto Scaling Groups
  - Auto Scaling Group - Network Optmized 
    - Ingest (ZFS needed)
    - Audit
  - Auto Scaling Group - IO optimized 
    - Sorage (ZFS needed)
    - Access Assembly
    - Replication
- ECS
  - Zookeeper
  - LDAP
  - UI - Rails
  - Inventory Tomcat
- EC2
  - EC2 Misc
    - Batch Server
- RDS
  - MySQL      
- Lambda
  -  Admin Tool
  -  Collection Tool
- Lambda + API Gateway
  - Merritt API (currently part of UI)   
  - Access File Requests and Assembly Queuing
  - Queue Management (currently part of Ingest Admin API)
  - Inventory - Local ID Service
