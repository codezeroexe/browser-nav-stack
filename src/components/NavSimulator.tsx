'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export default function NavSimulator() {
  const [currentPage, setCurrentPage] = useState<string | null>(null)
  const [backStack, setBackStack] = useState<string[]>([])
  const [forwardStack, setForwardStack] = useState<string[]>([])
  const [inputUrl, setInputUrl] = useState('')
  const [error, setError] = useState('')

  // URL validation
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  // VISIT operation
  const visit = useCallback((url: string) => {
    if (!url.trim()) {
      setError('URL cannot be empty')
      return
    }

    let finalUrl = url.trim()
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl
    }

    if (!isValidUrl(finalUrl)) {
      setError('Invalid URL format')
      return
    }

    setError('')

    // Push current page to back stack if exists
    if (currentPage) {
      setBackStack(prev => [...prev, currentPage])
    }

    setCurrentPage(finalUrl)
    setForwardStack([]) // Clear forward stack on new visit
  }, [currentPage])

  // BACK operation
  const goBack = useCallback(() => {
    if (backStack.length === 0) return

    // Pop from back stack
    const newBackStack = [...backStack]
    const previousPage = newBackStack.pop()!

    // Push current to forward stack
    if (currentPage) {
      setForwardStack(prev => [...prev, currentPage])
    }

    setBackStack(newBackStack)
    setCurrentPage(previousPage)
  }, [backStack, currentPage])

  // FORWARD operation
  const goForward = useCallback(() => {
    if (forwardStack.length === 0) return

    // Pop from forward stack
    const newForwardStack = [...forwardStack]
    const nextPage = newForwardStack.pop()!

    // Push current to back stack
    if (currentPage) {
      setBackStack(prev => [...prev, currentPage])
    }

    setForwardStack(newForwardStack)
    setCurrentPage(nextPage)
  }, [forwardStack, currentPage])

  // CLEAR history
  const clearHistory = useCallback(() => {
    setBackStack([])
    setForwardStack([])
    setCurrentPage(null)
    setInputUrl('')
    setError('')
  }, [])

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      visit(inputUrl)
      setInputUrl('')
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Browser Navigation System
            </CardTitle>
            <p className="text-center text-muted-foreground">
              Stack Data Structure Simulation
            </p>
          </CardHeader>
        </Card>

        {/* URL Input */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Input
                placeholder="Enter URL (e.g., https://www.google.com)"
                value={inputUrl}
                onChange={(e) => {
                  setInputUrl(e.target.value)
                  setError('')
                }}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button onClick={() => {
                visit(inputUrl)
                setInputUrl('')
              }}>
                VISIT
              </Button>
            </div>
            {error && (
              <p className="text-sm text-red-500 mt-2">{error}</p>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            onClick={goBack}
            disabled={backStack.length === 0}
          >
            ← BACK
          </Button>
          <Button
            variant="outline"
            onClick={goForward}
            disabled={forwardStack.length === 0}
          >
            FORWARD →
          </Button>
          <Button
            variant="destructive"
            onClick={clearHistory}
          >
            CLEAR
          </Button>
        </div>

        {/* Current Page Display */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Page</CardTitle>
          </CardHeader>
          <CardContent>
            {currentPage ? (
              <Badge variant="default" className="text-base px-4 py-2">
                {currentPage}
              </Badge>
            ) : (
              <p className="text-muted-foreground">No page loaded</p>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          {/* Back Stack Display */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Back Stack
                <Badge variant="secondary" className="ml-2">
                  {backStack.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                {backStack.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Empty</p>
                ) : (
                  <div className="space-y-2">
                    {[...backStack].reverse().map((url, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {backStack.length - idx}
                        </Badge>
                        <span className="text-sm truncate">{url}</span>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Forward Stack Display */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Forward Stack
                <Badge variant="secondary" className="ml-2">
                  {forwardStack.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                {forwardStack.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Empty</p>
                ) : (
                  <div className="space-y-2">
                    {[...forwardStack].reverse().map((url, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {forwardStack.length - idx}
                        </Badge>
                        <span className="text-sm truncate">{url}</span>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Stack Visualization (LIFO) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stack Operations (LIFO)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold mb-2">Back Stack (Top → Bottom):</p>
                <Separator className="mb-2" />
                {backStack.length === 0 ? (
                  <p className="text-muted-foreground">[Empty]</p>
                ) : (
                  <code className="text-xs">
                    [{backStack[backStack.length - 1] || 'top'}, ..., {backStack[0] || 'bottom'}]
                  </code>
                )}
              </div>
              <div>
                <p className="font-semibold mb-2">Forward Stack (Top → Bottom):</p>
                <Separator className="mb-2" />
                {forwardStack.length === 0 ? (
                  <p className="text-muted-foreground">[Empty]</p>
                ) : (
                  <code className="text-xs">
                    [{forwardStack[forwardStack.length - 1] || 'top'}, ..., {forwardStack[0] || 'bottom'}]
                  </code>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
