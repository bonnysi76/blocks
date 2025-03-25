"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { MainNav } from "@/components/main-nav"
import { Apple } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [googleAccounts, setGoogleAccounts] = useState([
    { email: "john.doe@gmail.com", name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
    { email: "john.professional@gmail.com", name: "John Professional", avatar: "/placeholder.svg?height=40&width=40" },
  ])
  const [showGoogleAccounts, setShowGoogleAccounts] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Check if admin login
    if (isAdminMode && email === "bonnysithole76@gmail.com" && password === "Montell@23") {
      setTimeout(() => {
        setIsLoading(false)
        window.location.href = "/admin/dashboard"
      }, 1500)
      return
    }

    // Regular user login
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  const handleGoogleLogin = () => {
    setShowGoogleAccounts(true)
  }

  const handleSelectGoogleAccount = (email) => {
    setIsLoading(true)

    // Simulate Google login with selected account
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  const handleAppleLogin = () => {
    setIsLoading(true)

    // Simulate Apple login
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <div className="min-h-screen dark:gradient-bg-dark gradient-bg-light">
      <MainNav />

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="absolute inset-0">
          <div className="absolute inset-0 dark:gradient-accent-dark gradient-accent-light" />
        </div>

        <Card className="w-full max-w-md relative bg-card/40 backdrop-blur-sm border-border">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
                <span className="ml-2 font-bold">Blocks</span>
              </Link>
            </div>
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Sign in to access your account and resources</CardDescription>
          </CardHeader>
          <CardContent>
            {showGoogleAccounts ? (
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-center mb-4">Choose an account</h3>
                {googleAccounts.map((account) => (
                  <button
                    key={account.email}
                    className="w-full flex items-center gap-3 p-3 rounded-md border border-border hover:bg-accent transition-colors"
                    onClick={() => handleSelectGoogleAccount(account.email)}
                    disabled={isLoading}
                  >
                    <img
                      src={account.avatar || "/placeholder.svg"}
                      alt={account.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-left">
                      <div className="font-medium">{account.name}</div>
                      <div className="text-xs text-muted-foreground">{account.email}</div>
                    </div>
                  </button>
                ))}
                <Button variant="outline" className="w-full mt-4" onClick={() => setShowGoogleAccounts(false)}>
                  Use a different account
                </Button>
              </div>
            ) : (
              <Tabs defaultValue="user" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="user" onClick={() => setIsAdminMode(false)}>
                    User
                  </TabsTrigger>
                  <TabsTrigger value="admin" onClick={() => setIsAdminMode(true)}>
                    Admin
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="user">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-background/50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/90">
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="bg-background/50"
                        />
                      </div>
                      <Button type="submit" className="mt-2" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign in with Email"}
                      </Button>
                    </div>
                  </form>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card/40 px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={isLoading}>
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleAppleLogin} disabled={isLoading}>
                      <Apple className="mr-2 h-4 w-4" />
                      Apple
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="admin">
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="admin-email">Admin Email</Label>
                        <Input
                          id="admin-email"
                          type="email"
                          placeholder="admin@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="bg-background/50"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="admin-password">Admin Password</Label>
                        <Input
                          id="admin-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="bg-background/50"
                        />
                      </div>
                      <Button type="submit" className="mt-2" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign in as Admin"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-muted-foreground text-sm mt-2">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:text-primary/90">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

