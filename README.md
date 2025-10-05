# ProElevate Clone

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environment Setup

Before running the application, you need to set up your environment variables:

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and fill in your API configuration:
   ```env
   REACT_APP_API_BASE_URL=your_api_base_url_here
   REACT_APP_API_TIMEOUT=10000
   REACT_APP_YOUTUBE_API_BASE_URL=https://www.youtube.com
   REACT_APP_YOUTUBE_THUMBNAIL_BASE_URL=https://img.youtube.com/vi
   REACT_APP_DEFAULT_THUMBNAIL_QUALITY=hqdefault
   REACT_APP_ENABLE_API_CACHE_BUSTING=true
   ```

### Required Environment Variables

- `REACT_APP_API_BASE_URL`: Your API base URL (required)
- `REACT_APP_API_TIMEOUT`: API request timeout in milliseconds (default: 10000)
- `REACT_APP_ENABLE_API_CACHE_BUSTING`: Enable cache busting for API requests (default: true)

### Optional Environment Variables

- `REACT_APP_YOUTUBE_API_BASE_URL`: YouTube API base URL (default: https://www.youtube.com)
- `REACT_APP_YOUTUBE_THUMBNAIL_BASE_URL`: YouTube thumbnail base URL (default: https://img.youtube.com/vi)
- `REACT_APP_DEFAULT_THUMBNAIL_QUALITY`: Default thumbnail quality (default: hqdefault)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
