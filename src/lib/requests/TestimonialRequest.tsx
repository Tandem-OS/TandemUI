import api from '@/lib/requests/Axios'
import { store } from "@/store";

interface DesignerTestimonial {
  rating: number;
  standout: string;
  recommend: string;
}

export const designerTestimonialSubmission = async (values: DesignerTestimonial) => {
  const clientEmail = store.getState().auth.user.email!;
  const designerEmail = store.getState().auth.user.designerEmail;
  const projectId = store.getState().project.projectId;

  const payload = {
    ...values,
    client_email: clientEmail,
    designer_email: designerEmail,
    project_id: projectId
  };

  return await api.post("/testimonial/submit", payload);
}


export const paltformTestimonialSubmission = async (values: DesignerTestimonial) => {
  const clientEmail = store.getState().auth.user.email!;
  const projectId = store.getState().project.projectId;

  const payload = {
    ...values,
    client_email: clientEmail,
    project_id: projectId
  };

  return await api.post("/testimonial/platform/submit", payload);
}

export const retriveDesignerTestimonial = async () => {
  const clientEmail = store.getState().auth.user.email!;
  const designerEmail = store.getState().auth.user.designerEmail;
  const projectId = store.getState().project.projectId;

  const payload = {
    client_email: clientEmail,
    designer_email: designerEmail,
    project_id: projectId
  };

  return await api.post("/testimonial/designer", payload);
}

export const retrivePlatformTestimonial = async () => {
  const clientEmail = store.getState().auth.user.email!;
  const projectId = store.getState().project.projectId;

  const payload = {
    client_email: clientEmail,
    project_id: projectId
  };

  return await api.post("/testimonial/platform", payload);
}

// ── Designer dashboard — fetch ALL testimonials for the logged-in designer ───
export const retriveAllDesignerTestimonials = async () => {
  const designerEmail = store.getState().auth.user.email!;

  return await api.post("/testimonial/designer", {
    designer_email: designerEmail,
  });
}
