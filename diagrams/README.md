# To build from fragments

```
docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i overview-core.mmd 
docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i overview-dryad.mmd
docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i overview-replic.mmd

docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i ui.mmd
docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i ingest.mmd

```

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
_Develop the diagrams in VSCode and then move to a .mmd file_

```mermaid
graph LR
  A --> B
```

## Merritt UI
![](ui.mmd.svg)

## Merritt Ingest
![](ingest.mmd.svg)