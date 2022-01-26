import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  
  if(typeof window !== 'undefined' && localStorage.getItem("token")){
    router.push('/files')
}
  return (
    <div>
      <h1>
        SIRS
      </h1>
      <button onClick={() => router.push('/login')}>Login</button>
      <button onClick={() => router.push('/register')}>Register</button>
    </div>
  )
}

export default Home;