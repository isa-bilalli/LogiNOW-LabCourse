export function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    let timeout;
    
    // Set a timeout to prevent hanging
    timeout = setTimeout(() => {
      req.removeAllListeners('data');
      req.removeAllListeners('end');
      req.removeAllListeners('error');
      reject(new Error('Request body parsing timeout'));
    }, 5000); // 5 second timeout
    
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      clearTimeout(timeout);
      try {
        if (!body) {
          resolve({});
          return;
        }
        
        const contentType = req.headers['content-type'] || '';
        
        if (contentType.includes('application/json')) {
          resolve(JSON.parse(body));
        } else {
          // Fallback to URL-encoded or plain text
          resolve(body);
        }
      } catch (error) {
        reject(error);
      }
    });
    
    req.on('error', (error) => {
      clearTimeout(timeout);
      reject(error);
    });
  });
}

