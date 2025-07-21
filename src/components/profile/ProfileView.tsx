import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Card from "@/comman-components/Card";
import { getUser } from "@/lib/requests/ProfileRequest";

interface ProfileData {
  name: string;
  user_email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm text-text-secondary">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

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
        console.error("Failed to fetch profile:", err);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3 }}
      className="px-6 py-8"
    >
      <Card padding="xl" className="max-w-3xl w-full mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden shadow border">
            <img
              src="/images/avatar.png"
              alt={profile.name}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = "/images/fallback-avatar.png")}
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h2 className="text-h5 font-semibold text-text-primary">{profile.name}</h2>
            <p className="text-para-sm text-text-secondary">{profile.user_email}</p>
            <span className="text-para-xs font-medium text-accent-default">
              {profile.role}
            </span>

            <div className="border-t pt-4 mt-4 space-y-1">
              <InfoRow
                label="Member since:"
                value={format(new Date(profile.created_at), "PPP")}
              />
              <InfoRow
                label="Last updated:"
                value={format(new Date(profile.updated_at), "PPP")}
              />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfileView;
