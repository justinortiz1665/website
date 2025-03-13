
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] py-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link 
        href="/"
        className="bg-primary hover:bg-black text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}
