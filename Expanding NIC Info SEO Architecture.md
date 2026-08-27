# Chat Conversation

Note: _This is purely the output of the chat conversation and does not contain any raw data, codebase snippets, etc. used to generate the output._

### User Input

SEO playbook for nicinfo.vercel.app
On-page SEO is already stronger than most competitors. Ranking is not. The gap is domain, language, page architecture, and backlinks — not more meta tags.
You currently rank for a few exact-match long tails (NIC to DOB, Sri Lanka NIC number details online). You lose the money queries: NIC converter, NIC to DoB, old to new NIC converter, Sri Lanka NIC decoder. Those are owned by aged .lk sites.

1. Where you rank today













































Query (Google, Sri Lanka intent)Who winsYouNIC converter / NIC to DoB / NIC calculatorthesrilanka.lk/nic-converterRarely page 1old to new NIC converterthesrilanka.lk/old-to-new-nic-converterNo dedicated URLSri Lanka NIC decoderinduwara.lk, lankacalculator.comOccasionalSri Lanka NIC number details onlineYou (title is an exact match)Best current queryNIC to birthday / find DOB from NICMix of YouTube, Blogspot (2015), GitHub, youUnstableSinhala: හැඳුනුම්පත් අංකයෙන් උපන් දිනයFacebook, Blogspot, Wikipedia, DRPAbsent (your /si/ and /ta/ URLs 404)Official verification intentdrp.gov.lkCorrectly not competing
Google has you indexed (Search Console verification is live). That is the easy part. Authority is not.

2. Keyword map (what people actually type)
Volumes below are order-of-magnitude estimates for Google in Sri Lanka, inferred from SERP density and how aggressively incumbents target them. Pull exact numbers from Search Console + Google Keyword Planner (free with a Google Ads account) before you commit copy.
Cluster A — Tool intent (highest traffic, highest competition)















































KeywordCompetitionWinner todayYour movenic converterHighthesrilanka.lkDedicated /nic-converternic to dob / nic to dob calculatorHighthesrilanka.lkKeep as primary H1, but not the only URLsri lanka nic decoderMedium-highinduwara.lk, lankacalculator/nic-decodernic calculator sri lankaMediumthesrilanka.lkAlias on converter pageold nic to new nic converterHighthesrilanka.lkNew page /old-to-new-nicnic number finder / dob to nicMediumthesrilanka.lk/nic-number-finderNew reverse tool
Cluster B — Long-tail (you already rank; protect these)

sri lanka nic number details online
nic to birthday
id number to birthday
decode nic number sri lanka
nic number gender finder
how to find date of birth from nic number

Cluster C — Sinhala (biggest underserved pool)
Almost no serious tool ranks here. Facebook posts and 2012 Blogspot pages still appear.

ජාතික හැඳුනුම්පත් අංකයෙන් උපන් දිනය
NIC අංකයෙන් උපන්දිනය
පැරණි NIC අලුත් NIC
හැඳුනුම්පත් අංකය decode / calculator
NIC වලින් වයස සොයා ගන්නේ කෙසේද

Cluster D — Tamil (also underserved)

தேசிய அடையாள அட்டை எண் பிறந்த தேதி
NIC எண் பிறந்த நாள் இலங்கை
பழைய NIC புதிய NIC
e-akaram.edu.lk already has a Tamil calculator — you can beat it with a real tool + hreflang

Cluster E — Do not target

















Keyword in your metaWhy drop itid number check by nameYou cannot look up a name. Mismatch = bounce + quality rater flagsri lanka id card check online (as official verify)That intent is DRP’s NIC Lookup. You will lose, and it looks like impersonation

3. Competitor scorecard



























































SiteDomainWhy they outrank youWeakness you can exploitthesrilanka.lkAged .lk, tool hub4 NIC URLs internally linked; years of backlinks; owns the branded query “NIC Converter (NIC to DoB)”Thin copy (~200 words), weak UX, no Sinhala/Tamil, no FAQ schemainduwara.lk.lkDeep article (18 FAQs), old→new conversion, voter status, related toolsEnglish only; newerlankacalculator.com.comWeekday + age + methodology pageThin site-wide topical authorityceygate.lk.lkAgency domain + related calculatorsTool is a side pagegig.asia/lab/nicOld URLAge + exact title “Sri Lanka NIC Checker Online”Almost no contentBlogspot / GitHub PagesJunk domains10-year-old links still rankUgly, incomplete, leap-year bugsWikipedia / drp.gov.lkAuthorityInformational / officialNot a decoder toolYouTube (52K+ on “birthday from NIC”)Video SERPPeople search “how to…” and get videoYou have no video
Pattern: Google prefers a real domain + a cluster of pages + inbound links over a beautiful single page on vercel.app.

4. Technical audit of your site (what is already good vs what is blocking you)
Already done well

Unique title + meta description
Canonical, robots: index,follow
Open Graph + Twitter cards + real og-image.png
JSON-LD graph: WebSite, WebApplication, FAQPage, HowTo, BreadcrumbList, Organization
sitemap.xml + robots.txt (including AI crawlers)
Google Search Console verification
Fast static host, HSTS, X-Content-Type-Options, X-Frame-Options
Client-side decoder (privacy is a real differentiator)
Comparison table + 12 FAQs on the homepage

Blocking ranking (fix in this order)
1. nicinfo.vercel.app cannot win this niche.

vercel.app is a shared parent domain. Google will not treat you as a first-class Sri Lankan site. Competitors use .lk. This is the single highest-ROI change.
Buy one of:

nicinfo.lk / nicdecoder.lk / nicto.lk / nicdob.lk

Then:

Attach it as the Vercel production domain
301 every vercel.app URL to the .lk URL
Set canonicals to .lk
Add X-Robots-Tag: noindex on the leftover *.vercel.app host so it stops competing with itself (Vercel’s own guidance)

2. Indexed 404s.

Google still lists:

https://nicinfo.vercel.app/si/nic-to-birthday
https://nicinfo.vercel.app/ta/nic-to-birthday

Both return 404. That wastes crawl budget and looks like a failed multilingual site. Either ship real Sinhala/Tamil pages or 410 them and remove from Search Console.
3. Shady third-party host.

The homepage preconnects to chalkedwhiningromance.com — a rotating ad/malware-style domain flagged as high-risk. That contradicts “runs in your browser, never stored,” can trigger Safe Browsing, and will crush Core Web Vitals. Remove it.
4. Title is stuffed and too long.
Current:
NIC to DOB | Sri Lanka NIC Number Details Online | Find Birthday, Age & Gender
Google will truncate. Use ~55–60 characters:
NIC to DOB — Sri Lanka NIC Decoder (Old & New)
5. meta name="keywords" is ignored by Google and currently includes queries you do not serve. Delete the tag.
6. One-page architecture vs their topic cluster.

thesrilanka.lk ranks because it has four URLs that all reinforce each other. You have one homepage plus thin guidelines.html / privacy.html / policy.html. Privacy/policy should be noindex (or stay indexed only as trust pages, not keyword pages).
7. Sitemap gaps.

