# Developer coffee 2018-04-16

## Mid-sprint prioritization

How do we balance production issues vs. sprint work? (Especially an issue
w/Merritt this week, but also DMPTool.) Who makes the call? What's the
process?

- assess criticality
- figure out how to release any fix (hotfix, or with the sprint release?)

**Marisa:** The product manager needs to be aware.

---

### Example: DataONE issues with DataCite 4 files

Underlying issue (after investigation): Dash DataONE manifests claim files
are DataCite 3.1, but files are actually DataCite 4. Not an issue with
Metacat, but will be an issue with the DataONE generic member node
(starting this week). Will require a Dash fix.

**David L.:** "My impression was that this was a fairly high priority."
Spent three full days tracking it down, through old code that needed JDK 8
updates, migration to GitHub, etc. Not sure how much time he should spend.

**Marisa:** First thing is to inform Perry.

**David M.:** From a Scrum point of view, it should be Perry's call whether
to drop everything and chase it down, or spend say a day investigating and
then call it quits. When we planned the Merritt sprint, we allocated some
time for putting out fires. If we went over a bit this time that's OK,
we'll do better next time.

"We maybe need to get better at distinguishing _important_ from _urgent_."

Details to be discussed further in Merritt metting.

---

## Regular maintenance window / deployment schedule

Dash and DMPTool habitually deploy late afternoons, at times of relatively
low usage. Merritt is more ad-hoc, both because it's more complex (Ingest
and Storage require making sure nothing's in progress; Audit and
Replication can be safely started and stopped with nobody noticing) and
because it's load-balanced, so servers can be taken offline and upgraded on
a rolling basis.

**Mark R.:** Have you thought about load-balancing Dash?

**Scott:** Dash doesn't get the traffic. When we get a big submission it
can take a few hours for it to go through.

**Jim:** What about suppressing uploads / submissions?

**Scott:** Might be nice.

General question: how do we prioritize unglamorous "plumbing" work like
this -- infrastructure improvements, robustness, just generally engineering
to a professional standard of care -- vs. user-facing feature?

### Decision (Marisa)

Wednesday late afternoon to be the official window for Merritt releases
etc.
