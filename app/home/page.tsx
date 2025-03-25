"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { AdminBadge } from "@/components/admin-badge"
import {
  MessageSquare,
  Upload,
  Users,
  FileText,
  Home,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [activeVideo, setActiveVideo] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const observer = useRef()
  const videoRefs = useRef({})

  // Mock data generator for infinite scroll
  const generateMockPosts = (pageNum) => {
    const newPosts = []
    const startIndex = (pageNum - 1) * 5

    for (let i = 0; i < 5; i++) {
      const id = startIndex + i + 1
      const isVideo = Math.random() > 0.5
      const isAdmin = Math.random() > 0.7

      newPosts.push({
        id,
        author: {
          id: (id % 5) + 1,
          name: ["John Doe", "Sarah Martinez", "Alex Chen", "Emma Wilson", "Raj Patel"][id % 5],
          avatar: `/placeholder.svg?height=40&width=40`,
          school: ["Stanford University", "MIT", "Harvard University", "UC Berkeley", "Princeton University"][id % 5],
          isAdmin,
        },
        content: `This is post #${id}. ${isVideo ? "Check out this cool coding tutorial!" : "Just shared a new resource on React hooks!"}`,
        media: isVideo
          ? { type: "video", url: "#", thumbnail: `/placeholder.svg?height=400&width=600&text=Video+${id}` }
          : { type: "image", url: `/placeholder.svg?height=400&width=600&text=Post+${id}` },
        likes: Math.floor(Math.random() * 100) + 1,
        comments: Math.floor(Math.random() * 20) + 1,
        shares: Math.floor(Math.random() * 10) + 1,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 604800000)).toLocaleDateString(),
        liked: false,
        bookmarked: false,
      })
    }

    return newPosts
  }

  // Load initial posts
  useEffect(() => {
    loadMorePosts()
  }, [])

  // Intersection observer for infinite scroll
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    }

    observer.current = new IntersectionObserver(handleObserver, options)

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [posts])

  // Handle video playback when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (!activeVideo) return

      const videoElement = videoRefs.current[activeVideo]
      if (!videoElement) return

      const rect = videoElement.getBoundingClientRect()
      const isVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)

      if (!isVisible && isPlaying) {
        try {
          const pausePromise = videoElement.pause()
          if (pausePromise !== undefined) {
            pausePromise.catch((error) => {
              console.error("Error pausing video on scroll:", error)
            })
          }
          setIsPlaying(false)
        } catch (error) {
          console.error("Error pausing video on scroll:", error)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeVideo, isPlaying])

  const handleObserver = (entries) => {
    const target = entries[0]
    if (target.isIntersecting && !loading && hasMore) {
      loadMorePosts()
    }
  }

  const loadMorePosts = () => {
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const newPosts = generateMockPosts(page)
      setPosts((prev) => [...prev, ...newPosts])
      setPage((prev) => prev + 1)

      // Stop after 5 pages for demo purposes
      if (page >= 5) {
        setHasMore(false)
      }

      setLoading(false)
    }, 1000)
  }

  const handleVideoPlay = (postId) => {
    if (activeVideo && activeVideo !== postId) {
      // Pause the previously playing video
      const prevVideo = videoRefs.current[activeVideo]
      if (prevVideo) {
        // Safely pause the previous video
        try {
          prevVideo.pause()
        } catch (error) {
          console.error("Error pausing previous video:", error)
        }
      }
    }

    const videoElement = videoRefs.current[postId]
    if (!videoElement) return

    setActiveVideo(postId)

    if (isPlaying) {
      // We're currently playing, so pause
      try {
        videoElement.pause()
        setIsPlaying(false)
      } catch (error) {
        console.error("Error pausing video:", error)
      }
    } else {
      // We're currently paused, so play
      try {
        // Use the Promise returned by play()
        const playPromise = videoElement.play()

        // If the browser returns a promise (not all browsers do)
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Playback started successfully
              setIsPlaying(true)
            })
            .catch((error) => {
              // Auto-play was prevented or another error occurred
              console.error("Error playing video:", error)
              // Reset the playing state
              setIsPlaying(false)
            })
        } else {
          // Browser doesn't return a promise, assume success
          setIsPlaying(true)
        }
      } catch (error) {
        console.error("Error playing video:", error)
        setIsPlaying(false)
      }
    }
  }

  const toggleMute = () => {
    const videoElement = videoRefs.current[activeVideo]
    if (!videoElement) return

    try {
      videoElement.muted = !isMuted
      setIsMuted(!isMuted)
    } catch (error) {
      console.error("Error toggling mute:", error)
    }
  }

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handleBookmark = (postId) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post)))
  }

  const lastPostElementRef = (node) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()

    if (node) {
      observer.current.observe(node)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block w-64 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">John Doe</h3>
                      <AdminBadge variant="subtle" />
                    </div>
                    <p className="text-xs text-muted-foreground">Stanford University</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <nav className="grid gap-1">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
                  </Link>
                </nav>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <h3 className="font-medium">Trending Topics</h3>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">#ReactJS</span>
                    <span className="text-xs text-muted-foreground">2.3k posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">#MachineLearning</span>
                    <span className="text-xs text-muted-foreground">1.8k posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">#WebDevelopment</span>
                    <span className="text-xs text-muted-foreground">1.5k posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">#JavaScript</span>
                    <span className="text-xs text-muted-foreground">1.2k posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">#Python</span>
                    <span className="text-xs text-muted-foreground">950 posts</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  Show more
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-2xl mx-auto">
            <Tabs defaultValue="for-you" className="w-full mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="for-you">For You</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Create Post */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input placeholder="Share a resource or ask a question..." className="bg-muted/50" />
                    <div className="flex justify-between mt-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Upload className="h-3 w-3 mr-1" />
                          Photo
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          <Play className="h-3 w-3 mr-1" />
                          Video
                        </Button>
                      </div>
                      <Button size="sm">Post</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post, index) => (
                <Card
                  key={post.id}
                  ref={index === posts.length - 1 ? lastPostElementRef : null}
                  className="overflow-hidden"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} alt={post.author.name} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{post.author.name}</h3>
                            {post.author.isAdmin && <AdminBadge variant="subtle" />}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{post.author.school}</span>
                            <span className="mx-1">•</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Save post</DropdownMenuItem>
                          <DropdownMenuItem>Hide post</DropdownMenuItem>
                          <DropdownMenuItem>Report</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="mb-3">{post.content}</p>

                    {post.media.type === "image" ? (
                      <img
                        src={post.media.url || "/placeholder.svg"}
                        alt="Post content"
                        className="w-full rounded-md"
                      />
                    ) : (
                      <div className="relative">
                        <img
                          src={post.media.thumbnail || "/placeholder.svg"}
                          alt="Video thumbnail"
                          className="w-full rounded-md"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm"
                            onClick={() => handleVideoPlay(post.id)}
                          >
                            {activeVideo === post.id && isPlaying ? (
                              <Pause className="h-6 w-6" />
                            ) : (
                              <Play className="h-6 w-6" />
                            )}
                          </Button>
                        </div>
                        {activeVideo === post.id && (
                          <div className="absolute bottom-2 right-2 flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                              onClick={toggleMute}
                            >
                              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                            </Button>
                          </div>
                        )}
                        <video
                          ref={(el) => (videoRefs.current[post.id] = el)}
                          src={post.media.url}
                          className="hidden"
                          loop
                          muted={isMuted}
                        />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`gap-1 ${post.liked ? "text-red-500" : ""}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <Heart className={`h-4 w-4 ${post.liked ? "fill-current" : ""}`} />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Share2 className="h-4 w-4" />
                      {post.shares}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={post.bookmarked ? "text-primary" : ""}
                      onClick={() => handleBookmark(post.id)}
                    >
                      <Bookmark className={`h-4 w-4 ${post.bookmarked ? "fill-current" : ""}`} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {loading && (
                <div className="flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              )}

              {!hasMore && !loading && posts.length > 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  <p>You've reached the end of your feed</p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    Back to top
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block w-64 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <h3 className="font-medium">People to Follow</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32&text=User${i}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">User {i}</p>
                        <p className="text-xs text-muted-foreground">
                          {["MIT", "Stanford", "Harvard", "Berkeley"][i - 1]}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-xs">
                      Follow
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  Show more
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <h3 className="font-medium">Upcoming Events</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-3">
                  <p className="text-sm font-medium">React Conf 2023</p>
                  <p className="text-xs text-muted-foreground">Oct 15, 2023 • Virtual</p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      Interested
                    </Button>
                    <Button size="sm" className="text-xs h-7">
                      Register
                    </Button>
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <p className="text-sm font-medium">JavaScript Meetup</p>
                  <p className="text-xs text-muted-foreground">Oct 22, 2023 • San Francisco</p>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      Interested
                    </Button>
                    <Button size="sm" className="text-xs h-7">
                      Register
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  View all events
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

