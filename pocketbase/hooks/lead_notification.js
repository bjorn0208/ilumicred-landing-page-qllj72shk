// Hook to log or handle logic right after a lead is created
onRecordAfterCreateRequest((e) => {
  const record = e.record
  const name = record.get('name')

  // This is a placeholder for real webhook logic (e.g. sending to a CRM)
  console.log(`New lead received: ${name}`)

  e.next()
}, 'leads')
