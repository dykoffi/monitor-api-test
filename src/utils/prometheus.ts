import client from 'prom-client'

// Create a Registry which registers the metrics
const register = new client.Registry()

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'monitor'
})

client.collectDefaultMetrics({ register })

export default register