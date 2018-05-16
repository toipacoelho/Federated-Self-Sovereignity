# Federated-Self-Sovereignity

### Server related

#### Starting the servers

```
  cd ~/fabric-dev-servers
  ./startFabric.sh
  ./createPeerAdminCard.sh
```

#### Reseting Servers

Remove `.Composer` from `$HOME`
```
  cd ~/fabric-dev-servers
  ./stopFabric.sh
  ./teardownFabric.sh
```

#### To start playground

```
  composer-playground
```

### Prepare and upload

Create the package

```
  composer archive create -t dir -n .
```

install the network
```
  composer network install -c PeerAdmin@hlfv1 -a test-network@0.0.x.bna
```

start the network
```
  composer network start -n test-network -V 0.0.x --networkAdmin admin --networkAdminEnrollSecret adminpw -c PeerAdmin@hlfv1 --file networkadmin.card
```

import a usable admin
```
  composer card import --file networkadmin.card
```
if this results in an error reset the servers.

check if the card is connected
```
  composer network ping --card admin@test-network
```
### Update version

First update version number in package.json, then run 

```
  composer archive create -t dir -n .
```
install the network
```
  composer network install -c PeerAdmin@hlfv1 -a test-network@0.0.x.bna
```
upgrade the network
```
  composer network upgrade -c PeerAdmin@hlfv1 -n test-network -V 0.0.x 
```


