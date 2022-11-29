# Merritt Scheduled Jobs

## Downtime Windows
- EZID: Thurs 5-6am PT
- ZFS: Thurs 5-6am PT
- RDS: Thurs 5-6am PT (verify)

## Crons
_This page does not include sysadmin crons that perform tasks such as log rotation._

- Pause Queues: Thursday 5am
- Unpause Queues: Thursday 6am
- Overnight Daily: Merritt Billing Database Update and Consistency Reports
- Thursday AM: Nuxeo Feed Processing
- Daily, AM & PM: ETD Processing
  - Mon-Sat: 7:30AM Retrieve new ETDs
  - Mon-Sat: 1:30PM Generate MARC records
  - Mon/Thu: 9:00AM Query ProQuest Gateway
