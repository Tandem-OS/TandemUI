// src/preview-components/PreviewComponents.tsx
import React from 'react';
import {
    FiMenu,
    FiX,
    FiArrowRight,
    FiPlay,
    FiStar,
    FiZap,
    FiShield,
    FiTrendingUp,
    FiUsers,
    FiHeart,
    FiTarget,
    FiCalendar,
    FiClock,
    FiArrowUpRight,
    FiCheck,
    FiGithub,
    FiMail,
    FiGlobe,
    FiCode,
    FiLayers,
    FiCommand,
    FiSmartphone,
    FiFeather,
} from 'react-icons/fi';

export const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <nav className="bg-background-primary/95 backdrop-blur-lg border-b border-border-default sticky top-0 z-50 px-md py-sm sm:px-lg sm:py-sm lg:px-xl lg:py-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-sm">
                    <div className="bg-gradient-to-br from-accent-default to-accent-hover p-xs rounded-xl">
                        <FiZap className="text-accent-foreground text-icon-md" />
                    </div>
                    <h3 className="font-bold text-text-primary text-h6-sm sm:text-h5-md">
                        DesignFlow
                    </h3>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden sm:flex items-center space-x-lg">
                    <div className="flex items-center space-x-md">
                        {['Home', 'Features', 'About', 'Contact'].map((item) => (
                            <a key={item} href="#"
                                className="text-text-secondary hover:text-text-primary transition-all duration-200 
                                        hover:scale-105 font-medium text-para-md">
                                {item}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center space-x-sm">
                        <button className="bg-accent-default text-accent-foreground rounded-xl px-lg py-sm 
                                         hover:bg-accent-hover transition-all duration-200 hover:scale-105 
                                         shadow-lg hover:shadow-xl font-semibold flex items-center space-x-xs">
                            <span>Get Started</span>
                            <FiArrowRight className="text-icon-sm" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex sm:hidden items-center space-x-sm">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-sm rounded-lg hover:bg-background-muted transition-colors">
                        {isMenuOpen ? <FiX className="text-icon-md" /> : <FiMenu className="text-icon-md" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute sm:hidden top-full left-0 right-0 bg-background-primary border-b border-border-default shadow-xl">
                    <div className="px-md py-lg space-y-md">
                        {['Home', 'Features', 'About', 'Contact'].map((item) => (
                            <a key={item} href="#"
                                className="block text-text-secondary hover:text-text-primary transition-colors 
                                        font-medium text-para-md py-xs">
                                {item}
                            </a>
                        ))}
                        <button className="w-full bg-accent-default text-accent-foreground rounded-xl py-sm 
                                         hover:bg-accent-hover transition-colors font-semibold mt-md">
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export const Hero: React.FC = () => {
    return (
        <section className="bg-gradient-to-br from-background-secondary via-background-primary to-accent-subtle/20 
            relative overflow-hidden px-md py-2xl sm:px-lg sm:py-3xl lg:px-xl lg:py-4xl">

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-default/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-default/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto text-center relative z-10 space-y-lg sm:space-y-xl">

                {/* Badge */}
                <div className="inline-flex items-center space-x-xs bg-accent-subtle border border-accent-default/20 
                               rounded-full px-md py-xs text-accent-default font-medium text-para-sm">
                    <FiStar className="text-icon-sm" />
                    <span>New: AI-Powered Design System</span>
                </div>

                {/* Main Heading */}
                <div className="space-y-sm sm:space-y-md">
                    <h1 className="font-bold text-text-primary leading-tight text-h1-sm sm:text-h1-md lg:text-h1-lg">
                        Build Beautiful Apps with
                        <span className="bg-gradient-to-r from-accent-default to-accent-hover bg-clip-text text-transparent">
                            {' '}Design Tokens
                        </span>
                    </h1>
                    <p className="text-text-secondary max-w-4xl mx-auto leading-relaxed text-para-md sm:text-para-lg">
                        Experience the perfect blend of aesthetics and functionality with our carefully crafted
                        design system. Build consistent, scalable, and beautiful user interfaces.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-sm sm:gap-md">
                    <button className="bg-accent-default text-accent-foreground rounded-xl 
                        hover:bg-accent-hover transition-all duration-200 hover:scale-105 
                        shadow-lg hover:shadow-xl font-semibold flex items-center space-x-sm
                        px-lg py-md w-full sm:w-auto justify-center sm:px-xl">
                        <FiPlay className="text-icon-sm" />
                        <span>Start Free Trial</span>
                    </button>
                    <button className="bg-background-primary text-text-primary border 
                        border-border-default rounded-xl hover:bg-background-muted hover:border-border-focus
                        transition-all duration-200 hover:scale-105 font-semibold flex items-center space-x-sm
                        px-lg py-md w-full sm:w-auto justify-center sm:px-xl">
                        <FiCode className="text-icon-sm" />
                        <span>View Documentation</span>
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-lg pt-xl border-t border-border-default/50">
                    {[
                        { icon: FiUsers, label: 'Active Users', value: '50K+' },
                        { icon: FiZap, label: 'Components', value: '200+' },
                        { icon: FiStar, label: 'GitHub Stars', value: '15K+' },
                        { icon: FiGlobe, label: 'Countries', value: '40+' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="flex justify-center mb-xs">
                                <stat.icon className="text-accent-default text-icon-lg" />
                            </div>
                            <div className="font-bold text-text-primary text-h5-sm sm:text-h4-md">
                                {stat.value}
                            </div>
                            <div className="text-text-secondary text-para-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const Features: React.FC = () => {
    const features = [
        {
            icon: FiLayers,
            title: 'Design Tokens',
            description: 'Consistent design language across all platforms with semantic naming and automatic theming.',
            color: 'from-blue-500 to-indigo-600'
        },
        {
            icon: FiCommand,
            title: 'Developer Experience',
            description: 'TypeScript support, auto-completion, and built-in validation for faster development.',
            color: 'from-emerald-500 to-teal-600'
        },
        {
            icon: FiFeather,
            title: 'Lightweight & Fast',
            description: 'Optimized for performance with tree-shaking and minimal bundle size impact.',
            color: 'from-amber-500 to-orange-600'
        },
        {
            icon: FiShield,
            title: 'Enterprise Ready',
            description: 'Battle-tested components with accessibility compliance and comprehensive testing.',
            color: 'from-purple-500 to-pink-600'
        },
        {
            icon: FiSmartphone,
            title: 'Responsive Design',
            description: 'Mobile-first approach with fluid layouts that adapt to any screen size perfectly.',
            color: 'from-rose-500 to-red-600'
        },
        {
            icon: FiTrendingUp,
            title: 'Scalable Architecture',
            description: 'Built to grow with your application from MVP to enterprise-scale solutions.',
            color: 'from-cyan-500 to-blue-600'
        }
    ];

    return (
        <section className="bg-background-primary relative overflow-hidden px-md py-2xl sm:px-lg sm:py-3xl lg:px-xl lg:py-4xl">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(var(--border-default)) 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-2xl sm:mb-3xl">
                    <div className="inline-flex items-center space-x-xs bg-accent-subtle border border-accent-default/20 
                                   rounded-full px-md py-xs text-accent-default font-medium text-para-sm mb-lg">
                        <FiZap className="text-icon-sm" />
                        <span>Powerful Features</span>
                    </div>
                    <h2 className="font-bold text-text-primary mb-md leading-tight text-h2-sm sm:text-h2-md lg:text-h1-sm">
                        Everything You Need to
                        <span className="bg-gradient-to-r from-accent-default to-accent-hover bg-clip-text text-transparent">
                            {' '}Build Amazing
                        </span>
                    </h2>
                    <p className="text-text-secondary max-w-3xl mx-auto leading-relaxed text-para-md sm:text-para-lg">
                        From design tokens to production-ready components, we've got everything
                        covered to accelerate your development workflow.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-xl">
                    {features.map((feature, i) => (
                        <div key={i} className="group bg-background-secondary rounded-2xl border border-border-default 
                            hover:border-border-focus hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                            p-lg sm:p-xl">

                            {/* Icon */}
                            <div className="relative mb-lg">
                                <div className={`bg-gradient-to-br ${feature.color} rounded-xl flex items-center 
                                    justify-center mb-sm group-hover:scale-110 transition-transform duration-300
                                    w-12 h-12 sm:w-16 sm:h-16`}>
                                    <feature.icon className="text-white text-icon-md sm:text-icon-lg" />
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="font-bold text-text-primary mb-sm group-hover:text-accent-default 
                                transition-colors duration-200 text-h6-sm sm:text-h5-md">
                                {feature.title}
                            </h3>
                            <p className="text-text-secondary leading-relaxed text-para-sm sm:text-para-md">
                                {feature.description}
                            </p>

                            {/* Hover Arrow */}
                            <div className="mt-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <FiArrowUpRight className="text-accent-default text-icon-md" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const About: React.FC = () => {
    return (
        <section className="bg-background-secondary relative overflow-hidden px-md py-2xl sm:px-lg sm:py-3xl lg:px-xl lg:py-4xl">

            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 right-20 w-64 h-64 bg-accent-default/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-subtle/30 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3xl items-center relative z-10">

                {/* Content */}
                <div className="space-y-lg sm:space-y-xl lg:pr-xl">

                    <div className="inline-flex items-center space-x-xs bg-accent-subtle border border-accent-default/20 
                                   rounded-full px-md py-xs text-accent-default font-medium text-para-sm">
                        <FiHeart className="text-icon-sm" />
                        <span>About Our Mission</span>
                    </div>

                    <h2 className="font-bold text-text-primary leading-tight text-h2-sm sm:text-h2-md lg:text-h1-sm">
                        Empowering Designers &
                        <span className="bg-gradient-to-r from-accent-default to-accent-hover bg-clip-text text-transparent">
                            {' '}Developers
                        </span>
                    </h2>

                    <p className="text-text-secondary leading-relaxed text-para-md sm:text-para-lg">
                        We believe in creating digital experiences that not only look beautiful but also
                        deliver exceptional value to users. Our design system bridges the gap between
                        design and development, ensuring consistency and efficiency.
                    </p>

                    {/* Values */}
                    <div className="space-y-md sm:space-y-lg">
                        {[
                            { icon: FiTarget, title: 'Innovation First', desc: 'Pushing boundaries with cutting-edge technology' },
                            { icon: FiUsers, title: 'User Centered', desc: 'Every decision made with users in mind' },
                            { icon: FiShield, title: 'Quality Driven', desc: 'Uncompromising standards in everything we build' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start space-x-md group">
                                <div className="bg-accent-default rounded-xl p-sm flex-shrink-0 
                                               group-hover:scale-110 transition-transform duration-200">
                                    <item.icon className="text-accent-foreground text-icon-md" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-text-primary mb-xs text-h6-sm sm:text-h5-md">
                                        {item.title}
                                    </h4>
                                    <p className="text-text-secondary text-para-sm sm:text-para-md">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-lg pt-lg border-t border-border-default/30">
                        {[
                            { value: '99%', label: 'Uptime' },
                            { value: '2M+', label: 'Downloads' },
                            { value: '150+', label: 'Companies' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="font-bold text-accent-default mb-xs text-h4-sm sm:text-h3-md">
                                    {stat.value}
                                </div>
                                <div className="text-text-secondary text-para-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Visual Element */}
                <div className="relative mt-xl lg:mt-0">
                    <div className="bg-gradient-to-br from-accent-subtle to-background-muted rounded-3xl 
                        flex flex-col items-center justify-center relative overflow-hidden border border-border-default
                        h-80 sm:h-96 lg:h-[500px]">

                        {/* Floating Icons */}
                        <div className="absolute inset-0">
                            <FiCode className="absolute top-8 left-8 text-accent-default text-icon-xl opacity-20" />
                            <FiLayers className="absolute top-12 right-12 text-accent-default text-icon-lg opacity-30" />
                            <FiCommand className="absolute bottom-16 left-16 text-accent-default text-icon-md opacity-25" />
                            <FiFeather className="absolute bottom-8 right-8 text-accent-default text-icon-xl opacity-20" />
                        </div>

                        {/* Center Content */}
                        <div className="text-center z-10">
                            <div className="bg-accent-default rounded-2xl p-lg mb-lg">
                                <FiZap className="text-accent-foreground text-icon-2xl" />
                            </div>
                            <h3 className="font-bold text-text-primary mb-sm text-h5-sm sm:text-h4-md">
                                Design System Hub
                            </h3>
                            <p className="text-text-secondary text-para-md max-w-xs mx-auto">
                                Centralized toolkit for modern development
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Blog: React.FC = () => {
    const blogPosts = [
        {
            icon: FiCode,
            category: 'Development',
            date: 'Jan 15, 2024',
            title: 'Building Scalable Design Systems',
            excerpt: 'Learn how to create design systems that grow with your product and team.',
            readTime: '5 min read',
            color: 'from-blue-500 to-indigo-600'
        },
        {
            icon: FiLayers,
            category: 'Design',
            date: 'Jan 12, 2024',
            title: 'The Future of Design Tokens',
            excerpt: 'Explore how design tokens are revolutionizing the way we build interfaces.',
            readTime: '7 min read',
            color: 'from-emerald-500 to-teal-600'
        },
        {
            icon: FiTrendingUp,
            category: 'Business',
            date: 'Jan 8, 2024',
            title: 'Measuring Design System Success',
            excerpt: 'Key metrics and KPIs to track the impact of your design system.',
            readTime: '4 min read',
            color: 'from-purple-500 to-pink-600'
        }
    ];

    return (
        <section className="bg-background-primary px-md py-2xl sm:px-lg sm:py-3xl lg:px-xl lg:py-4xl">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-2xl sm:mb-3xl">
                    <div className="inline-flex items-center space-x-xs bg-accent-subtle border border-accent-default/20 
                                   rounded-full px-md py-xs text-accent-default font-medium text-para-sm mb-lg">
                        <FiFeather className="text-icon-sm" />
                        <span>Latest Insights</span>
                    </div>
                    <h2 className="font-bold text-text-primary mb-md leading-tight text-h2-sm sm:text-h2-md lg:text-h1-sm">
                        From Our
                        <span className="bg-gradient-to-r from-accent-default to-accent-hover bg-clip-text text-transparent">
                            {' '}Blog
                        </span>
                    </h2>
                    <p className="text-text-secondary max-w-3xl mx-auto leading-relaxed text-para-md sm:text-para-lg">
                        Stay updated with the latest trends, best practices, and insights
                        from the world of design systems and development.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-xl">
                    {blogPosts.map((post, i) => (
                        <article key={i} className="group bg-background-secondary rounded-2xl overflow-hidden 
                                                   border border-border-default hover:border-border-focus 
                                                   hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                            {/* Image Area */}
                            <div className={`bg-gradient-to-br ${post.color} relative overflow-hidden h-48 sm:h-56`}>
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <post.icon className="text-white text-icon-2xl opacity-80" />
                                </div>
                                <div className="absolute top-md left-md">
                                    <span className="bg-white/20 backdrop-blur-sm text-white px-sm py-xs 
                                                   rounded-full text-para-sm font-medium">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-sm p-lg sm:p-xl">
                                <div className="flex items-center justify-between text-para-sm text-text-tertiary">
                                    <div className="flex items-center space-x-xs">
                                        <FiCalendar className="text-icon-sm" />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center space-x-xs">
                                        <FiClock className="text-icon-sm" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>

                                <h3 className="font-bold text-text-primary group-hover:text-accent-default 
                                    transition-colors duration-200 leading-tight text-h6-sm sm:text-h5-md">
                                    {post.title}
                                </h3>

                                <p className="text-text-secondary leading-relaxed text-para-sm sm:text-para-md">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-sm border-t border-border-default/30">
                                    <a href="#" className="font-semibold text-accent-default hover:text-accent-hover 
                                                         flex items-center space-x-xs group-hover:space-x-sm 
                                                         transition-all duration-200">
                                        <span>Read More</span>
                                        <FiArrowRight className="text-icon-sm group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-2xl">
                    <button className="bg-accent-subtle text-accent-default border border-accent-default/20 
                                     rounded-xl px-xl py-md hover:bg-accent-default hover:text-accent-foreground 
                                     transition-all duration-200 hover:scale-105 font-semibold 
                                     flex items-center space-x-sm mx-auto">
                        <span>View All Posts</span>
                        <FiArrowRight className="text-icon-sm" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export const Pricing: React.FC = () => {
    const plans = [
        {
            name: 'Starter',
            price: 29,
            description: 'Perfect for small teams getting started',
            features: ['Up to 5 team members', 'Basic components library', 'Email support', 'Community access'],
            icon: FiFeather,
            popular: false
        },
        {
            name: 'Professional',
            price: 79,
            description: 'Best for growing teams and projects',
            features: ['Up to 25 team members', 'Full component library', 'Priority support', 'Advanced customization', 'Design tokens', 'Version control'],
            icon: FiTrendingUp,
            popular: true
        },
        {
            name: 'Enterprise',
            price: 199,
            description: 'For large organizations with complex needs',
            features: ['Unlimited team members', 'Custom components', '24/7 dedicated support', 'On-premise deployment', 'SSO integration', 'Custom training'],
            icon: FiShield,
            popular: false
        }
    ];

    return (
        <section className="bg-background-secondary relative overflow-hidden px-md py-2xl sm:px-lg sm:py-3xl lg:px-xl lg:py-4xl">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(45deg, rgb(var(--border-default)) 25%, transparent 25%, transparent 75%, rgb(var(--border-default)) 75%), 
                                     linear-gradient(45deg, rgb(var(--border-default)) 25%, transparent 25%, transparent 75%, rgb(var(--border-default)) 75%)`,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px'
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Section Header */}
                <div className="text-center mb-2xl sm:mb-3xl">
                    <div className="inline-flex items-center space-x-xs bg-accent-subtle border border-accent-default/20 
                                   rounded-full px-md py-xs text-accent-default font-medium text-para-sm mb-lg">
                        <FiZap className="text-icon-sm" />
                        <span>Simple Pricing</span>
                    </div>
                    <h2 className="font-bold text-text-primary mb-md leading-tight text-h2-sm sm:text-h2-md lg:text-h1-sm">
                        Choose Your
                        <span className="bg-gradient-to-r from-accent-default to-accent-hover bg-clip-text text-transparent">
                            {' '}Perfect Plan
                        </span>
                    </h2>
                    <p className="text-text-secondary max-w-3xl mx-auto leading-relaxed text-para-md sm:text-para-lg">
                        Start building amazing products today. Upgrade or downgrade at any time.
                        No hidden fees, no surprises.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-xl">
                    {plans.map((plan) => (
                        <div key={plan.name} className={`relative rounded-3xl border-2 transition-all duration-300
                            ${plan.popular
                                ? 'bg-accent-subtle border-accent-default shadow-2xl scale-105'
                                : 'bg-background-primary border-border-default hover:border-border-focus hover:shadow-xl'
                            }
                            p-lg sm:p-xl`}>

                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-accent-default text-accent-foreground px-md py-xs rounded-full 
                                                   text-para-sm font-bold flex items-center space-x-xs">
                                        <FiStar className="text-icon-sm" />
                                        <span>Most Popular</span>
                                    </div>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="text-center mb-xl">
                                <plan.icon className={`mx-auto mb-md text-icon-xl
                                    ${plan.popular ? 'text-accent-default' : 'text-text-secondary'}`} />

                                <h3 className={`font-bold mb-xs text-h4-sm sm:text-h3-md
                                    ${plan.popular ? 'text-accent-default' : 'text-text-primary'}`}>
                                    {plan.name}
                                </h3>

                                <p className={`text-text-secondary mb-lg text-para-sm sm:text-para-md`}>
                                    {plan.description}
                                </p>

                                <div className="flex items-baseline justify-center">
                                    <span className={`font-bold text-h1-sm sm:text-h1-md
                                        ${plan.popular ? 'text-accent-default' : 'text-text-primary'}`}>
                                        ${plan.price}
                                    </span>
                                    <span className="text-text-secondary text-para-md ml-xs">/month</span>
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="mb-xl space-y-sm sm:space-y-md">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-start space-x-sm">
                                        <FiCheck className={`text-icon-md mt-xs flex-shrink-0
                                            ${plan.popular ? 'text-accent-default' : 'text-text-success'}`} />
                                        <span className="text-text-secondary leading-relaxed text-para-sm sm:text-para-md">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <button className={`w-full rounded-xl transition-all duration-200 hover:scale-105 
                                font-semibold flex items-center justify-center space-x-sm py-md sm:py-lg
                                ${plan.popular
                                    ? 'bg-accent-default text-accent-foreground hover:bg-accent-hover shadow-lg'
                                    : 'bg-background-secondary text-text-primary border border-border-default hover:bg-background-muted hover:border-border-focus'}`}>
                                <span>Get Started</span>
                                <FiArrowRight className="text-icon-sm" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-2xl p-xl bg-background-primary rounded-2xl border border-border-default">
                    <h3 className="font-bold text-text-primary mb-sm text-h5-sm sm:text-h4-md">
                        Need a custom plan?
                    </h3>
                    <p className="text-text-secondary mb-lg text-para-sm sm:text-para-md">
                        Contact our sales team to discuss enterprise solutions and custom pricing.
                    </p>
                    <button className="bg-accent-subtle text-accent-default border border-accent-default/20 
                                     rounded-xl px-xl py-md hover:bg-accent-default hover:text-accent-foreground 
                                     transition-all duration-200 font-semibold flex items-center space-x-sm mx-auto">
                        <FiMail className="text-icon-sm" />
                        <span>Contact Sales</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export const CTA: React.FC = () => {
    return (
        <section className="bg-gradient-to-br from-accent-default via-accent-hover to-accent-default 
            relative overflow-hidden px-md py-2xl sm:px-lg sm:py-3xl lg:px-xl lg:py-4xl">

            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 overflow-hidden">
                <FiCode className="absolute top-20 left-20 text-white/20 text-icon-xl animate-pulse" />
                <FiLayers className="absolute top-32 right-32 text-white/20 text-icon-lg animate-pulse delay-300" />
                <FiZap className="absolute bottom-20 left-32 text-white/20 text-icon-md animate-pulse delay-700" />
                <FiFeather className="absolute bottom-32 right-20 text-white/20 text-icon-xl animate-pulse delay-1000" />
            </div>

            <div className="max-w-5xl mx-auto text-center relative z-10 space-y-lg sm:space-y-xl">

                {/* Icon */}
                <div className="flex justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-lg">
                        <FiZap className="text-white text-icon-2xl" />
                    </div>
                </div>

                {/* Heading */}
                <h2 className="font-bold text-white leading-tight text-h2-sm sm:text-h2-md lg:text-h1-sm">
                    Ready to Transform Your
                    <br />Development Workflow?
                </h2>

                {/* Description */}
                <p className="text-white/90 max-w-3xl mx-auto leading-relaxed text-para-md sm:text-para-lg">
                    Join thousands of developers and designers who are already building
                    amazing products with our design system. Start your free trial today.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-lg py-xl">
                    {[
                        { icon: FiUsers, value: '50K+', label: 'Happy Users' },
                        { icon: FiStar, value: '4.9/5', label: 'Rating' },
                        { icon: FiZap, value: '99.9%', label: 'Uptime' },
                        { icon: FiShield, value: '24/7', label: 'Support' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <stat.icon className="text-white/80 text-icon-lg mx-auto mb-xs" />
                            <div className="font-bold text-white mb-xs text-h5-sm sm:text-h4-md">
                                {stat.value}
                            </div>
                            <div className="text-white/80 text-para-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-sm sm:gap-md">
                    <button className="bg-white text-accent-default rounded-xl 
                        hover:bg-gray-50 transition-all duration-200 hover:scale-105 
                        shadow-xl hover:shadow-2xl font-bold flex items-center space-x-sm
                        px-xl py-lg w-full sm:w-auto justify-center sm:px-2xl">
                        <FiPlay className="text-icon-md" />
                        <span className="text-para-lg">Start Free Trial</span>
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 
                        rounded-xl hover:bg-white/30 hover:border-white/50 transition-all duration-200 
                        hover:scale-105 font-semibold flex items-center space-x-sm
                        px-xl py-lg w-full sm:w-auto justify-center sm:px-2xl">
                        <FiCode className="text-icon-md" />
                        <span className="text-para-lg">View Demo</span>
                    </button>
                </div>

                {/* Trust Badges */}
                <div className="pt-xl border-t border-white/20">
                    <p className="text-white/80 text-para-sm mb-md">Trusted by industry leaders</p>
                    <div className="flex justify-center items-center space-x-xl opacity-60">
                        {[FiGithub, FiCode, FiLayers, FiCommand, FiFeather].map((Icon, i) => (
                            <Icon key={i} className="text-white text-icon-xl" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Footer: React.FC = () => {
    const footerSections = [
        {
            title: 'Product',
            links: ['Features', 'Pricing', 'Documentation', 'Changelog', 'Roadmap']
        },
        {
            title: 'Company',
            links: ['About', 'Blog', 'Careers', 'Press', 'Contact']
        },
        {
            title: 'Resources',
            links: ['Help Center', 'Community', 'Tutorials', 'API Reference', 'Status']
        },
        {
            title: 'Legal',
            links: ['Privacy', 'Terms', 'Security', 'Cookies', 'Compliance']
        }
    ];

    return (
        <footer className="bg-background-dark relative overflow-hidden px-md py-xl sm:px-lg sm:py-2xl lg:px-xl lg:py-3xl">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgb(var(--text-lightSecondary)) 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-xl mb-2xl">

                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-sm mb-lg">
                            <div className="bg-gradient-to-br from-accent-default to-accent-hover p-xs rounded-xl">
                                <FiZap className="text-accent-foreground text-icon-lg" />
                            </div>
                            <h3 className="font-bold text-text-light text-h5-sm sm:text-h4-md">
                                DesignFlow
                            </h3>
                        </div>
                        <p className="text-text-lightSecondary mb-lg leading-relaxed text-para-sm sm:text-para-md">
                            Building amazing digital experiences with the most advanced design system
                            toolkit for modern development teams.
                        </p>
                    </div>

                    {/* Footer Sections */}
                    {footerSections.map((section) => (
                        <div key={section.title} className="lg:col-span-1">
                            <h4 className="font-bold text-text-light mb-lg text-h6-sm sm:text-h5-md">
                                {section.title}
                            </h4>
                            <ul className="space-y-sm sm:space-y-md">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-text-lightSecondary hover:text-text-light 
                                                               transition-colors duration-200 hover:translate-x-1 
                                                               inline-block text-para-sm sm:text-para-md">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border-default/30 pt-xl text-center sm:flex sm:items-center sm:justify-between space-y-md sm:space-y-0">
                    <div className="text-text-lightSecondary text-para-sm sm:text-para-md">
                        © 2024 DesignFlow. All rights reserved. Built with ❤️ for developers and designers.
                    </div>
                </div>
            </div>
        </footer>
    );
};