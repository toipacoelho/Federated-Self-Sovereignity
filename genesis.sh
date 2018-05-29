#!/usr/bin/env bash

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "pt.ua.attr.RB", "name": "e.g. a bank regulator", "type": "BANK", "memberID": "0001", "certificate": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FEMmt1V3pSOG84aVQwTkZoNktORGlDOVZyOApQejlGcGExL0QyS1hrQW9kcXFZOHVpMDF3QVIweGZTRlhZSmNSTnczMXlWNGhORnFTQWdva1ZrcXFKdi9QVjJtCmdrMEFMNXcvbWxVc0lzcWtSUnpqM1dETDA0SDlSUktOQ3FobENQbHNnRXhDQWRiS1QzeDBqaFBYT0FBSXZJWUkKTEZ5c0xMVlFSM2ZlNkxTRDd3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo="}' http://localhost:3000/api/RB
printf "\n"

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "pt.ua.attr.AP", "name": "e.g. a bank", "type": "BANK", "memberID": "0002", "certificate": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FEa3ErbkZaWGpVVmlHNVFVMGFjZHdieVVmQwpjYWNVQ2FZVGQrcmxXNkZCV1dvb1RsYWtmbURnd1dHZk02ekdzMW90SUVBYWd2VXhhQytaUHZCcHBMM3V0M09LCmdzRlQ4QVhqbHNvcW9vZnlHbkRpa3lVQ1ZoZkdGOXM1eS9PeFpLSnZucHpKQksvNWdmSUVGa1hXd0drL0ZlNCsKOUw0WGM5a3h2UllyakhvclRRSURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo="}' http://localhost:3000/api/AP
printf "\n"

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "pt.ua.attr.User", "memberID": "0003", "certificate": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FEYmRyZEtxcnpTMzZORHVJTEU2V1hwVVJ6QQpubW9XZklLblJMUFdPN2lvNDhGOTZEa2Z1WFZoQnZvSjRKZjJ3WXVQNmRkZVJvSWh0NXIrQU1OMU1BUGV6QVJICi9JSENqVDRtYVZsdk9pam1FaHdvbW1tMERINkM5dEtDNG9jVUZHK01LRFR2azhZR00xTGd2MVJEb3NjY2xTaGUKRlNUOU5objU3cEZ3SmZsSEZRSURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo="}' http://localhost:3000/api/User
printf "\n"

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "pt.ua.attr.SP", "name": "e.g. um serviço", "memberID": "0004", "certificate": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDZmxteWRXamJQN1pCcVE4enEyeEE5VzZyMgppdkdtS1ZTclhBdWlxRmFXakdaTFlCWEUyejNZQm0xdjdNWnpYR0FpeWdFa3BKbGZ3SUx1d1pRb3F6MHVYZXRiCkFORGdiN1FQWUxrRkZPREthZ0JGemx4TnNmaDFhZ3RNbkRkVUx3aFZFcDlOUXZhUWgzV0pRR3VNZFpYdTI5UmkKNHVLZnFGeGRtMytDV0wxZmN3SURBUUFCCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQo="}' http://localhost:3000/api/SP
printf "\n"

curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"$class": "pt.ua.attr.Attribute", "attrID": "string", "blob": "string", "issuer": "resource:pt.ua.attr.AP#0001", "owner": "resource:pt.ua.attr.User#0003", "type": "BANK"}' http://localhost:3000/api/Attribute
printf "\n"
