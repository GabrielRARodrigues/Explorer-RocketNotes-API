import config from '../../../knexfile.cjs'
import knex from 'knex'

const connection = knex(config.development)

export default connection
