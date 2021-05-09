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
- `{{angle box}}` - docker container
- other shapes - for emphasis

## Core Microservices
- [Graph Source](overview-core.mmd)

![](overview-core.mmd.svg)

## Dryad Microservices
- [Graph Source](overview-dryad.mmd)

![](overview-dryad.mmd.svg)

## Audit and Replic Microservices
- [Graph Source](overview-replic.mmd)

![](overview-replic.mmd.svg)

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

![](ui.mmd.svg)

## Merritt Ingest
- [Graph Source](ingest.mmd)

![](ingest.mmd.svg)

## Merritt Store (Ingest)
- [Graph Source](store-ing.mmd)

![](store-ing.mmd.svg)

## Merritt Access (File Access)
- [Graph Source](store-fle.mmd)

![](store-file.mmd.svg)

## Merritt Access (Object Access)
- [Graph Source](store-obj.mmd)

![](store-obj.mmd.svg)

## Inventory
- [Graph Source](inventory.mmd)

![](inventory.mmd.svg)


## Replic
- [Graph Source](replic.mmd)

![](replic.mmd.svg)

## Audit
- [Graph Source](audit.mmd)

![](audit.mmd.svg)

## OAI
- [Graph Source](oai.mmd)

![](oai.mmd.svg)

## Sword
- [Graph Source](sword.mmd)

![](sword.mmd.svg)

## Merritt Billing Update (Aggregation)
- [Graph Source](billing.mmd)

![](billing.mmd.svg)

## Merritt Admin Tool SPA
- [Graph Source](admin-spa.mmd)

![](admin-spa.mmd.svg)

## Merritt Admin Tool Lambda
- [Graph Source](admin-lambda.mmd)

![](admin-lambda.mmd.svg)

## Merritt Collection Admin Tool
- [Graph Source](colladmin.mmd)

![](colladmin.mmd.svg)

## Merritt Integration Tests
- [Graph Source](integ-tests.mmd)

![](integ-tests.mmd.svg)

## Merritt Docker
- [Graph Source](docker.mmd)

![](docker.mmd.svg)

## ETD Service (Diagram In Progress)
- [Graph Source](etd.mmd)

![](etd.mmd.svg)
