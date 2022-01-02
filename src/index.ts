import express, { Request, Response } from "express";
import cors from 'cors'
import ytdl from "ytdl-core";

const app = express()

app.use(express.json());
app.use(cors())

app.get('/', (request: Request, response: Response) => {
    return response.send('Hello World')
})


app.post('/download', async (request: Request, response: Response) => {
    const { url } = request.body
    console.log(request.body)
    // response.header("Content-Disposition", 'attachment;\  filename="Video.mp4');

    if (!url) {
        return response.status(400).json({ error: 'url not found!' })
    }

    const videoId = ytdl.getURLVideoID(url)
    if (!videoId) {
        return response.status(400).json({ error: 'Video ID not found!' })
    }
    const file = ytdl(url, { filter: "audioonly" }).pipe(response)

    if (file.statusCode !== 200) {
        return response.status(400).json({ error: 'Video download failed' })
    }
})

app.listen(3000, () => {
    console.log('Server started at http://localhost:3000 🔥️')
})