Sitemap lists /, /guidelines.html, /privacy.html, /policy.html. It does not list language URLs (good, they 404) and will not list the new tool pages you need.
8. hreflang is English-only, while you previously advertised /si/ and /ta/. Either complete i18n or drop the alternates.
9. Misleading FAQ copy that tells people to “Visit nicinfo.vercel.app…” — after the domain move this becomes a self-own. Always use the canonical domain.

5. Site architecture that can beat the incumbents
Do not keep stuffing the homepage. Split intent into URLs, then interlink them.
text/                         → NIC to DOB (primary decoder)
/nic-converter            → same tool, copy aimed at “NIC converter”
/old-to-new-nic           → old ↔ new converter (this query is wide open for a better UX)
/nic-from-dob             → reverse: DOB + gender → NIC structure
/si/                      → full Sinhala decoder
/ta/                      → full Tamil decoder
/how-nic-number-works     → explainer (Wikipedia-style, cite DRP)
/nic-check-digit          → Luhn/DRP checksum (developer + curious users)
/excel-nic-formula        → thesrilanka has this; steal the SERP
Each page: unique title, unique H1, unique first 150 words, the same decoder widget where it helps, and 3–5 internal links.
Canonical rule: / and /nic-converter should not be duplicates. Either:

make /nic-converter a 301 to / and win “converter” with on-page copy, or
give /nic-converter genuinely different copy and a WebApplication schema of its own.

Prefer one canonical decoder URL (/) plus distinct supporting tools (/old-to-new-nic, /nic-from-dob). That is cleaner.
Features you are missing that already rank for others






























FeatureWho has itAdd itOld ↔ new conversion as a first-class resultthesrilanka, induwara, thahee GitHub PagesShow both formats on every decodeReverse (DOB → NIC pattern)thesrilanka/nic-number-finderNew pageWeekday of birthlankacalculator, ceygateAdd to result cardVoter status (V/X)induwara, thesrilankaAdd for old formatExcel formula articlethesrilankaNew articleSinhala / Tamil UIalmost nobodyYour biggest content gap

6. On-page copy rules (stop stuffing, start matching intent)
Homepage H1 should be the query people type, not a slogan.
Now: NIC to DOB — Every ID Number Hides a Birthday

Better: Sri Lanka NIC to DOB Converter with the slogan as a subhead.
First paragraph must contain, naturally:

Sri Lanka NIC
old 9-digit + V/X and new 12-digit
date of birth, age, gender
private / in-browser

Then the input. Google and users both want the tool above the fold — you already do this. Keep it.
FAQ schema: keep it, but:

Write questions as people search them (How to convert old NIC to new NIC?, How to find birthday from NIC number?)
Do not mention vercel.app in answers
Add 4–6 Sinhala questions on the Sinhala page (separate FAQPage JSON-LD, inLanguage: si)

E-E-A-T: you already name Pubudu Tharanga. Add:

a visible “Not affiliated with DRP” line near the tool (you have this in FAQ; put it in the hero)
a short “How we calculate this” with a worked example (906731234V → 22 June 1990, female, etc.)
last-updated date in visible HTML, not only JSON-LD
cite DRP and Wikipedia NIC as references (outbound links to official sources help more than they “leak” PageRank)


7. Off-page: this is why thesrilanka.lk still wins
A new .lk domain with your current content will still lose until links exist. Sri Lanka tool SEO is won on local links + WhatsApp, not guest posts.
Links you can realistically get

Your own properties — pubudu-tharanga.vercel.app should link with exact-match anchor “Sri Lanka NIC decoder”. GitHub README if the decoder is open source.
r/srilanka — there is already a thread “Finding date of birth using NIC”. Answer with the tool, no spam tone.
Sinhala/Tamil Facebook groups — this is where Cluster C traffic lives. One useful post with a screenshot beats 20 directory submissions.
YouTube — 60-second screen recording: paste 199906731234, show DOB. Title: How to find birthday from NIC number (Sri Lanka) 2026. Description: canonical URL. This query already has a 52K-view video; you can out-execute it.
Play Store listing / PWA — you already have a manifest. A short “NIC Info” Android listing that points at the site captures “NIC decoder app” intent.
Directories that still pass a little juice — Lanka business listings, Toolify/There’s An AI For That only if accurate, university tool lists (e-akaram style).
Hacker News / Dev.to / Hashnode — one technical post: “How Sri Lanka’s NIC encodes DOB and gender (with the check-digit).” Developers link this; Google trusts it.

Do not buy links. Do not spam Blogspot comments. Those still-ranking 2015 posts are there because of age, not because comment spam works in 2026.

8. Local + AI search (2026)

Google Search Console is already verified. After the domain move, add the .lk property, submit the new sitemap, request indexing on each new URL.
Set target country = Sri Lanka in the old International Targeting report if it still appears; otherwise rely on .lk + og:locale + inLanguage.
Add og:locale:alternate for si_LK and ta_LK once those pages exist.
You already allow GPTBot / Perplexity / OAI-SearchBot. Good. Add a concise llms.txt at the root that states what the tool does, that it is unofficial, and the canonical URL — AI answers are stealing “how does NIC work” clicks.
Bing Webmaster Tools: 5 minutes, still worth it for Copilot.

