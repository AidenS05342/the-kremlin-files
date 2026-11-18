# The Kremlin Files

An interactive historical political mystery set inside the Central Committee of the Communist Party of the Soviet Union during the August Coup of 1991. Built with Twine 2 / SugarCube 2 as a final project for an undergraduate Digital Humanities course at the University of Tennessee.

## Build

Requires [Tweego](https://www.motoslave.net/tweego/) 2.1.1 unpacked into `tools/tweego/` (not committed).

    scripts/build.sh        # compiles src/ → index.html

## Test

    node --test tests/      # story-graph, data, and game-logic checks (Node 18+, no packages)
