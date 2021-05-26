import { Environment } from "../models"
import { each, makeFactory } from "factory.ts"
import { Plant } from "../models"
import { makeFactoryWithRequired } from "factory.ts/lib/sync"

export const PlantFactory = makeFactory<Plant>({
  id: each(id => id),
  name: "Name",
  about: "About",
  water_tips: "Water Tips",
  photo:
    "https://storage.googleapis.com/golden-wind/nextlevelweek/05-plantmanager/2.svg",
  environments: ["bathroom"],
  frequency: {
    times: 1,
    repeat_every: "day",
  },
})

export const EnvironmentFactory = makeFactoryWithRequired<Environment, "key">({
  title: "",
}).withDerivation("title", env => env.key.toLocaleUpperCase())

export const environments = [
  EnvironmentFactory.build({ key: "bathrrom" }),
  EnvironmentFactory.build({ key: "kitchen" }),
  EnvironmentFactory.build({ key: "bedroom" }),
  EnvironmentFactory.build({ key: "living_room" }),
]
