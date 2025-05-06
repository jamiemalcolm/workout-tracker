import { auth, providers } from "@/auth"
import SignInSection from "./components/SignInSection"
import UserInfo from "./components/UserInfo"

export default async function Home() {
  const session = await auth()
  const providersMap = providers.reduce((acc, provider) => {
    acc[provider.id] = {
      id: provider.id,
      name: provider.name
    }
    return acc
  }, {} as Record<string, { id: string; name: string }>)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Workout Tracker
          </h1>
          <p className="text-2xl text-gray-300">
            Track your fitness journey with ease
          </p>
        </div>

        {session?.user ? (
          <UserInfo />
        ) : (
          <SignInSection providers={providersMap} />
        )}
      </div>
    </main>
  )
}

