#! /bin/bash

echo "Enter the service name"
read -r service_name

touch "./services/$service_name.service.go"
echo "package services" > "./services/$service_name.service.go"

touch "./routes/$service_name.route.go"
echo "package routes" > "./routes/$service_name.route.go"

touch "./controllers/$service_name.controller.go"
echo "package controllers" > "./controllers/$service_name.controller.go"