#   Docker Notes web-app

Simple webapp to implement stuff, and use them all together.

Using docker i seperated each tech as a service and isolated from "everything". And communicating via exposing ports to local machine.

### Tech stack

>   MERN

*   React
*   NodeJs
*   MongoDB
*   Docker


---


Here's blog on doing something similar (for insights 😉): [link](https://medium.com/free-code-camp/create-a-fullstack-react-express-mongodb-app-using-docker-c3e3e21c4074)


---

##   Microsoft Azure Container Registry & Instances

###   Resources

* https://docs.microsoft.com/en-us/azure/container-registry/container-registry-get-started-azure-cli

* https://docs.microsoft.com/en-us/azure/container-instances/container-instances-quickstart

###   Steps to register and run a container


####  container registry

* pushed to azure container registry (it's a pain).

  ```sh
  az acr build -t rootztest/notes-frontend -r rootztest -f Dockerfile .
  ```

* list all containers registeries

  ```sh
  az acr repository list --name rootztest --output table
  ```


####  container instance

* list all container instances

  ```sh
  az container list --resource-group experiment --output table
  ```

* deployed container to azure container instance.

  ```sh
  az container create --resource-group experiment --name rootztest --image mcr.microsoft.com/azuredocs/aci-helloworld --dns-name-label aci-demo-2 --ports 80
  ```

* get the URL of the container instance

  ```sh
  az container show --resource-group experiment --name rootztest --query ipAddress.fqdn --output tsv
  ```

  ```sh
  az container show --resource-group experiment --name rootztest --query "{FQDN:ipAddress.fqdn,ProvisioningState:provisioningState}" --out table
  ```



* get logs of container instance.

  ```sh
  az container logs --resource-group experiment --name rootztest
  ```

* stream logs of container instance.

  ```sh
  az container attach --resource-group experiment --name rootztest
  ```



* delete container instance

  ```sh
  az container delete --resource-group experiment --name rootztest --yes
  ```

* delete resource group

  ```sh
  az group delete --name experiment
  ```

---