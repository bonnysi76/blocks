"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, MessageSquare, Search, Upload, Users, FileText, Home, Settings, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for resources
  const resources = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      category: "JavaScript",
      level: "Beginner",
      uploadedBy: "Admin",
      date: "2023-05-15",
      downloads: 1245,
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      category: "React",
      level: "Intermediate",
      uploadedBy: "Admin",
      date: "2023-06-22",
      downloads: 987,
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      category: "Computer Science",
      level: "Advanced",
      uploadedBy: "Admin",
      date: "2023-04-10",
      downloads: 2156,
    },
    {
      id: 4,
      title: "Python for Machine Learning",
      category: "Python",
      level: "Intermediate",
      uploadedBy: "Sarah Martinez",
      date: "2023-07-05",
      downloads: 1532,
    },
  ]

  // Mock data for user uploads
  const userUploads = [
    {
      id: 1,
      title: "CSS Grid Cheatsheet",
      category: "CSS",
      date: "2023-08-12",
      status: "Approved",
      downloads: 342,
    },
    {
      id: 2,
      title: "TypeScript Best Practices",
      category: "TypeScript",
      date: "2023-09-01",
      status: "Pending Review",
      downloads: 0,
    },
  ]

  // Mock data for community members
  const communityMembers = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Full Stack Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
    },
    {
      id: 2,
      name: "Sarah Martinez",
      role: "Coding Instructor",
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
    },
    {
      id: 3,
      name: "Raj Patel",
      role: "Junior Software Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
      online: false,
    },
    {
      id: 4,
      name: "Emma Wilson",
      role: "UX Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      online: true,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 border-r border-border bg-card">
          <div className="flex h-14 items-center px-4 border-b border-border">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span className="ml-2 font-bold">Blocks</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/resources"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <FileText className="h-4 w-4" />
                Resources
              </Link>
              <Link
                href="/question-papers"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <FileText className="h-4 w-4" />
                Question Papers
              </Link>
              <Link
                href="/upload"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Upload className="h-4 w-4" />
                Upload
              </Link>
              <Link
                href="/community"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <Users className="h-4 w-4" />
                Community
              </Link>
              <Link
                href="/messages"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                <MessageSquare className="h-4 w-4" />
                Messages
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  4
                </span>
              </Link>
              <Link
                href="/settings"
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
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">john@example.com</span>
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
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/profile" className="flex w-full">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/settings" className="flex w-full">
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
                <h1 className="text-2xl font-bold">Welcome back, John</h1>
                <p className="text-muted-foreground">Access and manage your coding resources</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/upload">
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New Resource
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Your Uploads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">+3 new this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5,678</div>
                  <p className="text-xs text-muted-foreground">+24% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,456</div>
                  <p className="text-xs text-muted-foreground">+7% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="resources" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="resources">Available Resources</TabsTrigger>
                <TabsTrigger value="uploads">My Uploads</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>

              <TabsContent value="resources" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {resources.map((resource) => (
                    <Card key={resource.id}>
                      <CardHeader>
                        <CardTitle>{resource.title}</CardTitle>
                        <CardDescription>
                          {resource.category} • {resource.level}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          <p>Uploaded by: {resource.uploadedBy}</p>
                          <p>Date: {resource.date}</p>
                          <p>Downloads: {resource.downloads}</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Download</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="uploads" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {userUploads.map((upload) => (
                    <Card key={upload.id}>
                      <CardHeader>
                        <CardTitle>{upload.title}</CardTitle>
                        <CardDescription>{upload.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          <p>Date: {upload.date}</p>
                          <p>
                            Status:{" "}
                            <span className={upload.status === "Approved" ? "text-green-500" : "text-yellow-500"}>
                              {upload.status}
                            </span>
                          </p>
                          <p>Downloads: {upload.downloads}</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Edit
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="community" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Members</CardTitle>
                    <CardDescription>Connect with other learners in the community</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {communityMembers.map((member) => (
                        <div key={member.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              {member.online && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.role}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Members
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

