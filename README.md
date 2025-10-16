# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c30bbb8c-74f2-499f-8267-962129c87e97

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c30bbb8c-74f2-499f-8267-962129c87e97) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c30bbb8c-74f2-499f-8267-962129c87e97) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Connecting this project to Supabase (Auth + DB)

This project is pre-wired to work with Supabase. Follow these steps to connect and test authentication.

1. Create a Supabase project at https://app.supabase.com and copy the Project URL and anon (publishable) key.

2. Create a `.env` file in the project root (or update it) with these entries:

```env
VITE_SUPABASE_URL="https://your-project-ref.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-publishable-key"
```

3. (Optional) Run the SQL in `supabase/sql/init.sql` in the Supabase SQL editor to create example tables.

4. In the Supabase dashboard go to Authentication → Settings and enable Email signups. Add OAuth providers if desired.

5. Start the dev server and test:

```powershell
npm install
npm run dev
```

Open the app, click Login, and sign up / sign in to verify the flow.

If you need role-based access, create a `roles` table or add metadata to `auth.users` and enforce policies in Supabase or in the app's `RequireAuth` wrapper.

