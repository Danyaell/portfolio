---
title: 'Why I built Maverick Labs'
slug: 'why-i-built-maverick-labs'
summary: 'How I designed a route-planning application for the Mega Man X series.'
publishedAt: '2026-08-17'
tags:
  - Java
  - Spring Boot
  - React
  - System Design
githubUrl: 'https://github.com/Danyaell/maverick-labs-be'
draft: false
---

Maverick Labs started as a way to combine one of my favorite game series with a real full-stack engineering problem.

## The problem

At first glance, planning a route through a Mega Man X game may seem as simple as choosing the order in which to defeat eight bosses. In practice, boss order is only one part of the problem.

Defeating a boss rewards the player with a weapon, and that weapon may be another boss's weakness. Entering a difficult stage before obtaining the correct weapon can make the encounter considerably harder, while changing the order can reduce its effective difficulty.

Collectibles introduce another layer of dependency. Heart Tanks, Sub Tanks, armor upgrades, and special abilities may require a specific weapon, a previously acquired upgrade, or a change triggered by clearing another stage. Visiting a stage before satisfying those requirements can make some collectibles unavailable during the first visit, forcing the player to return later.

As a result, two routes containing the same eight stages can produce very different experiences. A useful route planner must consider boss weaknesses, collectible requirements, acquired upgrades, backtracking, overall difficulty, and estimated completion time.

That became the central product question behind Maverick Labs: how could I model static game information in a way that allowed the application to explain why one route might be easier or more efficient than another?

## Defining the product

My original idea was to build a route analyzer for all eight main Mega Man X games. That scope was too broad for an initial version. Instead of providing shallow support for the entire series, I decided to build one complete vertical slice around the original Mega Man X.

The product grew incrementally. I started with a catalog containing the eight main games in release order. I then implemented a detailed game view for Mega Man X, including its stages, bosses, weapon rewards, collectibles, and their requirements.

Once that data was available, I built the Route Builder. It allows the player to reorder the eight Maverick stages and immediately see how the selected order affects the analysis. The builder and analyzer live on the same page so that changing the route and understanding its consequences remain part of one interaction.

The Route Analyzer became the core of the product. It validates the submitted stage order, simulates the player's progression, and calculates difficulty, backtracking, estimated completion time, warnings, and route-efficiency values.

The final layer was a rule-based recommendation system. Instead of only returning scores, the application explains opportunities to improve the route—for example, defeating one boss earlier to obtain another boss's weakness or postponing a stage until its collectible requirements are available.

The current version focuses on 100% completion routes for the original Mega Man X. The other seven games are already represented in the catalog, but their detailed data and route analysis remain part of the roadmap.

## Architecture

Maverick Labs is divided into two applications with clearly separated responsibilities: a React and TypeScript client and a Java 21 and Spring Boot API.

The frontend owns the interactive experience. React local state stores the current stage order, while TanStack Query manages data retrieved from the backend, including caching, request cancellation, retries, and the preservation of the previous analysis while a new route is being evaluated. Typed API clients keep the frontend aligned with the backend contracts.

The backend owns the game data, validation rules, route simulation, scoring, and recommendations. Keeping the analysis on the server prevents domain rules from being duplicated inside presentation components and provides one consistent implementation for every client that may consume the API.

The API follows controller, service, and repository boundaries. Controllers define the HTTP contract and validate incoming requests. Services contain the application and domain behavior, including route simulation and recommendation generation. Repositories provide focused access to the persisted game data.

DTOs separate the public API from the JPA entities, preventing internal database identifiers and persistence details from leaking into the client. MySQL stores the normalized relationships between games, stages, bosses, weapons, collectibles, and requirements, while Flyway acts as the source of truth for schema changes and reference data.

This separation allowed the frontend to focus on interaction and feedback while the backend remained responsible for producing deterministic, testable analysis results.

## Modeling route analysis

The most challenging part of the backend was translating a stage order into an analysis that was useful and explainable.

The analyzer receives a game code, an ordered list of stage slugs, and a route goal. Before starting the simulation, it validates that every stage belongs to the selected game, that there are no duplicates, and that the route contains every required stage. The current `HUNDRED_PERCENT` goal requires all eight Maverick stages exactly once.

After validation, the service processes the stages in the order selected by the player. During this process, it keeps track of three things: the weapons already obtained, the collectibles already acquired, and the stages already cleared.

