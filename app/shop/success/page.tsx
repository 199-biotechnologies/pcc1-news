import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
  // TODO: Optionally retrieve session details using the session_id from the URL query parameters
  // to display more specific order information.
  // Example: const searchParams = useSearchParams(); const sessionId = searchParams.get('session_id');

  return (
    <main className="flex-1 flex flex-col items-center justify-center py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 text-center space-y-4">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Payment Successful!
        </h1>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 font-light">
          Thank you for your purchase. Your order is being processed and you should receive a confirmation email shortly.
        </p>
        <Button asChild>
          <Link href="/">Return to Homepage</Link>
        </Button>
      </div>
    </main>
  );
}