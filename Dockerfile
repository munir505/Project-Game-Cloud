FROM golang
COPY Project-Game-Cloud /opt/Game-Site/Project-Game-Cloud
COPY GameSite /opt/Game-Site/GameSite
WORKDIR /opt/Game-Site/
ENTRYPOINT ["/opt/Game-Site/Project-Game-Cloud"]
