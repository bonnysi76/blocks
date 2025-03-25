import Link from "next/link"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center relative overflow-hidden">
        <div className="absolute w-4 h-4 bg-white rounded-md rotate-45 translate-x-2 translate-y-2" />
        <div className="absolute w-3 h-3 bg-white rounded-md -translate-x-2 -translate-y-2" />
        <div className="absolute w-2 h-2 bg-white rounded-full" />
      </div>
      <span className="font-bold text-lg">Blocks</span>
    </Link>
  )
}

