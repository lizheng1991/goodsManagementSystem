const base = {
  api: 'http://localhost:8082'
}

if (process.env.NODE_ENV === 'production') {
  base.api = ''
}

export { base }
