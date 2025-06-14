from flask import Flask, render_template, url_for, request, redirect

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/offers')
def offers():
    return render_template('offers.html')

@app.route('/policies')
def policies():
    return render_template('policies.html')
    
@app.route('/contact')
def contact():
    return render_template('contact.html')

# Add sitemap route for SEO
@app.route('/sitemap.xml')
def sitemap():
    return render_template('sitemap.xml')

# Handle 404 errors with a custom page
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(debug=True)
