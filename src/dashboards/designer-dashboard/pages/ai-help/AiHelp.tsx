import { useState, useEffect } from 'react';
import { FiSearch, FiPlay, FiFileText, FiGrid, FiList, FiCheck, FiClock, FiInfo, FiChevronDown } from 'react-icons/fi';
import { HiSparkles, HiLightningBolt, HiDocumentText } from 'react-icons/hi';
import { mockComponents, mockProjects, sampleBriefs } from '@/mock-data/designer.ai-help.mock';
import FormButton from '@/components/auth/form/components/FormButton';
import SimpleButton from '@/components/demos/buttons/SimpleButton';
import Heading from '@/components/demos/typography/Heading';
import Para from '@/comman-components/Para';
import Dropdown from '@/comman-components/Dropdown';
import { getAllProjectsByDesignerEmail } from '@/lib/requests/ProjectRequest';
import { ensureEmbeddings } from '@/lib/requests/AiRequest';
import { getIntakeByClientEmail } from '@/lib/requests/IntakeRequest';
import GlobalSpinner from '@/components/ant-design-spinner/Spinner';

const AiHelp = () => {
    const [activeTab, setActiveTab] = useState('embeddings');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProject, setSelectedProject] = useState('1');
    const [viewMode, setViewMode] = useState('grid');
    const [generatedBrief, setGeneratedBrief] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [clientEmail, setClientEmail] = useState('');
    const [designerEmail, setDesignerEmail] = useState('');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const [isEmbedding, setIsEmbedding] = useState<number | null>(null);

    useEffect(() => {
        const callAllProjects = async () => {
            setLoading(true);
            try {
                const projectsRes = await getAllProjectsByDesignerEmail();

                const mappedProjects: any[] = [];

                for (const p of projectsRes.data) {
                    // Call embeddings API
                    const embRes = await ensureEmbeddings({ project_id: p.id });

                    // Get intake
                    const intakeRes = await getIntakeByClientEmail({ client_email: p.client_email });
                    const intake = intakeRes.data?.data; // <-- this is either object or null

                    // Derive status
                    let status = "embedded";
                    if (p.intake_completed && p.swiper_completed) status = "completed";
                    if ((embRes?.components_indexed || 0) === 0) status = "no-components";

                    mappedProjects.push({
                        id: p.id,
                        name: p.project_name,
                        status,
                        lastUpdate: new Date(p.last_updated).toLocaleDateString(),
                        components: embRes?.components_indexed || 0,
                        client: p.client_email,
                        designer: p.designer_email,
                        intakeMissing: intake == null, // ✅ true if missing
                    });

                    console.log("Intake check:", p.client_email, intakeRes.data, "-> intakeMissing:", intake == null);
                }

                setProjects(mappedProjects);
            } catch (error) {
                console.error("Failed to load projects:", error);
            } finally {
                setLoading(false);
            }
        };

        callAllProjects();
    }, []);

    // Mock function to generate brief
    const handleGenerateBrief = () => {
        setIsGenerating(true);
        setTimeout(() => {
            // Find the sample brief for selected project
            const selectedBrief = sampleBriefs.find(b => b.projectName === mockProjects.find(p => p.id === parseInt(selectedProject))?.name);
            setGeneratedBrief(selectedBrief?.brief || sampleBriefs[0].brief);
            setIsGenerating(false);
        }, 2000);
    };

    // Mock function to ensure embeddings
    const handleEnsureEmbeddings = (projectId: number) => {
        setIsEmbedding(projectId);
        setTimeout(() => {
            console.log('Embeddings ensured for project:', projectId);
            setIsEmbedding(null);
            // In real implementation, update the project status
        }, 2000);
    };

    // Convert projects to dropdown items
    const projectDropdownItems = mockProjects.map(project => ({
        id: project.id.toString(),
        label: project.name,
        onClick: () => setSelectedProject(project.id.toString())
    }));

    // Get current selected project name
    const currentProject = mockProjects.find(p => p.id === parseInt(selectedProject));

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-lg">
                    <div className="flex items-center gap-sm mb-sm">
                        <HiSparkles className="text-icon-lg text-accent-default" />
                        <Heading level="h2" color="primary" weight="bold">
                            AI Design Assistant
                        </Heading>
                    </div>
                    <Para size="md" color="secondary">
                        Leverage AI to generate briefs, manage embeddings, and find similar components
                    </Para>
                </div>

                {/* Tabs */}
                <div className="flex max-lg:flex-col gap-xs mb-lg border-b border-border-default">
                    <SimpleButton
                        onClick={() => setActiveTab('embeddings')}
                        variant="ghost"
                        className={`px-md py-sm text-para-md font-medium transition-all ${activeTab === 'embeddings'
                            ? 'text-accent-default border-b-2 border-accent-default'
                            : 'text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        <div className="flex items-center gap-sm">
                            <HiLightningBolt className="text-icon-sm" />
                            <span>Embeddings</span>
                        </div>
                    </SimpleButton>
                    <SimpleButton
                        onClick={() => setActiveTab('brief')}
                        variant="ghost"
                        className={`px-md py-sm text-para-md font-medium transition-all ${activeTab === 'brief'
                            ? 'text-accent-default border-b-2 border-accent-default'
                            : 'text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        <div className="flex items-center gap-sm">
                            <FiFileText className="text-icon-sm" />
                            <span>AI Brief Generator</span>
                        </div>
                    </SimpleButton>
                    <SimpleButton
                        onClick={() => setActiveTab('similar')}
                        variant="ghost"
                        className={`px-md py-sm text-para-md font-medium transition-all ${activeTab === 'similar'
                            ? 'text-accent-default border-b-2 border-accent-default'
                            : 'text-text-secondary hover:text-text-primary'
                            }`}
                    >
                        <div className="flex items-center gap-sm">
                            <FiSearch className="text-icon-sm" />
                            <span>Similar Components</span>
                        </div>
                    </SimpleButton>
                </div>

                {/* Content */}
                <div className="bg-background-primary rounded-xl shadow-lg border border-border-default">
                    {/* Embeddings Tab */}
                    {activeTab === 'embeddings' && (
                        <div className="p-lg">
                            <div className="mb-md">
                                <Heading level="h4" color="primary" weight="semibold" className="mb-sm">
                                    Project Embeddings
                                </Heading>
                                <Para size="sm" color="secondary">
                                    Ensure all components in your projects are embedded for AI processing
                                </Para>
                            </div>


                            {loading ? <GlobalSpinner /> : (
                                <div className="space-y-sm">
                                    {projects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="flex items-center justify-between p-md bg-background-secondary rounded-lg border border-border-default hover:border-border-muted transition-colors"
                                        >
                                            <div className="flex-1">
                                                <Heading
                                                    level="h6"
                                                    color="primary"
                                                    weight="medium"
                                                    className="text-para-lg"
                                                >
                                                    {project.name}
                                                </Heading>

                                                <div className="flex items-center gap-md mt-xs">
                                                    <span
                                                        className={`flex items-center gap-xs text-para-sm ${project.status === "embedded"
                                                            ? "text-text-success"
                                                            : "text-text-warning"
                                                            }`}
                                                    >
                                                        {project.status === "embedded" ? <FiCheck /> : <FiClock />}
                                                        {project.status === "embedded" ? "Embedded" : "Pending"}
                                                    </span>
                                                    <Para size="sm" color="tertiary" className="!mb-0">
                                                        Last updated: {project.lastUpdate}
                                                    </Para>
                                                </div>

                                                {/* Intake warning */}
                                                {project.intakeMissing && (
                                                    <Para size="sm" color="warning" className="mt-xs">
                                                        ⚠️ Intake data missing — please complete intake to enable embedding
                                                    </Para>
                                                )}
                                            </div>

                                            <FormButton
                                                onClick={() => handleEnsureEmbeddings(project.id)}
                                                isLoading={isEmbedding === project.id}
                                                variant="solid"
                                                size="md"
                                                disabled={project.intakeMissing} // 🔥 disable if intake is missing
                                            >
                                                {isEmbedding === project.id ? (
                                                    'Processing...'
                                                ) : (
                                                    <>
                                                        <FiPlay className="text-icon-sm mr-xs" />
                                                        {project.intakeMissing
                                                            ? 'Intake Required' // 🔥 show proper text
                                                            : project.status === 'embedded'
                                                                ? 'Re-embed'
                                                                : 'Embed Now'}
                                                    </>
                                                )}
                                            </FormButton>

                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="mt-lg p-md bg-background-info rounded-lg border border-border-info">
                                <div className="flex gap-sm">
                                    <FiInfo className="text-icon-sm text-text-info flex-shrink-0 mt-px" />
                                    <div>
                                        <Para size="sm" color="info" weight="medium" className="mb-xs">
                                            What are embeddings?
                                        </Para>
                                        <Para size="sm" color="secondary">
                                            Embeddings convert your project components into AI-readable formats, enabling semantic search and intelligent recommendations.
                                        </Para>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Brief Generator Tab */}
                    {activeTab === 'brief' && (
                        <div className="p-lg">
                            <div className="mb-md">
                                <Heading level="h4" color="primary" weight="semibold" className="mb-sm">
                                    AI Brief Generator
                                </Heading>
                                <Para size="sm" color="secondary">
                                    Generate comprehensive design briefs powered by AI
                                </Para>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
                                <div className="space-y-md">
                                    <div>
                                        <label className="block text-para-sm font-medium text-text-primary mb-xs">
                                            Select Project
                                        </label>
                                        <Dropdown
                                            trigger={
                                                <div className="w-full px-md py-sm bg-background-secondary border border-border-default rounded-lg text-text-primary hover:border-border-focus outline-none transition-colors flex items-center justify-between cursor-pointer">
                                                    <span>{currentProject?.name || 'Select a project'}</span>
                                                    <FiChevronDown className="text-icon-sm text-text-tertiary" />
                                                </div>
                                            }
                                            items={projectDropdownItems}
                                            align="left"
                                            width="w-full"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-para-sm font-medium text-text-primary mb-xs">
                                            Client Email
                                        </label>
                                        <input
                                            type="email"
                                            value={clientEmail}
                                            onChange={(e) => setClientEmail(e.target.value)}
                                            placeholder="client@example.com"
                                            className="w-full px-md py-sm bg-background-secondary border border-border-default rounded-lg text-text-primary placeholder-text-tertiary focus:border-border-focus outline-none transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-para-sm font-medium text-text-primary mb-xs">
                                            Designer Email
                                        </label>
                                        <input
                                            type="email"
                                            value={designerEmail}
                                            onChange={(e) => setDesignerEmail(e.target.value)}
                                            placeholder="designer@example.com"
                                            className="w-full px-md py-sm bg-background-secondary border border-border-default rounded-lg text-text-primary placeholder-text-tertiary focus:border-border-focus outline-none transition-colors"
                                        />
                                    </div>

                                    <FormButton
                                        onClick={handleGenerateBrief}
                                        isLoading={isGenerating}
                                        variant="solid"
                                        size="md"
                                        fullWidth
                                    >
                                        {!isGenerating && (
                                            <>
                                                <HiDocumentText className="text-icon-sm mr-sm" />
                                                Generate Brief
                                            </>
                                        )}
                                        {isGenerating && 'Generating...'}
                                    </FormButton>
                                </div>

                                <div className="bg-background-secondary rounded-lg p-md border border-border-default">
                                    <Heading level="h6" color="primary" weight="medium" className="text-para-lg mb-sm">
                                        Generated Brief
                                    </Heading>
                                    {generatedBrief ? (
                                        <div className="prose prose-sm max-w-none">
                                            <div className="text-para-sm text-text-secondary whitespace-pre-wrap">
                                                {generatedBrief}
                                            </div>
                                        </div>
                                    ) : (
                                        <Para size="sm" color="tertiary" className="italic">
                                            Brief will appear here after generation...
                                        </Para>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Similar Components Tab */}
                    {activeTab === 'similar' && (
                        <div className="p-lg">
                            <div className="mb-md">
                                <Heading level="h4" color="primary" weight="semibold" className="mb-sm">
                                    Find Similar Components
                                </Heading>
                                <Para size="sm" color="secondary">
                                    Search for components using AI-powered semantic search
                                </Para>
                            </div>

                            <div className="mb-md">
                                <div className="flex gap-sm mb-md">
                                    <div className="flex-1 relative">
                                        <FiSearch className="absolute left-md top-1/2 -translate-y-1/2 text-icon-sm text-text-tertiary" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="e.g., minimalist landing page, bold testimonial section..."
                                            className="w-full pl-xl pr-md py-sm bg-background-secondary border border-border-default rounded-lg text-text-primary placeholder-text-tertiary focus:border-border-focus outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="flex gap-xs">
                                        <SimpleButton
                                            onClick={() => setViewMode('grid')}
                                            variant={viewMode === 'grid' ? 'solid' : 'ghost'}
                                            size="sm"
                                        >
                                            <FiGrid className="text-icon-sm" />
                                        </SimpleButton>
                                        <SimpleButton
                                            onClick={() => setViewMode('list')}
                                            variant={viewMode === 'list' ? 'solid' : 'ghost'}
                                            size="sm"
                                        >
                                            <FiList className="text-icon-sm" />
                                        </SimpleButton>
                                    </div>
                                </div>

                                <div className="flex gap-sm mb-md items-center">
                                    <Dropdown
                                        trigger={
                                            <div className="px-md py-xs bg-background-secondary border border-border-default rounded-lg text-para-sm text-text-primary hover:border-border-focus outline-none transition-colors flex items-center gap-sm cursor-pointer">
                                                <span>{currentProject?.name || 'Select a project'}</span>
                                                <FiChevronDown className="text-icon-sm text-text-tertiary" />
                                            </div>
                                        }
                                        items={projectDropdownItems}
                                        align="left"
                                        width="w-64"
                                    />
                                    <Para size="sm" color="tertiary" className="!mb-0">
                                        {mockComponents.length} components found
                                    </Para>
                                </div>
                            </div>

                            {/* Results */}
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">
                                    {mockComponents.map((component) => (
                                        <div
                                            key={component.id}
                                            className="bg-background-secondary rounded-lg border border-border-default hover:border-border-muted transition-all hover:shadow-md cursor-pointer group"
                                        >
                                            <div className="aspect-video relative overflow-hidden rounded-t-lg bg-background-muted">
                                                <img
                                                    src={component.src}
                                                    alt={component.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                />
                                                <div className="absolute top-sm right-sm">
                                                    <span className="px-sm py-xs bg-accent-default text-text-on-accent text-para-xs rounded-full font-medium">
                                                        {component.relevance}% match
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-md">
                                                <Heading level="h6" color="primary" weight="medium" className="text-para-md mb-xs">
                                                    {component.name}
                                                </Heading>
                                                <div className="flex items-center gap-sm text-para-sm text-text-secondary">
                                                    <span className="px-sm py-px bg-background-accent text-text-info rounded">{component.type}</span>
                                                    <span>•</span>
                                                    <span>{component.vibe}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-sm">
                                    {mockComponents.map((component) => (
                                        <div
                                            key={component.id}
                                            className="flex items-center gap-md p-md bg-background-secondary rounded-lg border border-border-default hover:border-border-muted transition-all hover:shadow-md cursor-pointer"
                                        >
                                            <div className="w-24 h-16 rounded-lg overflow-hidden bg-background-muted flex-shrink-0">
                                                <img
                                                    src={component.src}
                                                    alt={component.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <Heading level="h6" color="primary" weight="medium" className="text-para-md mb-xs">
                                                    {component.name}
                                                </Heading>
                                                <div className="flex items-center gap-sm text-para-sm text-text-secondary">
                                                    <span className="px-sm py-px bg-background-accent text-text-info rounded">{component.type}</span>
                                                    <span>•</span>
                                                    <span>{component.vibe}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="px-md py-sm bg-accent-subtle text-accent-default text-para-sm rounded-lg font-medium">
                                                    {component.relevance}% match
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Search Tips */}
                            <div className="mt-lg p-md bg-background-info rounded-lg border border-border-info">
                                <div className="flex gap-sm">
                                    <HiSparkles className="text-icon-sm text-text-info flex-shrink-0 mt-px" />
                                    <div>
                                        <Para size="sm" color="info" weight="medium" className="mb-xs">
                                            Pro Search Tips
                                        </Para>
                                        <Para size="sm" color="secondary">
                                            Try semantic searches like "trustworthy testimonials", "energetic hero sections", or "conversion-focused CTAs" to find components that match your design intent.
                                        </Para>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AiHelp;