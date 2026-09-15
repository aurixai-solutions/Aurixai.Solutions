export const WEB3FORMS_URL = "https://api.web3forms.com/submit";
export const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";

export async function submitForm(data: Record<string, any>): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...data }),
    });
    const result = await res.json();
    if (result.success) {
      return { success: true };
    }
    return { success: false, message: result.message || "Submission failed" };
  } catch (err: any) {
    return { success: false, message: err.message || "Network error" };
  }
}
