"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function saveOnboarding(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const full_name = formData.get("full_name") as string;
  const work_field = formData.get("work_field") as string;
  const location = formData.get("location") as string;
  const phone = formData.get("phone") as string;
  const facebook_url = formData.get("facebook_url") as string;

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name,
      work_field: work_field || null,
      location: location || null,
      phone: phone || null,
      facebook_url: facebook_url || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/studio");
}
