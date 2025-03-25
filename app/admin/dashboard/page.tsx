"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  Search,
  Upload,
  Users,
  FileText,
  Settings,
  LogOut,
  BarChart3,
  FileUp,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for pending approvals
  const pendingApprovals = [
    {
      id: 1,
      title: "Advanced JavaScript Patterns",
      category: "JavaScript",
      uploadedBy: "Alex Chen",
      date: "2023-10-15",
      status: "pending",
    },
    {
      id: 2,
      title: "React Performance Optimization",
      category: "React",
      uploadedBy: "Sarah Martinez",
      date: "2023-10-12",
      status: "pending",
    },
    {
      id: 3,
      title: "Python Data Analysis Techniques",
      category: "Python",
      uploadedBy: "Raj Patel",
      date: "2023-10-10",
      status: "pending",
    },
  ]

  // Mock data for recent users
  const recentUsers = [
    {
      id: 1,
      name: "Emma Wilson",
      email: "emma@example.com",
      joinDate: "2023-10-15",
      uploads: 5,
    },
    {
      id: 2,
      name: "Michael Brown",
      email: "michael@example.com",
      joinDate: "2023-10-14",
      uploads: 2,
    },
    {
      id: 3,
      name: "Sophia Garcia",
      email: "sophia@example.com",
      joinDate: "2023-10-12",
      uploads: 0,
    },
  ]

  // Mock data for question papers
  const questionPapers = [
    {
      id: 1,
      title: "JavaScript Fundamentals - Mid Term",
      category: "JavaScript",
      level: "Intermediate",
      uploadDate: "2023-09-15",
      downloads: 342,
    },
    {
      id: 2,
      title: "Data Structures Final Exam",
      category: "Computer Science",
      level: "Advanced",
      uploadDate: "2023-09-10",
      downloads: 256,
    },
    {
      id: 3,
      title: "React Basics Assessment",
      category: "React",
      level: "Beginner",
      uploadDate: "2023-09-05",
      downloads: 189,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 border-r border-border bg-card">
          <div className="flex h-14 items-center px-4 border-b border-border">
            <Link href="/admin/dashboard" className="flex items-center">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span className="ml-2 font-bold">Blocks Admin</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground"
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/users"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Users className="h-4 w-4" />
                Users
              </Link>
              <Link
                href="/admin/resources"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <FileText className="h-4 w-4" />
                Resources
              </Link>
              <Link
                href="/admin/question-papers"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <FileUp className="h-4 w-4" />
                Question Papers
              </Link>
              <Link
                href="/admin/approvals"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Shield className="h-4 w-4" />
                Approvals
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  3
                </span>
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4 border-t border-border">
            <div className="flex items-center gap-3 rounded-md px-3 py-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Admin</span>
                <span className="text-xs text-muted-foreground">bonnysithole76@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 md:pl-64">
          {/* Top Navigation */}
          <header className="sticky top-0 z-40 border-b border-border bg-background">
            <div className="flex h-14 items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-menu"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                </Button>
                <div className="relative md:w-64 lg:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/admin/profile" className="flex w-full">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/admin/settings" className="flex w-full">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/logout" className="flex w-full items-center">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your platform and users</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/admin/question-papers/upload">
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Question Paper
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5,234</div>
                  <p className="text-xs text-muted-foreground">+124 this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,423</div>
                  <p className="text-xs text-muted-foreground">+56 this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Question Papers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87</div>
                  <p className="text-xs text-muted-foreground">+12 this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">3 new today</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <Card className="col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Platform Statistics</CardTitle>
                  <CardDescription>User activity and resource usage over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                    <p className="text-muted-foreground">Interactive chart would appear here</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Storage Usage</CardTitle>
                  <CardDescription>Total platform storage usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Question Papers</span>
                      <span className="text-sm text-muted-foreground">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">User Resources</span>
                      <span className="text-sm text-muted-foreground">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">User Profiles</span>
                      <span className="text-sm text-muted-foreground">12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">System Files</span>
                      <span className="text-sm text-muted-foreground">8%</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="approvals" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
                <TabsTrigger value="users">Recent Users</TabsTrigger>
                <TabsTrigger value="question-papers">Question Papers</TabsTrigger>
              </TabsList>

              <TabsContent value="approvals" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Resource Approvals</CardTitle>
                    <CardDescription>Review and approve user-submitted resources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingApprovals.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <h3 className="font-medium">{item.title}</h3>
                            <div className="text-sm text-muted-foreground">
                              <p>Category: {item.category}</p>
                              <p>
                                Uploaded by: {item.uploadedBy} on {item.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <XCircle className="h-4 w-4 text-red-500" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8">
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Pending Approvals
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="users" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Recently Joined Users</CardTitle>
                    <CardDescription>New users who joined the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              <p className="text-xs text-muted-foreground">Joined: {user.joinDate}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{user.uploads} uploads</p>
                            <Button size="sm" variant="outline" className="mt-2">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Users
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="question-papers" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Question Papers</CardTitle>
                    <CardDescription>Manage uploaded question papers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {questionPapers.map((paper) => (
                        <div
                          key={paper.id}
                          className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <h3 className="font-medium">{paper.title}</h3>
                            <div className="text-sm text-muted-foreground">
                              <p>
                                Category: {paper.category} • Level: {paper.level}
                              </p>
                              <p>
                                Uploaded: {paper.uploadDate} • Downloads: {paper.downloads}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-500">
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Question Papers
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}

