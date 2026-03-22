migrate(
  (app) => {
    const leads = app.findCollectionByNameOrId('leads')

    const sampleData = [
      {
        name: 'João Silva',
        cpf: '111.222.333-44',
        phone: '(11) 98888-7777',
        status: 'new',
        source: 'landing_page',
      },
      {
        name: 'Maria Oliveira',
        cpf: '555.666.777-88',
        phone: '(21) 97777-6666',
        status: 'contacted',
        source: 'landing_page',
      },
      {
        name: 'Carlos Santos',
        cpf: '999.888.777-66',
        phone: '(31) 96666-5555',
        status: 'converted',
        source: 'chatbot',
      },
    ]

    for (const data of sampleData) {
      const record = new Record(leads)
      record.set('name', data.name)
      record.set('cpf', data.cpf)
      record.set('phone', data.phone)
      record.set('status', data.status)
      record.set('source', data.source)
      app.save(record)
    }
  },
  (app) => {
    // Safe down migration: truncate the leads collection
    const leads = app.findCollectionByNameOrId('leads')
    app.truncateCollection(leads)
  },
)
