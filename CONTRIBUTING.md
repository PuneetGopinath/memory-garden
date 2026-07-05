# Contributing to MemoryGarden

We welcome contributions to Memory Garden! Whether it's fixing bugs, adding new features, or improving documentation, your help is appreciated. Please follow the guidelines below to ensure a smooth contribution process.

## How to Contribute (for First-Time Contributors)

1. **Fork the Repository**: Click the "Fork" button at the top right of the repository page to create a copy of the repository under your GitHub account.
2. **Clone the Forked Repository**: Clone your forked repository to your local machine using the following command: (replace `<your-username>` with your GitHub username)
    ```bash
    git clone https://github.com/<your-username>/memory-garden.git
    ```
3. **Create a New Branch**: Create a new branch for your changes. Use a descriptive name for the branch, such as `fix-bug` or `add-feature`.
    ```bash
    git checkout -b your-branch-name
    ```
4. **Make Changes**: Make your changes in the codebase. Ensure that your code follows the project's coding style and conventions. Use ESLint to check for any linting errors and fix them before committing your changes.
5. **Commit Your Changes**: Commit your changes in regular intervals with clear and concise commit messages. Use the following format for commit messages:
    ```
    [TYPE]: Short description of the change
    [TYPE] should be replaced with any of the following:
    - feat: A new feature
    - fix: A bug fix
    - docs: Documentation changes
    - style: Code style changes (formatting, missing semi-colons, etc.)
    - refactor: Code changes that neither fix a bug nor add a feature
    - test: Adding or updating tests
    - chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
    ```
Checkout the [Conventional Commits](https://www.conventionalcommits.org/) specification for more details on commit message formatting.
6. **Push Changes**: Push your changes to your forked repository on GitHub and set the upstream branch to your newly created branch:
    ```bash
    git push origin your-branch-name
    ```
7. **Create a Pull Request**: Go to the original repository on GitHub and click the "New Pull Request" button. Select your branch and provide a clear description of the changes you made. Submit the pull request for review.
8. **Address Feedback**: If the maintainers request changes or provide feedback, make the necessary updates and push them to your branch. The pull request will automatically update with your new changes.
9. **Merge**: Once your pull request is approved and tests (if any) pass, a maintainer will merge your changes into the main branch. That's it! You've successfully contributed to Memory Garden.