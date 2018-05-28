#!/usr/bin/env bash

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "pt.ua.attr.RA", "name": "i.e. a bank regulator", "type": "BANK", "memberID": "0001", "certificate": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFE
Q0JpUUtCZ1FEMmt1V3pSOG84aVQwTkZoNktORGlDOVZyOApQejlGcGExL0QyS1hrQW9kcXFZOHVp
MDF3QVIweGZTRlhZSmNSTnczMXlWNGhORnFTQWdva1ZrcXFKdi9QVjJtCmdrMEFMNXcvbWxVc0lz
cWtSUnpqM1dETDA0SDlSUktOQ3FobENQbHNnRXhDQWRiS1QzeDBqaFBYT0FBSXZJWUkKTEZ5c0xM
VlFSM2ZlNkxTRDd3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo="}' http://localhost:3000/api/RA

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "pt.ua.attr.AP", "name": "i.e. a bank", "type": "BANK", "memberID": "0002", "certificate": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFE
Q0JpUUtCZ1FEa3ErbkZaWGpVVmlHNVFVMGFjZHdieVVmQwpjYWNVQ2FZVGQrcmxXNkZCV1dvb1Rs
YWtmbURnd1dHZk02ekdzMW90SUVBYWd2VXhhQytaUHZCcHBMM3V0M09LCmdzRlQ4QVhqbHNvcW9v
ZnlHbkRpa3lVQ1ZoZkdGOXM1eS9PeFpLSnZucHpKQksvNWdmSUVGa1hXd0drL0ZlNCsKOUw0WGM5
a3h2UllyakhvclRRSURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo=
"}' http://localhost:3000/api/AP

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "pt.ua.attr.User", memberID": "0003", "certificate": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFE
Q0JpUUtCZ1FEYmRyZEtxcnpTMzZORHVJTEU2V1hwVVJ6QQpubW9XZklLblJMUFdPN2lvNDhGOTZE
a2Z1WFZoQnZvSjRKZjJ3WXVQNmRkZVJvSWh0NXIrQU1OMU1BUGV6QVJICi9JSENqVDRtYVZsdk9p
am1FaHdvbW1tMERINkM5dEtDNG9jVUZHK01LRFR2azhZR00xTGd2MVJEb3NjY2xTaGUKRlNUOU5o
bjU3cEZ3SmZsSEZRSURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo="}' http://localhost:3000/api/User

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "pt.ua.attr.User", memberID": "0004", "certificate": "Q0JpUUtCZ1FDZmxteWRXamJQN1pCcVE4enEyeEE5VzZyMgppdkdtS1ZTclhBdWlxRmFXakdaTFlC
WEUyejNZQm0xdjdNWnpYR0FpeWdFa3BKbGZ3SUx1d1pRb3F6MHVYZXRiCkFORGdiN1FQWUxrRkZP
REthZ0JGemx4TnNmaDFhZ3RNbkRkVUx3aFZFcDlOUXZhUWgzV0pRR3VNZFpYdTI5UmkKNHVLZnFG
eGRtMytDV0wxZmN3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo=
"}' http://localhost:3000/api/User

curl -X GET --header 'Accept: application/json' 'http://localhost:3000/api/queries/selectMembers'