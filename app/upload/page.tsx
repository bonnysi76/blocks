"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      // Redirect to dashboard after successful upload
      window.location.href = "/dashboard?tab=uploads"
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
                <span className="ml-2 text-white font-bold">CodeShare</span>
              </Link>
              <div className="hidden md:flex items-center space-x-4 ml-10">
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/resources"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Resources
                </Link>
                <Link href="/upload" className="text-white px-3 py-2 rounded-md text-sm font-medium">
                  Upload
                </Link>
                <Link
                  href="/community"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Community
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Upload Your Resource</h1>
          <p className="text-gray-400 mt-2">
            Share your knowledge with the community to unlock access to premium content
          </p>
        </div>

        <Card className="bg-black/40 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Resource Details</CardTitle>
            <CardDescription className="text-gray-400">
              Please provide information about the resource you're sharing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">
                  Resource Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., JavaScript Array Methods Cheatsheet"
                  required
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-300">
                    Category
                  </Label>
                  <select
                    id="category"
                    className="w-full rounded-md bg-white/5 border-white/10 text-white p-2"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="react">React</option>
                    <option value="node">Node.js</option>
                    <option value="html-css">HTML/CSS</option>
                    <option value="database">Databases</option>
                    <option value="algorithms">Algorithms</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level" className="text-gray-300">
                    Difficulty Level
                  </Label>
                  <select id="level" className="w-full rounded-md bg-white/5 border-white/10 text-white p-2" required>
                    <option value="">Select a level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file" className="text-gray-300">
                  Upload File
                </Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-white/5 border-white/10 hover:bg-white/10"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">PDF, DOCX, MD, or ZIP (MAX. 10MB)</p>
                    </div>
                    <input id="file-upload" type="file" className="hidden" required />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  Description
                </Label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Describe your resource and what others will learn from it..."
                  className="w-full rounded-md bg-white/5 border-white/10 text-white p-2"
                  required
                ></textarea>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags" className="text-gray-300">
                  Tags (comma separated)
                </Label>
                <Input
                  id="tags"
                  placeholder="e.g., javascript, arrays, methods"
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Upload Resource"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-4">How it works</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-white font-medium mb-1">Upload</h3>
              <p className="text-gray-400 text-sm">Share your coding resources with the community</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-white font-medium mb-1">Review</h3>
              <p className="text-gray-400 text-sm">Our team reviews your submission for quality</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-white font-medium mb-1">Access</h3>
              <p className="text-gray-400 text-sm">Gain access to premium content from our community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

