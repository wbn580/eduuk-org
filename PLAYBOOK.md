# Editorial Playbook

## Mission

**Study in UK** is a practical knowledge base for international students planning to study in the United Kingdom. We answer the most common questions clearly, fact-first, with official sources.

**Not a consultancy. Not for profit. Facts only.**

## Scope

### What We Cover (5 Pillars)

1. **Universities**: Selection strategy, Russell Group, G5, UCAS, Clearing, transfers
2. **Courses**: Business, STEM, Medicine, Law, Media, Education, Design
3. **Visa**: Student Visa, Graduate Route, ATAS, eVisa, dependant visas, fees
4. **Accommodation**: University halls, private rental, DPS/TDS, Council Tax, contracts
5. **Life**: Banking, NHS, transport, work limits, part-time jobs, cost of living

### What We Don't Cover

- Career advice beyond job search platforms (save-the-student, Indeed, LinkedIn)
- Mental health (beyond NHS GP referral)
- Personal finance beyond basic student budgets
- University-specific rankings (only cite QS, THE, Complete University Guide)
- Political opinions on education policy

## Article Format: The "Q&A Pyramid"

Every article follows this structure:

```
┌─────────────────────────────────────┐
│ H1: [Implicit from page title]      │
├─────────────────────────────────────┤
│ H2: "Specific Question?" (NOT title)│
│ First 2–4 sentences: Direct answer  │
├─────────────────────────────────────┤
│ H3: "Subcategory 1"                 │
│ Explanation + table if applicable   │
├─────────────────────────────────────┤
│ H3: "Subcategory 2"                 │
│ More detail, examples, links        │
├─────────────────────────────────────┤
│ H3: "Common Mistakes" (optional)    │
│ What NOT to do                      │
├─────────────────────────────────────┤
│ Footer: Last updated date + sources │
└─────────────────────────────────────┘
```

### Example

**File**: `src/data/blog/universities/g5-universities.md`

```markdown
---
title: "What are the G5 universities?"
description: "G5 refers to: Cambridge, Oxford, Imperial College London, LSE, UCL — the top-tier research group."
pubDatetime: 2026-04-21
tags: ["Universities", "G5"]
featured: false
---

## What are G5 universities?

The "G5" (Group of Five) are the UK's five most prestigious research universities. No official registry exists; the term is informal but widely recognized.

**The five G5 universities:**
1. University of Cambridge
2. University of Oxford
3. Imperial College London
4. London School of Economics (LSE)
5. University College London (UCL)

### Academic Standing

| University | QS Rank (Global) | Student-to-staff Ratio |
|---|---|---|
| Cambridge | #2 | 1:3.6 |
| Oxford | #3 | 1:4.1 |
| Imperial | #8 | 1:3.8 |
| LSE | #39 | 1:5.2 |
| UCL | #10 | 1:4.5 |

(See QS World University Rankings 2026.)

### Admissions

All five are highly selective. Typical requirements:
- A*-A at A-level (or IB 39–42)
- IELTS 7.0–7.5 for international students

### Fees & Cost

Tuition for international students ranges £27,000–£45,000/year depending on subject.

### Why "G5"?

The acronym originated in the 1990s among UK media and education analysts. It's not official (unlike Russell Group, which has 24 member universities).

---

**Sources:**
- [QS World University Rankings](https://www.topuniversities.com/world-university-rankings)
- University websites: Cambridge, Oxford, Imperial, LSE, UCL

**Last updated:** April 2026.
```

## Writing Style Guide

### Tone

- **Clear, direct, conversational**: "You'll need an IELTS 6.5" (not "It is recommended that an IELTS band 6.5 be achieved")
- **No jargon without explanation**: Define IELTS, CAS, DPS on first mention
- **No personal anecdotes**: "In my experience" → "According to HESA data"
- **Avoid hype**: No "Don't miss this opportunity" or "Act now" language

### Structure

