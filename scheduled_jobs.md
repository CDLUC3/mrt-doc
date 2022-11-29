# Merritt Scheduled Jobs

## Downtime Windows
- EZID: Thurs 5-6am PT
- ZFS: Thurs 5-6am PT
- RDS: Thurs 5-6am PT (verify)

## Crons
_This page does not include sysadmin crons that perform tasks such as log rotation._

| Category | Purpose | Time | 
| -------- | ------- | ---- |
| Downtime | Pause Queues | Thursday 5am |
| Downtime | Unpause Queues | Thursday 6am |
| Billing  | Merritt Billing DB Update and Consistency Reports | Overnight |
| Nuxeo | Nuxeo Feed Crawl and Ingest | Thursday AM |
| ETD | Retrieve new ETD's | Mon-Sat 7:30 AM |
| ETD | Generate Marc Records | Mon-Sat 1:30 PM |
| ETD | Query ProQuest Gateway | Mon/Thu 9am|
