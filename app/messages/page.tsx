"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Bell,
  MessageSquare,
  Search,
  Upload,
  Users,
  FileText,
  Home,
  Settings,
  LogOut,
  Send,
  Phone,
  Video,
  Info,
  Smile,
  Paperclip,
  Mic,
  Play,
  Pause,
  X,
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

export default function MessagesPage() {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordingProgress, setRecordingProgress] = useState(0)
  const [selectedContact, setSelectedContact] = useState(1)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState(null)

  // Mock data for contacts
  const contacts = [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Hey, do you have time to review my code?",
      time: "10:30 AM",
      unread: 2,
      online: true,
      isTyping: true,
      school: "Stanford University",
    },
    {
      id: 2,
      name: "Sarah Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Thanks for sharing that resource!",
      time: "Yesterday",
      unread: 0,
      online: true,
      isTyping: false,
      school: "MIT",
    },
    {
      id: 3,
      name: "Raj Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I'll check out that tutorial you mentioned",
      time: "Yesterday",
      unread: 0,
      online: false,
      isTyping: false,
      school: "UC Berkeley",
    },
    {
      id: 4,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "Can you help me with this JavaScript problem?",
      time: "Monday",
      unread: 0,
      online: true,
      isTyping: false,
      school: "Harvard University",
    },
  ]

  // Mock data for current chat
  const chatData = {
    1: {
      contact: contacts[0],
      messages: [
        {
          id: 1,
          sender: "them",
          text: "Hey, do you have time to review my code?",
          time: "10:30 AM",
          type: "text",
        },
        {
          id: 2,
          sender: "them",
          text: "I'm having trouble with the authentication flow in my React app.",
          time: "10:31 AM",
          type: "text",
        },
        {
          id: 3,
          sender: "me",
          text: "Sure, I can take a look. Can you share the repository?",
          time: "10:35 AM",
          type: "text",
        },
        {
          id: 4,
          sender: "them",
          text: "Thanks! Here's the link: github.com/alexchen/react-auth-app",
          time: "10:36 AM",
          type: "text",
        },
        {
          id: 5,
          sender: "me",
          text: "Got it. I'll check it out and get back to you in a bit.",
          time: "10:40 AM",
          type: "text",
        },
        {
          id: 6,
          sender: "them",
          text: "Awesome, thank you so much for your help!",
          time: "10:41 AM",
          type: "text",
        },
        {
          id: 7,
          sender: "them",
          duration: "0:45",
          time: "10:45 AM",
          type: "voice",
          url: "#",
        },
      ],
    },
    2: {
      contact: contacts[1],
      messages: [
        {
          id: 1,
          sender: "me",
          text: "Hey Sarah, have you seen the new React course?",
          time: "Yesterday",
          type: "text",
        },
        {
          id: 2,
          sender: "them",
          text: "Yes! I'm halfway through it already. It's really good!",
          time: "Yesterday",
          type: "text",
        },
        {
          id: 3,
          sender: "them",
          text: "Thanks for sharing that resource!",
          time: "Yesterday",
          type: "text",
        },
      ],
    },
    3: {
      contact: contacts[2],
      messages: [
        {
          id: 1,
          sender: "me",
          text: "Hi Raj, I found a great tutorial on algorithms you might like",
          time: "Yesterday",
          type: "text",
        },
        {
          id: 2,
          sender: "them",
          text: "That sounds interesting! Can you send me the link?",
          time: "Yesterday",
          type: "text",
        },
        {
          id: 3,
          sender: "me",
          text: "Sure, here it is: coding-algorithms.com/advanced-sorting",
          time: "Yesterday",
          type: "text",
        },
        {
          id: 4,
          sender: "them",
          text: "I'll check out that tutorial you mentioned",
          time: "Yesterday",
          type: "text",
        },
        {
          id: 5,
          sender: "them",
          duration: "1:23",
          time: "Yesterday",
          type: "voice",
          url: "#",
        },
      ],
    },
    4: {
      contact: contacts[3],
      messages: [
        {
          id: 1,
          sender: "them",
          text: "Hey, I'm stuck on this JavaScript problem. Can you help?",
          time: "Monday",
          type: "text",
        },
        {
          id: 2,
          sender: "me",
          text: "Of course! What's the issue you're facing?",
          time: "Monday",
          type: "text",
        },
        {
          id: 3,
          sender: "them",
          text: "I'm trying to implement a debounce function but it's not working correctly",
          time: "Monday",
          type: "text",
        },
        {
          id: 4,
          sender: "them",
          text: "Can you help me with this JavaScript problem?",
          time: "Monday",
          type: "text",
        },
      ],
    },
  }

  const [currentChat, setCurrentChat] = useState(chatData[1])
  const [messages, setMessages] = useState(chatData[1].messages)

  // Simulate typing animation
  useEffect(() => {
    if (message.length > 0) {
      const typingTimeout = setTimeout(() => {
        setIsTyping(false)
      }, 3000)

      return () => clearTimeout(typingTimeout)
    }
  }, [message])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle recording timer
  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1
          setRecordingProgress(Math.min((newTime / 120) * 100, 100)) // Max 2 minutes
          return newTime
        })
      }, 1000)
    } else {
      setRecordingTime(0)
      setRecordingProgress(0)
    }

    return () => clearInterval(interval)
  }, [isRecording])

  // Format recording time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "me",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }

      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate response with typing indicator
      setIsTyping(true)
      setTimeout(() => {
        const responseMessage = {
          id: messages.length + 2,
          sender: "them",
          text: "Thanks for your message! I'll get back to you soon.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "text",
        }
        setMessages((prev) => [...prev, responseMessage])
        setIsTyping(false)
      }, 3000)
    }
  }

  const handleStartRecording = () => {
    setIsRecording(true)
  }

  const handleStopRecording = () => {
    if (recordingTime > 1) {
      // Only add if recording is longer than 1 second
      const newVoiceMessage = {
        id: messages.length + 1,
        sender: "me",
        duration: formatTime(recordingTime),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "voice",
        url: "#",
      }

      setMessages([...messages, newVoiceMessage])
    }
    setIsRecording(false)
  }

  const handleCancelRecording = () => {
    setIsRecording(false)
  }

  const handleContactSelect = (id) => {
    setSelectedContact(id)
    setCurrentChat(chatData[id])
    setMessages(chatData[id].messages)
    setIsTyping(contacts.find((c) => c.id === id).isTyping)
  }

  const togglePlayAudio = (messageId) => {
    if (currentAudio === messageId) {
      if (isPlaying) {
        try {
          audioRef.current?.pause()
          setIsPlaying(false)
        } catch (error) {
          console.error("Error pausing audio:", error)
        }
      } else {
        try {
          const playPromise = audioRef.current?.play()
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true)
              })
              .catch((error) => {
                console.error("Error playing audio:", error)
                setIsPlaying(false)
              })
          } else {
            setIsPlaying(true)
          }
        } catch (error) {
          console.error("Error playing audio:", error)
        }
      }
    } else {
      if (audioRef.current) {
        try {
          audioRef.current.pause()
        } catch (error) {
          console.error("Error pausing previous audio:", error)
        }
      }
      setCurrentAudio(messageId)
      setIsPlaying(true)
      // In a real app, you would set the audio source here
      setTimeout(() => {
        try {
          const playPromise = audioRef.current?.play()
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.error("Error playing new audio:", error)
              setIsPlaying(false)
            })
          }
        } catch (error) {
          console.error("Error playing new audio:", error)
          setIsPlaying(false)
        }
      }, 100)
    }
  }

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
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-accent text-accent-foreground"
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
                <h1 className="text-lg font-medium">Messages</h1>
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

          {/* Messages Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Contacts List */}
            <div className="w-80 border-r border-border overflow-auto">
              <div className="p-4">
                <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search messages..." className="pl-8 bg-background" />
                </div>

                <div className="space-y-2">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                        contact.id === selectedContact ? "bg-accent" : "hover:bg-accent/50"
                      }`}
                      onClick={() => handleContactSelect(contact.id)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                          <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="font-medium truncate">{contact.name}</span>
                          <span className="text-xs text-muted-foreground">{contact.time}</span>
                        </div>
                        <div className="flex items-center">
                          {contact.isTyping ? (
                            <div className="flex items-center">
                              <span className="text-xs text-primary mr-1">typing</span>
                              <span className="typing-animation">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                              </span>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{contact.school}</p>
                      </div>
                      {contact.unread > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={currentChat.contact.avatar} alt={currentChat.contact.name} />
                      <AvatarFallback>{currentChat.contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {currentChat.contact.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </div>
                  <div>
                    <h2 className="font-medium">{currentChat.contact.name}</h2>
                    <div className="flex items-center">
                      <p className="text-xs text-muted-foreground">
                        {currentChat.contact.online ? "Online" : "Offline"} • {currentChat.contact.school}
                      </p>
                      {isTyping && (
                        <div className="flex items-center ml-2">
                          <span className="text-xs text-primary mr-1">typing</span>
                          <span className="typing-animation">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                    {msg.sender === "them" && (
                      <Avatar className="mr-2 h-8 w-8">
                        <AvatarImage src={currentChat.contact.avatar} alt={currentChat.contact.name} />
                        <AvatarFallback>{currentChat.contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      {msg.type === "text" ? (
                        <div
                          className={`rounded-lg px-4 py-2 max-w-md ${
                            msg.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p>{msg.text}</p>
                        </div>
                      ) : (
                        <div
                          className={`rounded-lg px-4 py-3 max-w-md flex items-center gap-3 ${
                            msg.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <button
                            onClick={() => togglePlayAudio(msg.id)}
                            className="h-8 w-8 rounded-full bg-background/20 flex items-center justify-center"
                          >
                            {currentAudio === msg.id && isPlaying ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </button>
                          <div className="flex-1">
                            <div className="voice-wave">
                              {Array.from({ length: 30 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`voice-bar ${currentAudio === msg.id && isPlaying ? "animate-voice-wave" : ""}`}
                                  style={{
                                    height: `${Math.random() * 15 + 5}px`,
                                    animationDelay: `${i * 0.05}s`,
                                  }}
                                ></div>
                              ))}
                            </div>
                            <span className="text-xs">{msg.duration}</span>
                          </div>
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
                {isTyping && selectedContact === currentChat.contact.id && (
                  <div className="flex justify-start">
                    <Avatar className="mr-2 h-8 w-8">
                      <AvatarImage src={currentChat.contact.avatar} alt={currentChat.contact.name} />
                      <AvatarFallback>{currentChat.contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-3 bg-muted">
                      <div className="typing-animation">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                {isRecording ? (
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-muted rounded-full p-2">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-destructive flex items-center justify-center animate-pulse">
                          <Mic className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">Recording... {formatTime(recordingTime)}</span>
                            <span className="text-xs text-muted-foreground">Max 2 min</span>
                          </div>
                          <Progress value={recordingProgress} className="h-1" />
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleCancelRecording}>
                          <X className="h-4 w-4" />
                        </Button>
                        <Button size="icon" onClick={handleStopRecording}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Button variant="ghost" size="icon" type="button">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="ghost" size="icon" type="button">
                      <Smile className="h-4 w-4" />
                    </Button>
                    {message.trim() ? (
                      <Button type="submit" size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button type="button" size="icon" onClick={handleStartRecording}>
                        <Mic className="h-4 w-4" />
                      </Button>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden audio element for voice messages */}
      <audio ref={audioRef} className="hidden" />

      <style jsx global>{`
        .typing-animation {
          display: flex;
          align-items: center;
          column-gap: 3px;
        }
        
        .typing-animation .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: currentColor;
          animation: typing 1.5s infinite ease-in-out;
        }
        
        .typing-animation .dot:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-animation .dot:nth-child(2) {
          animation-delay: 0.3s;
        }
        
        .typing-animation .dot:nth-child(3) {
          animation-delay: 0.6s;
        }
        
        @keyframes typing {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.5;
          }
        }
        
        .voice-wave {
          display: flex;
          align-items: center;
          gap: 1px;
          height: 20px;
          margin-bottom: 2px;
        }
        
        .voice-bar {
          width: 2px;
          background-color: currentColor;
          border-radius: 2px;
          opacity: 0.7;
        }
        
        .animate-voice-wave {
          animation: voice-wave 1s infinite ease-in-out;
        }
        
        @keyframes voice-wave {
          0%, 100% {
            height: 5px;
          }
          50% {
            height: 15px;
          }
        }
      `}</style>
    </div>
  )
}

