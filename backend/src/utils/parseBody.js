export function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
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
      reject(error);
    });
  });
}

