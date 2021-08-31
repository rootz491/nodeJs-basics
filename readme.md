#   nodeJs

integrate with other tech like mongoose, Datastax and firebase and learning something cool.

---

Now that i've learned about nodeJs and various stuff within it.

I'm now focusing on best way to deploy nodeJs web application. 

**Heroku** is still one of the best options, But i want something more flexible and controllable. that's where `Docker` comes in. 

So let's learn docker.

#	docker

There are two different things in the beginning:
1. 	image
2.	container

suppose i've created a simple node app. Now it's time to run, test and deploy it. First thing i'll do is to create a `Dockerfile`.

###	Dockerfile

it is set of commands that docker will execute in order to create docker image.

simple file can be:

```sh
FROM node 	#	docker will use latest node image to provide runtime env for app

ENV node_env production 	#	setting environment variable

WORKDIR app/	#	create and enter folder `app` in container

COPY [ "package.json", "package-lock.json*", "./" ]	#	copy package.json and package-lock.json file from current dir to folder named `/app` in continer

RUN npm install	#	install all dependencies for node app by reading that package.json

COPY . .	#	copy everything from local active dir to containers' active directory

CMD ["node", "app.js"]	#	command that container executes everytime built image runs
```
#### key commands:

*	`FROM xyz`: use latest image of `xyz` from docker repo.
	*	also `xyz:12.2.3` is an option, to use specific version of that image.

*	`RUN`:	is to execute commands during building the image.
	you can use multiple `RUN` in `Dockerfile`
	*	example: `RUN npm install`

*	`CMD`:	is command that execute in the container everytime you run a built image.
	*	example: `CMD ["node", "app.js"]`

this file will give docker the instruction to a build an image.

>	if there's some files on your local dir that you dont want to be on your container, then use `.dockerignore` file; it works exactly as `.gitignore` file.

###	Build an image

Now let's build an image:

*	go to same directory as `Dockerfile` and execute following

```sh
docker build --tag image-name .
```

this command will create a docker image of name **image-name**

*	you can list all docker images on your local machine using this command:

```sh
docker images
```

now that you've build your first image, you can find that image named **image-name** in this list.

###	running our image

It's time to create a container by running that image.


```sh
docker run image-name
```

this command will run your image and will create a container with random name and **latest** tag.

Another thing to notice here is, containers are isolated from your local machine; means you can't access ports of container without exposing it to communicate with outside world.


```sh
docker run -p 80:3000 --name something -d image-name
```

this command will create a docker container named `todo` and run it.


#### flags

*	`-p 80:3000`:	exposing container's port `3000` to local machine on port `80`

*	`-d`: dispatch means run in background.


Start same container next time, 
```sh
docker start container-name
``` 

Stop a container
```sh
docker stop container-name
```

----


List of all running containers
```sh
docker ps
```

List of all containers
```sh
docker ps -a
```

Logs of continer
```sh
docker logs container-name
```

Continous logs of container
```sh
docker logs container-name -f
```

Remove a container
```sh
docker rm container-name
```

remove an image
```sh
docker rmi image-name
```

---

change tag of image 
```sh
docker tag image-name docker-id/image-name
```

>	this will create an image alias to image `image-name`.

push an image to dockerhub repository
```sh
docker push docker-id/image-name
```

pull any public image
```sh
docker pull docker-id/image-name
```

---

