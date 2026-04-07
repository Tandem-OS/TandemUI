import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "@/components/auth/form/components/Input";
import FormButton from "@/components/auth/form/components/FormButton";
import { fadeInLeft } from "@/lib/animations/variants";
import { magicLinkData } from "@/lib/requests/AuthRequest";
import { FaCheckCircle } from "react-icons/fa";

interface MagicLinkModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MagicLinkModal: React.FC<MagicLinkModalProps> = ({ isOpen, setIsOpen }) => {
  const [form, setForm] = React.useState({ client_name: "", client_email: "" });
  const [errors, setErrors] = React.useState<{ client_name?: string; client_email?: string }>({});
  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const validate = () => {
    const newErrors: { client_name?: string; client_email?: string } = {};
    if (!form.client_name.trim()) newErrors.client_name = "Name is required";
    if (!form.client_email.trim()) newErrors.client_email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.client_email)) newErrors.client_email = "Invalid email";
    return newErrors;
  };

  const handleSend = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const result = await magicLinkData(form);
      if (result.status) {
        setSuccessMessage("Magic link sent successfully!");
        setForm({ client_name: "", client_email: "" });

        // Auto-close modal after delay
        setTimeout(() => {
          setSuccessMessage("");
          setIsOpen(false);
        }, 1500);
      }
    } catch (error: any) {

      // Try to extract backend error detail
      let backendError = "Unknown error";

      if (error?.response?.data) {
        // If data is a JSON string, parse it
        if (typeof error.response.data === "string") {
          try {
            const parsed = JSON.parse(error.response.data);
            backendError = parsed.detail || JSON.stringify(parsed);
          } catch {
            backendError = error.response.data; // fallback to raw string
          }
        } else if (typeof error.response.data === "object") {
          backendError = error.response.data.detail || JSON.stringify(error.response.data);
        }
      } else if (error?.message) {
        backendError = error.message;
      }

      setErrorMessage(backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key="magic-modal"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl mx-auto bg-background-primary rounded-2xl px-lg md:px-xl py-lg shadow-xl transition-colors border border-border-default"
          >
            <h2 className="text-2xl font-semibold mb-6">Send Magic Link</h2>

            <div className="space-y-4">
              <Input
                label="Client Name"
                name="client_name"
                type="text"
                value={form.client_name}
                onChange={(e) => {
                  setForm({ ...form, client_name: e.target.value });
                  setErrors((prev) => ({ ...prev, client_name: undefined }));
                }}
                placeholder="Enter client name"
                variant="filled"
                error={errors.client_name}
              />

              <Input
                label="Client Email"
                name="client_email"
                type="email"
                value={form.client_email}
                onChange={(e) => {
                  setForm({ ...form, client_email: e.target.value });
                  setErrors((prev) => ({ ...prev, client_email: undefined }));
                }}
                placeholder="Enter client email"
                variant="filled"
                error={errors.client_email}
              />
            </div>

            {successMessage && (
              <motion.div
                className="flex items-center gap-2 mt-4 text-green-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <FaCheckCircle className="text-green-500" />
                {successMessage}
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                className="flex items-center gap-2 mt-4 text-red-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <FaCheckCircle className="text-red-500" />
                {errorMessage}
              </motion.div>
            )}

            <motion.div variants={fadeInLeft} className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>

              <FormButton
                size="md"
                variant="solid"
                onClick={handleSend}
                isLoading={loading}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </FormButton>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MagicLinkModal;
