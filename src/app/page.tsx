import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <section className="text-center">
        <h2 className="text-4xl font-semibold mb-4">
          Welcome to Your Kanban Board
        </h2>
        <p className="text-white mb-8">
          Organize tasks and streamline your workflow with our intuitive Kanban
          board.
        </p>
        <Link href="/board" className="bg-neutral-800/50 p-4 rounded-lg">
          Get Started
        </Link>
      </section>

      <section className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-neutral-800/50 p-4 rounded-lg">
            <h4 className="text-xl font-semibold text-neutral-100 mb-4">
              Visualize Your Workflow
            </h4>
            <p className="text-white">
              Easily track your tasks through customizable columns.
            </p>
          </div>
          <div className="bg-neutral-800/50 p-4 rounded-lg">
            <h4 className="text-xl font-semibold text-neutral-100 mb-4">
              Collaborate Effortlessly
            </h4>
            <p className="text-white">
              Invite team members and work together in real-time.
            </p>
          </div>
          <div className="bg-neutral-800/50 p-4 rounded-lg">
            <h4 className="text-xl font-semibold text-neutral-100 mb-4">
              Stay Organized
            </h4>
            <p className="text-white">
              Prioritize tasks, add due dates, and keep everything in one place.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
