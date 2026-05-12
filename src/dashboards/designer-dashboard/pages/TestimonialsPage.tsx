import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiStarFill, RiStarLine, RiDoubleQuotesL, RiUser3Line, RiFileList3Line, RiThumbUpLine, RiLightbulbLine, RiBarChartBoxLine } from 'react-icons/ri';
import { retriveAllDesignerTestimonials } from '@/lib/requests/TestimonialRequest';

interface Testimonial {
  id: string;
  project_id: string;
  client_email: string;
  rating: number;
  quote?: string;
  tags?: string[];
  recommend?: string;
  standout?: string;
  created_at: string;
}

interface TestimonialStats {
  total: number;
  avg_rating: number;
  top_rated: number;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= Math.round(rating)
            ? <RiStarFill className="text-amber-400 text-sm" />
            : <RiStarLine className="text-border-default text-sm" />
          }
        </span>
      ))}
    </div>
  );
};

const StatCard = ({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-background-primary border border-border-default rounded-2xl p-5 flex items-center gap-4"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-text-tertiary text-xs font-medium uppercase tracking-wide">{label}</p>
      <p className="text-text-primary text-2xl font-bold mt-0.5">{value}</p>
    </div>
  </motion.div>
);

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  const initials = testimonial.client_email.slice(0, 2).toUpperCase();
  const formattedDate = new Date(testimonial.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-background-primary border border-border-default rounded-2xl p-6 flex flex-col gap-4 hover:border-accent-default/40 hover:shadow-lg transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-default to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-text-primary text-sm font-medium truncate max-w-[180px]">
              {testimonial.client_email}
            </p>
            <p className="text-text-tertiary text-xs">{formattedDate}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StarRating rating={testimonial.rating} />
          <span className="text-text-secondary text-xs font-semibold">{testimonial.rating.toFixed(1)}/5</span>
        </div>
      </div>

      {/* Quote */}
      {testimonial.quote && (
        <div className="relative">
          <RiDoubleQuotesL className="text-accent-default/20 text-4xl absolute -top-1 -left-1" />
          <p className="text-text-secondary text-sm leading-relaxed pl-6 italic">
            {testimonial.quote}
          </p>
        </div>
      )}

      {/* Standout */}
      {testimonial.standout && (
        <div className="flex items-start gap-2 bg-accent-subtle rounded-xl px-3 py-2">
          <RiLightbulbLine className="text-accent-default text-sm mt-0.5 flex-shrink-0" />
          <p className="text-text-secondary text-xs leading-relaxed">
            <span className="text-accent-default font-medium">Standout: </span>
            {testimonial.standout}
          </p>
        </div>
      )}

      {/* Recommend */}
      {testimonial.recommend && (
        <div className="flex items-center gap-2">
          <RiThumbUpLine className="text-emerald-500 text-sm" />
          <p className="text-text-secondary text-xs">{testimonial.recommend}</p>
        </div>
      )}

      {/* Tags */}
      {testimonial.tags && testimonial.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-border-default">
          {testimonial.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-background-secondary border border-border-default rounded-full text-text-secondary text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState<TestimonialStats>({ total: 0, avg_rating: 0, top_rated: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'top' | 'recent'>('all');

  useEffect(() => {
    setLoading(true);
    retriveAllDesignerTestimonials()
      .then((res) => {
        const { testimonials, stats } = res.data;
        setTestimonials(testimonials ?? []);
        setStats(stats ?? { total: 0, avg_rating: 0, top_rated: 0 });
      })
      .catch(() => setError('Failed to load testimonials.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = [...testimonials].sort((a, b) => {
    if (filter === 'top') return b.rating - a.rating;
    if (filter === 'recent') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    return 0;
  });

  return (
    <div className="min-h-screen bg-background-secondary p-6 lg:p-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-text-primary text-2xl font-bold">Testimonials</h1>
        <p className="text-text-tertiary text-sm mt-1">What your clients say about working with you</p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-border-muted border-t-accent-default rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-text-tertiary text-sm">{error}</p>
        </div>
      ) : (
        <>
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatCard
              label="Total Reviews"
              value={stats.total}
              icon={<RiFileList3Line />}
              color="bg-blue-500/10 text-blue-500"
            />
            <StatCard
              label="Average Rating"
              value={stats.avg_rating > 0 ? stats.avg_rating.toFixed(1) : '—'}
              icon={<RiBarChartBoxLine />}
              color="bg-amber-500/10 text-amber-500"
            />
            <StatCard
              label="Top Rated (4.5+)"
              value={stats.top_rated}
              icon={<RiStarFill />}
              color="bg-emerald-500/10 text-emerald-500"
            />
          </div>

          {testimonials.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-64 bg-background-primary border border-border-default rounded-2xl"
            >
              <RiUser3Line className="text-text-tertiary text-4xl mb-3" />
              <p className="text-text-secondary font-medium">No testimonials yet</p>
              <p className="text-text-tertiary text-sm mt-1">Client reviews will appear here after project completion</p>
            </motion.div>
          ) : (
            <>
              {/* Filter Tabs */}
              <div className="flex items-center gap-2 mb-6">
                {(['all', 'top', 'recent'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === f
                      ? 'bg-accent-default text-accent-foreground'
                      : 'bg-background-primary border border-border-default text-text-secondary hover:border-accent-default'
                      }`}
                  >
                    {f === 'all' ? 'All' : f === 'top' ? 'Top Rated' : 'Most Recent'}
                  </button>
                ))}
                <span className="ml-auto text-text-tertiary text-sm">{stats.total} reviews</span>
              </div>

              {/* Cards Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={filter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                  {filtered.map((testimonial, index) => (
                    <TestimonialCard
                      key={testimonial.id}
                      testimonial={testimonial}
                      index={index}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TestimonialsPage;
