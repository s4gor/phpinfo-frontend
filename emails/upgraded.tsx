import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export interface UpgradedLicenseEmailProps {
  email: string;
  tier: "single" | "unlimited" | "lifetime";
  v2Key: string;
  legacyKey?: string;
}

const TIER_LABEL = {
  single: "Single Site",
  unlimited: "Unlimited Sites",
  lifetime: "Lifetime Access",
} as const;

export const UpgradedLicenseEmail = ({
  email,
  tier,
  v2Key,
}: UpgradedLicenseEmailProps) => {
  const tierName = TIER_LABEL[tier] || "Pro";

  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <style>{`
          :root {
            color-scheme: light dark;
            supported-color-schemes: light dark;
          }
          @media (prefers-color-scheme: dark) {
            .email-body { background-color: #090a0f !important; }
            .email-card { background-color: #12131a !important; border-color: #232430 !important; }
            .text-title { color: #ffffff !important; }
            .text-main { color: #e4e4e7 !important; }
            .text-muted { color: #a1a1aa !important; }
            .text-subtle { color: #71717a !important; }
            .box-key { background-color: #08080c !important; border-color: #272733 !important; }
            .box-meta { background-color: #171822 !important; border-color: #262736 !important; }
            .meta-border { border-color: #262736 !important; }
            .step-circle { background-color: #2e1065 !important; color: #c4b5fd !important; border-color: #6d28d9 !important; }
            .divider-line { border-color: #232430 !important; }
            .about-box { background-color: #151620 !important; border-color: #262738 !important; }
          }
        `}</style>
      </Head>
      <Preview>Your updated phpinfo() WP Pro v2 license key is ready</Preview>
      <Body style={bodyStyle} className="email-body">
        <Container style={containerStyle} className="email-card">
          
          {/* Header Brand Bar */}
          <Section style={headerBrandSection}>
            <div style={brandBadgeWrapper}>
              <table role="presentation" border={0} cellPadding={0} cellSpacing={0} style={{ margin: "0 auto" }}>
                <tbody>
                  <tr>
                    <td style={brandLogoCell}>
                      <Img
                        src="https://exeebit.com/email-logo.png"
                        width="44"
                        height="44"
                        alt="phpinfo() WP"
                        style={brandLogoImg}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={chipWrapper}>
                <span style={chipStyle}>UPGRADED PRO LICENSE KEY</span>
              </div>
              <Text style={brandHeading} className="text-title">
                phpinfo() <span style={accentPurple}>WP</span>{" "}
                <span style={proBadge}>PRO</span>
              </Text>
              <Text style={brandSubtitle} className="text-muted">
                Pro License Update
              </Text>
            </div>
          </Section>

          {/* Hero Greeting */}
          <Section style={greetingSection}>
            <Text style={greetingHeading} className="text-title">
              Your updated Pro license key
            </Text>
            <Text style={paragraphLead} className="text-main">
              We have upgraded our licensing infrastructure to provide faster verification, higher reliability, and enhanced security for your WordPress sites.
            </Text>
            <Text style={paragraphSecondary} className="text-main">
              Your <strong>{tierName}</strong> plan, billing, and expiry remain completely unchanged. Your active WordPress installations running the latest plugin will adopt this updated key in the background.
            </Text>
          </Section>

          {/* Cryptographic Key Card */}
          <Section style={keyCard} className="box-key">
            <table role="presentation" border={0} cellPadding={0} cellSpacing={0} style={{ width: "100%", marginBottom: "10px" }}>
              <tbody>
                <tr>
                  <td align="left">
                    <span style={keyCardLabel}>PRO LICENSE KEY</span>
                  </td>
                  <td align="right">
                    <span style={keyStatusPill}>UPGRADED & ACTIVE</span>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div style={keyCodeContainer}>
              <Text style={keyCodeText}>
                {v2Key}
              </Text>
            </div>

            <Text style={keyCardHint}>
              Double-click or drag to select and copy your upgraded key.
            </Text>
          </Section>

          {/* Order & License Specifications Grid */}
          <Section style={specsBox} className="box-meta">
            <table role="presentation" border={0} cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td style={specsCellLeft} className="meta-border">
                    <Text style={specsLabel} className="text-subtle">LICENSE TIER</Text>
                    <Text style={specsValue} className="text-title">{tierName}</Text>
                  </td>
                  <td style={specsCellRight} className="meta-border">
                    <Text style={specsLabel} className="text-subtle">REGISTERED TO</Text>
                    <Text style={specsValue} className="text-title">{email}</Text>
                  </td>
                </tr>
                <tr>
                  <td style={specsCellLeftBottom}>
                    <Text style={specsLabel} className="text-subtle">KEY VERSION</Text>
                    <Text style={specsValue} className="text-title">Pro V2 (Enhanced)</Text>
                  </td>
                  <td style={specsCellRightBottom}>
                    <Text style={specsLabel} className="text-subtle">COMPATIBILITY</Text>
                    <Text style={specsValue} className="text-title">phpinfo() WP v8.0+</Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Instructions */}
          <Section style={instructionsSection}>
            <Text style={instructionsHeading} className="text-title">
              What do you need to do?
            </Text>
            <Text style={instructionsBody} className="text-muted">
              • <strong>Active Sites:</strong> Sites already running the latest plugin will seamlessly continue working without interruption.
              <br />
              • <strong>Future Sites & Migrations:</strong> Save this email and use this updated key whenever activating new sites or migrating servers.
              <br />
              • <strong>WordPress Admin:</strong> You can view your active status anytime under <strong>phpinfo() WP → License</strong>.
            </Text>
          </Section>

          {/* Personal Note from Emran (Solo Developer) */}
          <Section style={aboutStudioSection} className="about-box">
            <table role="presentation" border={0} cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>
                    <Text style={aboutStudioHeading} className="text-title">
                      A personal note from the creator
                    </Text>
                    <Text style={aboutStudioBody} className="text-muted">
                      Hi, I&apos;m <strong>Emran Hossain Sagor</strong>, the solo developer behind phpinfo() WP. As an independent developer based in Germany, I build, maintain, and support every feature of this tool. I want to make sure your WordPress sites always run smoothly with the latest performance and security standards. If you ever need help with your license, reply directly to this email and I will personally assist you.
                    </Text>
                    <Text style={{ fontSize: "13px", fontWeight: 600, color: "#18181b", margin: "10px 0 0" }} className="text-title">
                      - Emran Hossain Sagor
                    </Text>
                    <Text style={{ fontSize: "11px", color: "#71717a", margin: "2px 0 0" }} className="text-subtle">
                      Founder & Solo Developer · Exeebit
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Direct Support */}
          <Section style={supportSection}>
            <Text style={supportText} className="text-muted">
              <strong>Questions about your upgrade?</strong> Simply reply directly to this email or reach us at{" "}
              <a href="mailto:support@exeebit.com" style={inlineLink}>
                support@exeebit.com
              </a>
              . We are always here to assist you.
            </Text>
          </Section>

          <Hr style={divider} className="divider-line" />

          {/* Legal Footer */}
          <Section style={footerSection}>
            <Text style={footerText} className="text-subtle">
              This upgraded license key was generated for {email}. Keep this email for your records.
            </Text>
            <Text style={footerCompany} className="text-subtle">
              Exeebit · Registered Software Business · Germany
              <br />
              <a href="https://exeebit.com" style={footerLink}>exeebit.com</a> · <a href="mailto:support@exeebit.com" style={footerLink}>support@exeebit.com</a>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
};

