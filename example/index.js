import omnipartners, { createLogger } from 'omnipartners'
import winston from 'winston'
import WinstonCloudWatch from 'winston-cloudwatch'

const accountServiceConfig = {
  "apidomain": "http://x",
  "cis": {
    "host": "http://x",
    "key": "x",
    "secret": "x"
  }
}

const winstonCloudWatch = new WinstonCloudWatch({
  awsAccessKeyId: 'x',
  awsSecretKey: 'x',
  awsRegion: 'eu-west-3',
  logGroupName: 'test',
  logStreamName: 'test',
  retentionInDays: 14
})

const omni = omnipartners(accountServiceConfig)
omni.use(createLogger({
  transports: [
    new winston.transports.Console(),
    winstonCloudWatch
  ]
}))

const doIt = async function () {
  const { data } = await omni.data.animalTypes()
}

doIt()
  .catch(err => {
    console.log('Got uncaught error', err)
    process.exitCode = 1
  })
  .then(() => {
    winstonCloudWatch.kthxbye(() => {
      console.log('Bye')
    })
  })
