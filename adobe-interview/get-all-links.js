// Interviewer: "You have an API getAllLinks(url) that returns all the links on a webpage. Write a function that returns all descendant links (child URLs, their child URLs, and so on) of a given URL."
/**
 * 
 * Input: Starting URL and getAllLinks(url) API function

Output: Array of all descendant URLs (no duplicates)

Handle: Circular dependencies between pages

Support: Both synchronous and asynchronous API versions

Optimize: Make the async code efficient
 */

/**
 * questions to ask
 * 
 * API Response Format: What does getAllLinks(url) return exactly?

Circular Handling: How deep should we go? Max depth limit?

Error Handling: What if a URL fails to load?

Performance: Any limits on concurrent requests?

URL Validation: Should we filter certain URL types?
 * 
 * 
 */



// src/get-all-links.js
function getAllLinks() {
    const mockGetAllLinks = (url) => {
        const urlMap = {
            'http://example.com': ['http://example.com/about', 'http://example.com/contact'],
            'http://example.com/about': ['http://example.com', 'http://example.com/services'],
            'http://example.com/contact': ['http://example.com'],
            'http://example.com/services': []
        };
        return urlMap[url] || [];
    };

    const asyncGetAllLinks = async (url) => {
        const delay = 100 + Math.random() * 200;
        await new Promise((resolve) => setTimeout(resolve, delay));

        const urlMap = {
            "http://example.com": ["http://example.com/about", "http://example.com/contact"],
            "http://example.com/about": ["http://example.com", "http://example.com/services"],
            "http://example.com/contact": ["http://example.com"],
            "http://example.com/services": [],
        };

        return urlMap[url] || [];
    };

    return {
        dfsRecursive: (startUrl) => {
            const visited = new Set();
            const descendents = new Set();

            function dfsHelper(url) {
                if (visited.has(url)) return;
                visited.add(url);

                try {
                    const links = mockGetAllLinks(url);
                    for (const link of links) {
                        if (!descendents.has(link) && link !== startUrl) {
                            descendents.add(link);
                            dfsHelper(link);
                        }
                    }
                } catch (error) {
                    console.warn(`Failed to get links for ${url}:`, error);
                }
            }

            dfsHelper(startUrl);
            return Array.from(descendents);
        },

        dfsIterative: (startUrl) => {
            const visited = new Set();
            const descendents = new Set();
            const stack = [startUrl]; // ✅ Fixed: was [url]

            while (stack.length > 0) {
                const url = stack.pop();

                if (!visited.has(url)) {
                    visited.add(url);

                    try {
                        const links = mockGetAllLinks(url);
                        for (const link of links) {
                            if (!descendents.has(link) && link !== startUrl) {
                                descendents.add(link);
                                stack.push(link);
                            }
                        }
                    } catch (error) {
                        console.warn(`Failed to get links for ${url}:`, error);
                    }
                }
            }

            return Array.from(descendents);
        },

        bfsQueue: (startUrl) => {
            const visited = new Set();
            const descendents = new Set();
            const queue = [startUrl]; // ✅ Fixed: was [url]

            while (queue.length > 0) {
                const url = queue.shift();

                if (!visited.has(url)) {
                    visited.add(url);

                    try {
                        const links = mockGetAllLinks(url);
                        for (const link of links) {
                            if (!descendents.has(link) && link !== startUrl) {
                                descendents.add(link);
                                queue.push(link);
                            }
                        }
                    } catch (error) {
                        console.warn(`Failed to get links for ${url}:`, error);
                    }
                }
            }

            return Array.from(descendents);
        },

        asyncBatch: async (startUrl, maxConcurrency = 3) => {
            const visited = new Set();
            const descendents = new Set();
            const queue = [startUrl]; // ✅ Fixed: was [url]

            while (queue.length > 0) {
                const batch = queue.splice(0, maxConcurrency);
                const urlsToProcess = batch.filter((url) => !visited.has(url));
                urlsToProcess.forEach((url) => visited.add(url));

                const promises = urlsToProcess.map(async (url) => { // ✅ Fixed: use urlsToProcess
                    try {
                        const links = await asyncGetAllLinks(url);
                        const newLinks = links.filter(
                            (link) =>
                                !descendents.has(link) && // ✅ Fixed: was descendants
                                !visited.has(link) &&
                                link !== startUrl
                        );

                        newLinks.forEach((link) => descendents.add(link)); // ✅ Fixed: was descendants
                        return newLinks;
                    } catch (error) {
                        console.warn(`Failed to get links for ${url}:`, error);
                        return [];
                    }
                });

                const results = await Promise.all(promises);
                const flattened = results.flat(); // ✅ Fixed: was allNewLinks
                queue.push(...flattened);
            }

            return Array.from(descendents);
        },
    };
}

export default getAllLinks;


/**
 * expected behaviour
 * 
 * Input: 'http://example.com'
getAllLinks('http://example.com') → ['http://example.com/about', 'http://example.com/contact']
getAllLinks('http://example.com/about') → ['http://example.com', 'http://example.com/services'] 
getAllLinks('http://example.com/contact') → ['http://example.com']
getAllLinks('http://example.com/services') → []

Output: [
  'http://example.com/about',
  'http://example.com/contact', 
  'http://example.com/services'
]

 */
