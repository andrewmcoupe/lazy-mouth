#!/bin/bash

function exit_wrong_usage {
  echo "ERROR: Wrong usage. See below for correct usage."
  echo -n "$usage"
  exit 1
}


usage="USAGE: $0 -a <action> -s <stage>"

while getopts ":a:s:" opt; do
    case $opt in
        a)
          action=$OPTARG
          ;;
        s)
          stage=$OPTARG
          ;;
        \? )
          exit_wrong_usage
          ;;
        : )
          exit_wrong_usage
          ;;
    esac
done

# If stage remains unset then exit
if [[ -z $stage ]]; then
    echo "Stage must be set with -s option"
    exit 1
fi

echo "Running sls $action --stage $stage"
sls "$action" --stage "$stage"


