# Notes Microservice

This repository contains the code for the Notes Microservice, a scalable application built using Node.js, Express, and MongoDB. The microservice can be deployed in various environments, including as a standalone Express server, in Docker containers, as an Azure Function App, or using Kubernetes with Minikube or Azure Kubernetes Service (AKS).

## Prerequisites

Before you proceed, ensure that you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=linux%2Ccsharp%2Cbash#v2)
- [Helm](https://helm.sh/docs/intro/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)

## Deployment

### Standalone Express Server

To deploy the Notes Microservice as a standalone Express server, follow these steps:

1. **Install Dependencies:**
   ```bash
   npm install
