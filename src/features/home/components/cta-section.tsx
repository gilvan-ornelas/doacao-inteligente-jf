import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { MapPin, Lock } from "lucide-react";

export function CTASection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild size="lg" className="w-full sm:w-auto min-h-[44px] text-base">
          <Link href="/pontos">
            <MapPin className="mr-2 h-5 w-5" />
            Ver pontos e necessidades
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full sm:w-auto min-h-[44px] text-base"
        >
          <Link href="/admin">
            <Lock className="mr-2 h-5 w-5" />
            Área Admin
          </Link>
        </Button>
      </div>
    </section>
  );
}
