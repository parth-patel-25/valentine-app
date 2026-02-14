import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST() {
  try {
    // 1. Fetch the first row (dynamic ID handling)
    const { data: currentData, error: fetchError } = await supabaseAdmin
      .from("valentine_love")
      .select("id, click_count")
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching data:", fetchError);
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    let targetId;
    let newCount = 1;

    if (!currentData) {
      // No row exists, insert new one (letting DB generate ID)
      const { data: insertData, error: insertError } = await supabaseAdmin
        .from("valentine_love")
        .insert({ clicked_yes: true, click_count: 1 })
        .select()
        .single();

      if (insertError) {
        console.error("Error inserting data:", insertError);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    } else {
      // Row exists, update it
      targetId = currentData.id;
      newCount = (currentData.click_count || 0) + 1;

      const { error: updateError } = await supabaseAdmin
        .from("valentine_love")
        .update({ clicked_yes: true, click_count: newCount })
        .eq("id", targetId);

      if (updateError) {
        console.error("Error updating data:", updateError);
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
