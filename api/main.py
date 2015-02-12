import webapp2

class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write('Response from the API!!! The routing it\'s working!!!')

app = webapp2.WSGIApplication([
    ('/api', MainHandler)
], debug=True)