*Listed directory [nic-info](file:///d:/nic-info) *

*Searched filesystem*

*Viewed [index.html](file:///d:/nic-info/index.html) *

*Viewed [sitemap.xml](file:///d:/nic-info/sitemap.xml) *

*Viewed [robots.txt](file:///d:/nic-info/robots.txt) *

*Viewed [vercel.json](file:///d:/nic-info/vercel.json) *

*Viewed [llms.txt](file:///d:/nic-info/llms.txt) *

### Planner Response

Let me continue exploring the rest of the index.html and the 404 page.

*Viewed [index.html](file:///d:/nic-info/index.html) *

*Viewed [404.html](file:///d:/nic-info/404.html) *

### Planner Response

Now let me see the rest of the index.html (the JS section) and also check what `.well-known` contains.

*Viewed [index.html](file:///d:/nic-info/index.html) *

*Listed directory [.well-known](file:///d:/nic-info/.well-known) *

*Viewed [manifest.json](file:///d:/nic-info/manifest.json) *

### Planner Response

Now I have a comprehensive understanding of the codebase. Let me create the implementation plan based on the SEO playbook's actionable technical changes.

*Edited relevant file*

### Planner Response

Now let me write the implementation plan:

*Edited relevant file*

### User Input



*Edited relevant file*

### Planner Response

Now fix the FAQ answers that reference `nicinfo.vercel.app` and update JSON-LD FAQ entries:

*Edited relevant file*

### Planner Response

Now let me add the last-updated date, update the footer, and add a CSS class for the new trust disclaimer. Then update vercel.json, sitemap.xml, and the JSON-LD keywords field.

*Edited relevant file*

### Planner Response

Now let me add CSS for the trust disclaimer and last-updated, remove the "misleading" keywords from JSON-LD, and update vercel.json + sitemap.xml:

*Viewed [styles.css](file:///d:/nic-info/styles.css) *

*Grep searched codebase*

### Planner Response

Let me find the trust-line CSS in styles.css to add the new trust-disclaimer style nearby:

*Grep searched codebase*

*Viewed [styles.css](file:///d:/nic-info/styles.css) *

*Edited relevant file*

### Planner Response

Now update [vercel.json](cci:7://file:///d:/nic-info/vercel.json:0:0-0:0) with the /si/ and /ta/ redirects and noindex for privacy/policy, then update [sitemap.xml](cci:7://file:///d:/nic-info/sitemap.xml:0:0-0:0):

*Edited relevant file*

### Planner Response

Now update sitemap.xml (remove privacy/policy, update lastmod) and update task.md:

*Edited relevant file*

### Planner Response

Now let me also clean up the JSON-LD `keywords` field that contains queries we shouldn't target (per playbook Cluster E), and update the `dateModified`. Let me also update the llms.txt FAQ references and the task.md:

*Edited relevant file*

### Planner Response

Now update [llms.txt](cci:7://file:///d:/nic-info/llms.txt:0:0-0:0) to remove vercel.app references from FAQ answers and update task.md. Let me run verification grep simultaneously:

*Edited relevant file*

*Grep searched codebase*

### Planner Response

Good — the remaining `nicinfo.vercel.app` references in [index.html](cci:7://file:///d:/nic-info/index.html:0:0-0:0) are all in the canonical/OG/hreflang/JSON-LD areas — exactly where they should stay since the user confirmed keeping the vercel.app domain. No FAQ answer text contains it anymore. Let me update the task.md to reflect completion and create the walkthrough:

*Edited relevant file*

*Edited relevant file*

### User Input

Complete SEO plan (keep vercel.app, keep ads)
You will not out-authority thesrilanka.lk on head terms like NIC converter in 90 days. You can take long-tail English, Sinhala, Tamil, and feature SERPs (old to new, NIC to birthday, weekday, Excel formula) because those pages are thin or missing.
Treat the domain as a CTR handicap, not a death sentence. Compensate with better snippets, more URLs, real language pages, and links.

0. What “winning” means on this domain





















HorizonTarget30 days404s gone, new tool URLs indexed, ads not wrecking LCP, GSC showing queries60 daysPage 1 for 8–15 long-tails (nic to birthday, decode nic sri lanka, old nic to new nic online)90 daysSinhala queries in GSC; /old-to-new-nic challenging page 1; branded nicinfo / nicinfo vercel owned
Do not measure success by ranking #1 for NIC converter yet. Measure impressions + clicks on the clusters below.

1. Keyword clusters to attack (in order)
Cluster 1 — You already have a foothold (protect + expand)





























KeywordPagenic to dob/sri lanka nic number details online/nic to birthday/nic-to-birthday (new, or 301 from old 404 path)decode nic number sri lanka/nic number gender finder/ (FAQ + result label)
Cluster 2 — Competitor-owned, winnable with a dedicated URL








































KeywordPageCompetitorold nic to new nic converter/old-to-new-nicthesrilanka.lknew nic to old nicsame pagethesrilanka.lknic number finder / dob to nic/nic-from-dobthesrilanka.lksri lanka nic decoder/nic-decoder → canonical /induwara, lankacalculatornic calculator sri lanka/ copy passthesrilanka.lknic check digit / luhn nic/nic-check-digitalmost empty SERP
Cluster 3 — Sinhala (highest upside, weakest SERPs)
Ship /si/ as a real page, not a 404.

ජාතික හැඳුනුම්පත් අංකයෙන් උපන් දිනය
NIC අංකයෙන් උපන්දිනය
පැරණි NIC අලුත් NIC
හැඳුනුම්පත් අංකයෙන් වයස
NIC calculator සිංහල

Cluster 4 — Tamil
Ship /ta/ as a real page.

தேசிய அடையாள அட்டை எண் பிறந்த தேதி
NIC எண் பிறந்த நாள்
பழைய NIC புதிய NIC
e-akaram.edu.lk is the only Tamil-ish tool — beat it

Cluster 5 — Ignore

id number check by name (you cannot do this)
official DRP “NIC lookup / verification”
network interface card collisions — always pair NIC with Sri Lanka


2. URL map (do this even on vercel.app)
Google ranks URLs, not sections of a SPA. thesrilanka.lk wins because it has four pages. You currently have one real page plus 404s.
texthttps://nicinfo.vercel.app/                      Home decoder (canonical for “NIC to DOB”)
https://nicinfo.vercel.app/old-to-new-nic        Old ↔ new converter
https://nicinfo.vercel.app/nic-from-dob          Reverse calculator
https://nicinfo.vercel.app/nic-to-birthday       Long-tail alias with unique copy
https://nicinfo.vercel.app/how-nic-works         Explainer (cite DRP + Wikipedia)
https://nicinfo.vercel.app/excel-nic-formula     Excel/Sheets formulas
https://nicinfo.vercel.app/nic-check-digit       Check-digit / V vs X
https://nicinfo.vercel.app/si/                   Full Sinhala decoder
https://nicinfo.vercel.app/ta/                   Full Tamil decoder
https://nicinfo.vercel.app/guidelines.html       Keep (technical E-E-A-T)
https://nicinfo.vercel.app/privacy.html          Keep (trust; noindex optional)
https://nicinfo.vercel.app/policy.html           Keep (ads/privacy disclosure)
Canonical rules

/ is the one decoder Google should consolidate for nic to dob.
/nic-to-birthday must have different H1, intro, and FAQs (birthday-intent), and a visible link to /. Do not canonical it back to / if you want it to rank — make it 60%+ unique.
/old-to-new-nic and /nic-from-dob are separate tools. Unique titles. Own schema.
/si/ and /ta/ are language originals, not copies. hreflang between /, /si/, /ta/.

Fix the current 404s immediately
Google still has:

/si/nic-to-birthday → 404
/ta/nic-to-birthday → 404

Either:

Restore those URLs as real Sinhala/Tamil pages, or
301 them to /si/ and /ta/ once those exist.

Do not leave 404s that Google already indexed.

3. On-page specs per URL
A. Homepage /
Title (≤60 chars):

NIC to DOB — Sri Lanka NIC Decoder (Old & New)
Meta description (≤155 chars):

Paste any Sri Lankan NIC. Get date of birth, age and gender instantly. Old 9-digit and new 12-digit. Private, in-browser. Free.
H1: Sri Lanka NIC to DOB Converter

H2s (keep, tighten): How to convert NIC to DOB · Old vs new format · FAQ
Above the fold (order):

H1 + 2-line promise
Input + Decode
Result card
Then ads (see §5)
Then educational copy

Result card must show everything competitors show (this is ranking + conversion):









































FieldWhyDate of birthCore queryAge (Y/M/D)You already do thisGenderCore queryOld format equivalentSteals “old to new” clicks from homeNew format equivalentSameWeekday of birthlankacalculator/ceygate unique featureV / X voter letterinduwara unique featureDay-of-year codeTrust / “how it works”
Delete meta name="keywords". Google ignores it; yours includes id number check by name.
Rewrite the FAQ answer that says “Visit nicinfo.vercel.app…” — use “this page” / the canonical URL once, not as keyword stuffing.
JSON-LD: keep WebApplication + FAQPage + HowTo. Add the new result fields into featureList.
B. /old-to-new-nic  ← highest new-page priority
This is thesrilanka.lk’s second cash query and their page is thin.
Title: Old to New NIC Converter Sri Lanka (and New to Old)

H1: Old NIC to New NIC Converter

Intro (unique): 2016 format change, V/X dropped, year becomes 4 digits, 0 inserted before serial (DRP example: 855420159V → 198554200159).

Widget: input either format → output the other + DOB/gender (link to / for full decode).

FAQs:

How do I convert old NIC to new NIC?
Is the new number the same person?
Why is there a 0 in the new NIC?
Does the new NIC still show voter status? (No.)

Worked examples on the page: 810509871V, 855420159V, 199906731234.
C. /nic-from-dob
Title: NIC Number Finder — Date of Birth to NIC (Sri Lanka)

H1: Find NIC Number Structure from Date of Birth

Be honest: you can generate the year + day-of-year + gender block, not the unique serial. thesrilanka overclaims; you win by being accurate.
D. /nic-to-birthday
Title: Find Birthday from NIC Number | Sri Lanka NIC to Birthday

H1: Find Date of Birth from a Sri Lankan NIC

Copy aimed at “birthday / DOB / how to find” queries. Same widget, different explanation + FAQs.
E. /how-nic-works
Long explainer (1,200–1,800 words). Cite DRP and Wikipedia. This is the page that can earn developer and blog links.
F. /excel-nic-formula
Title match for people who search NIC to DOB excel formula. Include copy-paste formulas for old and new, leap-year note, Sheets version. Link back to the online tool as the easier option.
G. /si/ and /ta/
Not English pages with a language prefix. Native headings, native FAQs, lang="si" / lang="ta", og:locale si_LK / ta_LK.
Sinhala title example:

NIC අංකයෙන් උපන් දිනය — ජාතික හැඳුනුම්පත් decoder
Tamil title example:

NIC எண்ணிலிருந்து பிறந்த தேதி — இலங்கை NIC decoder
hreflang on all three:
HTML<link rel="alternate" hreflang="en" href="https://nicinfo.vercel.app/" />
<link rel="alternate" hreflang="si" href="https://nicinfo.vercel.app/si/" />
<link rel="alternate" hreflang="ta" href="https://nicinfo.vercel.app/ta/" />
<link rel="alternate" hreflang="x-default" href="https://nicinfo.vercel.app/" />

4. Internal linking (this is how a vercel.app site fakes a “hub”)
Every page gets a compact “NIC tools” block:

Decode NIC to DOB → /
Old ↔ New NIC → /old-to-new-nic
DOB to NIC → /nic-from-dob
How the number works → /how-nic-works
සිංහල → /si/
தமிழ் → /ta/

Homepage body must use descriptive anchors, not “click here”:

“Convert old NIC to new NIC”
“Find birthday from NIC number”
“Sinhala NIC decoder”

Footer: same links + Privacy + Guidelines + “Not affiliated with DRP”.

5. Keep ads, stop them from killing SEO
Ads stay. They must not look like a doorway site or destroy Core Web Vitals.
Rules

Never cover the input or the result. First paint = tool. Ads after the result card, in the sidebar on desktop, or between H2 sections — not on top of the decoder.
Do not insert ads into FAQ answers (FAQ schema can get invalidated; Google has dropped FAQ rich results for many sites already — keep markup clean).
Lazy-load ad scripts (loading after load or requestIdleCallback). Your LCP should be the H1 or the input, not an ad iframe.
Preconnect only to your actual ad serving host, and only if ads are above the fold. A mystery preconnect to a rotating domain looks like malware to users and to Safe Browsing. Point it at the real ad network endpoint you use.
Disclose ads on /policy.html (you already have the page). One line near the footer: “This site displays ads. Decoding still runs only in your browser.” That protects the privacy claim.
No popunders / forced redirects / fake “Download NIC” buttons. Those get vercel.app sites Safe-Browsing flagged, and then you rank nowhere.
CLS: reserve min-height for ad slots so the “Decode” button does not jump.
Ads on /si/ and /ta/ are fine; same placement rules. Do not serve English ad landing pages as the only Tamil/Sinhala “content”.

If PageSpeed INP/LCP regress after ad load, delay ads until first successful decode. That usually increases revenue (engaged users) and protects ranking.

6. Technical checklist (no domain change)

























































ItemActionSitemapList every indexable URL above; drop 404s; resubmit in GSCrobots.txtKeep Allow: /; keep sitemap line; do not block CSS/JSPreview deploysConfirm Vercel preview URLs send X-Robots-Tag: noindex so they don’t duplicate productionCanonicalEvery page self-canonical to https://nicinfo.vercel.app/...404 templateLink to decoder + tool list (you already do this — good)langen / si / ta per pageImagesnicinfo-logo.webp already good; add width/height on all; OG image staysCacheHTML can stay must-revalidate; hash static assets (you do)HTTPS / HSTSAlready correctSearch ConsoleInspect each new URL → Request indexingBing WebmasterAdd nicinfo.vercel.app, submit sitemapllms.txtShort file: what the tool is, unofficial, canonical URL — helps AI answers cite you
GSC weekly routine (15 min)

Queries: filter nic, dob, birthday, converter, Sinhala
Pages: which new URLs got impressions
Experience: CWV, especially INP with ads
Indexing: “Not found (404)” — should go to 0 for /si/nic-to-birthday after redirect


7. Snippet / CTR work (critical on vercel.app)
The green URL will always look less trusted than thesrilanka.lk. You win the click with the title + description + favicon.

Favicon must be sharp at 16px (you have 16/32 — verify it shows in SERPs).
Title: lead with the query, not the brand. Brand at the end if space: … | NIC Info.
Description: include Free, old & new, private. Those three words raise CTR in this niche.
Do not use ALL CAPS or !!!.
Sitename in schema is already NIC Info — good. Keep it consistent so Google doesn’t show nicinfo.vercel.app as the brand if it can show NIC Info.


8. Content calendar (what to write, not just tools)











































































WeekAssetTarget query1Fix 404s; homepage title/H1; result-card fieldsexisting long-tails2/old-to-new-nicold to new NIC converter2/nic-from-dobnic number finder3/nic-to-birthdaynic to birthday / find birthday from nic3/si/Sinhala cluster4/ta/Tamil cluster5/how-nic-workshow NIC number works Sri Lanka6/excel-nic-formulanic to dob excel7/nic-check-digitnic check digit / V or X8YouTube 60s (English)how to find birthday from NIC9YouTube 60s (Sinhala)NIC අංකයෙන් උපන්දිනය10Dev.to/Hashnode: check-digit write-upbacklinks11–12Refresh FAQs from real GSC querieswhatever actually appeared
Each article ends with the live widget or a strong CTA to it.

9. Links and distribution (without a custom domain)
vercel.app gets fewer editorial links. Use places that already accept tool URLs.
Owned

pubudu-tharanga.vercel.app — homepage project card, anchor Sri Lanka NIC to DOB decoder
GitHub repo README (if public) with live demo link
PWA / Play Store listing pointing at the site (you already have a manifest)

Community (do not spam)

r/srilanka existing threads on NIC/DOB — helpful comment + URL
Sinhala Facebook groups (search the exact phrases in Cluster 3 — those posts already get engagement)
WhatsApp Share you already built — add a prefilled text: NIC to DOB — paste a Sri Lankan NIC, get birthday instantly https://nicinfo.vercel.app/

Video

YouTube title: How to find birthday from NIC number (Sri Lanka) | Old & New NIC
First line of description = canonical URL
Chapters: old format, new format, gender (+500), convert old→new
Duplicate as Shorts from the same recording

Citation magnet

/how-nic-works + /nic-check-digit are what developers link. One accurate check-digit explanation can pick up GitHub and Stack Overflow mentions over time.

Directories (low value, do once)

AlternativeTo, Toolify, “awesome sri lanka” lists, university tool pages. One submission each. No Fiverr link packages.


10. Competitive counter-moves (feature parity)









































They haveYou dothesrilanka: 4 NIC URLsMatch with /, /old-to-new-nic, /nic-from-dob, /excel-nic-formulathesrilanka: thin copyOutwrite every page (examples, leap year, DRP citation)induwara: 18 FAQs, voter status, abroad-renewal mythAdd voter + a “Can I renew NIC abroad?” FAQ (answer: no, DRP only)lankacalculator: weekdayAdd weekday on result cardWikipedia: informational SERP/how-nic-works + outbound cite to Wikipedia/DRPYouTube: 52K-view how-toYour own 60s clipe-akaram: Tamil calculator/ta/ with a real decoderNobody: good Sinhala tool/si/
Do not copy their sentences. Several of those pages already duplicate the same GitHub README. Unique examples + leap-year handling is enough differentiation.

11. Measurement
Search Console (primary)

Save filters:

Query contains nic
Page = /old-to-new-nic
Query is Sinhala (regex [\u0D80-\u0DFF])
Query is Tamil (regex [\u0B80-\u0BFF])

KPIs








































KPI30d90dIndexed indexable URLs4+10+404s in GSC for old language URLs00Queries with impressions20+80+Clicks / weekbaseline +50%3× baselineLCP with ads (mobile)< 2.5s< 2.5sINP< 200ms< 200ms
Rank tracking (manual, weekly, from a Sri Lanka VPN or GSC “Sri Lanka” country filter)

nic to dob · nic to birthday · old nic to new nic converter · sri lanka nic decoder · NIC අංකයෙන් උපන්දිනය

12. Week-by-week execution
Week 1 — index hygiene + homepage

Fix /si/nic-to-birthday and /ta/nic-to-birthday (restore or 301). Shorten title. Remove meta keywords. Expand result card (old/new, weekday, V/X). Move ads below the result. Reserve ad-slot height. Update FAQ schema. Request indexing on /.
Week 2 — two new tools

Ship /old-to-new-nic and /nic-from-dob. Add tools nav. New sitemap. GSC inspect both.
Week 3 — long-tail + Sinhala

/nic-to-birthday + /si/ with native copy and hreflang.
Week 4 — Tamil + linking

/ta/. Footer + homepage language switcher. Portfolio + GitHub links live.
Week 5–6 — explainer pages

/how-nic-works, /excel-nic-formula. Publish Dev.to version of the explainer with a canonical pointing to your site (or rel=canonical to /how-nic-works).
Week 7–8 — video + social

English + Sinhala YouTube. One Reddit reply. One Facebook group post with a screenshot of a sample NIC (199906731234), never a real person’s.
Week 9–12 — iterate from GSC

Whatever queries show impressions but low CTR: rewrite that page’s title/description. Whatever queries show impressions but no page: add an FAQ or a new H2. Do not add more URLs until the first 8 are indexed.

13. Hard limits (so the plan stays honest)
Staying on nicinfo.vercel.app and keeping ads means:

Some publishers will not link you.
Some users will skip the SERP result because of the URL.
Head term NIC converter may stay with thesrilanka.lk for a long time.
Ad scripts will always threaten INP; you have to keep watching CWV.

None of that blocks Clusters 1, 3, 4, or /old-to-new-nic. That is the realistic path to traffic without a domain move.

First three patches, in order: (1) kill language 404s, (2) /old-to-new-nic, (3) result card parity (old/new + weekday + V/X) with ads below the result.


### User Input

Staying on `nicinfo.vercel.app` and keeping ads. The plan below is built around those two constraints — no domain cutover, no ad removal.

# Complete SEO plan (keep `vercel.app`, keep ads)

You will not out-authority [thesrilanka.lk](https://thesrilanka.lk/nic-converter/) on head terms like `NIC converter` in 90 days. You **can** take long-tail English, Sinhala, Tamil, and feature SERPs (`old to new`, `NIC to birthday`, `weekday`, Excel formula) because those pages are thin or missing.

Treat the domain as a CTR handicap, not a death sentence. Compensate with better snippets, more URLs, real language pages, and links.

---

## 0. What “winning” means on this domain

| Horizon | Target |
|---|---|
| 30 days | 404s gone, new tool URLs indexed, ads not wrecking LCP, GSC showing queries |
| 60 days | Page 1 for 8–15 long-tails (`nic to birthday`, `decode nic sri lanka`, `old nic to new nic online`) |
| 90 days | Sinhala queries in GSC; `/old-to-new-nic` challenging page 1; branded `nicinfo` / `nicinfo vercel` owned |

Do **not** measure success by ranking #1 for `NIC converter` yet. Measure impressions + clicks on the clusters below.

---

## 1. Keyword clusters to attack (in order)

### Cluster 1 — You already have a foothold (protect + expand)

| Keyword | Page |
|---|---|
| nic to dob | `/` |
| sri lanka nic number details online | `/` |
| nic to birthday | `/nic-to-birthday` (new, or 301 from old 404 path) |
| decode nic number sri lanka | `/` |
| nic number gender finder | `/` (FAQ + result label) |

### Cluster 2 — Competitor-owned, winnable with a dedicated URL

| Keyword | Page | Competitor |
|---|---|---|
| old nic to new nic converter | `/old-to-new-nic` | thesrilanka.lk |
| new nic to old nic | same page | thesrilanka.lk |
| nic number finder / dob to nic | `/nic-from-dob` | thesrilanka.lk |
| sri lanka nic decoder | `/nic-decoder` → canonical `/` | induwara, lankacalculator |
| nic calculator sri lanka | `/` copy pass | thesrilanka.lk |
| nic check digit / luhn nic | `/nic-check-digit` | almost empty SERP |

### Cluster 3 — Sinhala (highest upside, weakest SERPs)

Ship `/si/` as a **real page**, not a 404.

- ජාතික හැඳුනුම්පත් අංකයෙන් උපන් දිනය
- NIC අංකයෙන් උපන්දිනය
- පැරණි NIC අලුත් NIC
- හැඳුනුම්පත් අංකයෙන් වයස
- NIC calculator සිංහල

### Cluster 4 — Tamil

Ship `/ta/` as a **real page**.

- தேசிய அடையாள அட்டை எண் பிறந்த தேதி
- NIC எண் பிறந்த நாள்
- பழைய NIC புதிய NIC
- [e-akaram.edu.lk](https://www.e-akaram.edu.lk/p/nic-birthday-calculator.html) is the only Tamil-ish tool — beat it

### Cluster 5 — Ignore

- `id number check by name` (you cannot do this)
- official DRP “NIC lookup / verification”
- `network interface card` collisions — always pair `NIC` with `Sri Lanka`

---

## 2. URL map (do this even on vercel.app)

Google ranks **URLs**, not sections of a SPA. thesrilanka.lk wins because it has four pages. You currently have one real page plus 404s.

```
https://nicinfo.vercel.app/                      Home decoder (canonical for “NIC to DOB”)
https://nicinfo.vercel.app/old-to-new-nic        Old ↔ new converter
https://nicinfo.vercel.app/nic-from-dob          Reverse calculator
https://nicinfo.vercel.app/nic-to-birthday       Long-tail alias with unique copy
https://nicinfo.vercel.app/how-nic-works         Explainer (cite DRP + Wikipedia)
https://nicinfo.vercel.app/excel-nic-formula     Excel/Sheets formulas
https://nicinfo.vercel.app/nic-check-digit       Check-digit / V vs X
https://nicinfo.vercel.app/si/                   Full Sinhala decoder
https://nicinfo.vercel.app/ta/                   Full Tamil decoder
https://nicinfo.vercel.app/guidelines.html       Keep (technical E-E-A-T)
https://nicinfo.vercel.app/privacy.html          Keep (trust; noindex optional)
https://nicinfo.vercel.app/policy.html           Keep (ads/privacy disclosure)
```

**Canonical rules**
- `/` is the one decoder Google should consolidate for `nic to dob`.
- `/nic-to-birthday` must have **different** H1, intro, and FAQs (birthday-intent), and a visible link to `/`. Do **not** canonical it back to `/` if you want it to rank — make it 60%+ unique.
- `/old-to-new-nic` and `/nic-from-dob` are separate tools. Unique titles. Own schema.
- `/si/` and `/ta/` are language originals, not copies. `hreflang` between `/`, `/si/`, `/ta/`.

**Fix the current 404s immediately**

Google still has:
- `/si/nic-to-birthday` → 404
- `/ta/nic-to-birthday` → 404

Either:
1. Restore those URLs as real Sinhala/Tamil pages, **or**
2. 301 them to `/si/` and `/ta/` once those exist.

Do not leave 404s that Google already indexed.

---

## 3. On-page specs per URL

### A. Homepage `/`

**Title (≤60 chars):**  
`NIC to DOB — Sri Lanka NIC Decoder (Old & New)`

**Meta description (≤155 chars):**  
`Paste any Sri Lankan NIC. Get date of birth, age and gender instantly. Old 9-digit and new 12-digit. Private, in-browser. Free.`

**H1:** `Sri Lanka NIC to DOB Converter`  
**H2s (keep, tighten):** How to convert NIC to DOB · Old vs new format · FAQ

**Above the fold (order):**  
1. H1 + 2-line promise  
2. Input + Decode  
3. Result card  
4. Then ads (see §5)  
5. Then educational copy

**Result card must show everything competitors show** (this is ranking + conversion):

| Field | Why |
|---|---|
| Date of birth | Core query |
| Age (Y/M/D) | You already do this |
| Gender | Core query |
| Old format equivalent | Steals “old to new” clicks from home |
| New format equivalent | Same |
| Weekday of birth | lankacalculator/ceygate unique feature |
| V / X voter letter | induwara unique feature |
| Day-of-year code | Trust / “how it works” |

**Delete** `meta name="keywords"`. Google ignores it; yours includes `id number check by name`.

**Rewrite the FAQ answer** that says “Visit nicinfo.vercel.app…” — use “this page” / the canonical URL once, not as keyword stuffing.

**JSON-LD:** keep `WebApplication` + `FAQPage` + `HowTo`. Add the new result fields into `featureList`.

### B. `/old-to-new-nic`  ← highest new-page priority

This is thesrilanka.lk’s second cash query and their page is thin.

**Title:** `Old to New NIC Converter Sri Lanka (and New to Old)`  
**H1:** `Old NIC to New NIC Converter`  
**Intro (unique):** 2016 format change, `V`/`X` dropped, year becomes 4 digits, `0` inserted before serial (DRP example: `855420159V` → `198554200159`).  
**Widget:** input either format → output the other + DOB/gender (link to `/` for full decode).  
**FAQs:**  
- How do I convert old NIC to new NIC?  
- Is the new number the same person?  
- Why is there a 0 in the new NIC?  
- Does the new NIC still show voter status? (No.)

Worked examples on the page: `810509871V`, `855420159V`, `199906731234`.

### C. `/nic-from-dob`

**Title:** `NIC Number Finder — Date of Birth to NIC (Sri Lanka)`  
**H1:** `Find NIC Number Structure from Date of Birth`  
Be honest: you can generate the **year + day-of-year + gender block**, not the unique serial. thesrilanka overclaims; you win by being accurate.

### D. `/nic-to-birthday`

**Title:** `Find Birthday from NIC Number | Sri Lanka NIC to Birthday`  
**H1:** `Find Date of Birth from a Sri Lankan NIC`  
Copy aimed at “birthday / DOB / how to find” queries. Same widget, different explanation + FAQs.

### E. `/how-nic-works`

Long explainer (1,200–1,800 words). Cite [DRP](https://drp.gov.lk/) and [Wikipedia](https://en.wikipedia.org/wiki/National_identity_card_(Sri_Lanka)). This is the page that can earn **developer and blog links**.

### F. `/excel-nic-formula`

Title match for people who search `NIC to DOB excel formula`. Include copy-paste formulas for old and new, leap-year note, Sheets version. Link back to the online tool as the easier option.

### G. `/si/` and `/ta/`

Not English pages with a language prefix. Native headings, native FAQs, `lang="si"` / `lang="ta"`, `og:locale` `si_LK` / `ta_LK`.

**Sinhala title example:**  
`NIC අංකයෙන් උපන් දිනය — ජාතික හැඳුනුම්පත් decoder`

**Tamil title example:**  
`NIC எண்ணிலிருந்து பிறந்த தேதி — இலங்கை NIC decoder`

`hreflang` on all three:

```html
<link rel="alternate" hreflang="en" href="https://nicinfo.vercel.app/" />
<link rel="alternate" hreflang="si" href="https://nicinfo.vercel.app/si/" />
<link rel="alternate" hreflang="ta" href="https://nicinfo.vercel.app/ta/" />
<link rel="alternate" hreflang="x-default" href="https://nicinfo.vercel.app/" />
```

---

## 4. Internal linking (this is how a vercel.app site fakes a “hub”)

Every page gets a compact “NIC tools” block:

- Decode NIC to DOB → `/`
- Old ↔ New NIC → `/old-to-new-nic`
- DOB to NIC → `/nic-from-dob`
- How the number works → `/how-nic-works`
- සිංහල → `/si/`
- தமிழ் → `/ta/`

Homepage body must use **descriptive anchors**, not “click here”:
- “Convert old NIC to new NIC”
- “Find birthday from NIC number”
- “Sinhala NIC decoder”

Footer: same links + Privacy + Guidelines + “Not affiliated with DRP”.

---

## 5. Keep ads, stop them from killing SEO

Ads stay. They must not look like a doorway site or destroy Core Web Vitals.

**Rules**
1. **Never cover the input or the result.** First paint = tool. Ads after the result card, in the sidebar on desktop, or between H2 sections — not on top of the decoder.
2. **Do not insert ads into FAQ answers** (FAQ schema can get invalidated; Google has dropped FAQ rich results for many sites already — keep markup clean).
3. **Lazy-load ad scripts** (`loading` after `load` or `requestIdleCallback`). Your LCP should be the H1 or the input, not an ad iframe.
4. **Preconnect only to your actual ad serving host**, and only if ads are above the fold. A mystery preconnect to a rotating domain looks like malware to users and to Safe Browsing. Point it at the real ad network endpoint you use.
5. **Disclose ads** on `/policy.html` (you already have the page). One line near the footer: “This site displays ads. Decoding still runs only in your browser.” That protects the privacy claim.
6. **No popunders / forced redirects / fake “Download NIC” buttons.** Those get `vercel.app` sites Safe-Browsing flagged, and then you rank nowhere.
7. **CLS:** reserve min-height for ad slots so the “Decode” button does not jump.
8. **Ads on `/si/` and `/ta/`** are fine; same placement rules. Do not serve English ad landing pages as the only Tamil/Sinhala “content”.

If PageSpeed INP/LCP regress after ad load, delay ads until first successful decode. That usually **increases** revenue (engaged users) and protects ranking.

---

## 6. Technical checklist (no domain change)

| Item | Action |
|---|---|
| Sitemap | List every indexable URL above; drop 404s; resubmit in GSC |
| robots.txt | Keep `Allow: /`; keep sitemap line; do **not** block CSS/JS |
| Preview deploys | Confirm Vercel preview URLs send `X-Robots-Tag: noindex` so they don’t duplicate production |
| Canonical | Every page self-canonical to `https://nicinfo.vercel.app/...` |
| 404 template | Link to decoder + tool list (you already do this — good) |
| `lang` | `en` / `si` / `ta` per page |
| Images | `nicinfo-logo.webp` already good; add `width`/`height` on all; OG image stays |
| Cache | HTML can stay `must-revalidate`; hash static assets (you do) |
| HTTPS / HSTS | Already correct |
| Search Console | Inspect each new URL → Request indexing |
| Bing Webmaster | Add `nicinfo.vercel.app`, submit sitemap |
| `llms.txt` | Short file: what the tool is, unofficial, canonical URL — helps AI answers cite you |

**GSC weekly routine (15 min)**
- Queries: filter `nic`, `dob`, `birthday`, `converter`, Sinhala
- Pages: which new URLs got impressions
- Experience: CWV, especially INP with ads
- Indexing: “Not found (404)” — should go to 0 for `/si/nic-to-birthday` after redirect

---

## 7. Snippet / CTR work (critical on vercel.app)

The green URL will always look less trusted than `thesrilanka.lk`. You win the click with the **title + description + favicon**.

- Favicon must be sharp at 16px (you have 16/32 — verify it shows in SERPs).
- Title: lead with the query, not the brand. Brand at the end if space: `… | NIC Info`.
- Description: include `Free`, `old & new`, `private`. Those three words raise CTR in this niche.
- Do not use ALL CAPS or `!!!`.
- Sitename in schema is already `NIC Info` — good. Keep it consistent so Google doesn’t show `nicinfo.vercel.app` as the brand if it can show `NIC Info`.

---

## 8. Content calendar (what to write, not just tools)

| Week | Asset | Target query |
|---|---|---|
| 1 | Fix 404s; homepage title/H1; result-card fields | existing long-tails |
| 2 | `/old-to-new-nic` | old to new NIC converter |
| 2 | `/nic-from-dob` | nic number finder |
| 3 | `/nic-to-birthday` | nic to birthday / find birthday from nic |
| 3 | `/si/` | Sinhala cluster |
| 4 | `/ta/` | Tamil cluster |
| 5 | `/how-nic-works` | how NIC number works Sri Lanka |
| 6 | `/excel-nic-formula` | nic to dob excel |
| 7 | `/nic-check-digit` | nic check digit / V or X |
| 8 | YouTube 60s (English) | how to find birthday from NIC |
| 9 | YouTube 60s (Sinhala) | NIC අංකයෙන් උපන්දිනය |
| 10 | Dev.to/Hashnode: check-digit write-up | backlinks |
| 11–12 | Refresh FAQs from real GSC queries | whatever actually appeared |

Each article ends with the live widget or a strong CTA to it.

---

## 9. Links and distribution (without a custom domain)

`vercel.app` gets fewer editorial links. Use places that already accept tool URLs.

**Owned**
- [pubudu-tharanga.vercel.app](https://pubudu-tharanga.vercel.app/) — homepage project card, anchor `Sri Lanka NIC to DOB decoder`
- GitHub repo README (if public) with live demo link
- PWA / Play Store listing pointing at the site (you already have a manifest)

**Community (do not spam)**
- r/srilanka existing threads on NIC/DOB — helpful comment + URL
- Sinhala Facebook groups (search the exact phrases in Cluster 3 — those posts already get engagement)
- WhatsApp Share you already built — add a prefilled text: `NIC to DOB — paste a Sri Lankan NIC, get birthday instantly https://nicinfo.vercel.app/`

**Video**
- YouTube title: `How to find birthday from NIC number (Sri Lanka) | Old & New NIC`
- First line of description = canonical URL
- Chapters: old format, new format, gender (+500), convert old→new
- Duplicate as Shorts from the same recording

**Citation magnet**
- `/how-nic-works` + `/nic-check-digit` are what developers link. One accurate check-digit explanation can pick up GitHub and Stack Overflow mentions over time.

**Directories (low value, do once)**
- AlternativeTo, Toolify, “awesome sri lanka” lists, university tool pages. One submission each. No Fiverr link packages.

---

## 10. Competitive counter-moves (feature parity)

| They have | You do |
|---|---|
| thesrilanka: 4 NIC URLs | Match with `/`, `/old-to-new-nic`, `/nic-from-dob`, `/excel-nic-formula` |
| thesrilanka: thin copy | Outwrite every page (examples, leap year, DRP citation) |
| induwara: 18 FAQs, voter status, abroad-renewal myth | Add voter + a “Can I renew NIC abroad?” FAQ (answer: no, DRP only) |
| lankacalculator: weekday | Add weekday on result card |
| Wikipedia: informational SERP | `/how-nic-works` + outbound cite to Wikipedia/DRP |
| YouTube: 52K-view how-to | Your own 60s clip |
| e-akaram: Tamil calculator | `/ta/` with a real decoder |
| Nobody: good Sinhala tool | `/si/` |

Do **not** copy their sentences. Several of those pages already duplicate the same GitHub README. Unique examples + leap-year handling is enough differentiation.

---

## 11. Measurement

**Search Console (primary)**  
Save filters:
1. Query contains `nic`  
2. Page = `/old-to-new-nic`  
3. Query is Sinhala (regex `[\u0D80-\u0DFF]`)  
4. Query is Tamil (regex `[\u0B80-\u0BFF]`)

**KPIs**

| KPI | 30d | 90d |
|---|---|---|
| Indexed indexable URLs | 4+ | 10+ |
| 404s in GSC for old language URLs | 0 | 0 |
| Queries with impressions | 20+ | 80+ |
| Clicks / week | baseline +50% | 3× baseline |
| LCP with ads (mobile) | < 2.5s | < 2.5s |
| INP | < 200ms | < 200ms |

**Rank tracking (manual, weekly, from a Sri Lanka VPN or GSC “Sri Lanka” country filter)**  
`nic to dob` · `nic to birthday` · `old nic to new nic converter` · `sri lanka nic decoder` · `NIC අංකයෙන් උපන්දිනය`

---

## 12. Week-by-week execution

**Week 1 — index hygiene + homepage**  
Fix `/si/nic-to-birthday` and `/ta/nic-to-birthday` (restore or 301). Shorten title. Remove meta keywords. Expand result card (old/new, weekday, V/X). Move ads below the result. Reserve ad-slot height. Update FAQ schema. Request indexing on `/`.

**Week 2 — two new tools**  
Ship `/old-to-new-nic` and `/nic-from-dob`. Add tools nav. New sitemap. GSC inspect both.

**Week 3 — long-tail + Sinhala**  
`/nic-to-birthday` + `/si/` with native copy and `hreflang`.

**Week 4 — Tamil + linking**  
`/ta/`. Footer + homepage language switcher. Portfolio + GitHub links live.

**Week 5–6 — explainer pages**  
`/how-nic-works`, `/excel-nic-formula`. Publish Dev.to version of the explainer with a canonical pointing **to your site** (or `rel=canonical` to `/how-nic-works`).

**Week 7–8 — video + social**  
English + Sinhala YouTube. One Reddit reply. One Facebook group post with a screenshot of a **sample** NIC (`199906731234`), never a real person’s.

**Week 9–12 — iterate from GSC**  
Whatever queries show impressions but low CTR: rewrite that page’s title/description. Whatever queries show impressions but no page: add an FAQ or a new H2. Do not add more URLs until the first 8 are indexed.

---

## 13. Hard limits (so the plan stays honest)

Staying on `nicinfo.vercel.app` and keeping ads means:
- Some publishers will not link you.
- Some users will skip the SERP result because of the URL.
- Head term `NIC converter` may stay with thesrilanka.lk for a long time.
- Ad scripts will always threaten INP; you have to keep watching CWV.

None of that blocks Clusters 1, 3, 4, or `/old-to-new-nic`. That is the realistic path to traffic without a domain move.

---

**First three patches, in order:** (1) kill language 404s, (2) `/old-to-new-nic`, (3) result card parity (old/new + weekday + V/X) with ads **below** the result.



*Edited relevant file*

*Edited relevant file*

### User Input



### Planner Response

Let me expand the result card HTML and JS. First, let me see the exact current result card and the JS parsing section:

*Viewed [index.html](file:///d:/nic-info/index.html) *

*Viewed [index.html](file:///d:/nic-info/index.html) *

### Planner Response

Now let me see the existing result card CSS and the handleDecode function:

*Viewed [index.html](file:///d:/nic-info/index.html) *

*Grep searched codebase*

*Viewed [styles.css](file:///d:/nic-info/styles.css) *

*Viewed [styles.css](file:///d:/nic-info/styles.css) *

### Planner Response

Now let me see the footer so I know where to add internal linking:

*Viewed [index.html](file:///d:/nic-info/index.html) *

*Viewed [index.html](file:///d:/nic-info/index.html) *

### Planner Response

Good, I have everything I need. Now let me make the big changes. I'll expand the result card HTML, add the conversion/weekday JS functions, update the handleDecode function, add internal linking, update the footer, and add lazy-loading for ads — all in one batch.

*Edited relevant file*

### Planner Response

HTML done. Now I need to add the JS functions and update [handleDecode](cci:1://file:///d:/nic-info/index.html:1825:8-1848:9) to populate the new fields:

*Edited relevant file*

### Planner Response

Now let me add the CSS for the expanded result card and the NIC tools nav block:

*Edited relevant file*

### Planner Response

Now I need to add the NIC tools nav block CSS. Let me also fix the mobile responsive for the primary grid which I may have broken. Let me add the NIC tools nav CSS at the end of the styles before the responsive section:

*Grep searched codebase*

*Viewed [styles.css](file:///d:/nic-info/styles.css) *

*Edited relevant file*

### Planner Response

Now let me add mobile responsive CSS for the NIC tools nav and then move on to building the new pages. Let me also add responsive overrides for the primary grid and NIC tools grid on mobile:

### User Input

continue

### Planner Response

Let me first check my existing homepage head section for reference patterns for the new pages, then build the old-to-new-nic page:

*Viewed [index.html](file:///d:/nic-info/index.html) *

### Planner Response

Now let me build the `/old-to-new-nic.html` page. This is the highest-priority new page targeting "old to new NIC converter":

*Edited relevant file*

### Planner Response

Now let me build the `/nic-from-dob.html` page (reverse calculator):

*Edited relevant file*

### Planner Response

Good. Now I need to add CSS for the DOB form, update the [vercel.json](cci:7://file:///d:/nic-info/vercel.json:0:0-0:0) to serve these pages, update the sitemap, and add mobile responsive for the tools nav. Let me also update the task.md:

*Edited relevant file*

### Planner Response

Now let me add the DOB form CSS and update vercel.json + sitemap:

*Viewed [styles.css](file:///d:/nic-info/styles.css) *

*Edited relevant file*

### Planner Response

Now add mobile responsive for the new components and update vercel.json + sitemap:

### Planner Response

Let me add mobile responsive CSS for the new components and update vercel.json + sitemap simultaneously:

*Viewed [styles.css](file:///d:/nic-info/styles.css) *

*Grep searched codebase*

*Viewed [styles.css](file:///d:/nic-info/styles.css) *

*Edited relevant file*

### Planner Response

Now let me update vercel.json and sitemap:

*Edited relevant file*

*Edited relevant file*

### Planner Response

Now let me do a quick verification pass — open the pages in the browser to make sure they render correctly, then update the walkthrough:

### Planner Response

Browser subagent failed. Let me verify via grep checks instead and write the walkthrough:

*Grep searched codebase*

*Grep searched codebase*

*Grep searched codebase*

### Planner Response

The grepping returned empty — that means the edits I made earlier to [index.html](cci:7://file:///d:/nic-info/index.html:0:0-0:0) may have not saved correctly. Let me check what happened:

*Viewed [index.html](file:///d:/nic-info/index.html) *

### Planner Response

Good — the HTML changes are there. The grep was searching with a different encoding or case. Let me verify the NIC tools nav and JS are also present:

*Viewed [index.html](file:///d:/nic-info/index.html) *

*Viewed [index.html](file:///d:/nic-info/index.html) *

### Planner Response

All changes verified in the code. The NIC Tools hub is at line 1375, the conversion functions are at line 1816, and the expanded result card is at line 657. Let me finalize the walkthrough and notify the user:

*Edited relevant file*

### User Input



*Edited relevant file*

### Planner Response

Now let me build the Sinhala page. This needs to be a native-language version of the main decoder: