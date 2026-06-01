'use client'

import { useEffect, useRef } from 'react'

export function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    
    // Circuit nodes
    interface Node {
      x: number
      y: number
      connections: number[]
      pulseProgress: number
      pulseActive: boolean
      pulseDirection: number
    }
    
    const nodes: Node[] = []
    const nodeCount = 30
    
    // Create grid-like nodes with some randomness
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
        pulseProgress: 0,
        pulseActive: Math.random() > 0.7,
        pulseDirection: Math.random() > 0.5 ? 1 : -1,
      })
    }
    
    // Connect nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200 && nodes[i].connections.length < 3) {
          nodes[i].connections.push(j)
        }
      }
    }
    
    let animationId: number
    
    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 8, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach(j => {
          const target = nodes[j]
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(target.x, target.y)
          ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)'
          ctx.lineWidth = 1
          ctx.stroke()
          
          // Draw pulse along connection
          if (node.pulseActive) {
            const progress = node.pulseProgress
            const px = node.x + (target.x - node.x) * progress
            const py = node.y + (target.y - node.y) * progress
            
            ctx.beginPath()
            ctx.arc(px, py, 3, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(0, 240, 255, ${0.8 - progress * 0.6})`
            ctx.fill()
            
            // Glow
            ctx.beginPath()
            ctx.arc(px, py, 8, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(0, 240, 255, ${0.2 - progress * 0.15})`
            ctx.fill()
          }
        })
      })
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 240, 255, 0.3)'
        ctx.fill()
        
        // Glow effect on active nodes
        if (node.pulseActive) {
          ctx.beginPath()
          ctx.arc(node.x, node.y, 8, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(0, 240, 255, 0.15)'
          ctx.fill()
        }
        
        // Update pulse
        if (node.pulseActive) {
          node.pulseProgress += 0.008
          if (node.pulseProgress > 1) {
            node.pulseProgress = 0
            node.pulseActive = Math.random() > 0.5
          }
        } else if (Math.random() > 0.998) {
          node.pulseActive = true
        }
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}
