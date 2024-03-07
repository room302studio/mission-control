# Mission Control

Welcome to **Mission Control** – your cyberpunk-themed dashboard for visualizing Netlify deploys, GitHub activity, and project milestones in the style of an '80s digital dreamscape. Dive into the neon-lit world of your codebase, track the progress of your most active projects, monitor open pull requests, and celebrate milestones with a glow.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

```bash
git
Node.js
npm or yarn
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/room302studio/mission-control.git
   ```
2. Install NPM packages
   ```sh
   cd mission-control
   yarn install
   ```
3. Set up your environment variables
   ```plaintext
   Rename `.env.example` to `.env` and update the values with your GitHub and Netlify API keys.
   ```

4. Start the development server
   ```sh
   npm start
   ```

## Using Mission Control

After setting up, navigate to `localhost:3000` (or your configured port) to view your dashboard. The dashboard will automatically select your most recently active GitHub project and display:

- **Active Project Information:** Basic information about the most recently active project, including the last activity timestamp.
- **Open PRs:** A neon-glow list of open PRs for the active project, with details such as the PR title, author, and age.
- **Milestone Progress:** Visualize your project's milestones with glowing progress bars, showing how close you are to reaching each milestone.

## Customization

Mission Control is designed to be modular and customizable. Dive into the `src` directory to tweak the UI components or add new data sources to your dashboard.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

Distributed under the MIT License. See `LICENSE` for more information.