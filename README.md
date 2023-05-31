# Just Memes App

This is a Just Memes App built with React. It allows users to view and post memes to a Firebase Firestore database. Users can also vote on memes by liking or disliking them. The app consists of several components, including:

1. Landing Page: This page displays the memes. The memes are sorted based on their creation date, with the most recent ones appearing first.

2. Top Page: This page displays the memes in a sorted order based on the number of likes they have received. 

3. Regular Page: This page displays memes with a low number of likes, filtered to show memes with 5 or fewer likes

4. Theme Switcher: The app includes a theme switcher feature that allows users to toggle between light and dark themes, providing a personalized visual experience.

5. Post Meme App: This feature enables users to add new memes to the app. It includes URL validation to ensure that only valid URLs are accepted for the memes.

The Just Memes App provides an enjoyable browsing experience for users, allowing them to explore and interact with a collection of memes while also providing options for customization through theme switching. Additionally, users can contribute to the app by posting their own memes, ensuring a dynamic and constantly evolving content pool.

## Prerequisites

Before running the app, make sure you have Node.js and npm (Node Package Manager) installed on your system.

### Getting Started

To get started with the app, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running npm install command.
4. Start the development server by running npm start command.
5. Open your browser and visit http://localhost:3000 to view the app.

### Features
- View a list of memes in a sorted order.
- Vote on memes by liking or disliking them.
- Post new memes by providing the URL and title.
- Real-time updates: The app uses Firebase Firestore to provide real-time updates of memes.
- Theme Switcher

### Technologies Used

The app is built using the following technologies:

- React: A JavaScript library for building user interfaces.
- Sass: CSS preprocessor with enhanced features like variables, nesting, and mixins for more efficient and maintainable styling.
- TypeScript: Typed superset of JavaScript for improved code organization, readability, and tooling support, catching errors and enhancing development experience.
- Firebase Firestore: A NoSQL cloud database provided by Firebase.
- Create React App: A tool for creating React applications with a pre-configured development environment.
- React Spring: A library for animating React components, enabling smooth transitions and visual effects.

### Directory Structure

The project directory has the following structure:

- src: Contains the source code of the app.
    - assets: Contains logo and error image in svg.
    - components: Contains reusable components used in the app.
    - firebase: Contains the Firebase configuration file.
    - interfaces: Contains TypeScript interfaces used in the app.
    - pages: Contains the main pages of the app.

### Deployment

The app has been deployed and is accessible at: https://just-memes-app.netlify.app/

### Credits

This app was created as a project for learning React and Firebase. It was developed by olcolcolc.

### Feedback and Contributions

If you have any feedback or would like to contribute to the project, please feel free to open an issue or submit a pull request on the GitHub repository.
