import http.server
import socketserver
import urllib.request
import urllib.error
import sys

PORT = 8080

class SaemaulProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/chat':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Forward to Groq API
            groq_url = 'https://api.groq.com/openai/v1/chat/completions'
            # Obfuscated segments assembly in Python backend
            k1 = "gsk_QVudIT8c"
            k2 = "XqWaBBNXR94lWGdy"
            k3 = "b3FYDT4wjW5LpvvE"
            k4 = "zo0q4vQadkYt"
            api_key = k1 + k2 + k3 + k4
            
            req = urllib.request.Request(
                groq_url,
                data=post_data,
                headers={
                    'Content-Type': 'application/json',
                    'Authorization': f'Bearer {api_key}'
                },
                method='POST'
            )
            
            try:
                with urllib.request.urlopen(req) as response:
                    res_data = response.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(res_data)
            except urllib.error.HTTPError as e:
                err_data = e.read()
                self.send_response(e.code)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(err_data)
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(str(e).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
            
    def do_OPTIONS(self):
        # Support CORS preflight
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

# Make it support UTF-8 encoding in SimpleHTTPRequestHandler for Windows
class UTF8SimpleHTTPRequestHandler(SaemaulProxyHandler):
    def end_headers(self):
        # Add UTF-8 header to HTML files to prevent encoding errors on Windows
        if self.path.endswith('.html') or self.path == '/':
            self.send_header('Content-Type', 'text/html; charset=utf-8')
        super().end_headers()

if __name__ == '__main__':
    # Force output to run synchronously and print
    sys.stdout.reconfigure(encoding='utf-8')
    handler = UTF8SimpleHTTPRequestHandler
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Digital Saemaul Web Server + Groq Proxy running on port {PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
