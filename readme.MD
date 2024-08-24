## Setup
### clone this repository
```
git clone https://github.com/pram212/eigen-tech-test.git
```
### install dependencies
```
npm install
```
### create database structures (in this case I'm using sqlite)
```
npx sequelize-cli db:migrate
```
### insert dummy data 
```
npx sequelize-cli db:seed:all
```
### run application
```
node index
```
### open http://localhost:3000/api-docs for testing
