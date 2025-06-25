<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# Now give me some text-based data flow diagrams for each example in markdown format

Here are the text-based data flow diagrams for each SSR example in markdown format:

## Level 1: Basic SSR with Static Data

```plaintext
Client Request → Next.js Server → Server Component
                                       ↓
                                 Static Data Array
                                       ↓
                                 Render HTML
                                       ↓
                              Send HTML to Client
                                       ↓
                               Client Displays Page
```


## Level 2: SSR with External API Calls

```plaintext
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
```


## Level 3: SSR with Dynamic Routes and Parallel Data Fetching

```plaintext
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
```


## Level 4: SSR with Authentication and User Context

```plaintext
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
```


## Level 5: Advanced SSR with Streaming, Error Boundaries, and Performance Optimization

```plaintext
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
```


## Level 5 with Error Simulation (Enhanced)

```plaintext
Client Request → Next.js Server → Server Component
                                       ↓
                              Parse Search Params
                                       ↓
                         Start Streaming Response
                                       ↓
                    ┌─────────────────────────────────┐
                    │        Suspense Boundaries      │
                    │     (Independent Streaming)     │
                    └─────────┬───────────────────────┘
                              ↓
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
   MarketStats          TrendingCoins        MarketOverview
   (20% fail)           (25% fail)          (30% fail)
   (0.8s delay)         (1.5s delay)        (2s delay)
        │                     │                     │
        ↓                     ↓                     ↓
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │ Success │          │ Success │          │ Success │
   └─────────┘          └─────────┘          └─────────┘
        │                     │                     │
        ↓                     ↓                     ↓
   Stream HTML          Stream HTML          Stream HTML
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              ↓
                      Client Receives HTML
                              ↓
                    ┌─────────────────────┐
                    │   Error Boundary    │
                    │   Catches Failures  │
                    └─────────┬───────────┘
                              ↓
                    ┌─────────────────────┐
                    │ Failed Components   │
                    │ Show Error UI       │
                    │ With Retry Buttons  │
                    └─────────────────────┘
```

These diagrams illustrate the progressive complexity from simple static rendering to advanced streaming with error handling and parallel data fetching patterns.

<div style="text-align: center">⁂</div>

