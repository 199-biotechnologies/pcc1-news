import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageContainer, Section, PageHeader } from '@/components/layout/page-container';

export default function SuccessPage() {
  // TODO: Optionally retrieve session details using the session_id from the URL query parameters
  // to display more specific order information.
  // Example: const searchParams = useSearchParams(); const sessionId = searchParams.get('session_id');

  return (
    <PageContainer>
      <Section>
        <PageHeader
          title="Payment Successful!"
          description="Thank you for your purchase. Your order is being processed and you should receive a confirmation email shortly."
        />
        <div className="flex flex-col items-center justify-center py-12 space-y-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </Section>
    </PageContainer>
  );
}