This progression state affects each stage differently. When the player reaches a boss, the service checks whether its weakness weapon has already been obtained. If it is available, the effective difficulty of that encounter is reduced to 65 percent of its base value. Otherwise, the full base difficulty is used.

Collectibles are evaluated in a similar way. A collectible may require a boss weapon, an armor upgrade, another collectible, or a previously cleared stage. If those requirements are not available at that point in the route, the collectible is marked as unavailable during the first visit and a possible revisit is added to the analysis.

The difficulty score is calculated from the effective difficulty of all the stages. It is not intended to measure the exact experience of every player, because execution skill and familiarity with the game are impossible to represent with one number. Instead, it provides a consistent way to compare how different stage orders use the available boss weaknesses.

Backtracking also works as a comparative score rather than an exact number of additional visits. Every blocked collectible adds pressure to the score, which is limited to a range from 0 to 100. The estimated completion time begins with the expected duration of each stage and adds penalties for backtracking and difficult encounters completed without their weakness.

The final part of the analysis is the recommendation system. I decided to use explicit rules instead of a more complex optimization algorithm. These rules can detect cases such as defeating a boss before obtaining its weakness, visiting a collectible-heavy stage too early, or creating a route with a high amount of backtracking.

This approach does not claim to generate the perfect route. Its purpose is to explain the tradeoffs in the route the player created and suggest changes that can improve it.

## Data and testing

The analysis depends completely on the consistency of the game data. A recommendation cannot be reliable if a boss points to the wrong weakness, a weapon belongs to a different game, or a collectible requirement is incomplete.

For that reason, I modeled the database around relationships instead of storing the game information as isolated text. Games contain stages, stages contain bosses and collectibles, bosses reference their weakness weapons, and collectibles have normalized requirements.

Flyway owns both the schema and the initial reference data. The first migration creates the tables, indexes, constraints, and relationships. The seed migration adds the eight games to the catalog and the complete dataset for the original Mega Man X.

The current MMX dataset contains eight Maverick stages, eight bosses, eight boss weapons, 17 collectibles, and 39 normalized collectible requirements. This gave me enough real data to test the full product flow without pretending that all eight games were already supported.

The database also enforces important rules independently of the application. Unique constraints prevent duplicate game codes and stage positions. Foreign keys protect the relationships between entities, and composite constraints ensure that stages, weapons, bosses, collectibles, and requirements belong to the same game.

I moved away from using H2 for database integration testing and started using MySQL through Testcontainers. This allowed the test suite to run the same migrations against the same database engine used by the application.

The integration tests start an isolated MySQL container, apply the real Flyway migrations, and exercise the seeded data through repositories and services. Other tests verify the route-analysis rules, recommendation generation, validation errors, controller contracts, database constraints, and JPA relationship propagation.

This was important because unit tests could confirm that the Java logic worked, but they could not prove that the migrations, MySQL constraints, and entity mappings agreed with each other. Testing the complete persistence flow caught problems that would otherwise appear only when the application started against a real database.

## Frontend and accessibility

The main frontend challenge was making route reordering feel immediate without making drag and drop the only available interaction.

The Route Builder displays the eight stages as an ordered list. Players can drag a stage to a new position, but every card also includes buttons to move it up or down. This provides a clear alternative for keyboard users and for anyone who finds drag-and-drop interactions difficult.

The drag behavior also changes depending on the input method. Mouse interactions begin after a small movement, while touch interactions use a short delay and tolerance. This helps prevent an accidental drag when the player only wants to scroll through the page on a mobile device.

On larger screens, the route and its analysis can be viewed next to each other. On smaller screens, the layout adapts so the stage list and the analysis panel remain readable without requiring a desktop-sized interface.

Every time the stage order changes, the frontend requests a new analysis automatically. TanStack Query keeps the previous result visible while the new request is running, which prevents the panel from disappearing or being replaced by a complete loading screen after every movement.

The interface communicates these changes with messages such as “Analyzing current route,” “Updating analysis,” and “Live analysis is up to date.” These messages use an `aria-live` region so assistive technologies can announce the current state without interrupting the user. The panel also communicates loading through `aria-busy` and uses an alert when the analysis cannot be completed.

