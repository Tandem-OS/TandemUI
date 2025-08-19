import React from 'react';
import Hero_01 from "@/components-lib/Hero/Hero_New/Hero_01";

const DemoPage: React.FC = () => {
    // Example 1: SaaS Platform
    const saasProps = {
        title: "Build AI Apps in Minutes",
        description: "The fastest way to ship production-ready AI applications. No infrastructure headaches.",
        primaryCTA: {
            text: "Start Free",
            href: "/signup"
        },
        secondaryCTA: {
            text: "View Demo",
            href: "/demo"
        },
        colors: {
            title: { light: '#1e40af', dark: '#93c5fd' },
            primaryButton: {
                background: { light: '#3b82f6', dark: '#60a5fa' },
                text: { light: '#ffffff', dark: '#ffffff' },
                border: { light: '#3b82f6', dark: '#60a5fa' },
                hover: {
                    background: { light: '#2563eb', dark: '#3b82f6' },
                    text: { light: '#ffffff', dark: '#ffffff' },
                    border: { light: '#2563eb', dark: '#3b82f6' }
                }
            }
        }
    };

    // Example 2: E-commerce
    const ecommerceProps = {
        title: "Summer Collection 2024",
        description: "Sustainable fashion that makes a statement. Free shipping on orders over $50.",
        primaryCTA: {
            text: "Shop Now",
            href: "/shop"
        },
        colors: {
            background: { light: '#fef3c7', dark: '#78350f' },
            title: { light: '#78350f', dark: '#fef3c7' }
        }
    };

    // Example 3: Healthcare
    const healthcareProps = {
        title: "Healthcare Made Simple",
        description: "Connect with certified doctors online. Get prescriptions, lab results, and more.",
        primaryCTA: {
            text: "Book Appointment",
            href: "/book"
        },
        secondaryCTA: undefined, // Hide secondary CTA
        colors: {
            title: { light: '#059669', dark: '#6ee7b7' },
            primaryButton: {
                background: { light: '#10b981', dark: '#34d399' },
                text: { light: '#ffffff', dark: '#064e3b' },
                border: { light: '#10b981', dark: '#34d399' },
                hover: {
                    background: { light: '#059669', dark: '#10b981' },
                    text: { light: '#ffffff', dark: '#ffffff' },
                    border: { light: '#059669', dark: '#10b981' }
                }
            }
        }
    };

    return (
        <div className="space-y-xl">
            {/* Default Example */}
            <section>
                <h2 className="text-h3-md font-bold px-xl py-lg">Default Hero</h2>
                <Hero_01 />
            </section>

            {/* SaaS Example */}
            <section>
                <h2 className="text-h3-md font-bold px-xl py-lg">SaaS Platform</h2>
                <Hero_01 {...saasProps} />
            </section>

            {/* E-commerce Example */}
            <section>
                <h2 className="text-h3-md font-bold px-xl py-lg">E-commerce</h2>
                <Hero_01 {...ecommerceProps} />
            </section>

            {/* Healthcare Example */}
            <section>
                <h2 className="text-h3-md font-bold px-xl py-lg">Healthcare</h2>
                <Hero_01 {...healthcareProps} />
            </section>

            {/* Compact Variant */}
            <section>
                <h2 className="text-h3-md font-bold px-xl py-lg">Compact Variant</h2>
                <Hero_01
                    title="Compact Hero Example"
                    animated={false}
                />
            </section>

            {/* Custom Image */}
            <section>
                <h2 className="text-h3-md font-bold px-xl py-lg">Custom Image</h2>
                <Hero_01
                    image={{
                        src: "https://images.pexels.com/photos/33341985/pexels-photo-33341985.jpeg?_gl=1*h701tt*_ga*MjA2OTc4MTYwNC4xNzU1NjAyMzM0*_ga_8JE65Q40S6*czE3NTU2MDIzMzMkbzEkZzEkdDE3NTU2MDIzNDckajQ2JGwwJGgw",
                        alt: "Custom hero image"
                    }}
                />
            </section>
        </div>
    );
};

export default DemoPage;