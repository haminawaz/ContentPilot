import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-canvas-cream font-sans text-ink-black py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/auth/signup"
          className="inline-flex items-center gap-2 text-slate-gray hover:text-signal-orange transition-colors mb-8 group">
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">Back to Sign Up</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-mc-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-slate-gray mb-12">Last updated: April 2026</p>

        <div className="space-y-8 text-lg leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold mb-4 tracking-mc-tight text-signal-orange">
              1. Introduction
            </h2>
            <p>
              At ContentPilot, we take your privacy seriously. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website and use our AI content
              generation platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 tracking-mc-tight text-signal-orange">
              2. Information We Collect
            </h2>
            <p className="mb-2">
              We may collect information about you in a variety of ways:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Data:</strong> Personally identifiable
                information, such as your name, email address, and telephone
                number that you voluntarily give to us when registering for an
                account.
              </li>
              <li>
                <strong>Usage Data:</strong> Information our servers
                automatically collect when you access the platform, such as your
                IP address, browser type, operating system, access times, and
                the pages you view.
              </li>
              <li>
                <strong>Input Data:</strong> The keywords and search parameters
                you input into our platform to generate content. We store this
                data to provide our service, analyze top Google search results,
                and generate your targeted blog posts.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 tracking-mc-tight text-signal-orange">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To create and manage your account.</li>
              <li>
                To operate our core service: querying search engines based on
                your keywords to analyze top ranking content and generating
                SEO-optimized blogs.
              </li>
              <li>
                To improve our AI models and content generation algorithms.
              </li>
              <li>
                To send you administrative information and account updates.
              </li>
              <li>
                To respond to customer service requests and support needs.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 tracking-mc-tight text-signal-orange">
              4. Data Security
            </h2>
            <p>
              We use administrative, technical, and physical security measures
              to help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that despite our efforts, no security measures
              are perfect or impenetrable, and no method of data transmission
              can be guaranteed against any interception or other type of
              misuse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 tracking-mc-tight text-signal-orange">
              5. Third-Party Services
            </h2>
            <p>
              Our platform interacts with third-party search engines (e.g.,
              Google) to analyze search results for your requested keywords. We
              do not share your personally identifiable information with these
              search engines during the keyword analysis process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 tracking-mc-tight text-signal-orange">
              6. Your Rights
            </h2>
            <p>
              Depending on your location, you may have rights under privacy laws
              (like GDPR or CCPA) to access, correct, or delete your personal
              data. To exercise these rights, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 tracking-mc-tight text-signal-orange">
              7. Contact Us
            </h2>
            <p>
              If you have questions or comments about this Privacy Policy,
              please contact us at{" "}
              <a
                href="mailto:privacy@contentpilot.ai"
                className="text-link-blue hover:underline">
                privacy@contentpilot.ai
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
