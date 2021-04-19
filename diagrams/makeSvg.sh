#!/bin/sh

# Run this script from the repository root
# The following issue has been reported to mermaid
#   https://github.com/mermaid-js/mermaid-cli/issues/114

for file in diagrams/*.mmd
do
  if [ "$file" -nt "${file}.svg" ]
  then
    echo "${file} changed"
    # docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -w 1200 -i ${file/diagrams\//}
    docker run --rm -v "$(pwd)/diagrams:/data" minlag/mermaid-cli mmdc -i ${file/diagrams\//}
  fi
done
