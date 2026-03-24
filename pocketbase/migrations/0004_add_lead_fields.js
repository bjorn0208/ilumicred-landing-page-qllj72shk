migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('leads')

    if (!col.fields.getByName('debt_range')) {
      col.fields.add(new TextField({ name: 'debt_range' }))
    }

    if (!col.fields.getByName('time_negativated')) {
      col.fields.add(new TextField({ name: 'time_negativated' }))
    }

    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('leads')

    try {
      col.fields.removeByName('debt_range')
    } catch (_) {}
    try {
      col.fields.removeByName('time_negativated')
    } catch (_) {}

    app.save(col)
  },
)
