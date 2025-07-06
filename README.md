# Avesh raj singh - Portfolio Website

A modern, responsive portfolio website built with HTML5, Tailwind CSS, and JavaScript. Showcasing backend development expertise with a focus on Node.js, MongoDB, and scalable system architecture.

## 🚀 Features

- **Modern Design**: Clean, dark-themed interface with gradient accents
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Interactive Elements**: 
  - Typing effect on tagline
  - Smooth scrolling navigation
  - Scroll progress indicator
  - Hover animations and transitions
  - Particle effects in hero section
- **Performance Optimized**: 
  - Lazy loading images
  - Debounced scroll events
  - Semantic HTML5 structure
  - SEO-friendly meta tags
- **Accessibility**: Screen reader friendly with proper ARIA labels
- **GitHub Pages Ready**: Optimized for static site deployment

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)
- **Animations**: ScrollReveal, Custom CSS animations
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── rishuProfile.jpg    # Profile image
├── resume.pdf          # Resume file (add your resume here)
└── README.md          # Project documentation
```

## 🚀 Deployment Instructions

### Option 1: GitHub Pages (Recommended)

1. **Create a new repository** on GitHub named `portfolio` or `your-username.github.io`

2. **Upload your files** to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/your-username/portfolio.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Your site will be live at**: `https://your-username.github.io/portfolio/`

### Option 2: GitHub Pages with gh-pages Branch

1. **Install gh-pages** (if you want to use a separate branch):
   ```bash
   npm install -g gh-pages
   ```

2. **Create and switch to gh-pages branch**:
   ```bash
   git checkout -b gh-pages
   git push origin gh-pages
   ```

3. **Set GitHub Pages to use gh-pages branch** in repository settings

### Option 3: Using docs/ Folder

1. **Create a docs folder** and move all files there:
   ```bash
   mkdir docs
   mv index.html script.js rishuProfile.jpg resume.pdf docs/
   ```

2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Move files to docs folder"
   git push origin main
   ```

3. **Set GitHub Pages source** to "Deploy from a branch" → "main" → "/docs"

## 🎨 Customization

### Personal Information
Edit the following sections in `index.html`:
- Name and tagline in the hero section
- About me description
- Skills and technologies
- Project details and links
- Contact information

### Styling
- Colors: Modify the Tailwind classes or add custom CSS
- Fonts: Change Google Fonts import in the `<head>` section
- Animations: Adjust ScrollReveal settings in `script.js`

### Content
- Replace `rishuProfile.jpg` with your profile image
- Add your `resume.pdf` file to the root directory
- Update project links and descriptions

## 📱 Mobile Responsiveness

The site is fully responsive with:
- Mobile-first design approach
- Collapsible navigation menu
- Optimized touch targets
- Readable typography on all screen sizes

## ⚡ Performance Features

- **Lazy Loading**: Images load only when visible
- **Debounced Events**: Optimized scroll event handling
- **Compressed Assets**: Minified external libraries
- **Semantic HTML**: Better SEO and accessibility

## 🎯 SEO Optimization

- Meta descriptions and keywords
- Open Graph tags for social media
- Structured data markup
- Semantic HTML5 elements
- Alt text for images

## 🔧 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Open in browser**:
   - Simply open `index.html` in your browser
   - Or use a local server like Live Server in VS Code

3. **Make changes** and refresh to see updates

## 📊 Lighthouse Scores

The site is optimized for:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95+

## 🐛 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## 📞 Contact

- **Email**: aveshrajsingh3@gmail.com
- **GitHub**: [@AveshRajSingh](https://github.com/AveshRajSingh)
- **LinkedIn**: [avesh-web-dev](https://www.linkedin.com/in/avesh-web-dev/)

---

⭐ If you like this portfolio template, please give it a star on GitHub!

**Happy coding!** 🚀
