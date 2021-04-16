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

![](https://raw.githubusercontent.com/CDLUC3/mrt-doc/mermaid/diagrams/overview-dryad.mmd.svg)

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
```

## Merritt UI
![](ui.mmd.svg)

## Merritt Ingest
![](ingest.mmd.svg)

## Merritt Store (Ingest)
![](store-ing.mmd.svg)

## Merritt Access (File Access)
![](store-file.mmd.svg)

## Merritt Access (Object Access)
![](store-obj.mmd.svg)

## Inventory
![](inventory.mmd.svg)


## Replic
![](replic.mmd.svg)

## Audit
![](audit.mmd.svg)

## OAI
![](oai.mmd.svg)

## Sword
![](sword.mmd.svg)

## Merritt Billing Update (Aggregation)
![](billing.mmd.svg)

## Merritt Admin Tool SPA
![](admin-spa.mmd.svg)

## Merritt Admin Tool Lambda
![](admin-lambda.mmd.svg)

## Merritt Collection Admin Tool
![](colladmin.mmd.svg)

## Merritt Integration Tests
![](integ-tests.mmd.svg)

## Merritt Docker
![](docker.mmd.svg)