UpgradedLicenseEmail.PreviewProps = {
  email: "existing.customer@example.com",
  tier: "unlimited",
  v2Key: "PIWP2-eyJlbWFpbCI6ImV4aXN0aW5nLmN1c3RvbWVyQGV4YW1wbGUuY29tIiwidXJsIjoiKiIsImV4cCI6NDA3MDkwODgwMCwiaWF0IjoxNzMxNzc3Nzc3fQ-5v5cY_wznOo0Keo5nExdzkXkIlaq7yn-hnc4DeOu1CbLw2i-XVuF0WAvD4ASHvjIhBrnVQqrHQwz-_yJ_vrUDA",
} satisfies UpgradedLicenseEmailProps;

export default UpgradedLicenseEmail;

// --- Clean, Cross-Client Inline CSS Styles ---

const bodyStyle: React.CSSProperties = {
  backgroundColor: "#f4f4f6",
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  margin: 0,
  padding: "36px 12px",
  color: "#18181b",
};

const containerStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 36px 36px",
  borderRadius: "16px",
  maxWidth: "580px",
  border: "1px solid #e4e4e7",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
};

const headerBrandSection: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "28px",
};

const brandBadgeWrapper: React.CSSProperties = {
  textAlign: "center",
};

const brandLogoCell: React.CSSProperties = {
  padding: "0",
  textAlign: "center",
};

const brandLogoImg: React.CSSProperties = {
  margin: "0 auto 12px",
  display: "block",
  borderRadius: "12px",
  backgroundColor: "#7c3aed",
  boxShadow: "0 6px 18px rgba(124, 58, 237, 0.25)",
};

const chipWrapper: React.CSSProperties = {
  marginBottom: "8px",
};

const chipStyle: React.CSSProperties = {
  display: "inline-block",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "1.2px",
  color: "#7c3aed",
  backgroundColor: "#f5f3ff",
  border: "1px solid #ddd6fe",
  borderRadius: "9999px",
  padding: "3px 10px",
  textTransform: "uppercase",
};

const brandHeading: React.CSSProperties = {
  fontSize: "24px",
  lineHeight: "30px",
  fontWeight: 800,
  color: "#18181b",
  letterSpacing: "-0.5px",
  margin: "4px 0",
};

