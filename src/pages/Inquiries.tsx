
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InquiryForm from "@/components/InquiryForm";

const Inquiries = () => {
  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-muted-foreground">
          Have a question? Send us a message and we'll get back to you
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inquiry Form</CardTitle>
        </CardHeader>
        <CardContent>
          <InquiryForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Inquiries;
