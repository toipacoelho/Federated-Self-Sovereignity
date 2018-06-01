#!/usr/bin/env bash

usage="$(basename "$0") [-h] [-u version] [-d] -- program to automate testing on hyperledger composer

where:
    -h  show this help text
    -u  launch network
    -d  purge network"

if [ -z "$1" ]
    then
        printf "arguments missing"
        echo "$usage" >&2
        exit 1
fi

while getopts 'hu:d' option; do
  case "$option" in
    h)  echo "$usage"
        exit
        ;;
    u)  $HOME/fabric-dev-servers/stopFabric.sh
        printf "\n"
        $HOME/fabric-dev-servers/teardownFabric.sh
        printf "\n"
        rm -rf $HOME/.composer
        $HOME/fabric-dev-servers/startFabric.sh
        $HOME/fabric-dev-servers/createPeerAdminCard.sh
        cd $HOME/Thesis/test-network
        composer archive create -t dir -n .
        printf "\n"
        composer network install -c PeerAdmin@hlfv1 -a test-network@${OPTARG}.bna
        printf "\n"
        composer network start -n test-network -V ${OPTARG} --networkAdmin admin --networkAdminEnrollSecret adminpw -c PeerAdmin@hlfv1 --file networkadmin.card
        printf "\n"
        composer card import --file networkadmin.card
        printf "\n"
        composer network ping --card admin@test-network
        ;;
    d)  printf "downing\n" >&2
        printf "\n"
        $HOME/fabric-dev-servers/stopFabric.sh
        printf "\n"
        $HOME/fabric-dev-servers/teardownFabric.sh
        printf "\n"
        printf "clearing /.composer\n" >&2
        rm -rf $HOME/.composer
        ;;    
   \?)  printf "illegal option: -%s\n" "$OPTARG" >&2
        echo "$usage" >&2
        exit 1
        ;;
  esac
done
shift $((OPTIND - 1))