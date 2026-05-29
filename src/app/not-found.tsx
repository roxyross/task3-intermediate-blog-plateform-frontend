import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="p-6 glass neon-border rounded-full mb-8 animate-pulse">
        <h1 className="text-6xl font-bold neon-text">404</h1>
      </div>
      <h2 className="text-2xl font-bold mb-4">DATA_NOT_FOUND</h2>
      <p className="text-muted-foreground mb-12 max-w-md font-mono text-sm">
        The requested transmission could not be located in the central database. 
        It may have been purged or relocated to a secure sector.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-md neon-glow transition-all">
            <Home className="w-4 h-4" /> RETURN_TO_BASE
          </button>
        </Link>
        <Link href="/blogs">
          <button className="flex items-center gap-2 px-6 py-3 glass neon-border rounded-md hover:bg-primary/10 transition-all">
            <ArrowLeft className="w-4 h-4" /> BROWSE_ARCHIVES
          </button>
        </Link>
      </div>
      <div className="mt-20 opacity-20 font-mono text-[10px]">
        ERROR_CODE: ERR_ROUTE_NOT_SYNCED <br />
        SECTOR: 0x44-F92
      </div>
    </div>
  );
}