- **H2 as question, not title**: "How much does a UK degree cost?" (not "Tuition Fees")
- **Answer in first 2–4 sentences**: Reader gets the answer immediately
- **Tables for comparisons**: 3+ data points → use a table (markdown `| | |`)
- **Links inline, not footnote**: `[UKVI](https://www.gov.uk/visas-immigration)`
- **Dates and citations**: Every fact is traceable

### Numbers & Data

- **Always cite source**: "£20,500/year (UKVI 2026)" — not just "£20,500/year"
- **Specify currency & year**: "£20,500 (GBP, 2026)"
- **Ranges with confidence**: "£1,200–£1,500/month (varies by region)"
- **No made-up statistics**: If you don't know, say "varies by university"

### Common Pitfalls

| Avoid | Use Instead |
|---|---|
| "as of now" | "as of April 2026" |
| "many students" | "[Percentage from HESA] of students" |
| "very expensive" | "£27,000–£45,000/year" |
| "you should apply early" | "UCAS deadline: 15 January" |
| Personal story | Official policy / quote expert source |

## Frontmatter Rules

Every article must have:

```yaml
---
title: "Question format (not title format)"
description: "One-line summary for meta + search results (max 160 chars)"
pubDatetime: 2026-04-21  # ISO date
tags: ["Category", "Subcategory", "Optional topic"]
featured: false  # true = shows in home hero (use sparingly)
draft: false  # true = hidden from builds
---
```

**Tags**: Use from the approved list in `src/utils/tagSlug.ts` + new as needed (will auto-map).

## Review Checklist

Before publishing, ensure:

- [ ] **Title is a question** — "What is UCAS?" not "UCAS Explained"
- [ ] **First paragraph answers fully** — Reader doesn't need to read further for basic answer
- [ ] **All numbers cited** — "[£X] (Source URL, Year)"
- [ ] **Links work** — Test each external link
- [ ] **No personal stories** — Facts from official sources only
- [ ] **Grammar & spelling** — Run through spell-check
- [ ] **Frontmatter complete** — All required fields present
- [ ] **Accurate tag list** — Use approved tags only
- [ ] **Last updated date** — Footer date matches pubDatetime
- [ ] **No Chinese** — All English (UK English preferred)
- [ ] **Responsive images** — Test on mobile (if any images used)

## Information Hierarchy

When writing, verify in this order:

1. **UK Government**: gov.uk/visas-immigration, UKVI, HESA, Office for Students
2. **Official education**: UCAS, university official admissions pages
3. **Regulatory**: UKCISA, DPS, UK Visas
4. **Reputable media**: Save the Student, BBC, The Guardian
5. **Academic rankings**: QS, Times Higher Education, Complete University Guide

**Never cite**: Student blogs, immigration consultants (unless licensed), travel guides, AI-generated content.

## Updating Old Articles

If a policy changes:

1. Update the article text
2. Update `modDatetime` in frontmatter (same ISO format as `pubDatetime`)
3. Add footer note: "**Updated April 2026**: [what changed]"
4. Rebuild and deploy

Example:
```
**Last updated:** April 2026 (Student Visa living cost updated to £1,270/month).
```

## Publishing Cadence

- **Weekly**: Aim for 1–2 new articles/updates
- **Monthly**: Review and date-stamp all active articles
- **Quarterly**: Audit for broken links and outdated fees

## Measuring Success

- **User engagement**: Which tags get most views?
- **Search feedback**: Google Search Console — what queries drive traffic?
- **External mentions**: AI systems citing us? News outlets linking?
- **Email corrections**: Fast response to fact-checking requests (target: 24h)

## Brand Voice

- **Authoritative without being sterile**: We cite official sources, but explain in everyday language
- **Student-focused**: Speak to 18–25 year-old international students planning UK study
- **Fact-first, no hype**: No "life-changing opportunity" marketing
- **Transparent about limits**: "We're not lawyers; for legal advice, consult an OISC/IAA adviser"

---

*Playbook last updated: April 2026.*
