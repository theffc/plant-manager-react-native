import axios from "axios"
import { Environment, Plant } from "./models"

const api = axios.create({
  baseURL: "http://192.168.0.102:3333",
})

export function fetchPlants() {
  return api.get<Plant[]>("plants")
}

export function fetchEnvironments() {
  return api.get<Environment[]>("plants_environments")
}
