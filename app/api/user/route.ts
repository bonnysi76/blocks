import { NextResponse } from "next/server"

// This would connect to your database in a real application
const users = new Map()

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate data
    if (!data.id || !data.name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Store user data
    users.set(data.id, {
      ...data,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true, user: users.get(data.id) })
  } catch (error) {
    console.error("Error saving user data:", error)
    return NextResponse.json({ error: "Failed to save user data" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  const user = users.get(id)

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json({ user })
}

