# Personal Portfolio Website

A modern, responsive personal portfolio website built with vanilla JavaScript using a component-based architecture. The website features a smooth, single-page application experience with client-side routing and state management.

## 🚀 Features

- **Modern Component Architecture**: Built using Web Components for modular, reusable UI elements
- **Client-Side Routing**: Smooth navigation without page reloads
- **State Management**: Centralized state management system
- **Responsive Design**: Mobile-first approach ensuring compatibility across all devices
- **Smooth Transitions**: Animated page transitions and loading states
- **Performance Optimized**: Minimal dependencies and efficient resource loading

## 🏗️ Project Structure

```
├── index.html              # Main HTML entry point
├── src/                    # Source code directory
│   ├── app.js             # Application entry point
│   ├── Router.js          # Client-side routing implementation
│   ├── Store.js           # State management system
│   ├── Component.js       # Base component class
│   ├── components/        # UI components
│   │   ├── HomeComponent.js
│   │   ├── AboutComponent.js
│   │   ├── PortfolioComponent.js
│   │   ├── ContactComponent.js
│   │   ├── NavbarComponent.js
│   │   └── home/
│   │       └── HeroSection.js
│   └── utils/             # Utility functions and helpers
├── uploads/               # Static assets and uploads
└── fonts/                 # Custom font files
```

## 🛠️ Technical Implementation

### Component System

The website uses native Web Components for creating reusable UI elements. Each component extends the base `Component` class and is registered as a custom element, allowing for:

- Encapsulated styling and behavior
- Lifecycle management
- Event handling
- Template-based rendering

### Routing

Client-side routing is implemented through the `Router` class, providing:

- URL-based navigation
- History API integration
- Smooth page transitions
- Automatic scroll restoration

### State Management

The application uses a centralized state management system through the `Store` class:

- Observable state changes
- Component subscription system
- Predictable state updates
- Debug-friendly state tracking

## 🚦 Getting Started

1. Clone the repository
2. No build process required - this is a vanilla JavaScript application
3. Serve the files using any static file server
4. Open `index.html` in your browser

## 💻 Development

To start development:

1. Use a local development server (e.g., Live Server for VS Code)
2. Make changes to components in the `src/components` directory
3. Components will hot-reload in the browser

## 🎨 Customization

The website can be customized by:

- Modifying component templates in respective component files
- Updating styles in component-specific style blocks
- Adding new routes in `app.js`
- Creating new components by extending the base `Component` class

## 🔧 Technical Requirements

- Modern web browser with Web Components support
- JavaScript enabled
- No additional runtime dependencies required

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS/Android latest)

## 🔍 Performance Considerations

The application is optimized for performance through:

- Lazy loading of components
- Minimal external dependencies
- Efficient DOM updates
- Smooth animations using requestAnimationFrame
- Preloader for initial page load

## 📝 License

MIT License - feel free to use this code for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
