migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    const record = new Record(users)
    record.setEmail('dianreis@yahoo.com.br')
    record.setPassword('securepassword123')
    record.setVerified(true)
    record.set('name', 'Admin')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'dianreis@yahoo.com.br')
      app.delete(record)
    } catch (_) {}
  },
)
