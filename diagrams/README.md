# Merritt Diagrams Created with Mermaid
[Mermaid Documentation](https://mermaid-js.github.io/mermaid/#/)
## To build diagram images from mermaid source (*.mmd)

The mermaid cli can be used to generate SVG for each mmd file.
```
docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i overview-core.mmd 
```

Run `diagrams/makeSvg.sh` to recreate the images that need to be regenerated.

## Style conventions

Colors
- Merritt Orange: use for databases
- Merritt Green: use for cloud storage
- Cyan: use for non-Merritt components
- Red border: highlight a component in focus for a diagram

Shapes
- `(round box)` - component
- `[(database)]` - databases
- ``((circle))`` - non database repository
- `[[border box]]` - browser pages and other readable objects
- `[box]` - AWS component
- `([extra rounded box])` - docker container
- other shapes - for emphasis

## Core Microservices
- [Graph Source](overview-core.mmd)

[![](overview-core.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/core-index)

## Dryad Microservices
- [Graph Source](overview-dryad.mmd)

[![](overview-dryad.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/dryad)

## Audit and Replic Microservices
- [Graph Source](overview-replic.mmd)

[![](overview-replic.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/auditreplic)

## Scratch Pad
_Develop the diagrams in VSCode with a Mermaid extension. Move to a .mmd file for proper display on GitHub._

```mermaid
%%{init: {'theme': 'neutral'}}%%
graph TD
  A[(Database)]
  A --> |annotate| B
  B --> C
  C --> D
  A -.-> D
  D --> E
```

## Merritt UI
- [Graph Source](ui.mmd)

[![](ui.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/ui)

## Merritt Ingest
- [Graph Source](ingest.mmd)

[![](ingest.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/ingest)

## Merritt Store (Ingest)
- [Graph Source](store-ing.mmd)

[![](store-ing.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/store-ing)

## Merritt Access (File Access)
- [Graph Source](store-fle.mmd)

[![](store-file.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/store-file)

## Merritt Access (Object Access)
- [Graph Source](store-obj.mmd)

[![](store-obj.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/store-obj)

## Inventory
- [Graph Source](inventory.mmd)

[![](inventory.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/inventory)


## Replic
- [Graph Source](replic.mmd)

[![](replic.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/replic)

## Audit
- [Graph Source](audit.mmd)

[![](audit.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/audit)

## OAI
- [Graph Source](oai.mmd)

[![](oai.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/oai)

## Sword
- [Graph Source](sword.mmd)

[![](sword.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/sword)

## Merritt Billing Update (Aggregation)
- [Graph Source](billing.mmd)

[![](billing.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/admin-billing)

## Merritt Admin Tool SPA
- [Graph Source](admin-spa.mmd)

[![](admin-spa.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/admin-spa)

## Merritt Admin Tool Lambda
- [Graph Source](admin-lambda.mmd)

[![](admin-lambda.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/admin-lambda)

## Merritt Collection Admin Tool
- [Graph Source](colladmin.mmd)

[![](colladmin.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/colladmin)

## Merritt Integration Tests
- [Graph Source](integ-tests.mmd)

[![](integ-tests.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/integ-tests)

## Merritt Docker
- [Graph Source](docker.mmd)

[![](docker.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/docker)

## ETD Service (Diagram In Progress)
- [Graph Source](etd.mmd)

[![](etd.mmd.svg)](https://cdluc3.github.io/mrt-doc/diagrams/etd)
