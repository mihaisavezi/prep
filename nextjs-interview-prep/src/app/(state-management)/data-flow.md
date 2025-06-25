# Complete Data Flow Diagrams for SSR and React State Management

## SSR Levels

### Level 1: Basic SSR with Static Data

    Client Request → Next.js Server → Server Component
                                           ↓
                                     Static Data Array
                                           ↓
                                     Render HTML
                                           ↓
                                  Send HTML to Client
                                           ↓
                                   Client Displays Page

### Level 2: SSR with External API Calls

    Client Request → Next.js Server → Server Component
                                           ↓
                                    Parse Search Params
                                           ↓
                                  External API Call
                                  (CoinGecko API)
                                           ↓
                                  Cache Response (60s)
                                           ↓
                                  Process API Data
                                           ↓
                                  Render HTML
                                           ↓
                                  Send HTML to Client
                                           ↓
                                  Client Displays Page

### Level 3: SSR with Dynamic Routes and Parallel Data Fetching

    Client Request → Next.js Server → Dynamic Route Handler
                                           ↓
                                    Extract slug from URL
                                           ↓
                               ┌─────────────────────────┐
                               │    Parallel Fetching    │
                               │                         │
                        ┌──────┴──────┐         ┌───────┴────────┐
                        │             │         │                │
                fetchCryptoDetail  fetchNews  fetchPriceHistory
                        │             │         │                │
                    CoinGecko API  News API   CoinGecko API
                        │             │         │                │
                    Cache(5min)   Cache(10min) Cache(1hr)
                        │             │         │                │
                        └──────┬──────┘         └───────┬────────┘
                               │                        │
                               └─────────┬──────────────┘
                                         ↓
                                  Promise.all resolves
                                         ↓
                                  Process all data
                                         ↓
                                  Render HTML
                                         ↓
                                  Send to Client

### Level 4: SSR with Authentication and User Context

    Client Request → Next.js Server → Server Component
                                           ↓
                                  Read HTTP Cookies
                                           ↓
                                  Verify JWT Token
                                           ↓
                            ┌─────────────────────────┐
                            │   Authentication Check  │
                            └─────────┬───────────────┘
                                      ↓
                            ┌─────────────────────────┐
                            │    User Authenticated?  │
                            └─────────┬───────────────┘
                                      ↓
                             No ──────┼────── Yes
                              ↓               ↓
                        redirect('/login')    │
                                             ↓
                                  Fetch User Profile
                                             ↓
                               ┌─────────────────────────┐
                               │   Parallel Data Fetch   │
                               └─────────┬───────────────┘
                                         ↓
                        ┌────────────────────────────────┐
                        │                                │
                fetchUserPortfolio              fetchWatchlist
                        │                                │
                Internal API Call              Internal API Call
                        │                                │
                Cache (30s)                    Cache (60s)
                        │                                │
                        └────────────┬───────────────────┘
                                     ↓
                            Combine User Data
                                     ↓
                             Render Dashboard
                                     ↓
                             Send HTML to Client

### Level 5: Advanced SSR with Streaming, Error Boundaries, and Performance Optimization

    Client Request → Next.js Server → Server Component
                                           ↓
                                  Parse Search Params
                                           ↓
                             Start Streaming Response
                                           ↓
                        ┌─────────────────────────────────┐
                        │        Suspense Boundaries      │
                        │                                 │
                ┌───────┴────────┐              ┌────────┴────────┐
                │                │              │                 │
        MarketOverview      TrendingCoins    MarketStats     NewsSection
        (2s delay)          (1.5s delay)     (0.8s delay)   (3s delay)
                │                │              │                 │
        ┌───────┴────────┐       │              │                 │
        │ Error Boundary │       │              │                 │
        └───────┬────────┘       │              │                 │
                │                │              │                 │
        CoinGecko API     CoinGecko API   Global API      News API
        (10s timeout)     (8s timeout)    (5s timeout)   (15s timeout)
                │                │              │                 │
        Cache (30s)       Cache (5min)    Cache (2min)   Cache (10min)
                │                │              │                 │
                └────────────────┼──────────────┼─────────────────┘
                                 ↓
                        Stream HTML Chunks as Ready
                                 ↓
                        Client Receives Progressive HTML
                                 ↓
                        ┌─────────────────────────────────┐
                        │     Client-Side Hydration      │
                        │                                 │
                        │  - Error boundaries activate    │
                        │  - Interactive buttons work     │
                        │  - Loading states complete      │
                        └─────────────────────────────────┘

## React State Management Levels

### Level 1: Basic useState Hook

    Client Request → Next.js Server → Server Component (RSC)
                                           ↓
                                  Render Static UI
                                           ↓
                                  Client Component (useState)
                                           ↓
                                  User Interaction Updates State
                                           ↓
                                  Re-render Client Component
                                           ↓
                                  UI Updates on Client

### Level 2: Lifting State Up with Props

    Client Request → Next.js Server → Server Component (RSC)
                                           ↓
                                  Render Static UI
                                           ↓
                                  Client Component with Prop Drilling
                                           ↓
                                  State Lifting and Passing Props
                                           ↓
                                  User Interaction Updates State
                                           ↓
                                  Re-render Client Components
                                           ↓
                                  UI Updates on Client

### Level 3: React Context API

    Client Request → Next.js Server → Server Component (RSC)
                                           ↓
                                  Render Static UI
                                           ↓
                                  Client Component with Context Provider
                                           ↓
                                  Deep Child Components Consume Context
                                           ↓
                                  User Interaction Updates Context State
                                           ↓
                                  Re-render Context Consumers
                                           ↓
                                  UI Updates on Client

### Level 4: useReducer + Context Pattern

    Client Request → Next.js Server → Server Component (RSC)
                                           ↓
                                  Render Static UI
                                           ↓
                                  Client Component with useReducer + Context
                                           ↓
                                  Dispatch Actions to Reducer
                                           ↓
                                  Reducer Updates State
                                           ↓
                                  Re-render Context Consumers
                                           ↓
                                  UI Updates on Client

### Level 5: Global State Management with Zustand

    Client Request → Next.js Server → Server Component (RSC)
                                           ↓
                                  Render Static UI
                                           ↓
                                  Client Component with Zustand Store
                                           ↓
                                  Global Store Updates State
                                           ↓
                                  Subscribed Components Re-render
                                           ↓
                                  UI Updates on Client
                                           ↓
                        ┌─────────────────────────────────┐
                        │     Real-time Updates           │
                        │                                 │
                        │  - WebSocket connections        │
                        │  - Periodic API polling         │
                        │  - Cross-component sync         │
                        │  - Persistent state             │
                        └─────────────────────────────────┘
