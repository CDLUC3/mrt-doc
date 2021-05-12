#!/bin/bash

# Run this script from the repository root
# The following issue has been reported to mermaid
#   https://github.com/mermaid-js/mermaid-cli/issues/114

MERCLIVER=8.9.2
MERCLIVER=8.9.3-1

for file in diagrams/*.mmd
do
  if [ "$file" -nt "${file}.svg" ]
  then
    echo "${file} changed --> ${file/diagrams\//}"
    # docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i ${file/diagrams\//}
    docker run --rm -v "$(pwd)/diagrams:/data" -w /data minlag/mermaid-cli:${MERCLIVER} mmdc -i ${file/diagrams\//}
  fi
done
