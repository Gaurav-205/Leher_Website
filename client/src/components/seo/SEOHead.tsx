import { Helmet } from 'react-helmet-async'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  structuredData?: object
}

const SEOHead = ({
  title = "Leher - Mental Wellness Made Simple for Students",
  description = "Professional mental health support, AI assistance, and community connection for students across India. 24/7 crisis intervention, anonymous forums, and personalized care.",
  keywords = "mental health, student wellness, AI chatbot, counseling, therapy, depression, anxiety, stress management, India, anonymous support",
  image = "/logo.png",
  url = "https://leher.app",
  type = "website",
  structuredData
}: SEOHeadProps) => {
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Leher",
    "description": description,
    "url": url,
    "logo": `${url}${image}`,
    "sameAs": [
      "https://twitter.com/leher_app",
      "https://linkedin.com/company/leher",
      "https://instagram.com/leher_app"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-800-123-4567",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi", "Tamil", "Telugu", "Bengali"]
    },
    "offers": {
      "@type": "Offer",
      "name": "Mental Health Support",
      "description": "24/7 AI-powered mental health support for students",
      "price": "0",
      "priceCurrency": "INR"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Students"
    }
  }

  const finalStructuredData = structuredData || defaultStructuredData

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Leher Team" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:site_name" content="Leher" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${url}${image}`} />
      <meta property="twitter:creator" content="@leher_app" />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#2A3E66" />
      <meta name="msapplication-TileColor" content="#2A3E66" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Leher" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Additional Structured Data for Mental Health Service */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          "name": "Leher Mental Health Platform",
          "description": "AI-powered mental health support platform for students",
          "url": url,
          "telephone": "+91-800-123-4567",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
          },
          "medicalSpecialty": "Mental Health",
          "availableService": [
            {
              "@type": "MedicalProcedure",
              "name": "AI Chatbot Support",
              "description": "24/7 AI-powered mental health assistance"
            },
            {
              "@type": "MedicalProcedure", 
              "name": "Professional Counseling",
              "description": "Licensed counselor sessions"
            },
            {
              "@type": "MedicalProcedure",
              "name": "Crisis Intervention",
              "description": "Emergency mental health support"
            }
          ]
        })}
      </script>
    </Helmet>
  )
}

export default SEOHead
