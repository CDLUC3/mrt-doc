# Simplifying Merritt: Preparatory notes

(**Note:** I'm leaning heavily on links to Martin Fowler because I know he's
not a crank, a snake oil salesman, or some random plagiarist on DZone. Other
people have also covered these topics well and may have somewhat different
definitions and recommendations -- contributions welcome.)

Best practices:

- [continuous integration](https://martinfowler.com/articles/continuousIntegration.html):
  - developers check in early and often
  - every checkin triggers a build
- [continuous delivery](https://martinfowler.com/bliki/ContinuousDelivery.html)
  - every service is always in a deployable state
  - tests prove every service to be production-ready
  - any developer can deploy any version of any service to any environment on demand
    (note that this includes rolling back on demand to previous versions)
- [DevOps culture](https://martinfowler.com/bliki/DevOpsCulture.html)
  - responsibility shared between development & opeations
  - development team shares the operations staff's pain & is responsible
    for helping reduce it
  - testing, configuration, and deployment
