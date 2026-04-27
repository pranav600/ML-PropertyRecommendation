import Link from "next/link";
import { Home } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-[var(--color-lightbg)]/50 dark:bg-black/50 py-12 mt-20 transition-colors duration-300">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-[var(--color-primary)] rounded-md text-white">
              <Home size={18} />
            </div>
            <span className="font-bold text-lg">
              Prop
              <span className="text-[var(--color-primary)]">Find</span>
            </span>
          </Link>
          <p className="text-sm text-foreground/70 max-w-sm">
            Discover the finest properties across India with our AI-powered recommendation engine. Predicting future values to secure your investments.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4 text-[var(--color-primary)]">Quick Links</h3>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li><Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link></li>
            <li><Link href="#search" className="hover:text-[var(--color-primary)] transition-colors">Find Property</Link></li>
            <li><Link href="#" className="hover:text-[var(--color-primary)] transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-[var(--color-primary)]">Legal</h3>
          <ul className="space-y-2 text-sm text-foreground/80">
            <li><Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-[var(--color-primary)] transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-foreground/50">
        <p>&copy; {new Date().getFullYear()} PropFind. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Developed by Pranav.</p>
      </div>
    </footer>
  );
}
