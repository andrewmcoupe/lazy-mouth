#!/bin/bash

while getopts ":a:s:" opt; do
    case $opt in
        a)
          action=$OPTARG
          ;;
        s)
          stage=$OPTARG
          ;;
        \? )
          echo "Invalid option: $OPTARG" 1>&2
          exit 1
          ;;
        : )
          echo "Invalid option: $OPTARG requires an argument" 1>&2
          exit 1
          ;;
    esac
done

# If stage remains unset then exit
if [[ -z $stage ]]; then
    echo "Stage must be set with -s option"
    exit 1
fi

echo "Running sls $action --stage $stage..."
sls "$action" --stage "$stage"


