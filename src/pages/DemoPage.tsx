import Hero_01 from '@/components-lib/Hero/Hero_New_03/Hero_01';
import React from 'react';

const DemoPage: React.FC = () => {
    // Example 1: SaaS Platform - Purple Theme with Validation Warning
    // What's customized: Title (too long), custom purple theme, single CTA
    // Console Warning: Title has long words that might look awkward on mobile screens
    const saasExample = (
        <div className="mb-20">
            <h2 className="text-2xl font-bold mb-4">Example 1: SaaS Platform - Purple Theme</h2>
            <p className="mb-4 text-gray-600">
                ✅ Custom purple/green color scheme<br />
                ⚠️ Warning: Very long title with potential mobile wrapping issues<br />
                ✅ Only primary CTA (secondary hidden)<br />
                ❌ No custom image or animation changes
            </p>
            <Hero_01
                animated={false}
                title="Revolutionary CloudInfrastructureManagementPlatform for Modern Enterprises"
                description="Streamline your cloud operations with our AI-powered platform."
                primaryCTA={{
                    text: "Start Free Trial",
                    href: "/trial",
                    variant: "solid",
                    size: "lg"
                }}
                secondaryCTA={undefined} // Explicitly hiding secondary CTA
                colors={{
                    background: { light: '#f3f4f6', dark: '#1f2937' },
                    title: { light: '#6b21a8', dark: '#c084fc' },
                    description: { light: '#4b5563', dark: '#d1d5db' },
                    primaryButton: {
                        background: { light: '#7c3aed', dark: '#a78bfa' },
                        text: { light: '#ffffff', dark: '#ffffff' },
                        border: { light: '#7c3aed', dark: '#a78bfa' },
                        hover: {
                            background: { light: '#6d28d9', dark: '#8b5cf6' },
                            text: { light: '#ffffff', dark: '#ffffff' },
                            border: { light: '#6d28d9', dark: '#8b5cf6' }
                        }
                    }
                }}
            />
        </div>
    );

    // Example 2: E-commerce - Black Friday Sale with Animation Disabled
    // What's customized: Red/black theme, animations off, both CTAs, custom className
    // Console: No warnings expected
    const ecommerceExample = (
        <div className="mb-20">
            <h2 className="text-2xl font-bold mb-4">Example 2: E-commerce Black Friday</h2>
            <p className="mb-4 text-gray-600">
                ✅ Red/black sale theme<br />
                ✅ Animations disabled for performance<br />
                ✅ Custom className for tracking<br />
                ✅ Urgent CTA text
            </p>
            <Hero_01
                title="Black Friday Mega Sale - 70% Off"
                description="Limited time offer! Get incredible deals on all products. Sale ends midnight!"
                primaryCTA={{
                    text: "Shop Now",
                    href: "/black-friday",
                    variant: "solid",
                    size: "lg"
                }}
                secondaryCTA={{
                    text: "View Deals",
                    href: "/deals",
                    variant: "outline",
                    size: "lg"
                }}
                animated={false}
                className="black-friday-hero-2024"
                colors={{
                    background: { light: '#ffffff', dark: '#000000' },
                    title: { light: '#dc2626', dark: '#ef4444' },
                    description: { light: '#1f2937', dark: '#e5e7eb' },
                    primaryButton: {
                        background: { light: '#dc2626', dark: '#ef4444' },
                        text: { light: '#ffffff', dark: '#ffffff' },
                        border: { light: '#dc2626', dark: '#ef4444' },
                        hover: {
                            background: { light: '#b91c1c', dark: '#dc2626' },
                            text: { light: '#ffffff', dark: '#ffffff' },
                            border: { light: '#b91c1c', dark: '#dc2626' }
                        }
                    },
                    secondaryButton: {
                        background: { light: 'transparent', dark: 'transparent' },
                        text: { light: '#dc2626', dark: '#ef4444' },
                        border: { light: '#dc2626', dark: '#ef4444' },
                        hover: {
                            background: { light: '#dc2626', dark: '#ef4444' },
                            text: { light: '#ffffff', dark: '#ffffff' },
                            border: { light: '#dc2626', dark: '#ef4444' }
                        }
                    }
                }}
            />
        </div>
    );

    // Example 3: Healthcare - Trust & Calm Theme with Long Description
    // What's customized: Blue/green medical theme, very long description
    // Console Warning: Description has very long words that might affect layout
    const healthcareExample = (
        <div className="mb-20">
            <h2 className="text-2xl font-bold mb-4">Example 3: Healthcare Platform</h2>
            <p className="mb-4 text-gray-600">
                ✅ Medical blue/green theme for trust<br />
                ⚠️ Warning: Description with medical terminology<br />
                ✅ Professional CTAs<br />
                ✅ Full animation enabled
            </p>
            <Hero_01
                title="Your Health, Our Priority"
                description="Experience comprehensive healthcare with our telemedicine platform featuring electroencephalography monitoring and personalized treatment plans."
                primaryCTA={{
                    text: "Book Consultation",
                    href: "/book",
                    variant: "solid",
                    size: "lg"
                }}
                secondaryCTA={{
                    text: "Learn More",
                    href: "/how-it-works",
                    variant: "outline",
                    size: "lg"
                }}
                colors={{
                    background: { light: '#f0f9ff', dark: '#0c4a6e' },
                    title: { light: '#0369a1', dark: '#38bdf8' },
                    description: { light: '#0c4a6e', dark: '#e0f2fe' },
                    primaryButton: {
                        background: { light: '#0ea5e9', dark: '#38bdf8' },
                        text: { light: '#ffffff', dark: '#0c4a6e' },
                        border: { light: '#0ea5e9', dark: '#38bdf8' },
                        hover: {
                            background: { light: '#0284c7', dark: '#0ea5e9' },
                            text: { light: '#ffffff', dark: '#0c4a6e' },
                            border: { light: '#0284c7', dark: '#0ea5e9' }
                        }
                    },
                    secondaryButton: {
                        background: { light: 'transparent', dark: 'transparent' },
                        text: { light: '#0ea5e9', dark: '#38bdf8' },
                        border: { light: '#0ea5e9', dark: '#38bdf8' },
                        hover: {
                            background: { light: '#0ea5e9', dark: '#38bdf8' },
                            text: { light: '#ffffff', dark: '#0c4a6e' },
                            border: { light: '#0ea5e9', dark: '#38bdf8' }
                        }
                    }
                }}
            />
        </div>
    );

    // Example 4: FinTech - Dark Professional Theme with Security Focus
    // What's customized: Dark theme, smaller buttons, professional copy
    // Console: Clean, no warnings
    const fintechExample = (
        <div className="mb-20">
            <h2 className="text-2xl font-bold mb-4">Example 4: FinTech Security Platform</h2>
            <p className="mb-4 text-gray-600">
                ✅ Dark professional theme<br />
                ✅ Smaller button sizes (md)<br />
                ✅ Trust-building copy<br />
                ✅ High contrast colors
            </p>
            <Hero_01
                title="Bank-Grade Security for Digital Assets"
                description="Protect your cryptocurrency with military-grade encryption and multi-signature wallets."
                primaryCTA={{
                    text: "Get Started",
                    href: "/signup",
                    variant: "solid",
                    size: "md" // Smaller size
                }}
                secondaryCTA={{
                    text: "Security Features",
                    href: "/security",
                    variant: "outline",
                    size: "md" // Smaller size
                }}
                colors={{
                    background: { light: '#f8fafc', dark: '#020617' },
                    title: { light: '#020617', dark: '#f8fafc' },
                    description: { light: '#334155', dark: '#cbd5e1' },
                    primaryButton: {
                        background: { light: '#0f172a', dark: '#f8fafc' },
                        text: { light: '#f8fafc', dark: '#0f172a' },
                        border: { light: '#0f172a', dark: '#f8fafc' },
                        hover: {
                            background: { light: '#1e293b', dark: '#e2e8f0' },
                            text: { light: '#f8fafc', dark: '#0f172a' },
                            border: { light: '#1e293b', dark: '#e2e8f0' }
                        }
                    },
                    secondaryButton: {
                        background: { light: 'transparent', dark: 'transparent' },
                        text: { light: '#0f172a', dark: '#f8fafc' },
                        border: { light: '#0f172a', dark: '#f8fafc' },
                        hover: {
                            background: { light: '#0f172a', dark: '#f8fafc' },
                            text: { light: '#f8fafc', dark: '#0f172a' },
                            border: { light: '#0f172a', dark: '#f8fafc' }
                        }
                    }
                }}
            />
        </div>
    );

    // Example 5: Education - Bright & Friendly with Invalid Props
    // What's customized: Yellow/orange education theme
    // Console Error: Will show validation errors for invalid href
    const educationExample = (
        <div className="mb-20">
            <h2 className="text-2xl font-bold mb-4">Example 5: Education Platform (With Errors)</h2>
            <p className="mb-4 text-gray-600">
                ✅ Bright educational colors<br />
                ❌ Error: Invalid URL in secondary CTA<br />
                ⚠️ Warning: Long button text<br />
                ✅ Friendly messaging
            </p>
            <Hero_01
                title="Learn at Your Own Pace"
                description="Join thousands of students mastering new skills with interactive courses."
                primaryCTA={{
                    text: "Start Learning Today Free", // 25 chars - will show error
                    href: "/courses",
                    variant: "solid",
                    size: "lg"
                }}
                secondaryCTA={{
                    text: "Browse Courses",
                    href: "not-a-valid-url", // Invalid URL - will show error
                    variant: "outline",
                    size: "lg"
                }}
                colors={{
                    background: { light: '#fffbeb', dark: '#451a03' },
                    title: { light: '#d97706', dark: '#fbbf24' },
                    description: { light: '#92400e', dark: '#fde68a' },
                    primaryButton: {
                        background: { light: '#f59e0b', dark: '#fbbf24' },
                        text: { light: '#ffffff', dark: '#451a03' },
                        border: { light: '#f59e0b', dark: '#fbbf24' },
                        hover: {
                            background: { light: '#d97706', dark: '#f59e0b' },
                            text: { light: '#ffffff', dark: '#451a03' },
                            border: { light: '#d97706', dark: '#f59e0b' }
                        }
                    },
                    secondaryButton: {
                        background: { light: 'transparent', dark: 'transparent' },
                        text: { light: '#f59e0b', dark: '#fbbf24' },
                        border: { light: '#f59e0b', dark: '#fbbf24' },
                        hover: {
                            background: { light: '#f59e0b', dark: '#fbbf24' },
                            text: { light: '#ffffff', dark: '#451a03' },
                            border: { light: '#f59e0b', dark: '#fbbf24' }
                        }
                    }
                }}
            />
        </div>
    );

    // Example 6: Real Estate - Luxury Theme with Custom className
    // What's customized: Elegant gold/navy theme, custom tracking class
    // Console: Clean
    const realEstateExample = (
        <div className="mb-20">
            <h2 className="text-2xl font-bold mb-4">Example 6: Luxury Real Estate</h2>
            <p className="mb-4 text-gray-600">
                ✅ Luxury gold/navy theme<br />
                ✅ Elegant copy<br />
                ✅ Custom tracking className<br />
                ✅ Professional CTAs
            </p>
            <Hero_01
                title="Find Your Dream Home"
                description="Discover exclusive properties in prime locations with personalized service."
                primaryCTA={{
                    text: "View Properties",
                    href: "/listings",
                    variant: "solid",
                    size: "lg"
                }}
                secondaryCTA={{
                    text: "Schedule Tour",
                    href: "/contact",
                    variant: "outline",
                    size: "lg"
                }}
                className="luxury-real-estate-hero property-showcase"
                colors={{
                    background: { light: '#fefce8', dark: '#1e293b' },
                    title: { light: '#1e293b', dark: '#fef3c7' },
                    description: { light: '#475569', dark: '#e2e8f0' },
                    primaryButton: {
                        background: { light: '#b8860b', dark: '#fbbf24' },
                        text: { light: '#ffffff', dark: '#1e293b' },
                        border: { light: '#b8860b', dark: '#fbbf24' },
                        hover: {
                            background: { light: '#996515', dark: '#f59e0b' },
                            text: { light: '#ffffff', dark: '#1e293b' },
                            border: { light: '#996515', dark: '#f59e0b' }
                        }
                    },
                    secondaryButton: {
                        background: { light: 'transparent', dark: 'transparent' },
                        text: { light: '#1e293b', dark: '#fef3c7' },
                        border: { light: '#1e293b', dark: '#fef3c7' },
                        hover: {
                            background: { light: '#1e293b', dark: '#fef3c7' },
                            text: { light: '#ffffff', dark: '#1e293b' },
                            border: { light: '#1e293b', dark: '#fef3c7' }
                        }
                    }
                }}
            />
        </div>
    );

    // Example 7: Fitness App - Energetic Theme with Single CTA
    // What's customized: Vibrant green/orange, single CTA, energetic copy
    // Console: Clean
    const fitnessExample = (
        <div className="mb-20">
            <h2 className="text-2xl font-bold mb-4">Example 7: Fitness App</h2>
            <p className="mb-4 text-gray-600">
                ✅ Energetic green theme<br />
                ✅ Single CTA focus<br />
                ✅ Action-oriented copy<br />
                ✅ Full animations
            </p>
            <Hero_01
                title="Transform Your Body in 30 Days"
                description="Get fit with personalized workouts and nutrition plans designed for your goals."
                primaryCTA={{
                    text: "Start Free Trial",
                    href: "/signup",
                    variant: "solid",
                    size: "lg"
                }}
                secondaryCTA={undefined} // Single CTA focus
                colors={{
                    background: { light: '#f0fdf4', dark: '#14532d' },
                    title: { light: '#16a34a', dark: '#86efac' },
                    description: { light: '#15803d', dark: '#bbf7d0' },
                    primaryButton: {
                        background: { light: '#22c55e', dark: '#86efac' },
                        text: { light: '#ffffff', dark: '#14532d' },
                        border: { light: '#22c55e', dark: '#86efac' },
                        hover: {
                            background: { light: '#16a34a', dark: '#4ade80' },
                            text: { light: '#ffffff', dark: '#14532d' },
                            border: { light: '#16a34a', dark: '#4ade80' }
                        }
                    }
                }}
            />
        </div>
    );

    // Example 8: Creative Agency - Gradient Theme with XSS Test
    // What's customized: Purple gradient theme
    // Console Error: XSS attempt will be sanitized and logged
    const creativeExample = (
        <div className="mb-20">
            <h2 className="text-2xl font-bold mb-4">Example 8: Creative Agency (XSS Test)</h2>
            <p className="mb-4 text-gray-600">
                ✅ Creative purple/pink theme<br />
                ❌ Error: XSS in title (will be sanitized)<br />
                ⚠️ Warning: Dangerous className (will be cleaned)<br />
                ✅ Creative CTAs
            </p>
            <Hero_01
                title="We Create <script>alert('xss')</script> Digital Magic" // XSS attempt - will be sanitized
                description="Transform your brand with stunning design and innovative solutions."
                primaryCTA={{
                    text: "See Our Work",
                    href: "/portfolio",
                    variant: "solid",
                    size: "sm"
                }}
                secondaryCTA={{
                    text: "Get Quote",
                    href: "/contact",
                    variant: "outline",
                    size: "sm"
                }}
                className="creative-hero onclick=alert('xss')" // Dangerous class - will be cleaned
                colors={{
                    background: { light: '#faf5ff', dark: '#3b0764' },
                    title: { light: '#9333ea', dark: '#e9d5ff' },
                    description: { light: '#6b21a8', dark: '#f3e8ff' },
                    primaryButton: {
                        background: { light: '#a855f7', dark: '#e9d5ff' },
                        text: { light: '#ffffff', dark: '#3b0764' },
                        border: { light: '#a855f7', dark: '#e9d5ff' },
                        hover: {
                            background: { light: '#9333ea', dark: '#d8b4fe' },
                            text: { light: '#ffffff', dark: '#3b0764' },
                            border: { light: '#9333ea', dark: '#d8b4fe' }
                        }
                    },
                    secondaryButton: {
                        background: { light: 'transparent', dark: 'transparent' },
                        text: { light: '#a855f7', dark: '#e9d5ff' },
                        border: { light: '#a855f7', dark: '#e9d5ff' },
                        hover: {
                            background: { light: '#a855f7', dark: '#e9d5ff' },
                            text: { light: '#ffffff', dark: '#3b0764' },
                            border: { light: '#a855f7', dark: '#e9d5ff' }
                        }
                    }
                }}
            />
        </div>
    );

    // Example 9: Restaurant - Warm Theme with Special Characters
    // What's customized: Warm brown/red food theme, special chars in text
    // Console: Clean (special chars are safe)
    const restaurantExample = (
        <div className="mb-20">
            <h2 className="text-2xl font-bold mb-4">Example 9: Restaurant Website</h2>
            <p className="mb-4 text-gray-600">
                ✅ Warm food-themed colors<br />
                ✅ Special characters in copy<br />
                ✅ Reservation CTAs<br />
                ✅ Appetizing theme
            </p>
            <Hero_01
                title="Authentic Italian Cuisine"
                description="Experience Italy's finest flavors with our chef's special menu. Buon appetito!"
                primaryCTA={{
                    text: "Reserve Table",
                    href: "/reservations",
                    variant: "solid",
                    size: "lg"
                }}
                secondaryCTA={{
                    text: "View Menu",
                    href: "/menu",
                    variant: "outline",
                    size: "lg"
                }}
                colors={{
                    background: { light: '#fef3c7', dark: '#451a03' },
                    title: { light: '#92400e', dark: '#fde68a' },
                    description: { light: '#b45309', dark: '#fed7aa' },
                    primaryButton: {
                        background: { light: '#dc2626', dark: '#fca5a5' },
                        text: { light: '#ffffff', dark: '#7f1d1d' },
                        border: { light: '#dc2626', dark: '#fca5a5' },
                        hover: {
                            background: { light: '#b91c1c', dark: '#f87171' },
                            text: { light: '#ffffff', dark: '#7f1d1d' },
                            border: { light: '#b91c1c', dark: '#f87171' }
                        }
                    },
                    secondaryButton: {
                        background: { light: 'transparent', dark: 'transparent' },
                        text: { light: '#dc2626', dark: '#fca5a5' },
                        border: { light: '#dc2626', dark: '#fca5a5' },
                        hover: {
                            background: { light: '#dc2626', dark: '#fca5a5' },
                            text: { light: '#ffffff', dark: '#7f1d1d' },
                            border: { light: '#dc2626', dark: '#fca5a5' }
                        }
                    }
                }}
            />
        </div>
    );

    // Example 10: Minimal Default - Testing Defaults
    // What's customized: Nothing! Testing all defaults
    // Console: Clean
    const minimalExample = (
        <div className="mb-20">
            <h2 className="text-2xl font-bold mb-4">Example 10: Minimal (All Defaults)</h2>
            <p className="mb-4 text-gray-600">
                ✅ All default values<br />
                ✅ No customization<br />
                ✅ Testing fallback behavior<br />
                ✅ Should use meta.defaults
            </p>
            <Hero_01 />
        </div>
    );

    return (
        <div className="space-y-12">
            <h1 className="text-4xl font-bold mb-8">Hero_01 Component Test Suite</h1>
            <p className="text-lg text-gray-600 mb-12">
                Testing 10 real-world scenarios with different customizations, validations, and edge cases.
                Check your console for warnings and errors!
            </p>

            {saasExample}
            {ecommerceExample}
            {healthcareExample}
            {fintechExample}
            {educationExample}
            {realEstateExample}
            {fitnessExample}
            {creativeExample}
            {restaurantExample}
            {minimalExample}
        </div>
    );
};

export default DemoPage;