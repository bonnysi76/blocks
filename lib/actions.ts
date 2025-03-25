"use server"

import { revalidatePath } from "next/cache"

interface UserData {
  id: string
  name: string
  email: string
  school?: string
  isAdmin?: boolean
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  [key: string]: any
}

export async function saveUserData(userData: UserData) {
  try {
    // In a real app, this would be an API call to your database
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to save user data")
    }

    const result = await response.json()

    // Revalidate the profile page to show updated data
    revalidatePath("/profile")

    return { success: true, data: result.user }
  } catch (error) {
    console.error("Error saving user data:", error)
    return { success: false, error: (error as Error).message }
  }
}

export async function getUserData(userId: string) {
  try {
    // In a real app, this would be an API call to your database
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/user?id=${userId}`,
      { cache: "no-store" },
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to fetch user data")
    }

    const result = await response.json()
    return { success: true, data: result.user }
  } catch (error) {
    console.error("Error fetching user data:", error)
    return { success: false, error: (error as Error).message }
  }
}

