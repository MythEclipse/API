import express, { Request, Response } from 'express'

const app = express()
const port: number = 3000

app.use('/', (req: Request, res: Response) => {
  res.status(200).send({ data: 'Hello World a' })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
