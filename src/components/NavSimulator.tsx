'use client'

import { useState, useCallback, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Sun, Moon } from 'lucide-react'
import { useAccentColor, type AccentName } from '@/hooks/useAccentColor'

export default function NavSimulator() {
  const [currentPage, setCurrentPage] = useState<string | null>(null)
  const [backStack, setBackStack] = useState<string[]>([])
  const [forwardStack, setForwardStack] = useState<string[]>([])
  const [inputUrl, setInputUrl] = useState('')
  const [error, setError] = useState('')
  const [visitCount, setVisitCount] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('navsim-history')
      if (saved) {
        const { currentPage: cp, backStack: bs, forwardStack: fs, visitCount: vc } = JSON.parse(saved)
        if (cp) setCurrentPage(cp)
        if (bs) setBackStack(bs)
        if (fs) setForwardStack(fs)
        if (vc) setVisitCount(vc)
      }
    } catch {}
    setMounted(true)
  }, [])

  // Save to localStorage on state change (after mount)
  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem('navsim-history', JSON.stringify({ currentPage, backStack, forwardStack, visitCount }))
    } catch {}
  }, [currentPage, backStack, forwardStack, visitCount, mounted])

  // Update dynamic page title
  useEffect(() => {
    if (currentPage) {
      try {
        const domain = new URL(currentPage).hostname.replace('www.', '')
        document.title = `${domain} — Browser Nav System`
      } catch {
        document.title = 'Browser Navigation System'
      }
    } else {
      document.title = 'Browser Navigation System'
    }
  }, [currentPage])

  // Alt+Left/Right for Back/Forward
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'ArrowLeft') { e.preventDefault(); goBack(); }
      if (e.altKey && e.key === 'ArrowRight') { e.preventDefault(); goForward(); }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [backStack, forwardStack, currentPage])

  const isValidUrl = (url: string): boolean => {
    try { new URL(url); return true } catch { return false }
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
    if (currentPage) {
      setBackStack(prev => [...prev, currentPage])
    }
    setCurrentPage(finalUrl)
    setForwardStack([])
    setVisitCount(prev => prev + 1)
  }, [currentPage])

  // BACK operation
  const goBack = useCallback(() => {
    if (backStack.length === 0) return
    const newBackStack = [...backStack]
    const previousPage = newBackStack.pop()!
    if (currentPage) {
      setForwardStack(prev => [...prev, currentPage])
    }
    setBackStack(newBackStack)
    setCurrentPage(previousPage)
  }, [backStack, currentPage])

  // FORWARD operation
  const goForward = useCallback(() => {
    if (forwardStack.length === 0) return
    const newForwardStack = [...forwardStack]
    const nextPage = newForwardStack.pop()!
    if (currentPage) {
      setBackStack(prev => [...prev, currentPage])
    }
    setForwardStack(newForwardStack)
    setCurrentPage(nextPage)
  }, [forwardStack, currentPage])

  // CLEAR history
  const clearHistory = useCallback(() => {
    if (!confirm('Clear all history and current page? This cannot be undone.')) return
    setBackStack([])
    setForwardStack([])
    setCurrentPage(null)
    setInputUrl('')
    setError('')
    setVisitCount(0)
  }, [])

  // Jump to item in back stack (pops items above it)
  const jumpTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= backStack.length) return
    const newBack = backStack.slice(0, idx)
    const target = backStack[idx]
    const popped = backStack.slice(idx + 1).reverse()
    const itemsToForward: string[] = []
    for (let i = 0; i < popped.length; i++) itemsToForward.push(popped[i])
    if (currentPage) itemsToForward.push(currentPage)
    setForwardStack(prev => [...itemsToForward, ...prev])
    setBackStack(newBack)
    setCurrentPage(target)
  }, [backStack, currentPage])

  // Favicon helper
  const getFavicon = (url: string): string => {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=16`
    } catch { return '' }
  }

  // Handle Enter key in input
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      visit(inputUrl)
      setInputUrl('')
    }
  }

  const { theme, setTheme } = useTheme()
  const { accent, setAccent, mounted: accentMounted, accentList } = useAccentColor()

  // Color swatch component
  const ColorSwatch = ({ name, label }: { name: AccentName, label: string }) => (
    <button
      key={name}
      title={label}
      aria-label={`Set accent to ${label}`}
      onClick={() => setAccent(name)}
      className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
        accent === name ? 'ring-2 ring-offset-2 ring-foreground scale-110' : ''
      }`}
      style={{ backgroundColor: getAccentColor(name), borderColor: getAccentBorder(name) }}
    />
  )

  // Helper to get CSS color for swatch
  const getAccentColor = (name: AccentName): string => {
    const map: Record<AccentName, string> = {
      'amber-gold': 'oklch(0.769 0.188 70.08)',
      'teal-cyan': 'oklch(0.704 0.14 182.503)',
      'violet-purple': 'oklch(0.645 0.246 280)',
      'rose-pink': 'oklch(0.712 0.17 350)',
      'emerald-green': 'oklch(0.696 0.17 162.48)',
      'coral-orange': 'oklch(0.705 0.213 47.604)',
    }
    return map[name] || 'oklch(0.205 0 0)'
  }

  const getAccentBorder = (name: AccentName): string => {
    const map: Record<AccentName, string> = {
      'amber-gold': 'oklch(0.55 0.22 55)',
      'teal-cyan': 'oklch(0.45 0.18 180)',
      'violet-purple': 'oklch(0.40 0.28 275)',
      'rose-pink': 'oklch(0.48 0.20 345)',
      'emerald-green': 'oklch(0.42 0.20 155)',
      'coral-orange': 'oklch(0.50 0.24 40)',
    }
    return map[name] || 'oklch(0.922 0 0)'
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-center">
                  Browser Navigation System
                </CardTitle>
                <div className="flex items-center justify-center gap-4 mt-1">
                  <p className="text-center text-muted-foreground">
                    Stack Data Structure Simulation
                  </p>
                  {visitCount > 0 && (
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      Visited: {visitCount} 🔥
                    </span>
                  )}
                </div>
                <p className="text-center text-sm text-muted-foreground mt-1">
                  Simulates browser back/forward navigation using two stacks (LIFO — Last In, First Out)
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* Color Picker Popover */}
              <Popover>
                <PopoverTrigger>
                  <Button variant="ghost" size="icon" aria-label="Choose accent color">
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: accent ? getAccentColor(accent) : 'var(--primary)' }}
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3" align="end">
                  <div className="text-xs text-muted-foreground mb-2">Personal Color</div>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {accentList.map(name => (
                      <ColorSwatch key={name} name={name} label={name.replace('-', ' ')} />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setAccent(null)}
                  >
                    Reset
                  </Button>
              </PopoverContent>
              </Popover>

            </div>
          </CardHeader>
        </Card>

        {/* URL Input - full width */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Input
                placeholder="Enter URL (e.g., https://www.google.com)"
                value={inputUrl}
                onChange={(e) => { setInputUrl(e.target.value); setError('') }}
                onKeyDown={handleInputKeyDown}
                className="flex-1"
              />
              <Button onClick={() => { visit(inputUrl); setInputUrl('') }}>
                Visit
              </Button>
            </div>
            {error && (
              <p className="text-sm text-destructive mt-2">{error}</p>
            )}
          </CardContent>
        </Card>

        {/* Stack Operations (LIFO) - directly below URL */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stack Operations (LIFO)</CardTitle>
            <p className="text-xs text-muted-foreground mb-2">
              LIFO: Last In, First Out. Top = most recent page. Bottom = oldest.
            </p>
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

        {/* Navigation Buttons */}
        <div className="flex gap-2 justify-center">
          <Button variant="outline" onClick={goBack} disabled={backStack.length === 0}>
            ← Back
          </Button>
          <Button variant="outline" onClick={goForward} disabled={forwardStack.length === 0}>
            Forward →
          </Button>
          <Button variant="destructive" onClick={clearHistory}>
            Clear
          </Button>
        </div>

        {/* Current Page Display */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Page</CardTitle>
            <p className="text-xs text-muted-foreground mb-2">
              Currently displayed page. Visit a URL or use Back/Forward to change.
            </p>
          </CardHeader>
          <CardContent>
            {currentPage ? (
              <div className="flex items-center gap-2">
                <img
                  src={getFavicon(currentPage)}
                  alt=""
                  className="w-4 h-4"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <Badge variant="default" className="text-lg px-6 py-3 font-semibold">
                  {currentPage}
                </Badge>
              </div>
            ) : (
              <p className="text-muted-foreground">No page loaded</p>
            )}
          </CardContent>
        </Card>

        {/* Stack Depth Meter */}
        {backStack.length > 0 && (
          <div className="w-full max-w-xs mx-auto">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Stack Depth</span>
              <span>{backStack.length}</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  backStack.length <= 5 ? 'bg-green-500' :
                  backStack.length <= 15 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min((backStack.length / 20) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Bottom: Back Stack + Forward Stack side by side */}
        <div className="grid grid-cols-2 gap-6">

          {/* Back Stack Display */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Back Stack
                <Badge variant="secondary" className="ml-2">{backStack.length}</Badge>
              </CardTitle>
              <p className="text-xs text-muted-foreground mb-2">
                Pages you can navigate back to. Last visited is on top (index 1). Click an item to jump.
              </p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                {backStack.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Empty</p>
                ) : (
                  <div className="space-y-2">
                    {[...backStack].reverse().map((url, idx) => {
                      const realIdx = backStack.length - 1 - idx
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 rounded px-1 py-1"
                          onClick={() => jumpTo(realIdx)}
                        >
                          <Badge variant="outline" className="text-xs">{backStack.length - idx}</Badge>
                          <img
                            src={getFavicon(url)}
                            alt=""
                            className="w-3 h-3"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                          />
                          <span className="text-sm truncate">{url}</span>
                        </div>
                      )
                    })}
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
                <Badge variant="secondary" className="ml-2">{forwardStack.length}</Badge>
              </CardTitle>
              <p className="text-xs text-muted-foreground mb-2">
                Pages you navigated away from. Available via Forward button.
              </p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                {forwardStack.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Empty</p>
                ) : (
                  <div className="space-y-2">
                    {[...forwardStack].reverse().map((url, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{forwardStack.length - idx}</Badge>
                        <img
                          src={getFavicon(url)}
                          alt=""
                          className="w-3 h-3"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                        <span className="text-sm truncate">{url}</span>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  )
}
