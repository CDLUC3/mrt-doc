# Merritt Escalation Process for ECS

## Escalope Channels

- uc3-merritt-prd-critical
  - Full escalation to IAS
  - User/Depositor facing service is down
  - Database access is affected
  - Zookeeper access is affected
- uc3-merritt-prd-background
  - Escalation is within UC3 
  - Background service (Audit/Replic/AdminTool is down)
  - Queue is frozen
- uc3-merritt-prd-storage (**NEW**)
  - How could this escalation differ from the background escalation?  
  - Storage node is unavailable
  - Note: this is also likely a user/depositor facing issue 
- uc3-mrt-stg
  - Escalation is slack only

## ECS Healthcheck (lightweight)
- UI and Admintool
  - check for robots.txt (request is processed by puma without invoking our code)
  - caution: this may not recover from a scenario in which the database or zk or ldap has not fully initialized
- Java services
  - check for static/build.content.txt (request is processed by web server without invoking our code)
  - caution: this may not recover from a scenario in which the database or zk has not fully initialized

## Monitoring Process

- Check UI State
  - uc3-merritt-prd-critical
- Check Ingest State
  - Request fails --> uc3-merritt-prd-critical
  - JSON: Check Queue frozen --> uc3-merritt-prd-background
- Check Store and Access Hostname
  - Request fails --> uc3-merritt-prd-critical
- Check Store and Access State
  - Allow sufficient time for each node check to timeout (5s per node) 
  - JSON: Check failed node count --> uc3-merritt-prd-storage
- Check Inventory State
  - Request fails --> uc3-merritt-prd-critical
  - JSON: Check Database or ZK not initialized --> uc3-merritt-prd-background
- Check Audit and Replic State
  - Request fails --> uc3-merritt-prd-critical
  - JSON: Check state not running --> uc3-merritt-prd-background

