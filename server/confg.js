import process from 'node:process'
import dotenv from 'dotenv'

export const isDev = process.env['ENV'] !== 'prod'

if (isDev) {
  Object.assign(
    process.env,
    dotenv.config({ path: '.env.local' }).parsed,
    dotenv.config({ path: '.env' }).parsed
  )
}

export const mongoUri = getMandatoryEnv('MONGO_URI')

function getMandatoryEnv(name) {
  const value = process.env[name]

  if (!value) {
    throw new Error(
      `Environment variable '${name}' is not defined but is mandatory`
    )
  }

  return value
}
