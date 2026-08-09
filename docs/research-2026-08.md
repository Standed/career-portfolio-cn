# Open-source Portfolio Research

Research date: 2026-08-10

## Product definition after research

This project should not be another developer-only portfolio clone. It should be a portfolio system for people who have strong work but little front-end experience, especially designers, film and video creators, product managers, operators, marketers, content workers, humanities graduates, and career switchers.

The product promise is:

> Edit one profile file, choose a career preset, preview the result, and deploy a high-quality portfolio without rebuilding the site.

## What GitHub proves

The repository search was performed with GitHub CLI and checked for stars, maintenance, license, configuration model, and deployment path.

| Project | Evidence | What to learn | Boundary |
| --- | --- | --- | --- |
| [academicpages](https://github.com/academicpages/academicpages.github.io) | 17k+ stars, MIT, GitHub Pages | browser-editable content and durable static hosting | academic information architecture is too specialized |
| [simplefolio](https://github.com/cobiwave/simplefolio) | 14k+ stars, MIT | one-page clarity and approachable documentation | old toolchain, developer-only copy, generic reveal design |
| [developerFolio](https://github.com/saadpasta/developerFolio) | 6k+ stars, GPL-3.0, inactive notice | broad configuration surface | maintenance and license make it a poor base |
| [DevPortfolio](https://github.com/RyanFitzgerald/devportfolio) | 4.9k+ stars, MIT, Astro | one config file, optional sections, static hosting | code-first fields and developer framing |
| [Magic UI Portfolio](https://github.com/magicuidesign/portfolio) | 1.4k+ stars, MIT | single resume config, responsive defaults, Vercel button | visually generic and tied to developer resume fields |
| [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) | 1.3k+ stars, CC BY-NC 4.0 | MDX projects, conditional pages, tokenized theming | non-commercial license means its code is not reusable here |
| [Naresh Khatri 3D Portfolio](https://github.com/Naresh-Khatri/3d-portfolio) | 1.2k+ stars, GSAP and Motion | a single memorable 3D interaction can carry identity | no recognized license in search result, high editing cost |
| [devfolio](https://github.com/shubh73/devfolio) | 400+ stars, MIT, GSAP | strong animation layer on a familiar content structure | attribution expectations and developer-centric narrative |
| [Ayush Singh Folio](https://github.com/ayush013/folio) | 400+ stars, MIT, GSAP | scroll choreography and project emphasis | animation is harder for nontechnical users to maintain |

The gap is clear: easy templates are visually interchangeable, while memorable templates are difficult to edit, heavy, or license-ambiguous.

## What hiring-oriented sources agree on

- A recruiter and design leader review from [Miro](https://www.youtube.com/watch?v=zOz96zcI7b4) repeatedly emphasizes role fit, immediate case-study access, concise summaries, visual communication, and visible personal contribution.
- A product manager portfolio needs to show how the candidate thinks, handles tradeoffs, and decides what not to build, not just finished screens. See [ProductPeople](https://productpeople.co/guides/product-manager-portfolio) and [CareerFoundry](https://careerfoundry.com/en/blog/product-management/product-manager-portfolio/).
- A marketing portfolio should connect the brief, personal role, execution, and result. See [Indeed](https://www.indeed.com/career-advice/career-development/marketing-portfolios) and [ClickUp](https://clickup.com/blog/marketing-portfolio-examples/).
- A film or motion portfolio should let the reel or strongest work appear early, while still naming credits, responsibilities, and project context. See [Vimeo's editor portfolio guide](https://vimeo.com/blog/post/video-editor-portfolio) and [Site Builder Report's motion portfolio collection](https://www.sitebuilderreport.com/inspiration/motion-design-portfolios).
- Design reviewers value visual authorship, but they also need immediate clarity about role and contribution. The 2026 [Creative Bloq portfolio review](https://www.creativebloq.com/portfolios/examples-712368) repeatedly praises this balance.
- Award galleries demonstrate interaction techniques, not automatically good hiring flows. [Dawson Guillory's Awwwards page](https://www.awwwards.com/sites/dawson-guillory-portfolio) is useful for scroll and responsive motion references; it should not dictate information architecture.

## Recommended career presets

The first public release should provide four genuinely different presets. A preset changes composition, copy labels, media behavior, and motion choreography, not only color.

### Studio

For visual, UI, brand, and interaction designers.

- Visual priority: large project art direction and detailed case-study imagery.
- Story labels: Brief, My role, System, Outcome.
- Motion: image-mask reveals, shared project transitions, responsive kinetic typography.
- Theme direction: cool off-white, near-black, one cobalt accent.

### Cinema

For film, video editing, animation, motion design, and content production.

- Visual priority: showreel or lead frame before long copy, with credits and role kept visible.
- Story labels: Treatment, Credits, Cut, Delivery.
- Motion: contact-sheet progression, frame wipes, restrained image parallax, time-based hover previews.
- Theme direction: graphite, silver, one oxidized-chartreuse accent.

### Product

For product managers, UX, strategy, and product operations.

- Visual priority: problem, decision, tradeoff, evidence, and shipped state.
- Story labels: Context, Decision, Tradeoff, Impact.
- Motion: decision-path reveal, layout transitions between overview and detail, evidence emphasis.
- Theme direction: silver-white, charcoal, one electric-blue accent.

### Editorial

For operations, marketing, content, writing, humanities graduates, and career switchers.

- Visual priority: campaign or work artifact plus clear narrative and transferable skills.
- Story labels: Goal, Strategy, Execution, Result.
- Motion: page-like reveals, headline sequencing, media-caption transitions.
- Theme direction: paper-white, ink, one burnt-orange accent.

## Shared content contract

Every project uses the same evidence-safe core fields:

- title and one-sentence summary;
- target problem or brief;
- the candidate's exact role;
- key decisions or actions;
- deliverables;
- outcomes, or an explicit statement that outcomes were not measured;
- source or verification note;
- confidentiality and publication status;
- media with alt text and rights status.

Each career preset only changes the labels and presentation of those fields. This lets a nontechnical user switch themes without rewriting the underlying story.

## Motion architecture

- Use Motion as the single runtime animation system for the public template.
- Keep animation in isolated leaf components driven by motion values, `useScroll`, and `useTransform`.
- Avoid global smooth-scroll dependencies and scroll hijacking.
- Every preset receives one signature motion pattern plus shared reveal and feedback primitives.
- The content and navigation remain complete when JavaScript, hover, WebGL, or motion is unavailable.
- `prefers-reduced-motion` switches every choreography to an immediate static state.

## Open-source and onboarding decision

- Recommend MIT for code.
- Keep example copy and generated demo imagery clearly separated from user content.
- Offer a Vercel deploy button and a static-hosting path.
- Keep one beginner-facing edit file with plain Chinese comments.
- Provide four sample profiles and four theme previews.
- Add a release check that prevents restricted local-review media, secrets, fake contact information, or pending private data from entering `dist`.

## Research limitations

The Exa free MCP endpoint returned HTTP 429 during the second research pass. GitHub CLI, direct source pages, general web search, Jina-readable pages, and YouTube metadata/subtitles were used to continue. YouTube was used for research only; no third-party video was added to the repository.