const accentPurple: React.CSSProperties = {
  color: "#7c3aed",
};

const proBadge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#7c3aed",
  color: "#ffffff",
  fontSize: "11px",
  fontWeight: 800,
  padding: "2px 7px",
  borderRadius: "6px",
  letterSpacing: "0.5px",
  verticalAlign: "middle",
  marginLeft: "4px",
};

const brandSubtitle: React.CSSProperties = {
  fontSize: "13px",
  color: "#71717a",
  margin: "0",
};

const greetingSection: React.CSSProperties = {
  marginBottom: "22px",
};

const greetingHeading: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  color: "#18181b",
  letterSpacing: "-0.3px",
  margin: "0 0 10px",
};

const paragraphLead: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#3f3f46",
  margin: "0 0 10px",
};

const paragraphSecondary: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#52525b",
  margin: 0,
};

const keyCard: React.CSSProperties = {
  backgroundColor: "#0d0e14",
  border: "1px solid #272733",
  borderRadius: "14px",
  padding: "20px",
  margin: "24px 0",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
};

const keyCardLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "1px",
  color: "#a1a1aa",
};

const keyStatusPill: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.5px",
  color: "#10b981",
  backgroundColor: "rgba(16, 185, 129, 0.12)",
  border: "1px solid rgba(16, 185, 129, 0.3)",
  padding: "2px 8px",
  borderRadius: "9999px",
};

const keyCodeContainer: React.CSSProperties = {
  backgroundColor: "#050608",
  border: "1px solid #1e1e28",
  borderRadius: "10px",
  padding: "14px",
  marginTop: "10px",
  wordBreak: "break-all",
};

const keyCodeText: React.CSSProperties = {
  fontFamily: 'ui-monospace, "SF Mono", Monaco, Consolas, "Liberation Mono", monospace',
  fontSize: "13px",
  lineHeight: "21px",
  color: "#c4b5fd",
  margin: 0,
  letterSpacing: "0.2px",
};

const keyCardHint: React.CSSProperties = {
  fontSize: "11px",
  color: "#71717a",
  margin: "10px 0 0",
  textAlign: "center",
};

const specsBox: React.CSSProperties = {
  backgroundColor: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  margin: "20px 0 24px",
  overflow: "hidden",
};

const specsCellLeft: React.CSSProperties = {
  padding: "14px 18px",
  borderRight: "1px solid #e5e7eb",
  borderBottom: "1px solid #e5e7eb",
  width: "50%",
};

const specsCellRight: React.CSSProperties = {
  padding: "14px 18px",
  borderBottom: "1px solid #e5e7eb",
  width: "50%",
};

const specsCellLeftBottom: React.CSSProperties = {
  padding: "14px 18px",
  borderRight: "1px solid #e5e7eb",
  width: "50%",
};

const specsCellRightBottom: React.CSSProperties = {
  padding: "14px 18px",
  width: "50%",
};

const specsLabel: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.8px",
  color: "#71717a",
  margin: "0 0 4px",
};

const specsValue: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#18181b",
  margin: 0,
};

const instructionsSection: React.CSSProperties = {
  margin: "24px 0",
};

const instructionsHeading: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 700,
  color: "#18181b",
  margin: "0 0 10px",
};

const instructionsBody: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "22px",
  color: "#52525b",
  margin: 0,
};

const aboutStudioSection: React.CSSProperties = {
  backgroundColor: "#faf5ff",
  border: "1px solid #f3e8ff",
  borderRadius: "12px",
  padding: "16px 20px",
  margin: "24px 0",
};

const aboutStudioHeading: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 700,
  color: "#6b21a8",
  margin: "0 0 6px",
  letterSpacing: "-0.2px",
};

const aboutStudioBody: React.CSSProperties = {
  fontSize: "12px",
  lineHeight: "19px",
  color: "#581c87",
  margin: 0,
};

const supportSection: React.CSSProperties = {
  margin: "20px 0",
};

const supportText: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "22px",
  color: "#52525b",
  margin: 0,
};

const inlineLink: React.CSSProperties = {
  color: "#7c3aed",
  textDecoration: "underline",
  fontWeight: 500,
};

const divider: React.CSSProperties = {
  borderColor: "#e4e4e7",
  margin: "28px 0 20px",
};

const footerSection: React.CSSProperties = {
  textAlign: "center",
};

const footerText: React.CSSProperties = {
  fontSize: "11px",
  lineHeight: "18px",
  color: "#71717a",
  margin: "0 0 8px",
};

const footerCompany: React.CSSProperties = {
  fontSize: "11px",
  lineHeight: "18px",
  color: "#a1a1aa",
  margin: 0,
};

const footerLink: React.CSSProperties = {
  color: "#71717a",
  textDecoration: "underline",
};
