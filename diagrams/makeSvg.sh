#!/bin/sh

# Run this script from the repository root

args=""
for file in diagrams/*.mmd
do
  if [ "$file" -nt "${file}.svg" ]
  then
    args="${args} -i ${file/diagrams\//}"
  fi
done
echo "Generate: ${args}"
docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 $args