"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MainNav } from "@/components/main-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, FileText, ChevronDown, Calendar, Clock, BookOpen } from "lucide-react"

export default function QuestionPapersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  // Mock data for question papers
  const questionPapers = [
    {
      id: 1,
      title: "JavaScript Fundamentals - Mid Term",
      description: "Test your understanding of JavaScript basics including variables, functions, objects, and more.",
      subject: "JavaScript",
      level: "Intermediate",
      uploadedBy: {
        name: "Admin",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadDate: "2023-09-15",
      examDate: "2023-10-20",
      duration: "2 hours",
      questions: 30,
      downloads: 342,
      featured: true,
    },
    {
      id: 2,
      title: "Data Structures Final Exam",
      description:
        "Comprehensive assessment of data structures concepts including arrays, linked lists, trees, and graphs.",
      subject: "Computer Science",
      level: "Advanced",
      uploadedBy: {
        name: "Admin",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadDate: "2023-09-10",
      examDate: "2023-11-15",
      duration: "3 hours",
      questions: 40,
      downloads: 256,
      featured: true,
    },
    {
      id: 3,
      title: "React Basics Assessment",
      description: "Test your knowledge of React fundamentals including components, props, state, and hooks.",
      subject: "React",
      level: "Beginner",
      uploadedBy: {
        name: "Sarah Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadDate: "2023-09-05",
      examDate: "2023-10-10",
      duration: "1.5 hours",
      questions: 25,
      downloads: 189,
      featured: false,
    },
    {
      id: 4,
      title: "Python Programming Quiz",
      description:
        "Test your Python skills with questions on syntax, data structures, functions, and object-oriented programming.",
      subject: "Python",
      level: "Intermediate",
      uploadedBy: {
        name: "Admin",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadDate: "2023-08-28",
      examDate: "2023-10-05",
      duration: "2 hours",
      questions: 35,
      downloads: 278,
      featured: false,
    },
    {
      id: 5,
      title: "Web Development Fundamentals",
      description: "Comprehensive test covering HTML, CSS, and basic JavaScript for web development.",
      subject: "Web Development",
      level: "Beginner",
      uploadedBy: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadDate: "2023-08-20",
      examDate: "2023-09-30",
      duration: "2 hours",
      questions: 40,
      downloads: 312,
      featured: true,
    },
    {
      id: 6,
      title: "Database Design & SQL",
      description: "Test your knowledge of database design principles and SQL query writing.",
      subject: "Databases",
      level: "Intermediate",
      uploadedBy: {
        name: "Admin",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      uploadDate: "2023-08-15",
      examDate: "2023-10-12",
      duration: "2.5 hours",
      questions: 30,
      downloads: 198,
      featured: false,
    },
  ]

  // Subjects for filtering
  const subjects = [
    { id: "all", name: "All Subjects" },
    { id: "JavaScript", name: "JavaScript" },
    { id: "React", name: "React" },
    { id: "Python", name: "Python" },
    { id: "Web Development", name: "Web Development" },
    { id: "Databases", name: "Databases" },
    { id: "Computer Science", name: "Computer Science" },
  ]

  // Difficulty levels
  const levels = [
    { id: "all", name: "All Levels" },
    { id: "Beginner", name: "Beginner" },
    { id: "Intermediate", name: "Intermediate" },
    { id: "Advanced", name: "Advanced" },
  ]

  // Filter question papers based on search query, subject, and level
  const filteredPapers = questionPapers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSubject = selectedSubject === "all" || paper.subject === selectedSubject
    const matchesLevel = selectedLevel === "all" || paper.level === selectedLevel

    return matchesSearch && matchesSubject && matchesLevel
  })

  // Get featured papers
  const featuredPapers = questionPapers.filter((paper) => paper.featured)

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      {/* Hero Section */}
      <div className="relative pt-24 pb-10 bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Question Papers</h1>
            <p className="text-muted-foreground mb-8">
              Access high-quality question papers to test your knowledge and prepare for assessments.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for question papers by title or subject..."
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
                All Papers
              </TabsTrigger>
              <TabsTrigger value="featured" className="px-4 py-2">
                Featured
              </TabsTrigger>
              <TabsTrigger value="recent" className="px-4 py-2">
                Recently Added
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="px-4 py-2">
                Upcoming Exams
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <div className="relative">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {selectedSubject === "all" ? "All Subjects" : selectedSubject}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-card border border-border z-10 hidden group-hover:block">
                  <div className="py-1">
                    {subjects.map((subject) => (
                      <button
                        key={subject.id}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-accent"
                        onClick={() => setSelectedSubject(subject.id)}
                      >
                        {subject.name}
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
              {filteredPapers.map((paper) => (
                <QuestionPaperCard key={paper.id} paper={paper} />
              ))}
            </div>

            {filteredPapers.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No question papers found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="featured" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPapers.map((paper) => (
                <QuestionPaperCard key={paper.id} paper={paper} />
              ))}
            </div>

            {featuredPapers.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No featured question papers</h3>
                <p className="text-muted-foreground">Check back later for featured content</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...questionPapers]
                .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
                .map((paper) => (
                  <QuestionPaperCard key={paper.id} paper={paper} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...questionPapers]
                .filter((paper) => new Date(paper.examDate).getTime() > new Date().getTime())
                .sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime())
                .map((paper) => (
                  <QuestionPaperCard key={paper.id} paper={paper} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Question Paper Card Component
function QuestionPaperCard({ paper }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{paper.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1">
              <Badge
                variant={
                  paper.level === "Beginner" ? "default" : paper.level === "Intermediate" ? "secondary" : "outline"
                }
              >
                {paper.level}
              </Badge>
              <span>•</span>
              <span>{paper.subject}</span>
            </CardDescription>
          </div>
          {paper.featured && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-2">{paper.description}</p>

        <div className="grid grid-cols-2 gap-y-2 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Exam: {paper.examDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Duration: {paper.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{paper.questions} questions</span>
          </div>
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{paper.downloads} downloads</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={paper.uploadedBy.avatar} alt={paper.uploadedBy.name} />
            <AvatarFallback>{paper.uploadedBy.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            Uploaded by {paper.uploadedBy.name} on {paper.uploadDate}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-muted/50 px-6 py-3">
        <Button variant="outline" size="sm">
          Preview
        </Button>
        <Button size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}