The result is an interaction where accessibility is part of the feature itself. The user can reorder the route without a mouse, understand when the analysis is changing, recover from an error, and continue using the previous result while a new one is being calculated.

## Delivery

The backend, database, and frontend are deployed as separate parts of the same product.

The Spring Boot API and MySQL database run on Railway. The React application is built with Vite and deployed on Vercel. The frontend receives the backend URL through an environment variable, while the API controls which frontend origins are allowed through its CORS configuration.

Deploying both applications separately introduced some additional configuration, but it also kept their responsibilities and deployment cycles independent. The frontend does not need database credentials, and the backend remains the only application with direct access to MySQL.

Both repositories use GitHub Actions to validate changes pushed to `main` and pull requests targeting it. The backend workflow configures Java 21 and runs the complete Maven verification process, including the Testcontainers integration suite.

The frontend workflow installs the exact dependency versions from the lockfile, runs type-aware ESLint validation, executes the Vitest suite, and creates the production build.

Before I consider a version ready to deploy, it must pass the same checks locally and in GitHub Actions. When the backend starts in its deployed environment, Flyway validates and applies the required migrations, and Hibernate verifies that its entity mappings match the resulting schema instead of modifying it automatically.

This gives the delivery process several validation points: the Java and TypeScript code must compile, the automated tests must pass, the frontend must produce a valid production bundle, and the backend schema must remain compatible with the application.

## What I learned

One of the first lessons from Maverick Labs was that supporting one game completely was more valuable than partially supporting all eight games.

My original scope included the entire Mega Man X series, but each game has different stages, upgrades, collectibles, dependencies, and special mechanics. Adding incomplete records for every game would make the catalog look larger without proving that the analyzer could solve the complete problem.

Building one vertical slice for the original Mega Man X allowed me to connect the entire flow: database migrations, API contracts, route simulation, recommendations, frontend interaction, testing, and deployment. It also created a clearer reference for adding the next game in the future.

I also learned that domain modeling mattered more than visual polish during the first stages of the project. Before improving cards, animations, or layouts, I needed to define what a stage owned, where a weapon came from, how a boss referenced its weakness, and how collectible requirements should be represented.

Once those relationships were clear, the frontend became easier to build because the API could provide consistent data. Visual improvements could not compensate for an incomplete or ambiguous domain model.

Another important decision was keeping the recommendation system rule-based. It would have been possible to start thinking about graph algorithms, route optimization, or automatic generation of the best route. However, that would have introduced more complexity before I had a reliable way to evaluate the result.

Static rules were easier to understand, test, and explain. If the application recommends moving one boss before another, I can trace that recommendation to a specific weapon dependency. This makes the result more useful than an unexplained score or an allegedly optimal route.

Finally, testing the migrations changed how I thought about backend testing. Service unit tests were useful, but they were only one part of the system. The application also depended on Flyway scripts, MySQL behavior, foreign keys, unique constraints, seed data, and JPA mappings.

Running integration tests over the real migrations gave me confidence that the application could start from an empty database and still produce the expected analysis using the actual MMX dataset.

## What comes next

The next step is to improve the depth of the current Mega Man X analysis before expanding the catalog.

The requirement model currently treats multiple requirements as a single `AND` group. I want to support explicit `AND` and `OR` combinations so the analyzer can represent alternative ways of obtaining a collectible instead of choosing only one canonical strategy.

I also want to add more route goals. The current version focuses on 100% completion, but future versions could analyze routes intended for basic completion, collectible priorities, lower difficulty, or reduced completion time.

On the frontend, I plan to explain the score contributions more clearly, improve how related recommendations are grouped, and allow players to compare two routes side by side. Saving, naming, and sharing routes would make those comparisons useful beyond one browser session.

After strengthening this vertical slice, I can start modeling Mega Man X2 using the same architecture and testing process. Each additional game will introduce new mechanics, so the goal is not only to add more data, but to verify that the domain model can evolve without turning every exception into hardcoded behavior.

I also plan to add real-browser end-to-end tests for pointer, touch, and keyboard interactions, as well as OpenAPI documentation for the backend.

Maverick Labs is still growing, but it already represents the kind of project I wanted to build: one where the frontend, backend, database, testing, and deployment decisions all exist to solve the same product problem. The long-term goal is not simply to list the eight bosses in every Mega Man X game, but to make the decisions behind a route visible, comparable, and explainable.
