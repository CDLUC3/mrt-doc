## make svg
```sh
docker run --rm -v "$(pwd):/data" minlag/mermaid-cli:latest -i /data/batches.mmd
docker run --rm -v "$(pwd):/data" minlag/mermaid-cli:latest -i /data/jobs.mmd
```

