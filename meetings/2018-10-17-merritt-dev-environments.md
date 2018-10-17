# 2018-10-17 Merritt Dev Environments

- [List of servers](https://docs.google.com/spreadsheets/d/1C-Nx4kN221_33adevTOnrgeiU2VmotYQaCvQZ-QM0DY/edit?ts=5bc7ab93#gid=0) (Google Docs)

## Table of Contents

- [Special-case servers](#special-case-servers)
   - [uc3-mrtdat1-dev](#uc3-mrtdat1-dev)
   - [uc3-mrtreplic2-dev](#uc3-mrtreplic2-dev)
- [Outside integrations](#outside-integrations)
- [Dev needs](#dev-needs)
- [New "sandbox" servers](#new-sandbox-servers)
   - [uc3-mrtdocker-stg](#uc3-mrtdocker-stg)
   - [uc3-mrtsandbox1-stg](#uc3-mrtsandbox1-stg)
   - [uc3-mrtsandbox2-stg](#uc3-mrtsandbox2-stg)
- [Plan](#plan)

## Special-case servers

### `uc3-mrtdat1-dev`

- specs
  - box: t2.small (general-purpose, burstable)
  - vcpus: 1
  - memory: 2 GiB
  - disk: 250 GB
- originally set up for Dat experiments, not actually part of DITL project
- currently: docker + cloudhost test instance
  - tests that it all works in AWS environment
  - can shut down once we have `uc3-mrtdocker-stg` set up

### `uc3-mrtreplic2-dev`

- specs
  - box: c4.large (compute-optimized, flat-rate performance)
  - vcpus: 2
  - memory: 3.75 GiB
  - disk: 250 GB + 500 GB
- David L
  - Tomcat
    - run service code that can talk to other services (currently in dev, future in stage)
  - testing different environments (e.g. Java 8)
  - personal test scripts etc.
- can shut down after `uc3-mrtsandbox1-stg` set up
  - David L should supervise & copy files over

## Outside integrations

- Dash dev environment uses Merritt dev
  - should move to stg
- Dash demo environment uses Merritt stg
  - should move to prd
- `uc3-mrtstore2-dev` has firewall holes at UNM to allow writing to UNM
  storage
  - if we keep running at UNM, would need to get them to open firewall
    holes for stage
  - Q: did they ever get around to opening those holes the first time we
    asked?

## Dev needs

- David L. uses replic2 regularly, still needs it (or an equivalent) going forward
- David M. would like an EC2 sandbox environment
- Mark has Linux on his desktop, doesn't need a sandbox

## New "sandbox" servers

**Q:** what should the role accounts on the sandbox servers be called? can
they all just be `dpr2`?

### `uc3-mrtdocker-stg`

- "stg" in case we need open ports
- general test environment for Docker-based deployments
- would replace cloudhost+docker test environment from `dat1-dev`
- t2.small (cf. dat1-dev)

### `uc3-mrtsandbox1-stg`

- sandbox machine for David L
- similar specs to `uc3-mrtreplic2-dev`
  - could it be a t2.medium (cf. `uc3-mrtaudit1-prd`, `uc3-mrtreplic2-stg`) 
    instead of c4.large?
- copy files over from `uc3-mrtreplic2-dev` (David L should do this, or at
  least supervise)

**Q:** does `uc3-mrtsandbox1-stg` need to be up 24/7, or can it be
on-demand?

### `uc3-mrtsandbox2-stg`

- sandbox machine for David M
- similar specs to `uc3-mrtdat1-dev`
- can be on-demand

## Plan

1. shutting down general "dev Merritt" environment
   - consult w/Dash on timeline
   - consult w/Dash on UNM needs
2. shutting down "special" servers
   - stand up `mrtdocker-stg`, `mrtsandbox1-stg`, `mrtsandbox2-stg` first
   - can be on its own timeline
