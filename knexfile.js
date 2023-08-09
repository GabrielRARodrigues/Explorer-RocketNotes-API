import path from 'path'

export const development = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'database.db')
  },
  useNullAsDefault: true
}
