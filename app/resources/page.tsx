"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MainNav } from "@/components/main-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Download,
  BookOpen,
  Code,
  Database,
  FileText,
  Globe,
  Server,
  Cpu,
  Star,
  StarHalf,
  ChevronDown,
} from "lucide-react"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  // Mock data for resources
  const resources = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "A comprehensive guide to JavaScript basics including variables, functions, objects, and more.",
      category: "JavaScript",
      level: "Beginner",
      uploadedBy: {
        name: "Admin",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2023-05-15",
      downloads: 1245,
      rating: 4.8,
      featured: true,
      tags: ["javascript", "web development", "programming"],
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      description: "Master React Hooks with practical examples and best practices for state management.",
      category: "React",
      level: "Intermediate",
      uploadedBy: {
        name: "Sarah Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2023-06-22",
      downloads: 987,
      rating: 4.9,
      featured: true,
      tags: ["react", "hooks", "javascript", "frontend"],
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      description: "Essential data structures and algorithms explained with JavaScript implementations.",
      category: "Computer Science",
      level: "Advanced",
      uploadedBy: {
        name: "Admin",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2023-04-10",
      downloads: 2156,
      rating: 4.7,
      featured: false,
      tags: ["algorithms", "data structures", "computer science", "interviews"],
    },
    {
      id: 4,
      title: "Python for Machine Learning",
      description: "Introduction to Python libraries for machine learning including NumPy, Pandas, and Scikit-learn.",
      category: "Python",
      level: "Intermediate",
      uploadedBy: {
        name: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2023-07-05",
      downloads: 1532,
      rating: 4.6,
      featured: true,
      tags: ["python", "machine learning", "data science", "AI"],
    },
    {
      id: 5,
      title: "CSS Grid & Flexbox Mastery",
      description: "Modern CSS layout techniques with practical examples and responsive design patterns.",
      category: "CSS",
      level: "Intermediate",
      uploadedBy: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2023-08-12",
      downloads: 876,
      rating: 4.5,
      featured: false,
      tags: ["css", "web design", "responsive", "frontend"],
    },
    {
      id: 6,
      title: "Node.js API Development",
      description: "Build robust RESTful APIs with Node.js, Express, and MongoDB.",
      category: "Node.js",
      level: "Intermediate",
      uploadedBy: {
        name: "Raj Patel",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2023-09-01",
      downloads: 1089,
      rating: 4.7,
      featured: false,
      tags: ["node.js", "api", "backend", "express", "mongodb"],
    },
    {
      id: 7,
      title: "SQL Database Design",
      description: "Learn database design principles and SQL query optimization techniques.",
      category: "Databases",
      level: "Intermediate",
      uploadedBy: {
        name: "Admin",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2023-06-18",
      downloads: 945,
      rating: 4.4,
      featured: false,
      tags: ["sql", "database", "data modeling", "backend"],
    },
    {
      id: 8,
      title: "TypeScript for React Developers",
      description: "Integrate TypeScript into your React applications for type-safe development.",
      category: "TypeScript",
      level: "Intermediate",
      uploadedBy: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2023-08-28",
      downloads: 765,
      rating: 4.8,
      featured: false,
      tags: ["typescript", "react", "javascript", "frontend"],
    },
  ]

  // Categories for filtering
  const categories = [
    { id: "all", name: "All Categories", icon: Globe },
    { id: "JavaScript", name: "JavaScript", icon: Code },
    { id: "React", name: "React", icon: Code },
    { id: "Python", name: "Python", icon: Code },
    { id: "CSS", name: "CSS", icon: FileText },
    { id: "Node.js", name: "Node.js", icon: Server },
    { id: "Databases", name: "Databases", icon: Database },
    { id: "Computer Science", name: "Computer Science", icon: Cpu },
  ]

  // Difficulty levels
  const levels = [
    { id: "all", name: "All Levels" },
    { id: "Beginner", name: "Beginner" },
    { id: "Intermediate", name: "Intermediate" },
    { id: "Advanced", name: "Advanced" },
  ]

  // Filter resources based on search query, category, and level
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || resource.level === selectedLevel

    return matchesSearch && matchesCategory && matchesLevel
  })

  // Get featured resources
  const featuredResources = resources.filter((resource) => resource.featured)

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      {/* Hero Section */}
      <div className="relative pt-24 pb-10 bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Coding Resources Library</h1>
            <p className="text-muted-foreground mb-8">
              Discover high-quality coding resources, tutorials, and guides shared by our community and curated by
              experts.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for resources, topics, or tags..."
                className="pl-10 py-6 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <TabsList className="bg-muted h-auto p-1">
              <TabsTrigger value="all" className="px-4 py-2">
                All Resources
              </TabsTrigger>
              <TabsTrigger value="featured" className="px-4 py-2">
                Featured
              </TabsTrigger>
              <TabsTrigger value="popular" className="px-4 py-2">
                Most Popular
              </TabsTrigger>
              <TabsTrigger value="recent" className="px-4 py-2">
                Recently Added
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <div className="relative">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {selectedCategory === "all" ? "All Categories" : selectedCategory}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-card border border-border z-10 hidden group-hover:block">
                  <div className="py-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-accent flex items-center gap-2"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.icon && <category.icon className="h-4 w-4" />}
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <Button variant="outline" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {selectedLevel === "all" ? "All Levels" : selectedLevel}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card border border-border z-10 hidden group-hover:block">
                  <div className="py-1">
                    {levels.map((level) => (
                      <button
                        key={level.id}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-accent"
                        onClick={() => setSelectedLevel(level.id)}
                      >
                        {level.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No resources found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="featured" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>

            {featuredResources.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No featured resources</h3>
                <p className="text-muted-foreground">Check back later for featured content</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="popular" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...resources]
                .sort((a, b) => b.downloads - a.downloads)
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...resources]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Resource Card Component
function ResourceCard({ resource }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{resource.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Badge
                variant={
                  resource.level === "Beginner"
                    ? "default"
                    : resource.level === "Intermediate"
                      ? "secondary"
                      : "outline"
                }
              >
                {resource.level}
              </Badge>
              <span>•</span>
              <span>{resource.category}</span>
            </CardDescription>
          </div>
          {resource.featured && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-2">{resource.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={resource.uploadedBy.avatar} alt={resource.uploadedBy.name} />
              <AvatarFallback>{resource.uploadedBy.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{resource.uploadedBy.name}</span>
          </div>
          <div className="flex items-center">
            <div className="flex mr-2">
              {Array.from({ length: Math.floor(resource.rating) }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
              {resource.rating % 1 !== 0 && <StarHalf className="h-4 w-4 fill-primary text-primary" />}
            </div>
            <span className="text-sm font-medium">{resource.rating}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
        <div className="text-sm text-muted-foreground">
          <span>{resource.downloads} downloads</span>
        </div>
        <Button size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}

