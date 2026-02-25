export const runtime = "nodejs"

import fs from "fs"
import path from "path"

export async function GET(
  request: Request,
  context: { params: Promise<{ file: string }> }
) {
  try {
    const { file } = await context.params

    const filePath = path.join(process.cwd(), "public", "audio", file)

    if (!fs.existsSync(filePath)) {
      return new Response("File not found", { status: 404 })
    }

    const stat = fs.statSync(filePath)
    const fileSize = stat.size

    const range = request.headers.get("range")

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

      const chunkSize = end - start + 1

      const stream = fs.createReadStream(filePath, { start, end })

      return new Response(stream as any, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize.toString(),
          "Content-Type": "audio/mpeg",
        },
      })
    }

    const stream = fs.createReadStream(filePath)

    return new Response(stream as any, {
      status: 200,
      headers: {
        "Content-Length": fileSize.toString(),
        "Content-Type": "audio/mpeg",
      },
    })
  } catch (err) {
    console.error("STREAM ERROR:", err)
    return new Response("Internal Server Error", { status: 500 })
  }
}