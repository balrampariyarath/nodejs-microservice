# NodeJS MicroService

## Features

The API features the following functionalities -

#### Public Endpoints

##### Login
* Request body contains an arbitrary username/password pair
* Result: Returns a signed [Json Web Token (JWT)](https://jwt.io/) which is used to validate future requests.

###### NOTE: This is a mock-up  and accepts all username/password pair.

#### Protected Endpoints

The following two endpoints are protected. The JWT obtained in the “Login” endpoint must be attached to each request. If the JWT is missing or invalid, these endpoints rejects the request.

##### Apply Json Patch
* Request body contains a JSON object and a [Json Patch](http://jsonpatch.com/) object.
* Result: Applies the json patch to the json object, and returns the resulting json object.

##### Create Thumbnail
* Request contain a public image URL.
* Result: Downloads the image, resize to 50x50 pixels, and return the resulting thumbnail.


## Documentation

### Setup using NPM

#### Prerequisites

* [NodeJS](https://nodejs.org/en/)
* [Git](https://git-scm.com/)

```

# Get the latest code from github
git clone https://github.com/balrampariyarath/nodejs-microservice.git

# Go to the project directory
cd nodejs-microservice/

# Install NPM dependencies
npm install

# Start the application
npm start

```

API available at: http://localhost:3000/api/v1/

### Build and Run using Docker

#### Prerequisites

* [Docker](https://www.docker.com/get-docker)
* [Git](https://git-scm.com/)

```

# Get the latest code from github
git clone https://github.com/balrampariyarath/nodejs-microservice.git

# Go to the project directory
cd nodejs-microservice/

# Build the docker image
docker build -t <your username>/nodejs-microservice .

# Run the image
docker run -p 49160:3000 -d <your username>/nodejs-microservice

# Docker mapped the 3000 port inside of the container to the port 49160 on your machine

# Get container ID
docker ps

# To see log / app outputs
docker logs <container id>

```

API available at: http://localhost:49160/api/v1/

### API v1 Methods

| Sl.No | Method Name   | Method Type                               | Parameters                                                            | URL                                               | 
|-------|:-------------:|------------------------------------------:|----------------------------------------------------------------------:|--------------------------------------------------:|
| 1     | login         | POST                                      | username (String) and password (Password)                             | http://localhost:3000/api/v1/login                |
| 2     | validate      | POST                                      | token (JWT token)                                                     | http://localhost:3000/api/v1/validate             |
| 3     | applyPatch    | POST (Content-Type: application/json)     | json (json Object), patch (Json Patch Object) and token (JWT token)   | http://localhost:3000/api/v1/applyPatch           |
| 4     | getThumbnail  | POST                                      | image (Image URL) and token (JWT token)                               | http://localhost:3000/api/v1/getThumbnail    |


### Examples

#### login API

* POST Request: http://localhost:3000/api/v1/login
* Content-Type: application/x-www-form-urlencoded
* Params: <br/>
    username: tester@123 <br/>
    password: testpass
* Output Format: JSON
```
{
	"success": "true",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlckAxMjMiLCJwYXNzd29yZCI6InRlc3RwYXNzIiwiaWF0IjoxNTA2MDE5MjUyfQ.HSMPTV_da14hFqsjMP2aLATmseV76wc0x9YrKEP7_KE"
}
```

#### validate API

* POST Request: http://localhost:3000/api/v1/validate
* Content-Type: application/x-www-form-urlencoded
* Params: <br/>
    token: XXX-XXX-XXXXXXXXXXX // token
* Output Format: Boolean (true/false)
```
# If token is valid
true
# Invalid Token
False
```

#### applyPatch API

* POST Request: http://localhost:3000/api/v1/applyPatch
* Content-Type: application/json
* Params:
```
{
	"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbHJhbSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE1MDU5ODY3Njd9.rSG-BQMLZc8-G3X4hgmlCD6wFA71Tc9CX9TGpS-nuxw",
	"patch":[
		{ "op": "replace", "path": "/baz", "value": "boo" },
		{ "op": "add", "path": "/hello", "value": ["world"] },
		{ "op": "remove", "path": "/foo"}
	],
	"json":{
		"baz": "qux",
		"foo": "bar"
	}
}
```
* Output Format: JSON
```
{
	"success": "true",
	"output": {
		"baz": "boo",
		"hello": ["world"]
	}
}
```

#### getThumbnail API

* POST Request: http://localhost:3000/api/v1/getThumbnail
* Content-Type: application/x-www-form-urlencoded
* Params: <br/>
    image: https://cdn.pixabay.com/photo/2013/04/06/11/50/image-editing-101040_960_720.jpg <br/>
    token: XXX-XXX-XXXXXXXXXXX // a valid token
* Output Format: JSON
```
{
	"success": "true",
	"filename": "assets/thumbnails/image-editing-101040_960_720.jpg"
}
```
###### Original Image Uploaded
![Original Image](https://cdn.pixabay.com/photo/2013/04/06/11/50/image-editing-101040_960_720.jpg "Original Image")

Image Source: Google

###### Thumbnail Generated
![Thumbnail](https://raw.githubusercontent.com/balrampariyarath/nodejs-microservice/master/assets/thumbnails/test_thumb_generated.jpg?token=AIukollWXnSCshf-hrdhHjlixo6H0jJBks5ZzUAwwA%3D%3D "Thumbnail Generated")

### Logs and Assets

* Logs are maintained in `logs` directory
* All thumbnails are generated into `assets/thumbnails` ditectory

### Libraries Used

* [Body Parser](https://www.npmjs.com/package/body-parser)
* [Express](https://www.npmjs.com/package/express)
* [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
* [Image-Downloader](https://www.npmjs.com/package/image-downloader)
* [Json Patch](https://www.npmjs.com/package/json-patch)
* [GraphicsMagick](https://www.npmjs.com/package/gm)

* [Winston (Logging)](https://www.npmjs.com/package/winston)

### To Do

* Unit Tests
* Adding a JS Linter