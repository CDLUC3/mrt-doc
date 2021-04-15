# To build from fragments

```
docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i overview-core.mmd 
docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i overview-dryad.mmd
docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i overview-replic.mmd

docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i ui.mmd
docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i ingest.mmd

docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i store-ing.mmd
docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i store-file.mmd
docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i store-obj.mmd

docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i inventory.mmd
docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i replic.mmd
docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i audit.mmd

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

## Merritt Storage (Ingest)
![](store-ing.mmd.svg)

## Merritt Storage (File Retrieval)
![](store-file.mmd.svg)

## Merritt Storage (Object Retrieval)
![](store-obj.mmd.svg)

## Inventory
![](inventory.mmd.svg)


## Replic
![](replic.mmd.svg)

## Audit
![](audit.mmd.svg)

## OAI
TBD
```mermaid
graph LR
  A --> B
```
## Sword
TBD
```mermaid
graph LR
  A --> B
```
## Merritt Admin Tool
TBD
```mermaid
graph LR
  A --> B
```
## Merritt Collection Admin Tool
TBD
```mermaid
graph LR
  A --> B
```
## Merritt Integration Tests
TBD
```mermaid
graph LR
  A --> B
```
## Merritt Docker
TBD
```mermaid
graph LR
  A --> B
```
