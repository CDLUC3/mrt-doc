# Jim Vanderveen: Transition (2019-07-10)

- Separation date / last day in office: 2019-07-16 (Tuesday) 
- First day at UCD: 2019-07-17 (Wednesday)
- Contact: [jim.vanderveen@gmail.com](mailto:jim.vanderveen+cdl@gmail.com) (UCD email address TBD)

## Table of contents

- [Projects](#projects)
   - [Patch/reboot notes](2019-07-12-patch-notes.txt)
   - [Triaging Nagios alerts](#triaging-nagios-alerts)
   - [Linux2 migration](#linux2-migration)
   - [EFS Merritt temp space](#efs-merritt-temp-space)
   - [Merritt development servers](#merritt-development-servers)
   - [Personal Cron Tabs](#personal-crontabs)
- [GitHub repositories](#github-repositories)
   - [UC3 System Inventory](#uc3-system-inventory)
   - [DevOps Kit](#devops-kit)

---

## Projects

### Triaging Nagios alerts

### Linux2 migration

Puppet branches

### EFS Merritt temp space

For use case similar to `/tmp`, the trick with EFS is to use provisioned I/O.
To calculate how many IO operations to pay for, we need to know:

- How large is the largest expected object? (Or collection, as appropriate.)
- What is the maximum time we can affort for processing the largest object?

See the spreadsheet (link!) used for Dryad.

### Merritt development servers

Docker servers for Merritt developers.
Software requirements need to be nailed down with David Loy (& others?)

---

## GitHub repositories

- add to github:
  - ~/tools/aws/logged_status
  - ~/tools/check_mrtstore.pl

### UC3 System Inventory

- Repository: [https://github.com/cdlib/uc3_system_inventory/issues](https://github.com/cdlib/uc3_system_inventory/issues)
- This is a neat Capistrano task that Mark Reyes came up with, to which I have
  added a bunch of tasks.
- Incomplete/unprioritized work is listed in [issues](https://github.com/cdlib/uc3_system_inventory/issues)

### DevOps Kit

- Repository: [https://github.com/cdlib/devops-kit](https://github.com/cdlib/devops-kit)

### Personal Crontabs
Entries from my personal crontab on uc3-mrtingest1-dev, the update server.
Whoever runs the UC3 inventory report will need credentials for that GitHub account.
Somebody with read-access to the Puppet repo will need to run the `git_pull.cron`.

```
[ Fri Jul 12, 14:11 jvanderv@uc3-mrtingest1-dev:~ ]
$ crontab -l
MAILTO=jim.vanderveen@ucop.edu

# Run UC3 inventory report every Tuesday morning.
# 15 7 * * Tue /home/jvanderv/git_and_hub/uc3_system_inventory/run_reports.sh
15 7 * * Tue $HOME/git_and_hub/uc3_system_inventory/run_reports.sh

# Update puppet read-only working copy weekday evenings.
45 17 * * 1-5 $HOME/puppet-read-only/git_pull.cron
```


### uc3-tools

(This is from David Moles' notes, left as a reminder to me to check if this is
a good place to put any of my tools.)

- Repository: https://github.com/CDLUC3/uc3-tools

---

