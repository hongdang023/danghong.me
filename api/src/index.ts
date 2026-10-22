import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', cors({
  origin: [
    'https://danghong.me',
    'https://www.danghong.me',
    'https://docs.danghong.me',
    'http://localhost:3000',
    'http://localhost:3001'
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 86400,
}))

// Root Endpoint
app.get('/', (c) => {
  return c.json({
    service: 'api.danghong.me',
    status: 'online',
    version: '1.0.0',
    author: 'Đặng Hồng (Learning Architect)',
    timestamp: new Date().toISOString(),
    documentation: 'https://docs.danghong.me',
    endpoints: {
      health: '/health',
      v1_status: '/api/v1/status',
      v1_products: '/api/v1/products',
      v1_contact: '/api/v1/contact (POST)'
    }
  })
})

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    uptime: '100%',
    region: c.req.header('cf-ray') ? 'Cloudflare Edge' : 'Local Dev',
    cfRay: c.req.header('cf-ray') || null
  })
})

// API v1 Router
const v1 = new Hono()

v1.get('/status', (c) => {
  return c.json({
    success: true,
    data: {
      version: 'v1',
      environment: 'production',
      edgeRuntime: 'Cloudflare Workers (workerd)',
      nodeCompatibility: true
    }
  })
})

// Products metadata summary API
v1.get('/products', (c) => {
  return c.json({
    success: true,
    data: [
      {
        slug: 'ai-websites',
        title: 'AI Websites',
        category: 'AI Application',
        status: 'Active',
        description: 'Các website tương tác được xây dựng bằng phương pháp Vibe Coding'
      },
      {
        slug: 'ai-assistants',
        title: 'AI Assistants',
        category: 'Gemini Gems',
        status: 'Active',
        description: 'Trợ lý ảo hỗ trợ học tập và thiết kế chương trình đào tạo'
      },
      {
        slug: 'newsletter',
        title: 'Learning Architect Newsletter',
        category: 'Substack',
        status: 'Active',
        url: 'https://substack.com/@danghong'
      },
      {
        slug: 'hong-list',
        title: "Hồng's List",
        category: 'Curation',
        status: 'Active',
        description: 'Bảng xếp hạng và giám tuyển khóa học theo bộ lọc 4D tiêu chuẩn'
      }
    ]
  })
})

// Lead / Contact submission endpoint
v1.post('/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { name, email, message } = body

    if (!name || !email) {
      return c.json({
        success: false,
        error: 'Tên và email là các trường bắt buộc.'
      }, 400)
    }

    // In a full production implementation, forward to Telegram / Discord / Webhook or DB
    return c.json({
      success: true,
      message: 'Tin nhắn đã được tiếp nhận thành công. Hồng sẽ liên hệ lại sớm nhất!',
      receivedAt: new Date().toISOString()
    }, 201)
  } catch {
    return c.json({
      success: false,
      error: 'Dữ liệu JSON không hợp lệ.'
    }, 400)
  }
})

app.route('/api/v1', v1)

// 404 handler
app.notFound((c) => {
  return c.json({
    success: false,
    error: 'Endpoint không tồn tại trên api.danghong.me',
    docs: 'https://docs.danghong.me'
  }, 404)
})

export default app
