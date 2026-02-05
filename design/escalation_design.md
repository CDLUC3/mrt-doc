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

- Check Admin Tool State
  - uc3-merritt-prd-background
- Check RDS availability via Admin Tool (**New**)
  - Request fails --> uc3-merritt-prd-background (error will show up elsewhere)
  - If failure state --> uc3-merritt-prd-critical
- Check ZK availability via Admin Tool (**New**)
  - Request fails --> uc3-merritt-prd-background (error will show up elsewhere)
  - If failure state --> uc3-merritt-prd-critical
- Check LDAP availability via Admin Tool (**New**)
  - Request fails --> uc3-merritt-prd-background (no other test available without logging into the UI)
  - If failure state --> uc3-merritt-prd-critical
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

## Escalope Payload

```
payload = {'host': host, 'service': service, 'state': state, 'cause': message}
```

- host: ecs-uc3-mrt-STACKNAME-stack
- service: service name
- state: ?
- cause: free text

## Escalope API Call

```
escalope_token=$(get value from SSM)
POST https://${ESCALOPE_URL}${escalope_token}
```

## Code

https://github.com/CDLUC3/merritt-docker/blob/main/mrt-inttest-services/merritt-ops/scripts/run-monitor-checks.sh
