import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const today = new Date().toISOString().split("T")[0];

    // Check if we already have quotes for today
    const { data: existing } = await supabase
      .from("daily_quotes")
      .select("quotes")
      .eq("quote_date", today)
      .single();

    if (existing) {
      return new Response(JSON.stringify({ quotes: existing.quotes }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Generate new quotes using AI
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        tools: [
          {
            type: "function",
            function: {
              name: "return_quotes",
              description: "Return 6 Islamic azkar and duas for the day",
              parameters: {
                type: "object",
                properties: {
                  quotes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        text: { type: "string", description: "The Arabic text of the dhikr or dua" },
                        source: { type: "string", description: "Short category label in Arabic like ذكر, دعاء, استغفار, تسبيح, حديث" },
                      },
                      required: ["text", "source"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["quotes"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_quotes" } },
        messages: [
          {
            role: "system",
            content: "أنت عالم إسلامي متخصص. أعطني 6 أذكار وأدعية إسلامية متنوعة وصحيحة من القرآن والسنة. يجب أن تكون مختلفة كل يوم. تشمل أذكار الصباح والمساء، أدعية من القرآن، أدعية نبوية، تسبيحات، واستغفار. اكتب النص بالعربية الفصحى مع التشكيل.",
          },
          {
            role: "user",
            content: `أعطني أذكار وأدعية اليوم: ${today}`,
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, try again later" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    
    let quotes;
    if (toolCall?.function?.arguments) {
      const parsed = JSON.parse(toolCall.function.arguments);
      quotes = parsed.quotes;
    } else {
      // Fallback quotes
      quotes = [
        { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ", source: "ذكر" },
        { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ", source: "دعاء" },
        { text: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", source: "توحيد" },
        { text: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", source: "دعاء الاستيقاظ" },
        { text: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ", source: "سيد الاستغفار" },
        { text: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ", source: "استغفار" },
      ];
    }

    // Cache in database
    await supabase.from("daily_quotes").insert({
      quote_date: today,
      quotes: quotes,
    });

    return new Response(JSON.stringify({ quotes }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    // Return fallback quotes on error
    const fallback = [
      { text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ", source: "ذكر" },
      { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ", source: "دعاء" },
      { text: "لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", source: "توحيد" },
      { text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", source: "حمد" },
      { text: "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ وَأَتُوبُ إِلَيْهِ", source: "استغفار" },
      { text: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ", source: "صلاة على النبي" },
    ];
    return new Response(JSON.stringify({ quotes: fallback }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
