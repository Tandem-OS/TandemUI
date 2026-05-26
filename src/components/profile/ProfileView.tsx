import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Card from "@/common-components/Card";
import { getUser } from "@/lib/requests/ProfileRequest";

interface ProfileData {
  id: string;
  name: string;
  user_email: string;
  designer_email: string | null;
  role: string;
  plan: string;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
  last_logout_at: string | null;
}

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => (
  <div className="flex justify-between text-sm text-text-secondary">
    <span>{label}</span>
    <span>{value ?? "—"}</span>
  </div>
);

const PlanBadge = ({ plan }: { plan: string }) => {
  const isPro = plan?.toLowerCase() === "pro";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${isPro
        ? "bg-accent-default/10 text-accent-default"
        : "bg-gray-100 text-text-secondary"
        }`}
    >
      {isPro ? "⚡ Pro" : "Free"}
    </span>
  );
};

const ProfileView: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUser();
        setProfile(response?.data || null);
      } catch (err) {
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="px-6 py-8 max-w-3xl w-full mx-auto animate-pulse">
        <Card padding="xl">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-300" />
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gray-300 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="px-6 py-8 text-center text-red-500">
        {error || "Profile not found."}
      </div>
    );
  }

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3 }}
      className="px-6 py-8"
    >
      <div className="max-w-3xl w-full mx-auto space-y-4">

        {/* Top card — identity */}
        <Card padding="xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden shadow border bg-accent-default/10 flex items-center justify-center">
                <img
                  src="/images/avatar.png"
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <span className="hidden text-2xl font-bold text-accent-default">
                  {initials}
                </span>
              </div>
              {profile.plan?.toLowerCase() === "pro" && (
                <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent-default rounded-full flex items-center justify-center text-white text-xs shadow">
                  ⚡
                </span>
              )}
            </div>

            <div className="flex-1 space-y-1.5 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h2 className="text-h5 font-semibold text-text-primary">
                  {profile.name}
                </h2>
                <PlanBadge plan={profile.plan} />
              </div>
              <p className="text-para-sm text-text-secondary">{profile.user_email}</p>
              <span className="text-para-xs font-medium text-accent-default">
                {profile.role}
              </span>
            </div>
          </div>
        </Card>

        {/* Bottom card — account details */}
        <Card padding="xl">
          <h3 className="text-para-sm font-semibold text-text-primary mb-4">
            Account Details
          </h3>
          <div className="space-y-3">
            <InfoRow label="Email" value={profile.user_email} />
            {profile.designer_email && (
              <InfoRow label="Designer email" value={profile.designer_email} />
            )}
            <InfoRow label="Role" value={profile.role} />
            <InfoRow
              label="Plan"
              value={profile.plan?.charAt(0).toUpperCase() + profile.plan?.slice(1)}
            />
            <div className="border-t pt-3 mt-1 space-y-3">
              <InfoRow
                label="Member since"
                value={format(new Date(profile.created_at), "PPP")}
              />
              <InfoRow
                label="Last updated"
                value={format(new Date(profile.updated_at), "PPP")}
              />
              <InfoRow
                label="Last login"
                value={
                  profile.last_login_at
                    ? format(new Date(profile.last_login_at), "PPP p")
                    : null
                }
              />
              <InfoRow
                label="Last logout"
                value={
                  profile.last_logout_at
                    ? format(new Date(profile.last_logout_at), "PPP p")
                    : null
                }
              />
            </div>
          </div>
        </Card>

      </div>
    </motion.div>
  );
};

export default ProfileView;
