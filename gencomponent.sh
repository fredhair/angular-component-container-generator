#!/usr/bin/bash

# Repurposing an old node script for generating files, this hijacks the ng g c command to generate your component
# along with a container.ts and container.html file

component_name=$1
current_dir=$PWD
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cmd="ng g c ${component_name} ${component_args}"
#echo $cmd
$cmd

echo "running node script.."
node ${SCRIPT_DIR}/create-component.js $current_dir $component_name
